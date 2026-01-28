# MediaPipe assets for webcam games

**Version-pinned.** All files must come from the **exact** release listed below. Mixing versions causes `tempConfig.ParseFromString(binary_graph)` to fail and the hand/eye points never feed into the games.

## Pinned versions (use these URLs only)

- **hands:** `@mediapipe/hands@0.4.1675469240`
- **face_mesh:** `@mediapipe/face_mesh@0.4.1633559619`
- **camera_utils:** `@mediapipe/camera_utils@0.3.1675466862`

## Base path (after copy)

- **JS/wasm/tflite root:** `static/mediapipe/`
- **Hands assets:** `static/mediapipe/hands/`
- **Face mesh assets:** `static/mediapipe/face_mesh/`
- **Camera utils:** `static/mediapipe/camera_utils.js`

---

## 1. Camera utils (one file)

| File | Put in | Source |
|------|--------|--------|
| `camera_utils.js` | `static/mediapipe/` | `https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3.1675466862/camera_utils.js` |

---

## 2. Hands (`@mediapipe/hands@0.4.1675469240`)

Put all of these in **`static/mediapipe/hands/`** (same release only):

| File | Source |
|------|--------|
| `hands.js` | `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/hands.js` |
| `hands_solution_simd_wasm_bin.wasm` | `.../hands@0.4.1675469240/hands_solution_simd_wasm_bin.wasm` |
| `hands_solution_simd_wasm_bin.data` | `.../hands@0.4.1675469240/hands_solution_simd_wasm_bin.data` |
| `hands_solution_simd_wasm_bin.js` | `.../hands@0.4.1675469240/hands_solution_simd_wasm_bin.js` |
| `hand_landmark_full.tflite` | `.../hands@0.4.1675469240/hand_landmark_full.tflite` |
| `hand_landmark_lite.tflite` | `.../hands@0.4.1675469240/hand_landmark_lite.tflite` |
| `hands_solution_packed_assets.data` | `.../hands@0.4.1675469240/hands_solution_packed_assets.data` |
| `hands_solution_packed_assets_loader.js` | `.../hands@0.4.1675469240/hands_solution_packed_assets_loader.js` |
| `hands.binarypb` | `.../hands@0.4.1675469240/hands.binarypb` |

---

## 3. Face mesh (`@mediapipe/face_mesh@0.4.1633559619`)

Put all of these in **`static/mediapipe/face_mesh/`** (same release only):

| File | Source |
|------|--------|
| `face_mesh.js` | `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/face_mesh.js` |
| `face_mesh_solution_simd_wasm_bin.wasm` | `.../face_mesh@0.4.1633559619/face_mesh_solution_simd_wasm_bin.wasm` |
| `face_mesh_solution_simd_wasm_bin.data` | `.../face_mesh@0.4.1633559619/face_mesh_solution_simd_wasm_bin.data` |
| `face_mesh_solution_simd_wasm_bin.js` | `.../face_mesh@0.4.1633559619/face_mesh_solution_simd_wasm_bin.js` |
| `face_mesh_solution_packed_assets.data` | `.../face_mesh@0.4.1633559619/face_mesh_solution_packed_assets.data` |
| `face_mesh_solution_packed_assets_loader.js` | `.../face_mesh@0.4.1633559619/face_mesh_solution_packed_assets_loader.js` |
| `face_mesh.binarypb` | `.../face_mesh@0.4.1633559619/face_mesh.binarypb` |

---

## Download on a machine with internet (exact versions)

**Option A – curl (same-version only):**

```bash
BASE=static/mediapipe
HANDS_VER=0.4.1675469240
FACE_VER=0.4.1633559619
CAMERA_VER=0.3.1675466862
mkdir -p "$BASE" "$BASE/hands" "$BASE/face_mesh"

curl -o "$BASE/camera_utils.js" "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@${CAMERA_VER}/camera_utils.js"

for f in hands.js hands_solution_simd_wasm_bin.wasm hands_solution_simd_wasm_bin.data hands_solution_simd_wasm_bin.js hand_landmark_full.tflite hand_landmark_lite.tflite hands_solution_packed_assets.data hands_solution_packed_assets_loader.js hands.binarypb; do
  curl -o "$BASE/hands/$f" "https://cdn.jsdelivr.net/npm/@mediapipe/hands@${HANDS_VER}/$f"
done

for f in face_mesh.js face_mesh_solution_simd_wasm_bin.wasm face_mesh_solution_simd_wasm_bin.data face_mesh_solution_simd_wasm_bin.js face_mesh_solution_packed_assets.data face_mesh_solution_packed_assets_loader.js face_mesh.binarypb; do
  curl -o "$BASE/face_mesh/$f" "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@${FACE_VER}/$f"
done
```

**Option B – npm pack (exact versions, then copy into repo):**

```bash
npm pack @mediapipe/camera_utils@0.3.1675466862 @mediapipe/hands@0.4.1675469240 @mediapipe/face_mesh@0.4.1633559619
# Unpack each .tgz and copy files into static/mediapipe/ and hands/ and face_mesh/ with same filenames.
```

---

## After copying

1. Commit all files under `static/mediapipe/`.
2. The demo loads **only** from `MEDIAPIPE_BASE = '/static/mediapipe'` (no CDN). All JS/wasm/tflite must be from the pinned versions above so the binary graph parses correctly.
