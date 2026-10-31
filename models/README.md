# ECG digitizer model weights

ONNX segmentation models downloaded on demand by the ECG Digitizer app
(`github.com/tyaq/ecg-digitizer`, manual/research-only ML path). Temporary
home until a dedicated model host is chosen.

| File | Model | Size |
| --- | --- | --- |
| `model_slice.onnx` | Fine-tuned slice (3 epochs, synthetic data), fp32 | 85.6 MB |
| `model_slice_int8.onnx` | Same slice, dynamic int8 quantized | 21.7 MB |
| `model_slice_fp16.onnx` | Same slice, fp16 quantized | 43.0 MB |
| `model_teacher.onnx` | Stenhede et al. teacher UNet (source model), fp32 | 85.6 MB |

All four share the same input protocol: letterboxed RGB /255, 1x3x1024x1024,
output logits 1x4x1024x1024 (classes: grid, text/background, signal,
background). The teacher export is faithful to the PyTorch weights
(argmax agreement 99.996% on a test panel); note the teacher was trained on
synthetic renders and its native path warps first, so letterbox-protocol
scores are a same-pipeline comparison, not the teacher's native numbers.
