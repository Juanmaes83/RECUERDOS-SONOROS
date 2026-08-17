import type { Evidence, MemoryObject } from "./memory.js";

export interface ValidationIssue {
  path: string;
  code: string;
  message: string;
}

function isIsoDate(value: string): boolean {
  return !Number.isNaN(Date.parse(value));
}

function validateConfidence(path: string, value: number | null | undefined, issues: ValidationIssue[]): void {
  if (value == null) return;
  if (value < 0 || value > 1) {
    issues.push({ path, code: "confidence_out_of_range", message: "Confidence must be between 0 and 1." });
  }
}

function validateEvidence<T>(path: string, evidence: Evidence<T>, issues: ValidationIssue[]): void {
  if (!evidence.source.trim()) {
    issues.push({ path: `${path}.source`, code: "missing_source", message: "Evidence source is required." });
  }
  validateConfidence(`${path}.confidence`, evidence.confidence, issues);
}

export function validateMemoryObject(memory: MemoryObject): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!memory.id.trim()) issues.push({ path: "id", code: "required", message: "Memory id is required." });
  if (!memory.ownerId.trim()) issues.push({ path: "ownerId", code: "required", message: "Owner id is required." });
  if (!memory.captureSessionId.trim()) issues.push({ path: "captureSessionId", code: "required", message: "Capture session id is required." });

  if (!isIsoDate(memory.createdAt)) issues.push({ path: "createdAt", code: "invalid_datetime", message: "createdAt must be an ISO-compatible datetime." });
  if (!isIsoDate(memory.capturedAt)) issues.push({ path: "capturedAt", code: "invalid_datetime", message: "capturedAt must be an ISO-compatible datetime." });

  if (!memory.visual.primaryAsset.id.trim()) {
    issues.push({ path: "visual.primaryAsset.id", code: "required", message: "Primary asset id is required." });
  }
  if (!memory.visual.primaryAsset.uri.trim()) {
    issues.push({ path: "visual.primaryAsset.uri", code: "required", message: "Primary asset uri is required." });
  }

  const music = memory.audio.identifiedMusic;
  if (music.status === "matched") {
    if (!music.provider?.trim()) issues.push({ path: "audio.identifiedMusic.provider", code: "required_when_matched", message: "Matched music requires a provider." });
    if (!music.title?.trim()) issues.push({ path: "audio.identifiedMusic.title", code: "required_when_matched", message: "Matched music requires a title." });
    if (!music.artist?.trim()) issues.push({ path: "audio.identifiedMusic.artist", code: "required_when_matched", message: "Matched music requires an artist." });
  }
  if (music.trackPositionMs != null && music.trackPositionMs < 0) {
    issues.push({ path: "audio.identifiedMusic.trackPositionMs", code: "negative_track_position", message: "Track position cannot be negative." });
  }
  if (memory.audio.tempoBpm != null && memory.audio.tempoBpm <= 0) {
    issues.push({ path: "audio.tempoBpm", code: "invalid_tempo", message: "Tempo must be greater than zero." });
  }
  validateConfidence("audio.energy", memory.audio.energy, issues);

  const location = memory.place.location;
  if (location.status === "available") {
    if (location.latitude == null || location.longitude == null) {
      issues.push({ path: "place.location", code: "coordinates_required", message: "Available location requires latitude and longitude." });
    }
  }
  if (location.latitude != null && (location.latitude < -90 || location.latitude > 90)) {
    issues.push({ path: "place.location.latitude", code: "latitude_out_of_range", message: "Latitude must be between -90 and 90." });
  }
  if (location.longitude != null && (location.longitude < -180 || location.longitude > 180)) {
    issues.push({ path: "place.location.longitude", code: "longitude_out_of_range", message: "Longitude must be between -180 and 180." });
  }

  memory.visual.environment?.forEach((item, index) => validateEvidence(`visual.environment.${index}`, item, issues));
  memory.visual.objects?.forEach((item, index) => validateEvidence(`visual.objects.${index}`, item, issues));
  memory.visual.lighting?.forEach((item, index) => validateEvidence(`visual.lighting.${index}`, item, issues));
  if (memory.visual.peopleCount) validateEvidence("visual.peopleCount", memory.visual.peopleCount, issues);
  memory.event?.activities?.forEach((item, index) => validateEvidence(`event.activities.${index}`, item, issues));
  memory.emotion?.signals?.forEach((item, index) => validateEvidence(`emotion.signals.${index}`, item, issues));

  return issues;
}

export function assertMemoryObject(memory: MemoryObject): void {
  const issues = validateMemoryObject(memory);
  if (issues.length === 0) return;
  const detail = issues.map((issue) => `${issue.path}: ${issue.message}`).join("\n");
  throw new Error(`Invalid Memory Object:\n${detail}`);
}

export function applyUserCorrection<T>(evidence: Evidence<T>, correctedValue: T): Evidence<T> {
  return {
    ...evidence,
    value: correctedValue,
    source: "user",
    sourceType: "user",
    confidence: null,
    userState: "corrected",
  };
}

export function canInferenceReplace<T>(existing: Evidence<T> | undefined): boolean {
  if (!existing) return true;
  return existing.userState !== "confirmed" && existing.userState !== "corrected";
}
