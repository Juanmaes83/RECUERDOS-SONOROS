# RECUERDOS SONOROS — ROADMAP

> Current roadmap snapshot: **18 August 2026**.

## Roadmap principle

Advance through **proofs of user value and technical risk**, not through a long feature checklist.

The governing sequence is now:

`PROVE NATIVE CAPTURE → PROVE SONG ID → PROVE LOCAL MEMORY → PROVE RELIVE → HARDEN STORAGE/SYNC/PRIVACY → EXPAND INTELLIGENCE → EXPAND RETRIEVAL → CREATE FILMS/LIFE SOUNDTRACK`

---

# CURRENT STATE AT A GLANCE

## Done / materially advanced

- Product thesis and positioning
- Capability archaeology and Best-in-Family map
- Versioned Memory Object v0.1
- JSON Schema + strict TypeScript domain
- Capture envelope + invariants
- Human correction precedence over inference
- Provider architecture for music, location, place, vision and music analysis
- Enrichment engine with partial/failure states
- Local-first capture principles
- Privacy/trust architecture v0.1
- Browser Proof 01A: one-click capture experience simulator
- Memory Graph query/connection foundation in PR #5
- Google Pixel browser preflight:
  - camera validated
  - GPS validated
  - location accuracy observed around 22 m in one real test
  - microphone permission retest still pending

## Not yet proven

- Native CameraX capture
- Native microphone access
- Real ShazamKit Android recognition
- Real match offset / song position
- Native local persistence across relaunch
- Camera + mic + GPS concurrency under Android lifecycle
- Real-device latency / battery / failure behavior
- Real context vision provider
- Production sync / backup / encryption
- Commercial music playback/licensing path

---

# FOUNDATION 01 — PRODUCT OS

**Status: COMPLETE AS FOUNDATION / PR #1 OPEN FOR REVIEW**

### Delivered

- Product vision
- Capability map
- Original roadmap
- Repository governance

### Remaining

Review / merge discipline only. No conceptual blocker.

---

# FOUNDATION 02 — MEMORY OBJECT + CAPTURE DOMAIN

**Status: MATERIAL FOUNDATION COMPLETE / PR #2 OPEN**

### Delivered

- `Memory Object v0.1`
- machine-readable schema
- strict TypeScript types
- capture envelope
- invariants
- fixtures
- provider contracts
- enrichment engine
- partial failure states
- provenance/confidence rules
- human correction precedence
- privacy/trust architecture
- test suite written

### Remaining before calling it production-ready

- native persistence implementation
- migrations
- encrypted storage decisions
- backup/sync contract
- confirmed CI execution

---

# FOUNDATION 03 — MEMORY GRAPH / RETRIEVAL

**Status: FOUNDATION IMPLEMENTED / PR #5 OPEN**

### Delivered

- `queryMemories()`
- `groupConnections()`
- `findRelatedMemories()`
- explainable scoring
- song/place/person/tag/time queries

### Do not over-expand yet

The Memory Graph is valuable, but it is **not the current critical path**. Do not build graph UI, embeddings or graph DB infrastructure until native capture is proven.

---

# PROOF 01A — EXPERIENCE SIMULATOR

**Status: COMPLETE FOR UX PURPOSE / PR #3 OPEN**

### Proves

- camera-first interaction hierarchy
- one-click capture
- immediate `Memory saved`
- progressive enrichment after capture
- synthetic music/place/light/scene resolution
- first Relive card

### Does NOT prove

- real camera integration
- real GPS
- real microphone
- real music identification
- native persistence

The simulator must never be cited as native technical proof.

---

# PROOF 01B — ANDROID PIXEL NATIVE PROOF OF MAGIC

**Status: ACTIVE / HIGHEST PRIORITY / PR #6 + Issue #4**

## Target flow

```text
OPEN APP
↓
CAMERA READY
↓
EPHEMERAL MICROPHONE WINDOW
↓
CLICK
↓
PHOTO SAVED LOCALLY
+
CAPTURE TIMESTAMP FROZEN
+
GPS OBSERVATION
↓
MUSIC IDENTIFICATION
↓
TRACK + ARTIST + MATCH OFFSET (IF AVAILABLE)
↓
MEMORY OBJECT ENRICHED
↓
APP RELAUNCH
↓
MEMORY STILL EXISTS
↓
RELIVE
```

