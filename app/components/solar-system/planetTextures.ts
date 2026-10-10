import * as THREE from "three";

// Helper for simple procedural noise
function pseudoNoise(x: number, y: number, seed: number = 0): number {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
  return n - Math.floor(n);
}

function smoothNoise(x: number, y: number, scale: number, seed: number = 0): number {
  const nx = x * scale;
  const ny = y * scale;
  const i0 = Math.floor(nx);
  const j0 = Math.floor(ny);
  const fx = nx - i0;
  const fy = ny - j0;

  // Bilinear interpolation
  const s00 = pseudoNoise(i0, j0, seed);
  const s10 = pseudoNoise(i0 + 1, j0, seed);
  const s01 = pseudoNoise(i0, j0 + 1, seed);
  const s11 = pseudoNoise(i0 + 1, j0 + 1, seed);

  const u = fx * fx * (3 - 2 * fx);
  const v = fy * fy * (3 - 2 * fy);

  return (
    (1 - u) * (1 - v) * s00 +
    u * (1 - v) * s10 +
    (1 - u) * v * s01 +
    u * v * s11
  );
}

function fractalNoise(
  x: number,
  y: number,
  octaves: number = 4,
  baseScale: number = 0.02,
  seed: number = 0
): number {
  let val = 0;
  let freq = baseScale;
  let amp = 0.5;
  let maxAmp = 0;

  for (let o = 0; o < octaves; o++) {
    val += smoothNoise(x, y, freq, seed + o * 100) * amp;
    maxAmp += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return val / maxAmp;
}

// 1. Sun Texture
export function createSunTexture(): THREE.CanvasTexture {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const n1 = fractalNoise(x, y, 4, 0.015, 12);
      const n2 = fractalNoise(x, y, 3, 0.04, 34);
      const val = n1 * 0.7 + n2 * 0.3;

      // Solar flare fiery gradient: deep red -> bright orange -> brilliant yellow/white
      data[idx] = Math.min(255, Math.floor(255 * (0.8 + val * 0.2))); // Red
      data[idx + 1] = Math.min(255, Math.floor(230 * val * 0.95 + 40)); // Green
      data[idx + 2] = Math.min(255, Math.floor(100 * Math.pow(val, 2.5))); // Blue
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// 2. Mercury Texture
export function createMercuryTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const n = fractalNoise(x, y, 5, 0.03, 77);
      const crater = Math.pow(n, 1.8);
      const tone = Math.floor(80 + crater * 110);
      data[idx] = tone;
      data[idx + 1] = Math.floor(tone * 0.95);
      data[idx + 2] = Math.floor(tone * 0.92);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return new THREE.CanvasTexture(canvas);
}

// 3. Venus Texture (Cream / Pale Ochre atmospheric clouds)
export function createVenusTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const lat = (y / height) * Math.PI;
    const bandNoise = Math.sin(lat * 8) * 0.15;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const n = fractalNoise(x, y, 4, 0.02, 53) + bandNoise;
      data[idx] = Math.floor(235 + n * 20); // soft warm cream
      data[idx + 1] = Math.floor(215 + n * 25);
      data[idx + 2] = Math.floor(180 + n * 35);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return new THREE.CanvasTexture(canvas);
}

// 4. Earth Texture (Blue Oceans + Continents)
export function createEarthTexture(): THREE.CanvasTexture {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const lat = (y / height - 0.5) * Math.PI; // -pi/2 to pi/2
    const polarIce = Math.abs(lat) > 1.25;

    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      if (polarIce) {
        // Polar Ice Caps
        data[idx] = 240;
        data[idx + 1] = 245;
        data[idx + 2] = 250;
      } else {
        const landFactor = fractalNoise(x, y, 5, 0.012, 101);
        if (landFactor > 0.52) {
          // Continents: forest greens, savannas, mountains
          const elev = (landFactor - 0.52) / 0.48;
          data[idx] = Math.floor(45 + elev * 85); // Brown-green
          data[idx + 1] = Math.floor(95 + elev * 65);
          data[idx + 2] = Math.floor(40 + elev * 30);
        } else {
          // Oceans: deep azure blue to shallow turquoise
          const depth = landFactor / 0.52;
          data[idx] = Math.floor(12 + depth * 20);
          data[idx + 1] = Math.floor(45 + depth * 45);
          data[idx + 2] = Math.floor(110 + depth * 55);
        }
      }
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return new THREE.CanvasTexture(canvas);
}

// 4b. Earth Clouds Overlay Texture (Alpha)
export function createEarthCloudsTexture(): THREE.CanvasTexture {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const n = fractalNoise(x, y, 4, 0.02, 219);
      if (n > 0.48) {
        const cloudAlpha = Math.min(240, Math.floor((n - 0.48) * 450));
        data[idx] = 255;
        data[idx + 1] = 255;
        data[idx + 2] = 255;
        data[idx + 3] = cloudAlpha;
      } else {
        data[idx + 3] = 0;
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return new THREE.CanvasTexture(canvas);
}

// 4c. Moon Texture
export function createMoonTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const n = fractalNoise(x, y, 4, 0.025, 412);
      const tone = Math.floor(160 + n * 80);
      data[idx] = tone;
      data[idx + 1] = tone;
      data[idx + 2] = Math.floor(tone * 1.02);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return new THREE.CanvasTexture(canvas);
}

