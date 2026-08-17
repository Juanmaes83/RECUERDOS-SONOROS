import assert from "node:assert/strict";
import test from "node:test";

import { createCaptureEnvelope, type Evidence } from "../src/domain/memory.js";
import { enrichMemory } from "../src/engine/enrich-memory.js";

function baseMemory() {
  return createCaptureEnvelope({
    id: "memory-proof",
    ownerId: "owner-proof",
    captureSessionId: "capture-proof",
    createdAt: "2026-08-17T10:44:00Z",
    capturedAt: "2026-08-17T12:44:00+02:00",
    timezone: "Europe/Madrid",
    primaryAsset: {
      id: "photo-proof",
      type: "photo",
      uri: "memory://photo-proof",
      privacyState: "local_only"
    }
  });
}

const inferred = (value: string, confidence = 0.9): Evidence<string> => ({
  value,
  source: "fake-scene-provider",
  sourceType: "inferred",
  confidence,
  userState: "untouched"
});

test("providers enrich a capture envelope without changing capture identity", async () => {
  const source = baseMemory();

  const result = await enrichMemory(source, {
    musicIdentity: {
      id: "fake-shazam",
      async identify() {
        return {
          match: {
            status: "matched",
            provider: "fake-shazam",
            title: "Yellow",
            artist: "Coldplay",
            trackPositionMs: 107000
          }
        };
      }
    },
    location: {
      id: "fake-gps",
      async getFix() {
        return {
          status: "available",
          latitude: 38.023,
          longitude: -0.655,
          horizontalAccuracyM: 5,
          source: "fake-gps"
        };
      }
    },
    semanticPlace: {
      id: "fake-place",
      async resolve() {
        return {
          provider: "fake-place",
          name: "La Mata",
          category: "beach"
        };
      }
    },
    sceneAnalysis: {
      id: "fake-scene-provider",
      async analyze() {
        return {
          environment: [inferred("beach")],
          objects: [inferred("sea"), inferred("drinks", 0.8)],
          lighting: [inferred("sunset")],
          peopleCount: {
            value: 3,
            source: "fake-scene-provider",
            sourceType: "inferred",
            confidence: 0.95,
            userState: "untouched"
          }
        };
      }
    },
    musicAnalysis: {
      id: "fake-music-analysis",
      async analyze() {
        return { tempoBpm: 87, energy: 0.63 };
      }
    }
  });

  assert.equal(result.memory.id, source.id);
  assert.equal(result.memory.capturedAt, source.capturedAt);
  assert.equal(result.memory.audio.identifiedMusic.title, "Yellow");
  assert.equal(result.memory.audio.identifiedMusic.trackPositionMs, 107000);
  assert.equal(result.memory.audio.tempoBpm, 87);
  assert.equal(result.memory.place.semantic?.name, "La Mata");
  assert.equal(result.memory.visual.peopleCount?.value, 3);
  assert.equal(result.memory.status, "ready");
  assert.equal(result.jobs.length, 5);
});

test("expected partial provider states do not invalidate the memory", async () => {
  const result = await enrichMemory(baseMemory(), {
    musicIdentity: {
      id: "fake-shazam",
      async identify() {
        return { match: { status: "no_match", provider: "fake-shazam" } };
      }
    },
    location: {
      id: "fake-gps",
      async getFix() {
        return { status: "permission_denied" };
      }
    }
  });

  assert.equal(result.memory.audio.identifiedMusic.status, "no_match");
  assert.equal(result.memory.place.location.status, "permission_denied");
  assert.equal(result.memory.status, "captured");
  assert.deepEqual(result.jobs.map((job) => job.status), ["no_match", "permission_denied"]);
});

test("scene enrichment preserves user-confirmed evidence", async () => {
  const source = baseMemory();
  source.visual.environment = [{
    value: "beach bar",
    source: "user",
    sourceType: "user",
    confidence: null,
    userState: "confirmed"
  }];

  const result = await enrichMemory(source, {
    sceneAnalysis: {
      id: "fake-scene-provider",
      async analyze() {
        return { environment: [inferred("beach bar", 0.4), inferred("beach", 0.9)] };
      }
    }
  });

  const beachBar = result.memory.visual.environment?.find((item) => item.value === "beach bar");
  assert.equal(beachBar?.sourceType, "user");
  assert.equal(beachBar?.userState, "confirmed");
  assert.equal(result.memory.visual.environment?.some((item) => item.value === "beach"), true);
});
