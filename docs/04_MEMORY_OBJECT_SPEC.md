# MEMORY OBJECT v0.1

Status: DRAFT FOUNDATION 02

## Purpose

A Memory Object is the canonical, versioned representation of one captured human moment in Recuerdos Sonoros.

It must preserve not only *what was captured*, but also *how we know it*, *how confident we are*, *whether the user confirmed it*, and *what may be safely used to reconstruct the moment later*.

Core thesis:

> A memory is not a photo with metadata. It is a multimodal event with provenance.

## The six human dimensions

Every Memory Object should be able to answer, where evidence exists:

1. **What you saw**
2. **What you heard**
3. **Where you were**
4. **Who you were with**
5. **What was happening**
6. **How you felt**

The system must never pretend that inferred data is observed fact.

## Capture contract

The capture interaction should feel like one action:

`OPEN CAMERA -> POINT -> CLICK -> MEMORY CREATED`

At click time, the application should freeze a capture envelope containing:

- still image or selected key frame;
- wall-clock timestamp;
- timezone;
- device location if granted;
- short rolling audio recognition window if granted;
- recognition result and song position when available;
- basic image/scene inference when available;
- device/context signals available under permission;
- the provenance and confidence of every derived field.

Enrichment can continue after the shutter event. The user must not have to wait for all inference to complete before the memory exists.

## Identity

Required fields:

- `id`: globally unique memory identifier;
- `schemaVersion`: semantic data-contract version;
- `createdAt`: server or authoritative creation timestamp;
- `capturedAt`: instant the user pressed capture;
- `timezone`: IANA timezone when known;
- `ownerId`: account/local vault owner identifier;
- `captureSessionId`: groups sensor/inference events generated around one shutter action.

## Visual evidence — WHAT YOU SAW

`visual.primaryAsset`

- asset id;
- type: photo/video/keyframe;
- local/cloud URI abstraction;
- width/height;
- orientation;
- capture device source;
- content hash;
- EXIF subset if retained;
- privacy state.

`visual.scene`

Potential structured descriptors:

- environment: beach, street, home, concert, restaurant, forest...;
- entities/objects: sea, glasses, table, dog, car...;
- people count;
- lighting: sunset, night, indoor warm, daylight...;
- weather-visible signals;
- activity signals;
- aesthetic descriptors that are useful for retrieval, never treated as objective truth.

Example:

```json
{
  "environment": [{"value": "beach", "confidence": 0.94}],
  "objects": [
    {"value": "sea", "confidence": 0.98},
    {"value": "drinks", "confidence": 0.81}
  ],
  "peopleCount": {"value": 3, "confidence": 0.96},
  "lighting": [{"value": "sunset", "confidence": 0.89}]
}
```

## Audio evidence — WHAT YOU HEARD

`audio.identifiedMusic`

- provider: ShazamKit / fallback provider;
- providerMatchId;
- title;
- artist;
- album when available;
- ISRC when available;
- artwork reference;
- external streaming identifiers/URIs;
- `matchedAt`;
- `trackPositionMs`: estimated position in the recording at capture;
- recognition confidence/provider quality signal where exposed.

`audio.analysis`

Optional musical descriptors:

- BPM/tempo;
- beat position;
- bar position;
- energy;
- spectral descriptors;
- sections if confidently available;
- semantic descriptors if derived by ML.

The app must not store copyrighted full-track audio unless explicitly licensed. The canonical object should store identity, timing and authorized playback references.

`audio.ambient`

Optional user-owned short ambient recording or derived descriptors, subject to explicit consent and retention policy.

## Place — WHERE YOU WERE

`place.location`

- latitude;
- longitude;
- horizontal accuracy;
- altitude when useful;
- source;
- observedAt.

`place.semantic`

- venue/place id;
- venue/place name;
- category;
- locality;
- region;
- country;
- reverse-geocoder provider;
- confidence/distance.

Important: GPS coordinates and semantic place are separate facts. “La Mata” may be inferred from coordinates; “the exact café terrace” may require stronger evidence or user confirmation.

## People — WHO YOU WERE WITH

`people`

Each entry can represent:

