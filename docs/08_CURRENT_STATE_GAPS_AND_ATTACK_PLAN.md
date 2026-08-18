# RECUERDOS SONOROS — CURRENT STATE, GAPS & ATTACK PLAN

> Executive project status — **18 August 2026**

This document is the canonical answer to four questions:

1. **Where are we now?**
2. **What is actually implemented vs only designed?**
3. **What is still missing?**
4. **What do we attack next, and what are the three biggest problems to defeat?**

It should be read before expanding scope or adding new feature families.

---

# 1. PRODUCT DEFINITION NOW

Recuerdos Sonoros is no longer defined as “a photo with a song attached”.

The product thesis is:

> **Capture the audiovisual signature of a real moment and turn it into a durable, queryable memory that can later be relived through music, place, people and context.**

The canonical human model is:

```text
WHAT YOU SAW
+
WHAT YOU HEARD
+
WHERE YOU WERE
+
WHO YOU WERE WITH
+
WHAT WAS HAPPENING
+
HOW IT FELT
```

The canonical system object is the **Memory Object**.

The canonical loop is:

```text
CAPTURE
→
RECOGNISE
→
ENRICH
→
STORE
→
RELIVE
→
CONNECT
```

---

# 2. WHAT WE HAVE ACTUALLY BUILT

## A. Product / architecture

**State: STRONG FOUNDATION**

Built/documented:

- product thesis
- differentiation
- capability map
- repository reuse strategy
- roadmap
- proof-driven development model
- privacy/trust principles

This part is substantially advanced, but product decisions remain revisable after real usage.

---

## B. Memory Object v0.1

**State: IMPLEMENTED AS DOMAIN FOUNDATION**

Exists in documentation and machine-readable/code form:

- versioned Memory Object
- JSON Schema
- strict TypeScript types
- capture envelope
- partial/failure states
- provenance
- confidence
- user correction precedence
- fixtures
- invariants

Critical product rule:

> **UNKNOWN IS VALID. INVENTED IS NOT.**

A photo remains a valid memory even when music, GPS or AI enrichment fails.

---

## C. Capture / enrichment architecture

**State: IMPLEMENTED AS ABSTRACTION; REAL PROVIDERS PARTIAL**

Provider contracts exist for:

- music identity
- location
- semantic place
- scene analysis
- music analysis

Enrichment is designed to happen independently after the memory already exists locally.

The architecture therefore supports:

```text
CLICK
↓
LOCAL MEMORY CREATED
↓
MUSIC / GPS / VISION / PLACE RESOLVE ASYNCHRONOUSLY
```

This protects the core UX from provider latency.

---

## D. UX Proof 01A

**State: IMPLEMENTED / SYNTHETIC**

Browser simulator exists showing:

- camera-first interface
- detected-song presentation
- one-click capture
- immediate saved state
- progressive enrichment
- first Relive card

This validates interaction hierarchy only.

It does **not** validate real song recognition, real GPS, real camera persistence or native Android behavior.

---

## E. Real Google Pixel preflight

**State: PARTIAL REAL-DEVICE VALIDATION**

Observed from the user's physical Pixel:

```json
{
  "secureContext": true,
  "camera": true,
  "location": true,
  "locationAccuracyMeters": 22,
  "microphone": false,
  "microphoneError": "NotAllowedError",
  "shazamKit": "not connected in browser preflight"
}
```

Interpretation:

### Camera

**Browser/device capability validated.**

Native CameraX integration still pending.

### GPS

**Browser/device capability validated.**

Native Android location integration still pending.

### Microphone

**Not yet validated.**

The current failure is `NotAllowedError`, consistent with a permission block/denial. The user has **not yet had time to run the final permission retest**.

Therefore status is:

`PENDING RETEST`, not `FAILED` and not `VALIDATED`.

### Shazam / song recognition

**Not connected yet.**

No claim should be made that real song identification has been demonstrated.

---

## F. Memory Graph foundation

**State: PARTIAL IMPLEMENTATION EXISTS**

Implemented in a separate branch / PR:

- query by song
- query by artist
- query by place
- query by person/tag/date
- repeated-entity grouping
- related-memory scoring

This already gives us the foundation for:

- “Show all memories with this song”
- song pages
- place pages
- related memories
- future Sound Memory Map
- future Life Soundtrack

Do not overbuild this before native capture is proven.

---

# 3. WHAT WE DO NOT HAVE YET

The following items are still real gaps.

## Defining native proof gaps

