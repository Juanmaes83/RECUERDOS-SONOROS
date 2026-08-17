import type { MemoryObject } from "../domain/memory.js";
import { canInferenceReplace } from "../domain/invariants.js";
import {
  mergeSceneAnalysis,
  type CaptureContext,
  type EnrichmentJobReport,
  type EnrichmentJobStatus,
  type ProviderSet,
} from "./providers.js";

export interface EnrichmentResult {
  memory: MemoryObject;
  jobs: EnrichmentJobReport[];
}

function nowIso(): string {
  return new Date().toISOString();
}

function mapMusicStatus(status: MemoryObject["audio"]["identifiedMusic"]["status"]): EnrichmentJobStatus {
  switch (status) {
    case "matched": return "success";
    case "no_match": return "no_match";
    case "permission_denied": return "permission_denied";
    case "unavailable": return "unavailable";
    case "error": return "error";
  }
}

function mapLocationStatus(status: MemoryObject["place"]["location"]["status"]): EnrichmentJobStatus {
  switch (status) {
    case "available": return "success";
    case "permission_denied": return "permission_denied";
    case "unavailable": return "unavailable";
    case "error": return "error";
  }
}

function report(
  name: EnrichmentJobReport["name"],
  providerId: string | undefined,
  status: EnrichmentJobStatus,
  startedAt: string,
  errorCode?: string,
): EnrichmentJobReport {
  return {
    name,
    ...(providerId !== undefined ? { providerId } : {}),
    status,
    startedAt,
    completedAt: nowIso(),
    ...(errorCode !== undefined ? { errorCode } : {}),
  };
}

export async function enrichMemory(
  source: MemoryObject,
  providers: ProviderSet,
): Promise<EnrichmentResult> {
  let memory: MemoryObject = { ...source, status: "enriching" };
  const jobs: EnrichmentJobReport[] = [];

  const context: CaptureContext = {
    memoryId: source.id,
    captureSessionId: source.captureSessionId,
    capturedAt: source.capturedAt,
    photoUri: source.visual.primaryAsset.uri,
  };

  if (providers.musicIdentity) {
    const startedAt = nowIso();
    try {
      const result = await providers.musicIdentity.identify(context);
      memory = {
        ...memory,
        audio: {
          ...memory.audio,
          identifiedMusic: result.match,
        },
      };
      jobs.push(report("music_identity", providers.musicIdentity.id, mapMusicStatus(result.match.status), startedAt));
    } catch (error) {
      jobs.push(report("music_identity", providers.musicIdentity.id, "error", startedAt, error instanceof Error ? error.name : "unknown_error"));
    }
  }

  if (providers.location) {
    const startedAt = nowIso();
    try {
      const location = await providers.location.getFix(context);
      memory = {
        ...memory,
        place: {
          ...memory.place,
          location,
        },
      };
      jobs.push(report("location", providers.location.id, mapLocationStatus(location.status), startedAt));
    } catch (error) {
      jobs.push(report("location", providers.location.id, "error", startedAt, error instanceof Error ? error.name : "unknown_error"));
    }
  }

  if (providers.semanticPlace && memory.place.location.status === "available") {
    const startedAt = nowIso();
    try {
      const semantic = await providers.semanticPlace.resolve(memory.place.location, context);
      memory = {
        ...memory,
        place: {
          ...memory.place,
          semantic,
        },
      };
      jobs.push(report("semantic_place", providers.semanticPlace.id, semantic ? "success" : "no_match", startedAt));
    } catch (error) {
      jobs.push(report("semantic_place", providers.semanticPlace.id, "error", startedAt, error instanceof Error ? error.name : "unknown_error"));
    }
  }

  if (providers.sceneAnalysis) {
    const startedAt = nowIso();
    try {
      const scene = await providers.sceneAnalysis.analyze(context);
      const filtered = {
        ...scene,
        ...(scene.environment
          ? { environment: scene.environment.filter((candidate) => canInferenceReplace(memory.visual.environment?.find((existing) => existing.value === candidate.value))) }
          : {}),
        ...(scene.objects
          ? { objects: scene.objects.filter((candidate) => canInferenceReplace(memory.visual.objects?.find((existing) => existing.value === candidate.value))) }
          : {}),
        ...(scene.lighting
          ? { lighting: scene.lighting.filter((candidate) => canInferenceReplace(memory.visual.lighting?.find((existing) => existing.value === candidate.value))) }
          : {}),
      };
      memory = {
        ...memory,
        visual: mergeSceneAnalysis(memory.visual, filtered),
      };
      jobs.push(report("scene_analysis", providers.sceneAnalysis.id, "success", startedAt));
    } catch (error) {
      jobs.push(report("scene_analysis", providers.sceneAnalysis.id, "error", startedAt, error instanceof Error ? error.name : "unknown_error"));
    }
  }

  if (providers.musicAnalysis && memory.audio.identifiedMusic.status === "matched") {
    const startedAt = nowIso();
    try {
      const analysis = await providers.musicAnalysis.analyze(context, memory.audio.identifiedMusic);
      memory = {
        ...memory,
        audio: {
          ...memory.audio,
          ...(analysis.tempoBpm !== undefined ? { tempoBpm: analysis.tempoBpm } : {}),
          ...(analysis.energy !== undefined ? { energy: analysis.energy } : {}),
        },
      };
      jobs.push(report("music_analysis", providers.musicAnalysis.id, "success", startedAt));
    } catch (error) {
      jobs.push(report("music_analysis", providers.musicAnalysis.id, "error", startedAt, error instanceof Error ? error.name : "unknown_error"));
    }
  }

  const hasError = jobs.some((job) => job.status === "error" || job.status === "timeout");
  const hasExpectedPartial = jobs.some((job) => ["no_match", "permission_denied", "unavailable"].includes(job.status));

  memory = {
    ...memory,
    status: hasError || hasExpectedPartial ? "captured" : "ready",
  };

  return { memory, jobs };
}
