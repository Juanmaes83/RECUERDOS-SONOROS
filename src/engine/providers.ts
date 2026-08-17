import type { Evidence, LocationFix, MusicMatch, SemanticPlace, VisualContext } from "../domain/memory.js";

export interface CaptureContext {
  memoryId: string;
  captureSessionId: string;
  capturedAt: string;
  photoUri: string;
}

export interface MusicIdentityResult {
  match: MusicMatch;
  observedAt?: string | null;
}

export interface MusicIdentityProvider {
  readonly id: string;
  identify(context: CaptureContext): Promise<MusicIdentityResult>;
}

export interface LocationProvider {
  readonly id: string;
  getFix(context: CaptureContext): Promise<LocationFix>;
}

export interface SemanticPlaceProvider {
  readonly id: string;
  resolve(fix: LocationFix, context: CaptureContext): Promise<SemanticPlace | null>;
}

export interface SceneAnalysisResult {
  environment?: Array<Evidence<string>>;
  objects?: Array<Evidence<string>>;
  lighting?: Array<Evidence<string>>;
  peopleCount?: Evidence<number> | null;
}

export interface SceneAnalysisProvider {
  readonly id: string;
  analyze(context: CaptureContext): Promise<SceneAnalysisResult>;
}

export interface MusicAnalysisResult {
  tempoBpm?: number | null;
  energy?: number | null;
}

export interface MusicAnalysisProvider {
  readonly id: string;
  analyze(context: CaptureContext, match: MusicMatch): Promise<MusicAnalysisResult>;
}

export interface ProviderSet {
  musicIdentity?: MusicIdentityProvider;
  location?: LocationProvider;
  semanticPlace?: SemanticPlaceProvider;
  sceneAnalysis?: SceneAnalysisProvider;
  musicAnalysis?: MusicAnalysisProvider;
}

export type EnrichmentJobName =
  | "music_identity"
  | "location"
  | "semantic_place"
  | "scene_analysis"
  | "music_analysis";

export type EnrichmentJobStatus =
  | "success"
  | "no_match"
  | "permission_denied"
  | "unavailable"
  | "timeout"
  | "error"
  | "cancelled";

export interface EnrichmentJobReport {
  name: EnrichmentJobName;
  providerId?: string;
  status: EnrichmentJobStatus;
  startedAt: string;
  completedAt: string;
  errorCode?: string;
}

export function mergeSceneAnalysis(
  visual: VisualContext,
  result: SceneAnalysisResult,
): VisualContext {
  return {
    ...visual,
    ...(result.environment !== undefined ? { environment: result.environment } : {}),
    ...(result.objects !== undefined ? { objects: result.objects } : {}),
    ...(result.lighting !== undefined ? { lighting: result.lighting } : {}),
    ...(result.peopleCount !== undefined ? { peopleCount: result.peopleCount } : {}),
  };
}
