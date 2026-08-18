# RECUERDOS SONOROS — CAPABILITY MAP

## Purpose

This document maps the capabilities required by the product, identifies current candidate technologies and reusable repositories, and now also records the **validated / implemented / pending** state of each capability.

The goal is not to copy entire repositories. The goal is to understand which capabilities already exist, where they should be reused, and where Recuerdos Sonoros needs original product logic.

> Status snapshot: **18 August 2026**.

---

## Status vocabulary

- `IMPLEMENTED` — code exists in this repository for the capability or contract.
- `VALIDATED` — exercised on a real device / real runtime for the stated scope.
- `PARTIAL` — meaningful implementation or validation exists, but production requirements are not yet met.
- `PENDING PROOF` — architecture selected, but the real capability has not yet been proven.
- `RESEARCH / FUTURE` — useful, but not on the immediate critical path.

---

## 1. Capture Layer

### Required capabilities

- High-performance mobile photo capture
- Optional short-form video capture
- Microphone sampling for music recognition
- Simultaneous timestamp and GPS acquisition
- Permission handling
- Low-friction UX

### Current platform decision

**Primary Proof of Magic device: Google Pixel / Android.**

**Primary native path:**

- Kotlin
- CameraX
- Android location APIs / fused location provider
- ShazamKit Android behind `MusicIdentityProvider`
- local-first persistence behind a repository interface

React Native VisionCamera remains a future cross-platform candidate, but it is **not** the current Proof 01B foundation.

### Existing Juanma repository references

- `Juanmaes83/camerax`
- `Juanmaes83/webcam-audio-visualizer` — reference only; concept for camera + audio reactive media
- `Juanmaes83/esp32-mini-oled-webcam-stream-mediapipe` — research reference for media stream + MediaPipe patterns

### Real-device preflight status

Browser preflight on the physical Pixel has already demonstrated:

- `camera: true` — **VALIDATED in browser preflight**
- `location: true` — **VALIDATED in browser preflight**
- reported location accuracy around `22 m` in that test
- `microphone: false / NotAllowedError` — **PENDING USER RETEST after permission change**

Important: browser validation proves device/browser capability. It does **not** replace the native CameraX + native location + native microphone proof required for production.

### Status

`PARTIAL — Android path selected; camera/GPS preflight validated; microphone retest pending; native implementation pending.`

---

## 2. Music Identity Layer

### Required capabilities

- Recognise ambient commercial music from a short microphone sample
- Return track identity and metadata
- Return / preserve match offset when exposed by the provider
- Record confidence / failure state
- Preserve service-independent identifiers where possible

### Primary candidate

**ShazamKit Android**

Reason: production-grade ambient recognition and direct fit with the product's defining capture experience.

### Alternative / fallback candidates

- AudD
- ACRCloud
- Chromaprint + AcoustID
- Panako

### Current status

- provider abstraction: **IMPLEMENTED**
- browser preflight: explicitly reports `ShazamKit not connected`
- native ShazamKit adapter: **PENDING PROOF**
- known real test track planned: `BESO — ROSALÍA & Rauw Alejandro`

### Rule

Recognition infrastructure is not product differentiation. Prefer reliable external capability over creating our own fingerprint catalogue.

---

## 3. Music Intelligence Layer

### Required capabilities

Beyond knowing the track identity, future versions may analyse:

- BPM / tempo
- beat positions
- energy
- spectral features
- musical sections
- embeddings / similarity
- audio-reactive parameters

### Candidate technologies

- Essentia / Essentia.js — subject to commercial licensing review
- Web Audio API
- Native DSP where required

### Existing Juanma references

- `Juanmaes83/VisionCutterMusic` — BPM detection, beat synchronisation and scene pacing
- `Juanmaes83/beatdriver` — Web Audio API, BPM, recording/playback patterns
- `Juanmaes83/audioptix` — local music playback, metadata, artwork and live visualisation

### Current status

`RESEARCH / FUTURE — not required to prove the first real capture loop.`

---

## 4. Vision Intelligence Layer

### Required capabilities

Optional contextual inference from captured media:

