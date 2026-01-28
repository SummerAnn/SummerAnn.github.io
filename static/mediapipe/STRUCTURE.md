# MediaPipe local assets – directory structure

All assets are **version-pinned** from a single release per package. The loader uses **only** these files (no CDN fallback) so the binary graph / WASM / tflite stay in sync and `tempConfig.ParseFromString(binary_graph)` does not fail.

## Pinned versions

| Package | Version | Source |
|--------|---------|--------|
| `@mediapipe/hands` | **0.4.1675469240** | `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/` |
| `@mediapipe/face_mesh` | **0.4.1633559619** | `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/` |
| `@mediapipe/camera_utils` | **0.3.1675466862** | `https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3.1675466862/` |

Do **not** mix files from different versions. To refresh: re-download every file from the URLs above (or `npm pack` that exact version and copy out of the tarball).

## Directory layout

```
static/mediapipe/
├── ASSETS.md
├── STRUCTURE.md
├── camera_utils.js
├── hands/
│   ├── hands.js
│   ├── hands_solution_simd_wasm_bin.wasm
│   ├── hands_solution_simd_wasm_bin.data
│   ├── hands_solution_simd_wasm_bin.js
│   ├── hand_landmark_full.tflite
│   ├── hand_landmark_lite.tflite
│   ├── hands_solution_packed_assets.data
│   ├── hands_solution_packed_assets_loader.js
│   └── hands.binarypb
└── face_mesh/
    ├── face_mesh.js
    ├── face_mesh_solution_simd_wasm_bin.wasm
    ├── face_mesh_solution_simd_wasm_bin.data
    ├── face_mesh_solution_simd_wasm_bin.js
    ├── face_mesh_solution_packed_assets.data
    ├── face_mesh_solution_packed_assets_loader.js
    └── face_mesh.binarypb
```

## Loader behavior

- **Base:** `MEDIAPIPE_BASE = '/static/mediapipe'` (override via `window.MEDIAPIPE_BASE`).
- **Scripts:** Loaded only from `MEDIAPIPE_BASE` (no CDN fallback).
- **WASM / data / tflite:** `locateFile(file)` resolves to `MEDIAPIPE_BASE + '/hands/' + file` or `MEDIAPIPE_BASE + '/face_mesh/' + file`.

If the parse/Check failure goes away and the palm dot and orb/paddle respond to hand/eye motion, the versions are matched correctly.
