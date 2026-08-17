# Proof of Magic — Experience Simulator

This is a deliberately dependency-free prototype of the target capture experience.

## Purpose

Validate the product rhythm before native SDK integration:

```text
CAMERA
  ↓
CLICK
  ↓
LOCAL MEMORY SAVED
  ↓
PROGRESSIVE ENRICHMENT
  ↓
RELIVE
```

The prototype uses synthetic data for the canonical scenario:

- Yellow — Coldplay;
- 01:47 track position;
- La Mata;
- 21:31;
- sunset;
- 3 people;
- sea + drinks;
- warm / social / positive scene signals;
- 87 BPM.

## Important

This prototype does **not** claim that browser code is the production camera architecture and does not perform real song/location/vision recognition.

Its job is to validate:

- one-click capture;
- no blocking form after shutter;
- `Memory saved` before enrichment completes;
- independent context resolution;
- clear distinction between captured fact and inferred context;
- first version of the Relive card.

## Preview

The file is static and can be opened directly or served from any static HTTP server.

For GitHub branch previews, RawGitHack-style static rendering can point to:

`prototype/index.html` on branch `proof/01-experience-simulator`.

## Next native proof

Replace the synthetic adapters with:

1. physical mobile camera;
2. ShazamKit music identity;
3. native GPS;
4. local persistent Memory Object;
5. optional semantic place resolver;
6. scene analysis adapter.

The visual flow should remain essentially unchanged while providers become real.
