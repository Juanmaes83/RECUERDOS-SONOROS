# RECUERDOS SONOROS — ROADMAP

## Roadmap principle

The project should advance through **proofs of user value and technical risk**, not through a long feature checklist.

The sequence is:

`PROVE THE MAGIC → PROVE THE MEMORY MODEL → PROVE RELIVING → PROVE CONNECTION → PROVE AUTOMATIC STORYTELLING`

---

# FOUNDATION 01 — PRODUCT OS

## Goal

Freeze the product thesis, capability map and development discipline before implementation.

## Deliverables

- Product vision
- Memory Object concept
- Capability / technology map
- Initial roadmap
- Repository governance

## Exit criterion

The project can explain:

1. what problem it solves;
2. what the core experience is;
3. which capabilities are product-specific;
4. which capabilities should be borrowed or integrated;
5. what the first technical proof must demonstrate.

---

# FOUNDATION 02 — MEMORY OBJECT SPEC

## Goal

Turn the conceptual Memory Object into a versioned data contract.

## Define

- IDs
- photo/video assets
- track identity
- track position / recognition event
- capture timestamp
- GPS + place
- user note
- voice note
- people associations
- event/activity
- emotion
- inferred context
- provenance
- confidence
- privacy state
- sync state
- deletion/export state

## Requirements

- works offline at capture time;
- can accept missing song/location/context;
- user corrections override inference without losing provenance;
- future fields can be added without invalidating old memories.

## Exit criterion

A Memory Object can be serialised, validated and reconstructed independently from the UI.

---

# PROOF 01 — PROOF OF MAGIC

## Goal

Validate the defining experience on a real mobile device.

## User flow

```text
OPEN APP
↓
SONG IS PLAYING AROUND USER
↓
TAKE PHOTO
↓
IDENTIFY SONG
↓
CAPTURE DATE/TIME
↓
CAPTURE GPS
↓
RESOLVE PLACE
↓
CREATE MEMORY OBJECT
↓
OPEN MEMORY DETAIL
```

## Minimal UI

- Camera
- Recognition state
- Saved memory confirmation
- Memory detail
- Timeline/list of captured memories

## Primary technology questions

- Native vs React Native foundation
- ShazamKit integration behavior
- recognition latency
- microphone + camera concurrency
- iOS/Android differences
- offline failure modes
- permission UX
- battery impact

## Exit criterion

A real user can capture ten memories in normal environments and the core flow feels faster than manually documenting the moment.

---

# PROOF 02 — RELIVE THE MOMENT

## Goal

Prove that the saved combination is emotionally stronger than an ordinary photo card.

## Build

- full-screen memory detail
- song metadata / artwork reference
- place + time presentation
- user note / voice note
- optional playback handoff to authorised music provider
- subtle transitions

## Experiment

Test three modes:

1. static photo + metadata;
2. photo + song context;
3. photo + subtle audio-reactive visual treatment.

## Source references

- `places-have-sound`
- `audioptix`
- `AudioBasedImageDistortion`
- `webcam-audio-visualizer`

## Exit criterion

Choose a reliving pattern that adds emotional value without becoming a gimmicky music visualizer.

---

# PROOF 03 — SOUND MEMORY MAP

## Goal

Validate place as a second major navigation axis after chronology.

## Build

- map with memory clusters
- place detail
- songs associated with place
- memories associated with place
- optional trip grouping

## Key questions

- exact location vs privacy-preserving location display;
- map density;
- duplicate POIs;
- how to handle home/private places;
- whether music or visual memory should lead the interaction.

## Exit criterion

Users can answer “what did my life sound like here?” in a useful, intuitive way.

---

# PROOF 04 — MUSIC AS MEMORY SEARCH

## Goal

Make music a true retrieval interface.

## Build

- song detail → related memories
- artist detail → related memories
- recurring songs
- song chronology
- search by track / artist

## Example

```text
HEROES — DAVID BOWIE
├── Berlin — 2024
├── Alicante — 2026
└── London — 2028
```

## Exit criterion

The same song can act as an emotional index across multiple years/places.

---

# PROOF 05 — CONTEXT INTELLIGENCE

## Goal

Reduce manual tagging while preserving user trust.

## Candidate inference

- scene
- people count
- objects
- activity
- broad visual context
- optional mood suggestions

## Technology candidates

