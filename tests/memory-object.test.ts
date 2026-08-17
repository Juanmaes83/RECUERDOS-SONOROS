import assert from "node:assert/strict";
import test from "node:test";

import { partialMemory, yellowLaMataMemory } from "../src/domain/fixtures.js";
import { applyUserCorrection, canInferenceReplace, validateMemoryObject } from "../src/domain/invariants.js";
import { createCaptureEnvelope } from "../src/domain/memory.js";

test("canonical Yellow / La Mata memory satisfies invariants", () => {
  assert.deepEqual(validateMemoryObject(yellowLaMataMemory), []);
});

test("partial memories remain valid when song does not match and location is denied", () => {
  assert.deepEqual(validateMemoryObject(partialMemory), []);
});

test("capture envelope can be committed before enrichment", () => {
  const memory = createCaptureEnvelope({
    id: "memory-1",
    ownerId: "owner-1",
    captureSessionId: "capture-1",
    createdAt: "2026-08-17T10:44:00Z",
    capturedAt: "2026-08-17T12:44:00+02:00",
    timezone: "Europe/Madrid",
    primaryAsset: {
      id: "photo-1",
      type: "photo",
      uri: "memory://photo-1",
      privacyState: "local_only"
    }
  });

  assert.equal(memory.status, "captured");
  assert.equal(memory.audio.identifiedMusic.status, "unavailable");
  assert.equal(memory.place.location.status, "unavailable");
  assert.deepEqual(validateMemoryObject(memory), []);
});

test("matched music requires title and artist", () => {
  const invalid = structuredClone(yellowLaMataMemory);
  invalid.audio.identifiedMusic.title = null;
  invalid.audio.identifiedMusic.artist = null;

  const issues = validateMemoryObject(invalid);
  assert.equal(issues.some((issue) => issue.code === "required_when_matched"), true);
});

test("available location requires coordinates", () => {
  const invalid = structuredClone(partialMemory);
  invalid.place.location = { status: "available" };

  const issues = validateMemoryObject(invalid);
  assert.equal(issues.some((issue) => issue.code === "coordinates_required"), true);
});

test("user correction becomes authoritative evidence", () => {
  const inferred = {
    value: "restaurant",
    source: "scene-model",
    sourceType: "inferred" as const,
    confidence: 0.66,
    userState: "untouched" as const
  };

  const corrected = applyUserCorrection(inferred, "beach bar");
  assert.equal(corrected.value, "beach bar");
  assert.equal(corrected.sourceType, "user");
  assert.equal(corrected.userState, "corrected");
  assert.equal(corrected.confidence, null);
  assert.equal(canInferenceReplace(corrected), false);
});