- scene classification
- number of people
- object categories
- body / pose / gestures where useful
- visual embeddings
- later: user-controlled people clustering

### Candidate foundation

- Google MediaPipe / Google AI Edge
- on-device vision models where viable

### Existing Juanma references

- `Juanmaes83/computer-vision-skills`
- `Juanmaes83/vision-ai-checkup`
- `Juanmaes83/supervision`
- `Juanmaes83/inference`
- `Juanmaes83/Real-time-hand-gesture-recognition`

### Product rule

Automated inference must always carry provenance/confidence and must never silently rewrite the user's memory as fact.

### Current status

Provider contract exists in the enrichment architecture, but a production vision provider is **not connected yet**.

`PENDING PROOF`.

---

## 5. Place & Context Layer

### Required capabilities

- GPS coordinates
- reverse geocoding
- recognised place / POI
- map browsing
- timezone
- optional weather at capture time

### Existing Juanma reference — HIGH VALUE

`Juanmaes83/places-have-sound`

Relevant reusable concepts:

- place + image + sound data model
- place-specific playback experience
- deep links to track + time
- listening state
- immersive place transitions
- visual metaphor connecting location and music

### Current status

- browser geolocation on Pixel: **VALIDATED**
- native Android `LocationProvider`: interface **IMPLEMENTED**, adapter **PENDING**
- reverse geocoding / POI: **PENDING**
- Sound Memory Map: **FUTURE PROOF**

---

## 6. Memory Object / Data Layer

### Canonical object

The product now has a versioned Memory Object connecting:

```text
what you saw
+
what you heard
+
where you were
+
who you were with
+
what was happening
+
how it felt
+
provenance / confidence / privacy
```

### Implemented assets

- `docs/04_MEMORY_OBJECT_SPEC.md`
- `schemas/memory-object.schema.json`
- strict TypeScript domain types
- capture envelope creation
- invariants
- fixtures
- human correction precedence
- explicit partial/failure states

### Core rule

**UNKNOWN IS VALID. INVENTED IS NOT.**

A memory remains valid when song identification fails, location permission is denied, or contextual inference is unavailable.

### Current status

`IMPLEMENTED — foundation complete enough for native proof integration.`

Production persistence, migrations, backup and sync remain pending.

---

## 7. Enrichment / Provider Layer

### Implemented provider abstractions

- `MusicIdentityProvider`
- `LocationProvider`
- `SemanticPlaceProvider`
- `SceneAnalysisProvider`
- `MusicAnalysisProvider`

### Implemented behavior

- independent enrichment jobs
- partial results remain valid
- provenance retained
- user-confirmed evidence cannot be silently overwritten by later AI inference

### Current status

`IMPLEMENTED as architecture/domain engine; real native providers still pending.`

---

## 8. Reliving / Audio-Reactive Experience Layer

### Required capabilities

- synchronized photo + music context
- subtle audio-reactive visuals
- transitions between memories
- waveform / song position interfaces
- immersive fullscreen playback

### Existing Juanma references

- `AudioBasedImageDistortion`
- `webcam-audio-visualizer`
- `Reaktion`
- `audioptix`
- `places-have-sound`

### Current implementation

`PROOF 01A` provides a navigable browser simulator demonstrating:

`CAMERA → CLICK → MEMORY SAVED → PROGRESSIVE ENRICHMENT → RELIVE`

All music/location/context values in that simulator are synthetic and must not be confused with native validation.

### Current status

`PARTIAL — UX proof exists; emotionally meaningful real-media relive engine still pending.`

---

## 9. Media Processing Layer

### Existing Juanma repository — HIGH VALUE

`Juanmaes83/core-BROWSER-VIDEO`

Diffusion Studio Core provides useful patterns for:

- image/audio/video timelines
- layers
- transitions
- masks
- keyframes
- effects
- captions
- audio ramps
- WebCodecs hardware acceleration

### Underlying / adjacent candidate

- Mediabunny

### Current status

`RESEARCH / STRONG CANDIDATE — not on Proof 01B critical path.`

---

## 10. Automatic Memory Film Layer

