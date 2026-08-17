import { MEMORY_SCHEMA_VERSION, type MemoryObject } from "./memory.js";

export const yellowLaMataMemory: MemoryObject = {
  id: "memory-yellow-la-mata",
  schemaVersion: MEMORY_SCHEMA_VERSION,
  ownerId: "owner-demo",
  captureSessionId: "capture-demo-yellow",
  createdAt: "2026-08-17T19:31:00.400Z",
  capturedAt: "2026-08-17T21:31:00+02:00",
  timezone: "Europe/Madrid",
  status: "ready",
  visual: {
    primaryAsset: {
      id: "asset-photo-yellow",
      type: "photo",
      uri: "memory://asset-photo-yellow",
      width: 3024,
      height: 4032,
      privacyState: "local_only"
    },
    environment: [
      {
        value: "beach",
        source: "scene-model",
        sourceType: "inferred",
        confidence: 0.94,
        userState: "untouched"
      }
    ],
    objects: [
      {
        value: "sea",
        source: "scene-model",
        sourceType: "inferred",
        confidence: 0.98,
        userState: "untouched"
      },
      {
        value: "drinks",
        source: "scene-model",
        sourceType: "inferred",
        confidence: 0.81,
        userState: "untouched"
      }
    ],
    lighting: [
      {
        value: "sunset",
        source: "scene-model",
        sourceType: "inferred",
        confidence: 0.89,
        userState: "untouched"
      }
    ],
    peopleCount: {
      value: 3,
      source: "scene-model",
      sourceType: "inferred",
      confidence: 0.96,
      userState: "untouched"
    }
  },
  audio: {
    identifiedMusic: {
      status: "matched",
      provider: "shazamkit",
      providerMatchId: "demo-yellow",
      title: "Yellow",
      artist: "Coldplay",
      trackPositionMs: 107000,
      externalUris: {
        appleMusic: "music://yellow"
      }
    },
    tempoBpm: 87,
    energy: 0.63
  },
  place: {
    location: {
      status: "available",
      latitude: 38.023,
      longitude: -0.655,
      horizontalAccuracyM: 8,
      observedAt: "2026-08-17T21:30:58.800+02:00",
      source: "device-gps"
    },
    semantic: {
      provider: "reverse-geocoder",
      name: "La Mata",
      category: "beach",
      locality: "Torrevieja",
      region: "Comunitat Valenciana",
      country: "Spain",
      confidence: 0.9
    }
  },
  emotion: {
    selfReported: null,
    signals: [
      {
        value: "warm",
        source: "scene-model",
        sourceType: "inferred",
        confidence: 0.72,
        userState: "untouched"
      },
      {
        value: "social",
        source: "scene-model",
        sourceType: "inferred",
        confidence: 0.83,
        userState: "untouched"
      },
      {
        value: "positive",
        source: "scene-model",
        sourceType: "inferred",
        confidence: 0.61,
        userState: "untouched"
      }
    ]
  },
  notes: [],
  tags: ["summer", "beach"]
};

export const partialMemory: MemoryObject = {
  id: "memory-partial",
  schemaVersion: MEMORY_SCHEMA_VERSION,
  ownerId: "owner-demo",
  captureSessionId: "capture-partial",
  createdAt: "2026-08-17T10:00:00Z",
  capturedAt: "2026-08-17T12:00:00+02:00",
  timezone: "Europe/Madrid",
  status: "captured",
  visual: {
    primaryAsset: {
      id: "asset-partial",
      type: "photo",
      uri: "memory://asset-partial",
      privacyState: "local_only"
    }
  },
  audio: {
    identifiedMusic: {
      status: "no_match",
      provider: "shazamkit"
    }
  },
  place: {
    location: {
      status: "permission_denied"
    }
  }
};
