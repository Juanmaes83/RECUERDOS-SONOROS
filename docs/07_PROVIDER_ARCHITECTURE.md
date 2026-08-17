# PROVIDER ARCHITECTURE v0.1

Status: FOUNDATION 02

## Goal

Recuerdos Sonoros must not couple the product model to one recognition vendor, map vendor, vision model or rendering engine.

The Memory Object is canonical. Providers are replaceable adapters.

## Provider families

### Music identity

Primary target: ShazamKit.

Contract output:

- match status;
- provider id;
- title/artist/album;
- provider match id;
- track position when exposed;
- artwork/external service identifiers where permitted.

Fallback candidates can be evaluated later without changing the Memory Object.

### Location

Primary target: native device location API.

Contract output:

- availability state;
- coordinates;
- horizontal accuracy;
- observed timestamp;
- source.

### Semantic place

Reverse geocoding and place resolution are distinct from GPS capture.

The provider may change by platform, cost, privacy or quality.

### Scene analysis

Primary product preference: on-device where quality is sufficient.

Output remains weak evidence, never human truth.

### Music analysis

Optional module for tempo, energy and beat-aware experiences.

This module must not block the core memory capture.

## Fallback policy

A fallback is only activated when it improves a documented failure state.

Examples:

- song recognition provider returns `no_match`;
- provider unavailable by platform/region;
- network unavailable;
- rate/cost threshold exceeded;
- licensing decision prevents commercial reuse.

Do not chain expensive providers merely to increase apparent completeness.

## Provider selection criteria

Every provider decision should be scored on:

1. user-visible quality;
2. latency;
3. offline/on-device capability;
4. privacy;
5. platform coverage;
6. licensing/commercial use;
7. cost at 1k / 10k / 100k memories;
8. operational complexity;
9. lock-in;
10. quality of IDs/metadata returned.

## Anti-corruption layer

Provider-specific SDK objects must stop at adapter boundaries.

Example:

```text
ShazamKit SDK object
        ↓
ShazamMusicIdentityAdapter
        ↓
MusicMatch
        ↓
Memory Object
```

The rest of the product must not know ShazamKit classes.

## Timeouts

Every network/model provider needs a budget and cancellation path.

Provider timeout must become a job result, not a capture failure.

## Observability

For each provider job measure:

- provider id/version;
- start/end/latency;
- status;
- error class;
- permission state;
- network state where relevant;
- confidence/quality signal where exposed.

Never place raw private image/audio content in general telemetry.

## First proof matrix

| Capability | Primary | Fallback | Proof requirement |
|---|---|---|---|
| Camera | native / mobile camera layer | none | still captured reliably |
| Song identity | ShazamKit | later evaluation | identify ambient song + position |
| GPS | native location | manual place | coordinates around shutter |
| Semantic place | platform geocoder candidate | manual place | human-useful place label |
| Scene | on-device candidate | none/manual | beach/people/objects/lighting |
| Tempo | audio-analysis candidate | metadata/manual | BPM useful for relive/film |

## Rule

No provider is `PRIMARY` because it is fashionable or technically impressive. It becomes PRIMARY only after a measured proof demonstrates that it produces a better Recuerdos Sonoros experience.