// 5. Mars Texture (Rust red / Terracotta)
export function createMarsTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const isPolar = y < 18 || y > height - 18;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      if (isPolar) {
        data[idx] = 235;
        data[idx + 1] = 225;
        data[idx + 2] = 220;
      } else {
        const n = fractalNoise(x, y, 4, 0.02, 608);
        data[idx] = Math.floor(180 + n * 45); // Rust red
        data[idx + 1] = Math.floor(75 + n * 40); // Dark ochre
        data[idx + 2] = Math.floor(45 + n * 30);
      }
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return new THREE.CanvasTexture(canvas);
}

// 6. Jupiter Texture (Atmospheric bands & Great Red Spot)
export function createJupiterTexture(): THREE.CanvasTexture {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  // Great Red Spot coordinate
  const spotX = width * 0.65;
  const spotY = height * 0.65;
  const spotRadiusX = width * 0.06;
  const spotRadiusY = height * 0.045;

  for (let y = 0; y < height; y++) {
    // Horizontal wavy bands
    const wave = Math.sin((y / height) * 24 + fractalNoise(0, y, 2, 0.05, 5) * 4) * 0.5 + 0.5;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const swirl = fractalNoise(x, y, 3, 0.018, 91);
      const t = (wave * 0.7 + swirl * 0.3);

      // Jupiter palette: rich tan, camel, off-white, sienna
      let r = Math.floor(190 + t * 45);
      let g = Math.floor(145 + t * 40);
      let b = Math.floor(95 + t * 40);

      // Great Red Spot check
      const dx = (x - spotX) / spotRadiusX;
      const dy = (y - spotY) / spotRadiusY;
      const distSq = dx * dx + dy * dy;
      if (distSq < 1.0) {
        const stormStrength = 1.0 - Math.sqrt(distSq);
        r = Math.floor(r * (1 - stormStrength) + 215 * stormStrength);
        g = Math.floor(g * (1 - stormStrength) + 65 * stormStrength);
        b = Math.floor(b * (1 - stormStrength) + 45 * stormStrength);
      }

      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return new THREE.CanvasTexture(canvas);
}

// 7. Saturn Texture (Golden ochre bands)
export function createSaturnTexture(): THREE.CanvasTexture {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const band = Math.sin((y / height) * 32) * 0.5 + 0.5;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const n = fractalNoise(x, y, 2, 0.015, 44);
      const val = band * 0.6 + n * 0.4;

      data[idx] = Math.floor(215 + val * 30); // Golden cream ochre
      data[idx + 1] = Math.floor(185 + val * 25);
      data[idx + 2] = Math.floor(130 + val * 25);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return new THREE.CanvasTexture(canvas);
}

// 7b. Saturn Ring Texture (Concentric rings with Cassini Division & alpha)
export function createSaturnRingTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = 1;
  const ctx = canvas.getContext("2d")!;
  const imgData = ctx.createImageData(size, 1);
  const data = imgData.data;

  for (let i = 0; i < size; i++) {
    const idx = i * 4;
    const r = i / size; // 0 (inner) to 1 (outer)

    // Inner transparency fading
    let alpha = 1.0;
    if (r < 0.15) {
      alpha = r / 0.15;
    } else if (r > 0.95) {
      alpha = (1.0 - r) / 0.05;
    }

    // Cassini Division gap (around r ~ 0.65 to 0.72)
    if (r >= 0.64 && r <= 0.71) {
      alpha *= 0.08;
    }

    // Subtle concentric striations
    const bandFine = Math.sin(r * 180) * 0.15 + 0.85;
    const brightness = Math.floor(200 * bandFine);

    data[idx] = Math.min(255, brightness + 20); // Warm ring tone
    data[idx + 1] = Math.min(255, brightness + 10);
    data[idx + 2] = Math.min(255, brightness - 15);
    data[idx + 3] = Math.floor(alpha * 220);
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// 8. Uranus Texture (Cyan / Aquamarine)
export function createUranusTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const n = fractalNoise(x, y, 2, 0.015, 33);
      data[idx] = Math.floor(130 + n * 25);
      data[idx + 1] = Math.floor(210 + n * 25);
      data[idx + 2] = Math.floor(220 + n * 25);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return new THREE.CanvasTexture(canvas);
}

// 9. Neptune Texture (Deep Azure Cobalt Blue)
export function createNeptuneTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const n = fractalNoise(x, y, 3, 0.02, 88);
      data[idx] = Math.floor(35 + n * 25);
      data[idx + 1] = Math.floor(75 + n * 40);
      data[idx + 2] = Math.floor(185 + n * 50);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return new THREE.CanvasTexture(canvas);
}