- MediaPipe / on-device vision
- other on-device models where justified

## Rules

- inference is suggestion, not truth;
- store source/confidence;
- user can correct/delete;
- do not perform identity recognition by default;
- privacy review before any cloud vision processing.

## Exit criterion

Automatic enrichment measurably reduces user effort without creating creepy or false memory descriptions.

---

# V1 — PRIVATE MEMORY PRODUCT

## Goal

Turn the proofs into a coherent private beta.

## Scope

- account/authentication
- secure cloud sync
- offline-first capture
- photo memories
- music recognition
- time/place
- notes / voice notes
- chronological timeline
- map
- song/artist retrieval
- search/filter
- export/delete
- privacy controls
- crash/error monitoring
- analytics limited to product health and explicitly non-sensitive events

## Explicitly not required for V1

- public social feed
- creator marketplace
- complex video editor
- generative avatar features
- full graph database
- music generation

## Exit criterion

A small external cohort can use Recuerdos Sonoros as a real personal memory product for multiple weeks.

---

# V1.5 — MEMORY CONNECTIONS

## Goal

Increase long-term retention and emotional rediscovery.

## Features

- “On this day” sound memories
- recurring song patterns
- place retrospectives
- person/event collections
- trip collections
- monthly / seasonal soundtracks
- semantic memory search if justified

## Exit criterion

The app becomes more valuable as the user’s history grows.

---

# V2 — MEMORY FILMS

## Goal

Transform structured memories into automatic audiovisual stories.

## Inputs

- selected period
- selected people
- selected places
- selected memories
- associated music data
- optional user-selected soundtrack

## Engine candidates

### Beat / structure intelligence

- `VisionCutterMusic` patterns
- Essentia / DSP where licensing permits

### Interactive preview/edit

- `core-BROWSER-VIDEO` / Diffusion Studio Core
- Mediabunny

### Deterministic final rendering

- Remotion

## Products

- Trip Film
- Summer Film
- Year in Memories
- Person Story
- Place Story
- Song Story

## Exit criterion

The system can generate a polished, emotionally coherent short film without requiring professional editing knowledge.

---

# V3 — PERSONAL MEMORY GRAPH

## Goal

Treat the accumulated history as a queryable autobiographical system.

## Relationships

`SONG ↔ MEMORY ↔ PERSON ↔ PLACE ↔ EVENT ↔ PERIOD`

## Example queries

- “What did we listen to in Italy?”
- “Show happy summer memories with Marta.”
- “Which songs recur in my memories with my father?”
- “Show my twenties through music.”

## Architecture rule

Start with relational queries and embeddings where needed. Introduce a graph database only if measured query complexity demands it.

---

# V4 — LIFE SOUNDTRACK

## Goal

Create a unique longitudinal view of the user’s life through music and memory.

## Potential experiences

- personal music eras
- songs by life chapter
- people ↔ music relationships
- cities ↔ music relationships
- yearly soundtrack
- decade soundtrack
- “songs that followed me”
- audiovisual autobiography

---

# Cross-cutting workstreams

These do not wait until a late phase.

## Privacy & security

Must evolve with every proof.

## Licensing

Review ShazamKit, music provider playback, artwork, Essentia, Diffusion Studio Core, Remotion and every external dependency before commercial adoption.

## QA

Test on real phones, noisy environments, poor connectivity, denied permissions and recognition failures.

## Performance

Capture must remain fast even as enrichment becomes more sophisticated.

## Accessibility

Camera, memory navigation, map, audio controls and generated films require accessible alternatives.

## Data portability

The user must ultimately be able to export their memories in a durable format.

---

# Immediate next sequence

1. Approve / refine FOUNDATION 01.
2. Write FOUNDATION 02 — Memory Object v0.1 schema.
3. Decide mobile architecture spike: native vs React Native.
4. Create ShazamKit recognition spike.
5. Create camera + recognition + GPS integration proof.
6. Test Proof of Magic on real device.
7. Only then expand into map, vision intelligence and audiovisual reliving.

---

# Product discipline

A feature moves forward only when it answers at least one of these questions:

- Does this make capture easier?
- Does this make a memory richer?
- Does this make a memory easier to retrieve?
- Does this make reliving meaningfully more emotional?
- Does this make accumulated memories more valuable over time?

If the answer is no, it is not core roadmap work.