## Current physical-device evidence

A real Google Pixel browser preflight has already returned:

- secure context: `true`
- camera: `true`
- location: `true`
- location accuracy observed: ~22 m
- microphone: `false`
- microphone error: `NotAllowedError`
- ShazamKit: not connected in browser preflight

Interpretation:

- camera capability: **validated at browser/device level**
- GPS capability: **validated at browser/device level**
- microphone: **not failed technically yet; permission retest pending**
- song recognition: **not tested yet**

## User-dependent pending test

The user has not yet had time to rerun the preflight after enabling microphone permission. This is **PENDING**, not a blocker for documentation work and not a failure.

## Exit criteria

Proof 01B is complete only when the physical Pixel can demonstrate:

1. Native photo capture.
2. Native location observation.
3. Native microphone access.
4. Ambient song recognition through the chosen provider.
5. Song metadata attached to the Memory Object.
6. Match offset saved when exposed by provider.
7. Memory committed locally before enrichment finishes.
8. App relaunch preserves the memory.
9. Capture remains valid if music or location is unavailable.
10. No raw ambient conversation is persisted by default.
11. Measured shutter-to-local-save and recognition latency.

---

# GATE A — DO NOT SKIP

Do **not** call the Proof of Magic solved until Proof 01B exits successfully.

Once it exits, the main product question changes from:

> “Can the defining capture loop work?”

into:

> “Can we make it reliable, private and valuable enough to use for years?”

---

# POST-PROOF ATTACK SEQUENCE

## 1. STORAGE / LOCAL-FIRST HARDENING

### Build

- Android local database / repository implementation
- media file lifecycle
- schema migrations
- crash-safe writes
- deduplication / idempotency
- pending enrichment queue
- offline recovery

### Exit criterion

No captured memory is lost across app close, crash, network loss or provider failure.

---

## 2. PROOF 02 — RELIVE THE MOMENT

### Build

- real captured photo
- real song identity/context
- place/time presentation
- note / voice note
- authorised playback handoff
- subtle audio-reactive visual experiment

### Compare

1. photo only;
2. photo + song/place/time;
3. photo + subtle audio-reactive relive.

### Exit criterion

Choose a reliving pattern that adds emotional value without becoming a gimmicky visualizer.

---

## 3. PRIVACY / SECURITY MODEL V1

### Decide and implement

- local encryption
- what is uploaded vs remains on-device
- account model
- sync encryption / transport
- export/delete
- home/private-place handling
- retention rules
- analytics boundary
- secrets/token management

### Exit criterion

A privacy review can explain every sensitive data flow from capture to deletion.

---

## 4. SYNC / BACKUP / RECOVERY

### Build

- optional account
- cloud backup
- sync journal / conflict strategy
- device migration
- resumable media upload
- retry queue
- restore test

### Exit criterion

A user can lose or replace the phone without losing the memory library.

---

## 5. PROOF 03 — SOUND MEMORY MAP

### Build

- map with privacy-aware memory clusters
- place detail
- songs by place
- memories by place
- trip grouping

### Exit criterion

The user can answer: **“What did my life sound like here?”**

---

## 6. PROOF 04 — MUSIC AS MEMORY SEARCH

### Build

- song page
- artist page
- recurring songs
- song chronology
- Memory Graph UI

### Foundation already available

Use FOUNDATION 03 rather than rebuilding retrieval logic.

### Exit criterion

The same song becomes an emotional index across years, places and people.

---

## 7. PROOF 05 — CONTEXT INTELLIGENCE

### Build cautiously

- scene
- people count
- objects
- broad activity
- lighting
- optional mood suggestions

### Rules

- inference is suggestion, not truth
- provenance/confidence always retained
- user can correct/delete
- no biometric identity by default
- prefer on-device processing when practical

### Exit criterion

Automatic enrichment reduces user effort without producing false or creepy memory narratives.

---

# V1 — PRIVATE MEMORY PRODUCT

