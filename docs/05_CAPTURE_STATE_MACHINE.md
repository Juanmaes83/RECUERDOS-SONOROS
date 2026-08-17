# CAPTURE STATE MACHINE v0.1

Status: FOUNDATION 02

## Objective

Make the shutter action fast, reliable and independent from slow enrichment.

The user must be able to create a memory even when music recognition, location, network or AI enrichment fails.

## High-level flow

```text
IDLE
  ↓
CAMERA_READY
  ↓
ARMING_CONTEXT
  ↓
CAPTURE_PRESSED
  ↓
CAPTURE_ENVELOPE_COMMITTED
  ↓
ENRICHING ───────────────┐
  │                      │
  ├─ music               │
  ├─ location            │
  ├─ semantic place      │
  ├─ vision              │
  ├─ tempo               │
  └─ optional context    │
  │                      │
  └───────────────> READY/PARTIAL
```

## Principle: pre-arm before click

Where platform permissions and energy policy allow it, the app should begin collecting *ephemeral* context just before the shutter:

- camera preview frames;
- rolling audio fingerprint window for recognition;
- recent location fix;
- current clock/timezone.

This increases the chance that the captured song position and place correspond closely to the actual shutter instant.

No pre-armed ephemeral data should become a persistent memory unless the user captures or explicitly asks to retain it.

## States

### `idle`

No active camera session.

### `requesting_permissions`

Permission prompts may include camera first, microphone/location only when the relevant capability is activated.

Do not request every permission on first launch without context.

### `camera_ready`

Preview is visible and a still can be captured immediately.

### `arming_context`

Optional asynchronous preparation:

- location refresh;
- audio recognition session start;
- clock/timezone snapshot;
- device orientation;
- exposure/light metadata if exposed by platform.

The shutter remains usable.

### `capture_pressed`

Freeze the canonical `capturedAt` timestamp immediately.

This timestamp is the synchronization anchor for all context.

### `capture_envelope_committed`

Persist the minimum viable object locally before depending on network enrichment.

Required outcome:

- memory id;
- capture session id;
- photo asset reference;
- capturedAt;
- current permission/result states for audio and place.

Once this state is reached, the product can honestly tell the user the memory has been saved.

### `enriching`

Run independent jobs. No one enrichment provider should block another.

Suggested jobs:

- `music_identity`;
- `track_position`;
- `reverse_geocode`;
- `semantic_place`;
- `scene_analysis`;
- `music_analysis`;
- `weather_context` (future);
- `calendar_context` (future opt-in).

### `ready`

Core enrichment finished successfully enough to render a rich memory.

### `partial`

Some modules failed/denied/timed out, but the memory is valid and usable.

This is a normal state, not an exception.

### `edited`

User has confirmed, corrected or enriched one or more fields.

## Job result model

Each enrichment job returns one of:

```text
success
no_match
permission_denied
unavailable
timeout
error
cancelled
```

A provider error should be retained as operational telemetry, not surfaced as false content.

## Synchronization window

Every sensor/provider observation should retain an observation time.

For a shutter at `T0`, enrichment quality can be ranked by distance from the shutter:

```text
|observationTime - T0|
```

Examples:

- music fingerprint spans T0 - 3s to T0 + 4s;
- GPS observed at T0 - 1.2s;
- reverse-geocoder derived after T0 but from the GPS fix;
- scene analysis derived minutes later from the captured still.

Derivation time and observation time are different concepts.

## Offline behavior

Offline capture must remain possible.

Local envelope persists immediately. Provider jobs that need network become queued.

When connectivity returns:

- rerun only jobs whose source evidence is still available;
- never alter `capturedAt`;
- preserve previous failure attempts in telemetry/audit history where useful;
- avoid retaining raw ambient audio indefinitely just to retry identification.

## UX states

Immediately after click:

1. show captured image;
2. confirm `Memory saved` once local commit succeeds;
3. show lightweight chips progressively resolving:

```text
♪ Identifying song…
⌖ Finding place…
✦ Understanding scene…
```

Resolved example:

```text
♪ Yellow — Coldplay · 01:47
⌖ La Mata
☼ Sunset
3 people · sea · drinks
```

Do not make the user stare at a blocking spinner.

## Failure UX

Examples:

- `No song matched — add one later`
- `Location unavailable`
- `Microphone off — photo saved anyway`

No alarming technical error language for expected partial states.

## Capture latency budget

Target product behavior:

- shutter response: perceived immediate;
- local memory envelope: sub-second where device storage permits;
- external recognition/enrichment: asynchronous;
- relive-ready rich object: seconds, not a prerequisite for capture completion.

Exact budgets must be measured on real devices in PROOF 01.

## Instrumentation

Capture proof should measure:

- camera-ready latency;
- shutter-to-local-save latency;
- music match latency;
- location fix age at shutter;
- semantic-place latency;
- total enrichment completion;
- partial/failure reason rates;
- permission denial rates;
- memory abandonment/deletion after capture.

## Acceptance criteria for PROOF 01

A physical phone can:

1. open camera;
2. capture a still;
3. commit a local Memory Object immediately;
4. identify a nearby song when possible;
5. attach song position when provider exposes it;
6. attach current coordinates when permitted;
7. render the resulting memory;
8. remain valid if music or location fails.
