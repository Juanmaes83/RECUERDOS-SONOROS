# RECUERDOS SONOROS — CAPABILITY MAP

## Purpose

This document maps the capabilities required by the product and identifies current candidate technologies and reusable repositories.

The goal is not to copy entire repositories. The goal is to understand which capabilities already exist, where they should be reused, and where Recuerdos Sonoros needs original product logic.

---

## 1. Capture Layer

### Required capabilities

- High-performance mobile photo capture
- Optional short-form video capture
- Microphone sampling for music recognition
- Simultaneous timestamp and GPS acquisition
- Permission handling
- Low-friction UX

### Candidate foundations

- Native iOS camera stack
- Android CameraX
- React Native VisionCamera (candidate if cross-platform React Native is selected)

### Existing Juanma repository references

- `Juanmaes83/camerax`
- `Juanmaes83/webcam-audio-visualizer` — reference only; concept for camera + audio reactive media
- `Juanmaes83/esp32-mini-oled-webcam-stream-mediapipe` — research reference for media stream + MediaPipe patterns

### Status

`ARCHITECTURE DECISION PENDING`

---

## 2. Music Identity Layer

### Required capabilities

- Recognise ambient commercial music from a short microphone sample
- Return track identity and metadata
- Record confidence / failure state
- Preserve service-independent identifiers where possible

### Primary candidate

**ShazamKit**

Reason: production-grade music recognition, direct fit for ambient identification, Apple ecosystem integration, Android SDK availability.

### Alternative / research candidates

- AudD
- ACRCloud
- Chromaprint + AcoustID
- Panako

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

This repo is not the product foundation but is a strong conceptual and interaction reference.

---

## 6. Memory Object / Data Layer

### Required capabilities

A canonical structured object connecting:

```text
visual
sound
place
time
people
activity
event
emotion
note
context
provenance
privacy
```

### Original product IP / logic

This layer is central to Recuerdos Sonoros and should be designed specifically for the product rather than inherited from an external repository.

### Candidate infrastructure

- PostgreSQL / Supabase for relational + JSON metadata
- object storage for media
- local database/cache for offline-first capture
- future vector index for semantic retrieval

### Non-negotiable

Every inferred or third-party-derived field should retain:

- source
- timestamp
- confidence where applicable
- user override state

---

## 7. Reliving / Audio-Reactive Experience Layer

### Required capabilities

- synchronized photo + music playback
- subtle audio-reactive visuals
- transitions between memories
- waveform / song position interfaces
- immersive fullscreen playback

### Existing Juanma references

#### `AudioBasedImageDistortion`
Audio-driven WebGL image effects. Valuable as interaction R&D, not architecture foundation.

#### `webcam-audio-visualizer`
Three.js audio/camera experiment. Valuable as concept reference.

#### `Reaktion`
Audio-reactive Unity toolkit. Old; research reference only.

#### `audioptix`
Modern local player + visualizer patterns.

#### `places-have-sound`
Strong reference for place → image → music reliving.

### External candidate

- wavesurfer.js for waveform/scrubbing UI where appropriate

---

## 8. Media Processing Layer

### Required capabilities

- decode / encode
- crop / resize
- audio extraction
- timeline composition
- transitions
- image/video/audio muxing
- browser or server rendering

### Existing Juanma repository — HIGH VALUE

`Juanmaes83/core-BROWSER-VIDEO`

Diffusion Studio Core gives:

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

### Use case

Potential base for in-app preview/edit of generated Memory Films.

---

## 9. Automatic Memory Film Layer

### Required capabilities

Generate films from selected memories by person, place, trip, year, song or period.

### Existing Juanma references

#### `VisionCutterMusic` — HIGH VALUE

Reusable concepts:

- BPM detection
- beat-to-scene synchronisation
- automated scene construction
- image/video generation pipeline patterns
- browser FFmpeg export patterns

#### `remotion` — HIGH VALUE

Programmatic React video generation. Suitable for deterministic templates and server-side rendering.

#### `core-BROWSER-VIDEO`
Useful for browser preview/editing.

### External reference

- OpenCut patterns for music synchronisation and timeline logic

### Architectural direction

Potential split:

```text
PREVIEW / INTERACTIVE EDIT
→ browser media engine

DETERMINISTIC FINAL RENDER
→ Remotion / server rendering
```

---

## 10. Memory Graph / Retrieval Layer

### Future capabilities

- “all memories connected to this song”
- “all memories with this person”
- “music from this trip”
- “summer memories in Alicante”
- “happy memories from my twenties”

### Model

```text
SONG ↔ MEMORY ↔ PERSON ↔ PLACE ↔ EVENT ↔ PERIOD
```

### Potential technology

Start relational. Add graph/vector capabilities only when real query patterns justify them.

### Rule

Do not introduce a graph database simply because the product uses the word “graph”. Validate query complexity first.

---

## 11. Privacy / Trust Layer

### Sensitivity

The combined dataset can reveal:

- where a user was
- when
- with whom
- what they listened to
- what they photographed
- emotional/contextual signals

This can be more revealing than a normal photo library.

### Direction

- local-first where practical
- explicit permissions
- user ownership
- encrypted transport/storage
- export/delete capability
- clear distinction between private and shared memories
- avoid third-party processing where on-device models can reasonably accomplish the task

---

# Current Best-in-Family Map

| Capability | Primary Candidate | Existing Juanma Source | Status |
|---|---|---|---|
| Mobile camera | VisionCamera / native | `camerax` | Evaluate |
| Song recognition | ShazamKit | — | Proof required |
| Open fingerprint fallback | Chromaprint/AcoustID | — | Research |
| Music analysis | Essentia/native DSP | `VisionCutterMusic`, `beatdriver` | License + proof |
| Vision context | MediaPipe | vision family | Evaluate |
| Place/sound UX | Original | `places-have-sound` | Reuse concepts |
| Audio-reactive photo | Original WebGL | `AudioBasedImageDistortion` | R&D |
| Browser media engine | Diffusion Studio Core | `core-BROWSER-VIDEO` | Strong candidate |
| Final memory films | Remotion | `remotion`, `VisionCutterMusic` | Strong candidate |
| Waveform UX | wavesurfer.js | — | Optional |
| Memory Object | Original | — | Core product work |
| Memory Graph | Relational first | — | Future |

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
