/**
 * detectGPU.ts — Device GPU Performance Detection
 *
 * Analyzes browser/device capabilities to classify into LOW, MEDIUM, or HIGH performance tiers.
 * Uses WebGL renderer info, hardware concurrency, device memory, and screen resolution.
 * LOW tier reduces 3D quality to ensure smooth experience on underpowered devices.
 * Falls back to MEDIUM if detection fails.
 */

export type GpuTier = "low" | "medium" | "high";

export interface GpuInfo {
  tier: GpuTier;
  maxPixelRatio: number;
  skipFrames: number;
  shadowMapSize: number;
  sphereCount: number;
  enableShadows: boolean;
  environmentIntensity: number;
}

/** Default fallback settings for medium tier (used if detection fails). */
const DEFAULT_SETTINGS: GpuInfo = {
  tier: "medium",
  maxPixelRatio: 1.5,
  skipFrames: 1,
  shadowMapSize: 256,
  sphereCount: 15,
  enableShadows: true,
  environmentIntensity: 0.35,
};

/**
 * Extract GPU vendor/renderer name from WebGL debug info.
 * Silently fails if WebGL is unavailable.
 */
function getWebGLRendererInfo(): { renderer: string; vendor: string } {
  const info = { renderer: "", vendor: "" };
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (gl) {
      const ext = gl.getExtension("WEBGL_debug_renderer_info");
      if (ext) {
        info.vendor = gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) || "";
        info.renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || "";
      }
    }
  } catch {
    // Silently fail — not critical
  }
  return info;
}

/**
 * Check if the GPU name suggests a low-end device.
 */
function isLowEndGPU(renderer: string, vendor: string): boolean {
  const lowEndKeywords = [
    "intel", "hd graphics", "uhd graphics", "iris", "gma",
    "mali", "adreno 5", "adreno 6", "powervr",
    "geforce 9", "geforce 8", "geforce 7", "geforce 6",
    "radeon hd 5", "radeon hd 4", "radeon r5", "radeon r4",
    "swiftshader", "mesa", "llvmpipe", "software",
  ];
  const combined = `${vendor} ${renderer}`.toLowerCase();
  return lowEndKeywords.some((kw) => combined.includes(kw));
}

/**
 * Detect the GPU performance tier based on available hardware signals.
 * LOW: < 4 CPU cores, < 4GB RAM, low-end GPU keywords, or mobile with low pixel ratio
 * MEDIUM: 4-6 cores, 4-8GB RAM, or unknown GPU
 * HIGH: >= 8 cores, >= 8GB RAM, known good GPU
 */
export function detectGpuTier(): GpuTier {
  try {
    const { renderer, vendor } = getWebGLRendererInfo();
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as any).deviceMemory ?? 4;
    const dpr = window.devicePixelRatio || 1;
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    const isLowGPU = isLowEndGPU(renderer, vendor);

    if (isLowGPU || cores <= 2 || memory <= 2 || dpr <= 1 || (isMobile && cores <= 4)) {
      return "low";
    }
    if (cores <= 6 || memory <= 4 || isMobile) {
      return "medium";
    }
    return "high";
  } catch {
    return "medium";
  }
}

/**
 * Get all GPU-related quality settings based on the detected tier.
 * Wrapped in try-catch — falls back to MEDIUM if anything fails.
 */
export function getGpuSettings(): GpuInfo {
  try {
    const tier = detectGpuTier();
    switch (tier) {
      case "low":
        return {
          tier,
          maxPixelRatio: 1,
          skipFrames: 3,
          shadowMapSize: 128,
          sphereCount: 10,
          enableShadows: false,
          environmentIntensity: 0.15,
        };
      case "medium":
        return {
          tier,
          maxPixelRatio: 1.5,
          skipFrames: 1,
          shadowMapSize: 256,
          sphereCount: 15,
          enableShadows: true,
          environmentIntensity: 0.35,
        };
      case "high":
        return {
          tier,
          maxPixelRatio: 2,
          skipFrames: 1,
          shadowMapSize: 512,
          sphereCount: 20,
          enableShadows: true,
          environmentIntensity: 0.5,
        };
    }
  } catch {
    return DEFAULT_SETTINGS;
  }
}

/** Pre-computed settings singleton — safe to import at module level. */
export const gpu = getGpuSettings();