Only start V1 consolidation after Proof 01B + local persistence + privacy model are credible.

## V1 scope

- Android capture
- music identification
- timestamp/location
- durable local memory
- notes / voice notes
- timeline
- song/place retrieval
- map
- export/delete
- optional secure sync
- privacy controls
- production QA / crash reporting

## Explicitly NOT required for V1

- public social feed
- biometric face identity
- creator marketplace
- complex video editor
- graph database
- generative avatars

---

# V1.5 — MEMORY CONNECTIONS

- On this day
- recurring song patterns
- place retrospectives
- people/event collections
- trip collections
- seasonal / annual soundtracks

---

# V2 — MEMORY FILMS

Use the capability advantage already identified in:

- `VisionCutterMusic`
- `core-BROWSER-VIDEO`
- `remotion`
- Mediabunny
- audio-reactive references

Products:

- Trip Film
- Summer Film
- Year in Memories
- Person Story
- Place Story
- Song Story

---

# V3 — PERSONAL MEMORY GRAPH

Relationship model:

`SONG ↔ MEMORY ↔ PERSON ↔ PLACE ↔ EVENT ↔ PERIOD`

Only introduce graph/vector infrastructure when measured query needs justify it.

---

# V4 — LIFE SOUNDTRACK

Potential experiences:

- personal music eras
- songs by life chapter
- people ↔ music relationships
- cities ↔ music relationships
- yearly / decade soundtrack
- audiovisual autobiography

---

# THE THREE BIG PROBLEMS TO DEFEAT

These are the strategic engineering mountains. Everything else is secondary until these are under control.

## BIG PROBLEM 1 — FRICTIONLESS MULTIMODAL CAPTURE

**Difficulty: 8/10**

Need camera + microphone + song recognition + GPS + exact timestamp to coexist without slowing the shutter experience.

Success means:

`CLICK → MEMORY EXISTS IMMEDIATELY`, while enrichment continues asynchronously.

## BIG PROBLEM 2 — DURABLE LOCAL-FIRST STORAGE + SYNC

**Difficulty: 9/10**

Need offline capture, crash safety, migrations, media lifecycle, retries, backup, conflict handling, device replacement and no memory loss.

This is likely the hardest pure engineering problem of V1.

## BIG PROBLEM 3 — TRUST: PRIVACY + CORRECT CONTEXT

**Difficulty: 9/10 product / security**

The product combines photo, location, music, people, time and emotional/contextual inference. It must avoid both surveillance-like behavior and fabricated memory narratives.

Success requires:

- minimised data collection
- transparent permissions
- no ambient conversation retention by default
- strong user ownership
- explainable provenance/confidence
- human corrections overriding AI
- safe export/delete/recovery

---

# CURRENT PRIORITY ORDER

```text
P0  Complete Pixel microphone preflight when user has time
P0  Native Android project / CameraX capture
P0  Native location adapter
P0  MusicIdentityProvider → ShazamKit Android proof
P0  Durable local Memory Object persistence
P0  Measure latency + failure modes

P1  Real Relive prototype
P1  Reverse geocoding / place semantics
P1  Privacy/security implementation decisions
P1  Offline enrichment queue

P2  Sync / backup / restore
P2  Sound Memory Map
P2  Song / Memory Graph UI
P2  Context vision

P3  Memory Films
P3  Life Soundtrack
P3  advanced semantic/graph experiences
```

---

# ESTIMATED PROGRESS — DO NOT MISREAD

These percentages are directional project planning estimates, not story-point accounting.

- Product concept / architecture: **~70–85% defined**
- Proof of Magic: **~45–55%** before real native song-ID proof
- Commercial V1: **~20–25%** overall
- Full long-term vision: **~10–15%**

The repository advantage is substantial in multimedia, audio-reactive experience, video composition and future Memory Films, but it does **not** eliminate the hard native/mobile/storage/security work.

---

# Product discipline

A feature moves forward only when it answers at least one of these questions:

- Does this make capture easier?
- Does this make a memory richer?
- Does this make a memory easier to retrieve?
- Does this make reliving meaningfully more emotional?
- Does this make accumulated memories more valuable over time?

If the answer is no, it is not core roadmap work.