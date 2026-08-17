import assert from "node:assert/strict";
import test from "node:test";

import { yellowLaMataMemory } from "../src/domain/fixtures.js";
import { findRelatedMemories, groupConnections, queryMemories } from "../src/domain/memory-index.js";
import type { MemoryObject } from "../src/domain/memory.js";

function variant(id: string, overrides: Partial<MemoryObject>): MemoryObject {
  return {
    ...structuredClone(yellowLaMataMemory),
    id,
    captureSessionId: `capture-${id}`,
    ...overrides,
  };
}

const berlinYellow = variant("berlin-yellow", {
  capturedAt: "2027-04-10T22:10:00+02:00",
  place: {
    location: { status: "available", latitude: 52.52, longitude: 13.405 },
    semantic: { name: "Berlin", country: "Germany" }
  },
  tags: ["travel", "night"]
});

const laMataOtherSong = variant("la-mata-other", {
  capturedAt: "2028-08-17T21:35:00+02:00",
  audio: {
    identifiedMusic: { status: "matched", provider: "fake", title: "Heroes", artist: "David Bowie" },
    tempoBpm: 112
  },
  tags: ["summer", "beach"]
});

const memories = [yellowLaMataMemory, berlinYellow, laMataOtherSong];

test("find memories by song", () => {
  const result = queryMemories(memories, { song: "yellow" });
  assert.deepEqual(result.map((memory) => memory.id), ["berlin-yellow", "memory-yellow-la-mata"]);
});

test("find memories by semantic place", () => {
  const result = queryMemories(memories, { place: "La Mata" });
  assert.deepEqual(result.map((memory) => memory.id), ["la-mata-other", "memory-yellow-la-mata"]);
});

test("connection graph discovers repeated songs and places", () => {
  const connections = groupConnections(memories);
  const yellow = connections.find((connection) => connection.kind === "song" && connection.key === "Yellow");
  const laMata = connections.find((connection) => connection.kind === "place" && connection.key === "La Mata");
  assert.equal(yellow?.memoryIds.length, 2);
  assert.equal(laMata?.memoryIds.length, 2);
});

test("related memories rank same song above weaker tag-only matches", () => {
  const related = findRelatedMemories(yellowLaMataMemory, memories);
  assert.equal(related[0]?.id, "berlin-yellow");
  assert.equal(related[1]?.id, "la-mata-other");
});