- Android app project running on the physical Pixel
- native CameraX capture
- native microphone access
- ShazamKit Android adapter or production-compatible fallback
- real ambient song identification
- match offset / song-position validation
- native GPS adapter
- durable local database
- app relaunch preserving a captured memory
- measured capture latency
- measured music-recognition latency
- concurrency testing: camera + microphone + location
- denied-permission behavior in native app
- noisy-environment recognition tests

## V1 engineering gaps

- production local database
- schema migrations
- offline enrichment queue
- media lifecycle management
- encrypted local storage decisions
- optional account
- cloud sync / backup
- conflict strategy
- restore / new-device migration
- export/delete implementation
- crash reporting
- production analytics boundaries
- security review
- privacy/compliance implementation

## Product intelligence gaps

- reverse geocoding / POI resolution
- production vision model
- scene / object / people-count inference
- user notes / voice notes
- people tagging
- context correction UI
- timeline UI
- map UI
- song/artist pages
- search UI
- resurfacing engine

## Advanced vision gaps

- real audio-reactive Relive engine
- Memory Films
- Life Soundtrack
- automatic audiovisual storytelling
- semantic autobiographical queries

---

# 4. THE THREE BIG PROBLEMS TO DEFEAT

These are not merely features. They are the three risks capable of deciding whether the product becomes genuinely useful.

---

# BIG PROBLEM 1 — FRICTIONLESS MULTIMODAL CAPTURE

## Difficulty

**8/10**

## Problem

At the defining moment the phone may need to coordinate:

```text
CAMERA
+
MICROPHONE
+
MUSIC RECOGNITION
+
GPS
+
TIMESTAMP
+
LOCAL WRITE
```

without making the user wait.

The product fails if the user experiences:

```text
CLICK
→ wait for GPS
→ wait for song
→ wait for network
→ memory saved
```

The target is:

```text
CLICK
→ MEMORY EXISTS IMMEDIATELY
→ enrichment resolves after
```

## Main risks

- Android lifecycle / permissions
- microphone + camera concurrency
- provider latency
- noisy environments
- GPS latency
- battery
- network absence
- capture write reliability

## Victory condition

A real user can repeatedly capture memories on the Pixel in normal life with no perceived friction and no lost photos.

---

# BIG PROBLEM 2 — DURABLE LOCAL-FIRST STORAGE + SYNC

## Difficulty

**9/10**

## Problem

The app is useless if a user entrusts years of memories to it and a device failure loses them.

We need to support:

```text
OFFLINE CAPTURE
+
LOCAL DURABILITY
+
PENDING ENRICHMENT
+
BACKUP
+
SYNC
+
NEW DEVICE RESTORE
```

without duplicates, corruption or silent conflict.

## Main risks

- media/database consistency
- app crash during capture
- schema migrations
- duplicate writes
- partially uploaded media
- sync conflict
- device replacement
- account recovery
- storage cost

## Victory condition

A memory survives app close, crash, offline state, retry, backup and phone replacement.

This is likely the hardest pure engineering problem of V1.

---

# BIG PROBLEM 3 — TRUST: PRIVACY + CORRECT CONTEXT

## Difficulty

**9/10**

## Problem

The app can eventually know:

- what the user photographed
- exact or approximate location
- date/time
- music
- people
- activities
- voice notes
- inferred emotional/contextual signals

That combination is more sensitive than a normal photo library.

At the same time, contextual AI can be wrong.

The product must therefore avoid two failure modes:

### Surveillance-like product behavior

Collecting more than required, storing ambient conversation, exposing home/private places or sending sensitive data to third parties without clear value.

### Fabricated autobiography

AI interpreting a scene incorrectly and silently converting an inference into “what happened”.

## Existing protection already designed

- provenance
- confidence
- human correction precedence
- no persistent ambient conversation by default
- local-first direction
- biometrics excluded from v0.1
- unknown values allowed

## Still required

- encryption
- secrets handling
- account/sync privacy model
- export/delete implementation
- private-place rules
- analytics boundaries
- model/provider data-flow review
- production permission UX

## Victory condition

A user can understand and control what is captured, inferred, stored, synced, corrected and deleted.

---

# 5. WHAT TO ATTACK NOW

## ATTACK 01 — Finish Pixel preflight when user has time

No urgency or false blocker: the user is working on other projects.

When available:

- allow microphone permission
- rerun device preflight
- confirm `microphone: true`
- capture safe report
- determine model / Android version if exposed or manually supplied

