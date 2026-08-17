# MEMORY GRAPH FOUNDATION v0.1

Status: FOUNDATION 03

## Why this exists

A collection of Memory Objects becomes strategically valuable when memories can connect to one another.

The first graph does not require a graph database. It requires stable entities and deterministic connection rules.

## First connection types

- same song;
- same artist;
- same semantic place;
- same tagged person;
- same user tag;
- time range.

These enable product questions such as:

- “Show me every memory with Yellow.”
- “What did I listen to in Berlin?”
- “Show me La Mata summers.”
- “Memories with Marta.”
- “All memories connected to this one.”

## Current implementation

`src/domain/memory-index.ts` provides:

- `queryMemories()` — deterministic filtering;
- `groupConnections()` — repeated entity detection;
- `findRelatedMemories()` — simple explainable scoring.

This is intentionally local and dependency-free.

## Related-memory scoring v0.1

Current weights:

- same song: +5;
- same place: +4;
- same person: +4;
- same artist: +2;
- shared tag: +1.

These are product heuristics, not a recommendation model. They should remain explainable until real user behavior justifies something more complex.

## Future graph entities

After evidence and privacy decisions:

- trip;
- event;
- city/region/country hierarchy;
- season/year;
- musical era/genre;
- self-reported mood;
- scene/activity;
- relationship circles;
- generated memory film;
- resurfacing history.

## Semantic search later

Embeddings may eventually support requests like:

> “Show me quiet nights by the sea.”

But embeddings are additive. The canonical graph must retain deterministic facts first so the system can always explain why a memory was returned.

## Privacy

Graph power increases sensitivity. A graph can reveal routines and relationships that no single photo reveals.

Therefore:

- graph/index should be local-first where practical;
- person connections require stronger privacy treatment;
- search telemetry must not leak private query text by default;
- cloud indexes need the same deletion guarantees as source memories.

## Next product surfaces

1. **Song memory page** — one track, every linked memory across years.
2. **Place memory page** — one place, its personal soundtrack.
3. **Related memories** — links from one Memory Object.
4. **Sound Memory Map** — geographic projection of the same graph.
5. **Life Soundtrack** — chronological musical projection.
