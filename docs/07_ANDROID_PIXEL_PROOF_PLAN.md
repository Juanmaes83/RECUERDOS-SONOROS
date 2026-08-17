# PROOF 01B — Android Pixel Native Proof

Status: IN PROGRESS

## Goal

Validate the real magic on a physical Google Pixel:

`OPEN CAMERA → CLICK → PHOTO + SONG + MATCH OFFSET + GPS → LOCAL MEMORY OBJECT → RELIVE`

## Why Pixel is valid

ShazamKit ships an official Android SDK and supports live microphone audio. CameraX and Android location APIs provide the remaining native capture primitives.

## Primary stack

- Kotlin
- CameraX 1.6.x stable family
- Android runtime permissions
- Android/Fused location provider behind `LocationProvider`
- ShazamKit Android SDK behind `MusicIdentityProvider`
- local persistence behind a repository boundary
- canonical `MemoryObject` contract from FOUNDATION 02

## Device prerequisites to confirm

- exact Google Pixel model
- Android version
- Chrome version for browser preflight
- Android Studio / adb availability on development computer
- USB cable or wireless debugging

## Shazam external prerequisites

The Android Shazam catalog path requires:

- ShazamKit Android AAR
- Apple Media ID
- Apple private key
- generated developer token

Secrets must never be committed to GitHub.

If the Shazam credentials are unavailable, use a temporary `MusicIdentityProvider` fallback for device integration while preserving the provider contract.

## Phase A — browser device preflight

A local-only diagnostic web page validates:

1. rear camera permission and live preview;
2. still-frame capture;
3. geolocation permission and coordinates/accuracy;
4. microphone permission and live level detection;
5. secure-context/browser compatibility.

This phase DOES NOT claim song recognition.

## Phase B — native Android shell

Implement:

- Camera screen
- one-click capture
- `capturedAt` frozen at shutter
- immediate local Memory Object
- asynchronous provider jobs
- persistent memories list
- basic Relive card

## Phase C — ShazamKit adapter

Input:

- PCM 16-bit mono audio buffer/stream

Output:

- title
- artist
- provider media identifiers
- match offset when exposed
- provenance
- confidence/status

Raw ambient audio is ephemeral and discarded after recognition by default.

## Phase D — real acceptance test

Test at least:

- 10 known tracks
- quiet room
- television/speaker playback
- noisy environment
- microphone denied
- location denied
- offline capture
- app relaunch

A known public test track may be `BESO — ROSALÍA & Rauw Alejandro`.

## Privacy

Never commit:

- phone number
- precise residential address
- private coordinates
- raw ambient audio
- Apple private keys
- developer tokens
- API keys

Test fixtures in this public repository use coarse locations or synthetic values only.