- known contact/user;
- user-confirmed person;
- face cluster that has not been named;
- generic count-only presence.

Fields may include:

- `personId`;
- display name;
- relationship label, user-authored only unless explicitly inferred by a future opt-in system;
- face cluster id;
- presence confidence;
- confirmation state.

Face embeddings, if ever used, are sensitive biometric data and require a separate privacy decision. They are not assumed in v0.1.

## Event/activity — WHAT WAS HAPPENING

`event`

Potential fields:

- activity labels: dinner, swimming, walking, concert, birthday...;
- event title;
- linked calendar event when explicitly permitted;
- trip/album membership;
- user note;
- voice note transcript;
- machine-generated summary.

A generated sentence such as “A summer evening on La Mata beach with friends” is a **presentation layer synthesis**, not the source of truth. It must remain reconstructible from evidence fields.

## Emotion — HOW YOU FELT

Emotion is especially sensitive and easy to overclaim.

`emotion`

Separate:

- `selfReported`: explicit user choice/text/voice;
- `signals`: weak contextual or aesthetic descriptors;
- `summary`: optional synthesized label.

The product must never present facial-expression inference as definitive internal emotion.

Allowed example:

```json
{
  "selfReported": null,
  "signals": [
    {"value": "warm", "confidence": 0.72, "source": "scene-model"},
    {"value": "social", "confidence": 0.83, "source": "scene-model"},
    {"value": "positive", "confidence": 0.61, "source": "scene-model"}
  ]
}
```

UI language should communicate that these are signals/suggestions, not facts about the user’s mental state.

## Provenance model

Every inferred or externally resolved value should support:

- `value`;
- `source`;
- `sourceType`: observed | provider | inferred | user;
- `confidence` where meaningful;
- `observedAt`/`derivedAt`;
- `modelVersion` or provider version when available;
- `userState`: untouched | confirmed | corrected | rejected.

This is mandatory infrastructure for trust and future model upgrades.

## Example — Coldplay / Yellow

```json
{
  "schemaVersion": "0.1.0",
  "capturedAt": "2026-08-17T21:31:00+02:00",
  "timezone": "Europe/Madrid",
  "audio": {
    "identifiedMusic": {
      "title": "Yellow",
      "artist": "Coldplay",
      "trackPositionMs": 107000,
      "provider": "shazamkit"
    },
    "analysis": {
      "tempoBpm": 87
    }
  },
  "place": {
    "semantic": {
      "name": "La Mata",
      "category": "beach"
    }
  },
  "visual": {
    "scene": {
      "peopleCount": {"value": 3, "confidence": 0.96},
      "objects": ["sea", "drinks"],
      "lighting": ["sunset"]
    }
  },
  "emotion": {
    "signals": ["warm", "social", "positive"]
  }
}
```

## Memory lifecycle

A Memory Object can move through:

1. `captured` — immutable shutter envelope exists;
2. `enriching` — asynchronous providers/models are adding evidence;
3. `ready` — minimum reconstruction contract is satisfied;
4. `edited` — user has added/corrected data;
5. `archived` — hidden from normal resurfacing;
6. `deleted` — deletion workflow initiated/completed.

The original capture timestamp and raw provenance history must not be silently rewritten by enrichment.

## Minimum viable Memory Object

For Proof of Magic, only these are required:

- id;
- capturedAt;
- primary photo;
- music recognition result or explicit `no_match`;
- location result or explicit `permission_denied/unavailable`;
- provenance/status;
- local persistence.

Scene intelligence, people, mood, weather and films are additive modules, not blockers.

## Invariants

1. A memory exists even if song recognition fails.
2. A memory exists even if location permission is denied.
3. Unknown is a valid state; invented data is not.
4. Inference never overwrites user-confirmed truth.
5. Raw copyrighted music is not required to reconstruct the memory.
6. Every sensitive capability must degrade gracefully when permission is absent.
7. Capture must remain faster than enrichment.
8. Schema migrations must be versioned.

## Next implementation targets

- machine-readable JSON Schema;
- TypeScript domain types;
- validation tests;
- capture state machine;
- provenance utilities;
- synthetic fixtures for successful, partial and failed memories.
