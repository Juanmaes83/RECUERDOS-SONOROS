export const MEMORY_SCHEMA_VERSION = "0.1.0" as const;

export type MemoryStatus =
  | "captured"
  | "enriching"
  | "ready"
  | "edited"
  | "archived"
  | "deleted";

export type UserEvidenceState =
  | "untouched"
  | "confirmed"
  | "corrected"
  | "rejected";

export type EvidenceSourceType =
  | "observed"
  | "provider"
  | "inferred"
  | "user";

export interface Evidence<T> {
  value: T;
  source: string;
  sourceType: EvidenceSourceType;
  confidence?: number | null;
  observedAt?: string | null;
  derivedAt?: string | null;
  modelVersion?: string | null;
  userState: UserEvidenceState;
}

export type AssetPrivacyState = "local_only" | "encrypted_cloud" | "shared";

export interface MediaAsset {
  id: string;
  type: "photo" | "video" | "keyframe";
  uri: string;
  width?: number | null;
  height?: number | null;
  orientation?: string | null;
  contentHash?: string | null;
  privacyState: AssetPrivacyState;
}

export interface VisualContext {
  primaryAsset: MediaAsset;
  environment?: Array<Evidence<string>>;
  objects?: Array<Evidence<string>>;
  lighting?: Array<Evidence<string>>;
  peopleCount?: Evidence<number> | null;
}

export type MusicMatchStatus =
  | "matched"
  | "no_match"
  | "permission_denied"
  | "unavailable"
  | "error";

export interface MusicMatch {
  status: MusicMatchStatus;
  provider: string | null;
  providerMatchId?: string | null;
  title?: string | null;
  artist?: string | null;
  album?: string | null;
  isrc?: string | null;
  trackPositionMs?: number | null;
  artworkUri?: string | null;
  externalUris?: Record<string, string>;
}

export interface AudioContext {
  identifiedMusic: MusicMatch;
  tempoBpm?: number | null;
  energy?: number | null;
  ambientAssetId?: string | null;
}

export type LocationStatus =
  | "available"
  | "permission_denied"
  | "unavailable"
  | "error";

export interface LocationFix {
  status: LocationStatus;
  latitude?: number | null;
  longitude?: number | null;
  horizontalAccuracyM?: number | null;
  observedAt?: string | null;
  source?: string | null;
}

export interface SemanticPlace {
  provider?: string | null;
  providerPlaceId?: string | null;
  name?: string | null;
  category?: string | null;
  locality?: string | null;
  region?: string | null;
  country?: string | null;
  confidence?: number | null;
}

export interface PlaceContext {
  location: LocationFix;
  semantic?: SemanticPlace | null;
}

export interface PersonPresence {
  id: string;
  kind: "known_person" | "unnamed_cluster" | "manual";
  displayName?: string | null;
  personId?: string | null;
  clusterId?: string | null;
  confidence?: number | null;
  userState: UserEvidenceState;
}

export interface EventContext {
  title?: string | null;
  activities?: Array<Evidence<string>>;
  tripId?: string | null;
  calendarEventId?: string | null;
  generatedSummary?: string | null;
}

export interface EmotionContext {
  selfReported?: string | null;
  signals?: Array<Evidence<string>>;
  summary?: string | null;
}

export interface MemoryNote {
  id: string;
  kind: "text" | "voice_transcript" | "generated";
  text?: string | null;
  assetId?: string | null;
  createdAt: string;
}

export interface MemoryObject {
  id: string;
  schemaVersion: typeof MEMORY_SCHEMA_VERSION;
  ownerId: string;
  captureSessionId: string;
  createdAt: string;
  capturedAt: string;
  timezone?: string | null;
  status: MemoryStatus;
  visual: VisualContext;
  audio: AudioContext;
  place: PlaceContext;
  people?: PersonPresence[];
  event?: EventContext | null;
  emotion?: EmotionContext | null;
  notes?: MemoryNote[];
  tags?: string[];
}

export interface CaptureEnvelopeInput {
  id: string;
  ownerId: string;
  captureSessionId: string;
  createdAt: string;
  capturedAt: string;
  timezone?: string | null;
  primaryAsset: MediaAsset;
  musicStatus?: MusicMatchStatus;
  locationStatus?: LocationStatus;
}

export function createCaptureEnvelope(input: CaptureEnvelopeInput): MemoryObject {
  return {
    id: input.id,
    schemaVersion: MEMORY_SCHEMA_VERSION,
    ownerId: input.ownerId,
    captureSessionId: input.captureSessionId,
    createdAt: input.createdAt,
    capturedAt: input.capturedAt,
    ...(input.timezone !== undefined ? { timezone: input.timezone } : {}),
    status: "captured",
    visual: {
      primaryAsset: input.primaryAsset,
    },
    audio: {
      identifiedMusic: {
        status: input.musicStatus ?? "unavailable",
        provider: null,
      },
    },
    place: {
      location: {
        status: input.locationStatus ?? "unavailable",
      },
    },
  };
}
