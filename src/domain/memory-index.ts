import type { MemoryObject } from "./memory.js";

export interface MemoryQuery {
  song?: string;
  artist?: string;
  place?: string;
  tag?: string;
  person?: string;
  from?: string;
  to?: string;
}

export interface MemoryConnection {
  kind: "song" | "artist" | "place" | "tag" | "person";
  key: string;
  memoryIds: string[];
}

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase();
}

function includesNormalized(candidate: string | null | undefined, query: string | undefined): boolean {
  if (!query) return true;
  if (!candidate) return false;
  return normalize(candidate).includes(normalize(query));
}

function memoryTime(memory: MemoryObject): number {
  return Date.parse(memory.capturedAt);
}

export function queryMemories(memories: MemoryObject[], query: MemoryQuery): MemoryObject[] {
  const from = query.from ? Date.parse(query.from) : Number.NEGATIVE_INFINITY;
  const to = query.to ? Date.parse(query.to) : Number.POSITIVE_INFINITY;

  return memories
    .filter((memory) => {
      const track = memory.audio.identifiedMusic;
      const semantic = memory.place.semantic;
      const time = memoryTime(memory);

      if (!includesNormalized(track.title, query.song)) return false;
      if (!includesNormalized(track.artist, query.artist)) return false;
      if (query.place && ![semantic?.name, semantic?.locality, semantic?.region, semantic?.country].some((value) => includesNormalized(value, query.place))) return false;
      if (query.tag && !memory.tags?.some((tag) => includesNormalized(tag, query.tag))) return false;
      if (query.person && !memory.people?.some((person) => includesNormalized(person.displayName, query.person))) return false;
      if (Number.isFinite(from) && time < from) return false;
      if (Number.isFinite(to) && time > to) return false;
      return true;
    })
    .sort((a, b) => memoryTime(b) - memoryTime(a));
}

export function groupConnections(memories: MemoryObject[]): MemoryConnection[] {
  const groups = new Map<string, MemoryConnection>();

  const add = (kind: MemoryConnection["kind"], key: string | null | undefined, memoryId: string): void => {
    if (!key?.trim()) return;
    const normalized = normalize(key);
    const id = `${kind}:${normalized}`;
    const current = groups.get(id) ?? { kind, key: key.trim(), memoryIds: [] };
    if (!current.memoryIds.includes(memoryId)) current.memoryIds.push(memoryId);
    groups.set(id, current);
  };

  for (const memory of memories) {
    if (memory.audio.identifiedMusic.status === "matched") {
      add("song", memory.audio.identifiedMusic.title, memory.id);
      add("artist", memory.audio.identifiedMusic.artist, memory.id);
    }
    add("place", memory.place.semantic?.name, memory.id);
    memory.tags?.forEach((tag) => add("tag", tag, memory.id));
    memory.people?.forEach((person) => add("person", person.displayName, memory.id));
  }

  return [...groups.values()]
    .filter((group) => group.memoryIds.length > 1)
    .sort((a, b) => b.memoryIds.length - a.memoryIds.length || a.key.localeCompare(b.key));
}

export function findRelatedMemories(memory: MemoryObject, all: MemoryObject[], limit = 10): MemoryObject[] {
  const song = memory.audio.identifiedMusic.status === "matched" ? normalize(memory.audio.identifiedMusic.title ?? "") : "";
  const artist = memory.audio.identifiedMusic.status === "matched" ? normalize(memory.audio.identifiedMusic.artist ?? "") : "";
  const place = normalize(memory.place.semantic?.name ?? "");
  const tags = new Set((memory.tags ?? []).map(normalize));
  const people = new Set((memory.people ?? []).map((person) => normalize(person.displayName ?? "")).filter(Boolean));

  const scored = all
    .filter((candidate) => candidate.id !== memory.id)
    .map((candidate) => {
      let score = 0;
      const candidateSong = candidate.audio.identifiedMusic.status === "matched" ? normalize(candidate.audio.identifiedMusic.title ?? "") : "";
      const candidateArtist = candidate.audio.identifiedMusic.status === "matched" ? normalize(candidate.audio.identifiedMusic.artist ?? "") : "";
      const candidatePlace = normalize(candidate.place.semantic?.name ?? "");

      if (song && candidateSong === song) score += 5;
      if (artist && candidateArtist === artist) score += 2;
      if (place && candidatePlace === place) score += 4;
      for (const tag of candidate.tags ?? []) if (tags.has(normalize(tag))) score += 1;
      for (const person of candidate.people ?? []) if (people.has(normalize(person.displayName ?? ""))) score += 4;

      return { candidate, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || memoryTime(b.candidate) - memoryTime(a.candidate));

  return scored.slice(0, limit).map(({ candidate }) => candidate);
}
