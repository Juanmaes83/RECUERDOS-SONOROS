# PRIVACY AND TRUST ARCHITECTURE v0.1

Status: FOUNDATION 02

## Product position

Recuerdos Sonoros stores an unusually intimate graph of a person’s life: images, music, precise places, people, notes, inferred context and potentially emotion-related signals.

Privacy is therefore a product capability, not a legal appendix.

## Principles

1. **Local-first by default where practical.**
2. **Progressive permissions:** ask for a capability when the user understands why it is needed.
3. **Data minimization:** retain the derived signal when raw sensor material is unnecessary.
4. **No silent surveillance:** ephemeral pre-capture context is discarded unless a memory is created.
5. **Unknown is valid:** denying microphone/location must not break capture.
6. **User truth outranks model inference.**
7. **Sensitive inference is labelled as inference.**
8. **Export and deletion must be real, portable operations.**

## Data classes

### Class A — Core personal content

- photos;
- user videos;
- text notes;
- voice notes;
- user-authored emotion/mood;
- user-created titles/tags.

Default: local-only until sync is explicitly enabled.

### Class B — Context metadata

- capture time;
- timezone;
- GPS coordinates;
- semantic place;
- song identity and track position;
- trip/album membership.

Treat precise location as sensitive even when it appears harmless in isolation.

### Class C — Machine inference

- scene labels;
- objects;
- lighting;
- activity;
- contextual mood signals;
- musical energy/tempo;
- generated summaries.

Every Class C value requires provenance and confidence where meaningful.

### Class D — Highly sensitive / future gated

- face embeddings;
- biometric identity matching;
- relationship inference;
- health signals;
- private calendar analysis;
- contact graph;
- persistent ambient audio.

Class D is not enabled by the v0.1 foundation merely because it is technically possible.

## Permission strategy

### Camera

Required to capture a new visual memory. Explain purpose directly.

### Microphone

Optional. Requested when the user activates “recognise what is playing”. Denial leaves a valid photo memory.

### Location

Optional. Requested when place-aware memories are enabled. Denial leaves a valid memory.

### Photos library

Separate from camera capture. Request only for importing past memories or exporting.

### Contacts / Calendar

Future opt-in modules. Never part of initial permission bundle.

## Ephemeral audio recognition window

Goal: identify the song around the shutter without creating a covert recorder.

Architecture requirement:

- maintain only the minimal rolling buffer/fingerprint needed by recognition;
- discard raw ambient buffer after recognition or short retry window;
- do not persist conversations by default;
- Memory Object stores the song identity/result, not surrounding private speech;
- any future ambient-sound memory mode must be a distinct explicit product action.

## Music rights boundary

The Memory Object should retain identifiers, authorized service links and timing data. It does not require storing the copyrighted master recording.

Playback should be delegated to an authorized music service/account where possible.

## Emotion boundary

A smile is not proof of happiness. Warm light is not proof of nostalgia.

The system must distinguish:

- `selfReported`: user truth;
- `signals`: weak model/context hints;
- `summary`: optional synthesis.

UI must not claim hidden psychological knowledge.

## People and biometrics

V0.1 allows people count and manually attached people.

Named automatic face recognition is postponed until a dedicated decision covers:

- on-device vs cloud processing;
- biometric retention;
- consent model for non-users appearing in photos;
- regional regulation;
- deletion semantics;
- false match handling.

## Storage tiers

### Tier 0 — Local vault

Default target for Proof of Magic.

- local database;
- local media files;
- no account required for earliest spike if that accelerates proof;
- easy wipe/reset during development.

### Tier 1 — Encrypted personal sync

Future V1 capability.

- encrypted transport;
- encrypted storage;
- account recovery design;
- device synchronization;
- clear statement of what server-side processing can see.

### Tier 2 — Shared memory

Explicit share boundary. Never infer that a memory is public because participants are known.

## Provenance and audit

For any model/provider-derived field retain enough metadata to answer:

- who/what produced this value?
- when?
- from which evidence?
- with which model/provider version?
- did the user later confirm/correct/reject it?

This enables safe reprocessing when models improve.

## Deletion

Deletion semantics must eventually cover:

- Memory Object record;
- primary media;
- derivative thumbnails;
- embeddings/indexes;
- generated videos;
- cached provider results;
- shared copies under the product’s control;
- backups according to documented retention policy.

## Export

Long-term trust requires a portable export containing, where rights permit:

- original user-owned media;
- Memory Object JSON;
- notes;
- provider identifiers/links;
- timestamps and locations;
- generated summaries;
- provenance.

The product must not hold a person’s life hostage.

## Security baseline before public beta

- threat model;
- secret/API-key isolation;
- no client-shipped privileged keys;
- encrypted network transport;
- authorization checks for every memory asset;
- secure media URLs;
- deletion tests;
- dependency scanning;
- abuse path review for shared memories;
- telemetry that excludes raw private content unless essential and disclosed.

## Open decisions

1. Native encrypted local database choice.
2. Whether cloud sync is end-to-end encrypted or server-readable for enrichment.
3. Shazam/provider retention and privacy constraints.
4. Map/geocoder provider data policies.
5. On-device scene model selection.
6. Whether a future ambient sound capsule is worth the privacy tradeoff.
