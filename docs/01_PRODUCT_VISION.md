# RECUERDOS SONOROS — PRODUCT VISION

## 1. Product definition

Recuerdos Sonoros is a multimodal personal memory application that captures a meaningful instant and reconstructs it later through the combination of image, music, place, time and human context.

It must not be reduced to “photos with music”. The product thesis is broader:

> **Capture the audiovisual signature of a moment so it can be relived, connected and rediscovered later.**

## 2. Human insight

A photograph often restores what a moment looked like. A song can restore how that moment felt.

The strongest product value comes from binding those signals at the moment of capture, before memory degrades and without forcing the user to manually document everything.

## 3. Core interaction

The primary gesture is intentionally simple:

> **Open → capture → continue living.**

The system should automatically collect as much context as permissions and privacy rules allow. Enrichment happens after capture, never before it blocks the moment.

### Core loop

`CAPTURE → RECOGNISE → ENRICH → STORE → RELIVE`

### Capture target

A `Memory Object` may contain:

- Photo
- Short video (future / optional)
- Song identity
- Artist
- Album / artwork reference
- Approximate timestamp within the song where technically available
- Capture timestamp
- GPS coordinates
- Human-readable place
- Weather/contextual environmental metadata when useful
- Written note
- Voice note
- People associations
- Activity/event
- User-selected emotion or mood
- Automatically inferred scene/context with confidence and user control

## 4. Memory Object principle

The product must be designed around a structured memory entity rather than around files.

A photo, song ID or note is only one signal. The durable product asset is the relationship between those signals.

Conceptual model:

```text
Memory
├── visual
│   ├── photo
│   └── video
├── sound
│   ├── identified_track
│   ├── track_position
│   └── ambient / voice note (optional)
├── place
│   ├── coordinates
│   └── recognised_place
├── time
├── people
├── activity
├── event
├── emotion
├── note
├── inferred_context
└── provenance / confidence / privacy
```

## 5. Product pillars

### 5.1 Instant Capture

The product must feel as fast as taking a normal photo.

### 5.2 Automatic Context

The system recognises or infers context rather than demanding manual forms.

### 5.3 Musical Identity

Music is not decoration. It is a first-class memory coordinate.

### 5.4 Reliving

Opening a memory should recreate emotional context, not merely display metadata.

### 5.5 Connection

Memories become more valuable when connected across songs, people, places, trips and time.

### 5.6 Privacy by Design

Photos + location + people + music + emotions form an unusually sensitive personal dataset. Local-first and on-device processing should be preferred when technically viable.

## 6. Signature experiences

### A. Capture a Sound Memory

Take a photo while a song is playing. The app identifies the song, saves time and place and creates the memory with minimal interaction.

### B. Relive the Moment

Open the memory later and experience the photo, music and contextual data together.

### C. Sound Memory Map

Browse a map of places in the user’s life and hear/see which memories and songs belong there.

### D. Song as Memory Coordinate

Search a song and reveal every memory in which it appears.

Example:

`Heroes — David Bowie → Berlin 2024 → Alicante 2026 → London 2028`

### E. Personal Memory Graph

Connect:

`SONG ↔ MEMORY ↔ PERSON ↔ PLACE ↔ EVENT ↔ PERIOD`

### F. Memory Films

Generate an audiovisual film from selected memories, synchronized to music and structured around a trip, summer, person, year or life period.

### G. Life Soundtrack

Reveal the musical history of the user’s life: recurring tracks, artists, eras, people and places.

## 7. Product differentiation

The defensible direction is not “Shazam + camera”. Recognition is infrastructure.

Differentiation should come from:

1. Capture of multimodal context at the precise instant.
2. Structured Memory Objects and relationships.
3. Music as an interface for retrieving memories.
4. Place + sound + image as a navigable autobiographical map.
5. Audio-reactive reliving experiences.
6. Automatic audiovisual storytelling from the user’s own memory graph.
7. Privacy-aware personal memory intelligence.

## 8. Product boundaries

Recuerdos Sonoros is not initially:

- A general social network.
- A streaming music service.
- A replacement for Spotify / Apple Music.
- A generic photo editor.
- A professional video editor.
- A music generation DAW.

These capabilities may be integrated where they serve memory capture or reliving, but they are not the core product.

## 9. Initial success criterion — Proof of Magic

The first technical proof succeeds when a real phone can execute this flow reliably:

```text
OPEN CAMERA
↓
MUSIC IS PLAYING
↓
TAKE PHOTO
↓
TRACK IS IDENTIFIED
↓
TIME + LOCATION ARE STORED
↓
MEMORY CARD IS CREATED
↓
OPEN CARD
↓
PHOTO + SONG + PLACE + TIME ARE RELIVED TOGETHER
```

This is the first non-negotiable product milestone.

## 10. Long-term vision

The long-term system should be able to answer requests such as:

- “Show me every memory associated with this song.”
- “What were we listening to during our trip to Italy?”
- “Show me happy summer memories with Marta.”
- “Make a film of all the trips I took with my father.”
- “What songs defined my twenties?”

At that point Recuerdos Sonoros becomes more than a photo application:

> **a personal multimodal memory graph with music as one of its strongest emotional indexes.**