### Existing Juanma references

- `VisionCutterMusic` — BPM / beat-to-scene / automated scene patterns
- `remotion` — deterministic programmatic video rendering
- `core-BROWSER-VIDEO` — preview/editing patterns

### Current status

`FUTURE — source capabilities identified, product implementation not built.`

---

## 11. Memory Graph / Retrieval Layer

### Model

```text
SONG ↔ MEMORY ↔ PERSON ↔ PLACE ↔ EVENT ↔ PERIOD
```

### Implemented foundation

A separate branch / PR already contains:

- `queryMemories()`
- `groupConnections()`
- `findRelatedMemories()`
- explainable relationship scoring
- tests around song/place/related memories

This unlocks future experiences such as:

- all memories connected to one song
- all memories in one place
- recurring songs
- related memories
- Sound Memory Map
- Life Soundtrack

### Current status

`PARTIAL / FOUNDATION IMPLEMENTED — UI and production persistence not yet connected.`

---

## 12. Privacy / Trust Layer

### Sensitivity

The combined dataset can reveal:

- where a user was
- when
- with whom
- what they listened to
- what they photographed
- emotional/contextual signals

### Implemented product rules

- local-first capture principle
- progressive permissions
- provenance/confidence
- human correction wins
- raw ambient conversations are not persisted by default
- no phone number, exact residential address, private coordinates, secrets or developer tokens in the public repository
- biometric identity / face recognition excluded from v0.1
- export/delete treated as product requirements

### Current status

`ARCHITECTURE IMPLEMENTED; production encryption, cloud model, account recovery and compliance work pending.`

---

# Current Best-in-Family Map — 18 August 2026

| Capability | Primary Candidate / Decision | Existing Juanma Source | Current status |
|---|---|---|---|
| Android capture | **Native Kotlin + CameraX** | `camerax` | Pixel camera browser preflight VALIDATED; native pending |
| Location | **Native Android location** | — | Pixel browser GPS VALIDATED; native adapter pending |
| Microphone | Native Android audio | audio/webcam refs | Permission retest PENDING |
| Song recognition | **ShazamKit Android** | — | provider abstraction implemented; native proof pending |
| Open fingerprint fallback | Chromaprint/AcoustID | — | Research |
| Music analysis | Essentia/native DSP | `VisionCutterMusic`, `beatdriver` | Future / license + proof |
| Vision context | MediaPipe / on-device | vision family | provider contract implemented; real provider pending |
| Place/sound UX | Original | `places-have-sound` | Reuse concepts |
| Memory Object | **Original product core** | — | **IMPLEMENTED** |
| Enrichment engine | **Original provider architecture** | — | **IMPLEMENTED with simulated providers** |
| Proof UX | Original | repo prototype | **PROOF 01A implemented** |
| Memory Graph | Relational-first | — | **Foundation implemented in PR #5** |
| Audio-reactive photo | Original WebGL | `AudioBasedImageDistortion` | R&D |
| Browser media engine | Diffusion Studio Core | `core-BROWSER-VIDEO` | Strong future candidate |
| Final memory films | Remotion | `remotion`, `VisionCutterMusic` | Strong future candidate |
| Privacy/trust model | Original | — | Architecture implemented; production hardening pending |

---

# Adoption rule

A repository or library enters production only if it passes all of these checks:

1. **Product relevance** — materially improves the user experience or reduces risk/time.
2. **Maintenance** — sufficiently current for its role.
3. **License** — commercially compatible with our intended distribution.
4. **Privacy** — data flow is understood and acceptable.
5. **Integration cost** — cheaper/safer than implementing the capability ourselves.
6. **Replaceability** — critical product data is not trapped in one vendor-specific format.
7. **Proof** — capability is validated in a small technical spike before broad adoption.

---

# Immediate capability priority

Do not expand into films, advanced AI or social features until the defining native loop is proven:

```text
REAL CAMERA
+
REAL MICROPHONE
+
REAL MUSIC ID
+
REAL GPS
+
LOCAL MEMORY OBJECT
+
RELAUNCH / RELIVE
```

That is the current highest-value technical proof.