This is the **only pending user action from the current preflight phase**.

---

## ATTACK 02 — Native Android skeleton

Build the real application foundation:

```text
KOTLIN
+
CAMERAX
+
LOCATION
+
LOCAL REPOSITORY
+
PROVIDER INTERFACES
```

Do not wait for advanced AI.

---

## ATTACK 03 — Real MusicIdentityProvider

Primary target:

`ShazamKit Android`

Acceptance:

- known commercial song recognised from ambient playback
- title / artist captured
- identifiers retained
- match offset retained if exposed
- raw audio buffer discarded by default
- timeout / no-match are valid outcomes

Known test example:

`BESO — ROSALÍA & Rauw Alejandro`

Do not put any private address/coordinates into public fixtures.

---

## ATTACK 04 — Durable local Memory Object

Before cloud sync:

- create local DB
- persist memory immediately on click
- persist photo reference
- persist pending enrichment state
- reopen app
- verify memory still exists

This is required to call Proof 01B meaningful.

---

## ATTACK 05 — Native Proof Matrix

Run a small real-device matrix:

### Music conditions

- clean speaker
- low volume
- conversation over music
- TV
- car
- outside / noisy
- no song

### Permissions

- all allowed
- microphone denied
- location denied
- both denied

### Connectivity

- good network
- poor network
- offline at shutter

### Metrics

- shutter → local save
- music match latency
- location latency / accuracy
- recognition success rate
- failure rate

Only after this matrix should the Proof of Magic be declared technically proven.

---

# 6. AFTER THE NATIVE PROOF

Attack in this order:

```text
1. STORAGE HARDENING
2. REAL RELIVE
3. PRIVACY / SECURITY V1
4. BACKUP / SYNC / RESTORE
5. SOUND MEMORY MAP
6. SONG / MEMORY GRAPH UI
7. CONTEXT VISION
8. RESURFACING
9. MEMORY FILMS
10. LIFE SOUNDTRACK
```

This order intentionally puts durability and trust before spectacular features.

---

# 7. CURRENT PROGRESS ESTIMATE

These are planning estimates, not claims of production readiness.

## Product / architecture

**~70–85% defined**

Strong conceptual and architectural foundation.

## Proof of Magic

**~45–55%**

Because the domain, UX, device preflight and architecture exist, but native song recognition + persistence are still missing.

## Commercial V1

**~20–25% overall**

The difficult mobile/storage/security work remains.

## Full product vision

**~10–15%**

The long-term vision includes advanced Relive, Maps, Graph UX, resurfacing, Memory Films and Life Soundtrack.

---

# 8. REPOSITORY ADVANTAGE

Our existing repository library gives a real advantage, especially in:

- music/beat analysis patterns
- audio-reactive image experiments
- place + music experiences
- browser audio/video composition
- programmatic video rendering
- future Memory Films
- computer vision references

Important distinction:

> **Repositories reduce R&D and implementation time. They do not mean those features are already production-integrated in Recuerdos Sonoros.**

The main unresolved work remains native capture, durable storage/sync and trust/security.

---

# 9. ACTIVE CHANGE MAP

At this snapshot:

```text
PR #1  FOUNDATION 01 — Product OS
PR #2  FOUNDATION 02 — Memory Object / Capture Engine / Trust
PR #3  PROOF 01A — Experience Simulator
PR #5  FOUNDATION 03 — Memory Graph Foundation
PR #6  PROOF 01B — Android Pixel Native Path / Device Preflight
```

All remain reviewable/draft work; `main` is still the approved baseline rather than a claim that every branch is production-ready.

---

# 10. NEXT DECISION GATE

The next major gate is not “add more features”.

It is:

# CAN THE PIXEL CAPTURE A REAL MOMENT END-TO-END?

Required demonstration:

```text
REAL PHOTO
+
REAL TIMESTAMP
+
REAL GPS
+
REAL AMBIENT SONG ID
+
LOCAL MEMORY OBJECT
+
APP RELAUNCH
+
RELIVE
```

If this works reliably, the central technological risk drops substantially.

Then the project moves from **feasibility proof** into **product hardening and differentiation**.

---

# Canonical rule from this point

Do not confuse:

- **documented** with implemented;
- **implemented abstraction** with real provider integration;
- **browser/device preflight** with native proof;
- **synthetic simulator** with real capture;
- **repository capability** with integrated production code.

Status reporting must remain explicit about those differences.