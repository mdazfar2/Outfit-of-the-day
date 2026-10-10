"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SOLAR_BODIES, type PlanetSolarData } from "./solar-system/solarData";
import {
  createSunTexture,
  createMercuryTexture,
  createVenusTexture,
  createEarthTexture,
  createEarthCloudsTexture,
  createMoonTexture,
  createMarsTexture,
  createJupiterTexture,
  createSaturnTexture,
  createSaturnRingTexture,
  createUranusTexture,
  createNeptuneTexture,
} from "./solar-system/planetTextures";
import {
  Sparkles,
  RotateCcw,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  X,
  Tag,
  Compass,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SolarSystem3DProps {
  onSelectDay?: (dayIndex: number) => void;
}

export default function SolarSystem3D({ onSelectDay }: SolarSystem3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // UI state
  const [selectedBody, setSelectedBody] = useState<PlanetSolarData | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hoveredBodyName, setHoveredBodyName] = useState<string | null>(null);

  // References for Three.js scene control
  const focusTargetRef = useRef<{
    active: boolean;
    targetPos: THREE.Vector3;
    cameraPos: THREE.Vector3;
    progress: number;
    body: PlanetSolarData | null;
  }>({
    active: false,
    targetPos: new THREE.Vector3(),
    cameraPos: new THREE.Vector3(),
    progress: 1,
    body: null,
  });

  const trackingLastWorldPosRef = useRef<THREE.Vector3 | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const isPlayingRef = useRef<boolean>(true);
  const speedRef = useRef<number>(1);
  const planetMeshesRef = useRef<
    Map<string, { mesh: THREE.Mesh; orbitGroup: THREE.Group; body: PlanetSolarData; angle: number }>
  >(new Map());

  // Keep refs synchronized with state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    speedRef.current = speedMultiplier;
  }, [speedMultiplier]);

  // Reset camera view
  const handleResetCamera = useCallback(() => {
    if (!controlsRef.current || !cameraRef.current) return;
    setSelectedBody(null);
    trackingLastWorldPosRef.current = null;
    focusTargetRef.current = {
      active: true,
      targetPos: new THREE.Vector3(0, 0, 0),
      cameraPos: new THREE.Vector3(0, 48, 85),
      progress: 0,
      body: null,
    };
  }, []);

  // Directional navigation helper (Rotate left/right/up/down)
  const handleDirectionalMove = (direction: "left" | "right" | "up" | "down") => {
    if (!cameraRef.current || !controlsRef.current) return;

    // Disengage auto-lock so user freely controls camera
    focusTargetRef.current.active = false;
    trackingLastWorldPosRef.current = null;

    const angleStep = 0.28; // radians
    const offset = cameraRef.current.position.clone().sub(controlsRef.current.target);
    const spherical = new THREE.Spherical().setFromVector3(offset);

    if (direction === "left") {
      spherical.theta -= angleStep;
    } else if (direction === "right") {
      spherical.theta += angleStep;
    } else if (direction === "up") {
      spherical.phi = Math.max(0.04, spherical.phi - angleStep);
    } else if (direction === "down") {
      spherical.phi = Math.min(Math.PI - 0.04, spherical.phi + angleStep);
    }

    offset.setFromSpherical(spherical);
    cameraRef.current.position.copy(controlsRef.current.target).add(offset);
    controlsRef.current.update();
  };

  // Zoom controls
  const handleZoom = (inOut: "in" | "out") => {
    if (!cameraRef.current || !controlsRef.current) return;
    const factor = inOut === "in" ? 0.7 : 1.4;
    const offset = cameraRef.current.position
      .clone()
      .sub(controlsRef.current.target)
      .multiplyScalar(factor);

    // Free clamping for extreme zoom like NASA Eyes
    if (offset.length() > 1.6 && offset.length() < 500) {
      cameraRef.current.position.copy(controlsRef.current.target).add(offset);
      controlsRef.current.update();
    }
  };

  // Select body and smoothly animate camera to it
  const selectPlanet = useCallback((body: PlanetSolarData) => {
    setSelectedBody(body);
    const item = planetMeshesRef.current.get(body.id);
    if (!item || !cameraRef.current || !controlsRef.current) return;

    // Determine world position of target
    const worldPos = new THREE.Vector3();
    item.mesh.getWorldPosition(worldPos);

    // Compute camera offset based on planet size
    const distance = Math.max(body.size * 3.2, 3.8);
    const cameraOffset = new THREE.Vector3(
      distance * 0.75,
      distance * 0.45,
      distance * 0.8
    );

    trackingLastWorldPosRef.current = worldPos.clone();
    focusTargetRef.current = {
      active: true,
      targetPos: worldPos,
      cameraPos: worldPos.clone().add(cameraOffset),
      progress: 0,
      body,
    };
  }, []);

  // Navigate to look
  const handleJumpToLook = (dayIndex: number) => {
    if (onSelectDay) {
      onSelectDay(dayIndex);
    }
    const element = document.getElementById("todays-look");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Main Three.js Setup
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 700;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080c, 0.0012);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.4, 1200);
    camera.position.set(0, 48, 85);
    cameraRef.current = camera;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // 3. Orbit Controls - Complete 360° Free Spherical Rotation & Pan
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minPolarAngle = 0.01; // top pole
    controls.maxPolarAngle = Math.PI - 0.01; // bottom pole (full 360° spherical rotation!)
    controls.minDistance = 1.6; // close zoom
    controls.maxDistance = 500; // deep cosmic zoom
    controls.enableRotate = true;
    controls.rotateSpeed = 0.9;
    controls.enablePan = true; // allow panning left/right/up/down
    controls.screenSpacePanning = true;
    controls.panSpeed = 1.0;
    controls.zoomSpeed = 1.25;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // 4. Lighting - High Dynamic Contrast
    const sunLight = new THREE.PointLight(0xfff8ea, 5.2, 600, 0.32);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Camera fill-light so unlit sides are clearly visible from any 360 angle
    const cameraFillLight = new THREE.DirectionalLight(0xffffff, 0.45);
    camera.add(cameraFillLight);
    scene.add(camera);

    // Ambient space light
    const ambientLight = new THREE.AmbientLight(0x353d5a, 0.95);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x404b66, 0x0c0f18, 0.55);
    scene.add(hemiLight);

    // 5. Starfield Background (2,200 stars)
    const starCount = 2200;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorPalettes = [
      new THREE.Color(0xffffff),
      new THREE.Color(0xc2deff),
      new THREE.Color(0xffeaad),
      new THREE.Color(0xffd6d6),
    ];

    for (let i = 0; i < starCount; i++) {
      const radius = 240 + Math.random() * 320;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      const col = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 6. Build Planets, Sun & Orbit Tracks
    const meshesMap = new Map<
      string,
      { mesh: THREE.Mesh; orbitGroup: THREE.Group; body: PlanetSolarData; angle: number }
    >();

    const textures = {
      sun: createSunTexture(),
      mercury: createMercuryTexture(),
      venus: createVenusTexture(),
      earth: createEarthTexture(),
      earthClouds: createEarthCloudsTexture(),
      moon: createMoonTexture(),
      mars: createMarsTexture(),
      jupiter: createJupiterTexture(),
      saturn: createSaturnTexture(),
      saturnRing: createSaturnRingTexture(),
      uranus: createUranusTexture(),
      neptune: createNeptuneTexture(),
    };

    let earthCloudsRef: THREE.Mesh | null = null;

    SOLAR_BODIES.forEach((body, idx) => {
      const orbitGroup = new THREE.Group();
      scene.add(orbitGroup);

      // Clean, thin orbit line
      if (body.orbitRadius > 0) {
        const pointsCount = 128;
        const orbitPoints: THREE.Vector3[] = [];
        for (let i = 0; i <= pointsCount; i++) {
          const theta = (i / pointsCount) * Math.PI * 2;
          orbitPoints.push(
            new THREE.Vector3(
              Math.cos(theta) * body.orbitRadius,
              0,
              Math.sin(theta) * body.orbitRadius
            )
          );
        }
        const orbitLineGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
        const orbitLineMat = new THREE.LineBasicMaterial({
          color: new THREE.Color(body.colorHex),
          transparent: true,
          opacity: 0.25,
        });
        const orbitLine = new THREE.Line(orbitLineGeo, orbitLineMat);
        scene.add(orbitLine);
      }

      // Planet Sphere Geometry
      const segs = body.id === "sun" || body.id === "jupiter" ? 48 : 36;
      const sphereGeo = new THREE.SphereGeometry(body.size, segs, segs);

      let mat: THREE.Material;

      if (body.id === "sun") {
        mat = new THREE.MeshBasicMaterial({
          map: textures.sun,
        });
      } else {
        let mapTexture: THREE.CanvasTexture = textures.mercury;
        if (body.id === "venus") mapTexture = textures.venus;
        if (body.id === "earth") mapTexture = textures.earth;
        if (body.id === "mars") mapTexture = textures.mars;
        if (body.id === "jupiter") mapTexture = textures.jupiter;
        if (body.id === "saturn") mapTexture = textures.saturn;
        if (body.id === "uranus") mapTexture = textures.uranus;
        if (body.id === "neptune") mapTexture = textures.neptune;

        mat = new THREE.MeshStandardMaterial({
          map: mapTexture,
          roughness: body.id === "venus" ? 0.85 : 0.6,
          metalness: 0.05,
        });
      }

      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.rotation.z = body.tilt;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.name = body.name;
      mesh.userData = { bodyId: body.id, bodyData: body };

      const initialAngle = (idx / SOLAR_BODIES.length) * Math.PI * 2;
      mesh.position.set(
        Math.cos(initialAngle) * body.orbitRadius,
        0,
        Math.sin(initialAngle) * body.orbitRadius
      );
      orbitGroup.add(mesh);

      // Saturn Rings
      if (body.hasRings) {
        const ringGeo = new THREE.RingGeometry(body.size * 1.35, body.size * 2.5, 64);
        const pos = ringGeo.attributes.position;
        const uvs: number[] = [];
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const y = pos.getY(i);
          const dist = Math.sqrt(x * x + y * y);
          const u = (dist - body.size * 1.35) / (body.size * 1.15);
          uvs.push(u, 0.5);
        }
        ringGeo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));

        const ringMat = new THREE.MeshStandardMaterial({
          map: textures.saturnRing,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.95,
          roughness: 0.65,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2;
        mesh.add(ringMesh);
      }

      // Earth Cloud Layer & Moon
      if (body.id === "earth") {
        const cloudsGeo = new THREE.SphereGeometry(body.size * 1.025, 36, 36);
        const cloudsMat = new THREE.MeshStandardMaterial({
          map: textures.earthClouds,
          transparent: true,
          opacity: 0.68,
          blending: THREE.NormalBlending,
        });
        const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
        earthCloudsRef = cloudsMesh;
        mesh.add(cloudsMesh);

        // Blue Atmospheric Glow Shell
        const atmoGeo = new THREE.SphereGeometry(body.size * 1.05, 32, 32);
        const atmoMat = new THREE.MeshBasicMaterial({
          color: 0x4da6ff,
          transparent: true,
          opacity: 0.22,
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide,
        });
        mesh.add(new THREE.Mesh(atmoGeo, atmoMat));

        // Moon
        const moonGeo = new THREE.SphereGeometry(0.3, 24, 24);
        const moonMat = new THREE.MeshStandardMaterial({
          map: textures.moon,
          roughness: 0.85,
        });
        const moonMesh = new THREE.Mesh(moonGeo, moonMat);
        moonMesh.name = "Moon";
        moonMesh.position.set(2.4, 0.2, 0);
        mesh.add(moonMesh);
      }

      // Sun Corona Shell & Sprite Glow
      if (body.id === "sun") {
        const coronaShellGeo = new THREE.SphereGeometry(body.size * 1.12, 36, 36);
        const coronaShellMat = new THREE.MeshBasicMaterial({
          color: 0xffb733,
          transparent: true,
          opacity: 0.32,
          blending: THREE.AdditiveBlending,
        });
        mesh.add(new THREE.Mesh(coronaShellGeo, coronaShellMat));

        const canvasSprite = document.createElement("canvas");
        canvasSprite.width = 128;
        canvasSprite.height = 128;
        const ctx = canvasSprite.getContext("2d")!;
        const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        grad.addColorStop(0, "rgba(255, 235, 140, 0.95)");
        grad.addColorStop(0.2, "rgba(245, 170, 45, 0.55)");
        grad.addColorStop(0.55, "rgba(200, 95, 20, 0.2)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 128, 128);

        const spriteMap = new THREE.CanvasTexture(canvasSprite);
        const spriteMat = new THREE.SpriteMaterial({
          map: spriteMap,
          color: 0xffdf80,
          transparent: true,
          blending: THREE.AdditiveBlending,
        });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.scale.set(28, 28, 1);
        mesh.add(sprite);
      }

      meshesMap.set(body.id, {
        mesh,
        orbitGroup,
        body,
        angle: initialAngle,
      });
    });

    planetMeshesRef.current = meshesMap;
    setIsLoading(false);

    // 7. Raycasting with Drag-Detection (Prevents click when user is dragging camera!)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let pointerStartX = 0;
    let pointerStartY = 0;
    let isDragging = false;

    const onPointerDown = (e: PointerEvent) => {
      pointerStartX = e.clientX;
      pointerStartY = e.clientY;
      isDragging = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      // If pointer moved more than 4px, user is rotating or panning!
      if (Math.hypot(e.clientX - pointerStartX, e.clientY - pointerStartY) > 4) {
        isDragging = true;
        // Detach camera lock so user has complete free 360 control
        if (focusTargetRef.current.active && focusTargetRef.current.body) {
          focusTargetRef.current.active = false;
          trackingLastWorldPosRef.current = null;
        }
      }

      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshesToTest = Array.from(meshesMap.values()).map((v) => v.mesh);
      const intersects = raycaster.intersectObjects(meshesToTest, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const bodyData = hit.userData.bodyData as PlanetSolarData | undefined;
        if (bodyData) {
          canvas.style.cursor = "pointer";
          setHoveredBodyName(bodyData.name);
          return;
        }
      }
      canvas.style.cursor = "grab";
      setHoveredBodyName(null);
    };

    const onPointerUp = (e: PointerEvent) => {
      // ONLY trigger click if the user did NOT drag the camera
      if (!isDragging) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const meshesToTest = Array.from(meshesMap.values()).map((v) => v.mesh);
        const intersects = raycaster.intersectObjects(meshesToTest, false);

        if (intersects.length > 0) {
          const hit = intersects[0].object;
          const bodyData = hit.userData.bodyData as PlanetSolarData | undefined;
          if (bodyData) {
            selectPlanet(bodyData);
          }
        }
      }
      isDragging = false;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);

    // 8. Resize Listener
    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth || window.innerWidth;
      height = containerRef.current.clientHeight || 700;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // 9. Animation Render Loop (Using performance.now())
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Orbital revolutions & axial rotations
      if (isPlayingRef.current) {
        const speed = speedRef.current;
        meshesMap.forEach(({ mesh, body }, id) => {
          mesh.rotation.y += body.rotationSpeed * speed;

          if (body.orbitRadius > 0) {
            const item = meshesMap.get(id)!;
            item.angle += body.orbitSpeed * 0.12 * speed;
            mesh.position.x = Math.cos(item.angle) * body.orbitRadius;
            mesh.position.z = Math.sin(item.angle) * body.orbitRadius;
          }
        });

        if (earthCloudsRef) {
          earthCloudsRef.rotation.y += 0.003 * speed;
        }
      }

      // Smooth camera interpolation & NASA-Eyes orbital tracking
      const focus = focusTargetRef.current;
      if (focus.active) {
        if (focus.body) {
          const item = meshesMap.get(focus.body.id);
          if (item) {
            const currentWorldPos = new THREE.Vector3();
            item.mesh.getWorldPosition(currentWorldPos);

            if (focus.progress < 1) {
              focus.progress = Math.min(1, focus.progress + delta * 1.8);
              const dist = Math.max(focus.body.size * 3.2, 3.8);
              const idealCamPos = currentWorldPos
                .clone()
                .add(new THREE.Vector3(dist * 0.75, dist * 0.45, dist * 0.8));

              controls.target.lerp(currentWorldPos, 0.12);
              camera.position.lerp(idealCamPos, 0.12);
              trackingLastWorldPosRef.current = currentWorldPos.clone();
            } else {
              if (trackingLastWorldPosRef.current) {
                const deltaMove = currentWorldPos.clone().sub(trackingLastWorldPosRef.current);
                controls.target.add(deltaMove);
                camera.position.add(deltaMove);
              }
              trackingLastWorldPosRef.current = currentWorldPos.clone();
            }
          }
        } else {
          // Returning to overview
          focus.progress = Math.min(1, focus.progress + delta * 2.0);
          controls.target.lerp(focus.targetPos, 0.1);
          camera.position.lerp(focus.cameraPos, 0.1);
          if (focus.progress >= 1) {
            focus.active = false;
            trackingLastWorldPosRef.current = null;
          }
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate(performance.now());

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      controls.dispose();
      renderer.dispose();
    };
  }, [selectPlanet]);

  return (
    <section id="solar-system" className="relative z-10 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white">
            Interactive 3D Solar System
          </h2>
          <p className="mt-3 text-sm text-white/50 max-w-2xl mx-auto leading-relaxed">
            Drag in any direction for full 360&deg; rotation, scroll to zoom, and select any planet to
            explore its astronomical orbit and creative resonance with our 7-day
            cosmic menswear palette.
          </p>
        </div>

        {/* 3D Viewport Container */}
        <div
          ref={containerRef}
          className="relative w-full h-[620px] sm:h-[750px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#07080C]/80 backdrop-blur-md select-none"
        >
          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-30 bg-[#07080C]">
              <div className="w-10 h-10 rounded-full border-2 border-accent-gold border-t-transparent animate-spin" />
              <p className="text-xs tracking-widest uppercase text-white/60">
                Generating 3D Celestial Spheres...
              </p>
            </div>
          )}

          {/* WebGL Canvas */}
          <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

          {/* Floating Hover Label indicator */}
          {hoveredBodyName && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-xs font-medium tracking-wider text-white shadow-xl z-20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-gold animate-ping" />
              <span>{hoveredBodyName}</span>
              <span className="text-[10px] text-white/40 uppercase">Click to Focus</span>
            </div>
          )}

          {/* Top-Right Camera / Controls Toolbar */}
          <div className="absolute top-5 right-5 z-20 flex flex-wrap items-center gap-2">
            {/* Directional Pad (Left, Right, Up, Down buttons) */}
            <div className="flex items-center rounded-xl bg-white/[0.08] border border-white/10 backdrop-blur-md overflow-hidden shadow-lg p-0.5">
              <button
                onClick={() => handleDirectionalMove("left")}
                className="p-1.5 hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Rotate Left"
                aria-label="Rotate Left"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => handleDirectionalMove("up")}
                className="p-1.5 hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Tilt Up"
                aria-label="Tilt Up"
              >
                <ChevronUp size={16} />
              </button>
              <button
                onClick={() => handleDirectionalMove("down")}
                className="p-1.5 hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Tilt Down"
                aria-label="Tilt Down"
              >
                <ChevronDown size={16} />
              </button>
              <button
                onClick={() => handleDirectionalMove("right")}
                className="p-1.5 hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Rotate Right"
                aria-label="Rotate Right"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Reset Camera Button */}
            <button
              onClick={handleResetCamera}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 text-white/80 hover:text-white text-xs tracking-wide transition-all backdrop-blur-md cursor-pointer shadow-lg"
              title="Reset View"
            >
              <RotateCcw size={13} />
              <span className="hidden sm:inline">Reset View</span>
            </button>

            {/* Play/Pause Orbit Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 text-white/80 hover:text-white text-xs tracking-wide transition-all backdrop-blur-md cursor-pointer shadow-lg"
              title={isPlaying ? "Pause Orbits" : "Resume Orbits"}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
              <span className="hidden sm:inline">{isPlaying ? "Pause" : "Play"}</span>
            </button>

            {/* Orbit Speed Toggle */}
            <button
              onClick={() => {
                const next = speedMultiplier === 1 ? 2 : speedMultiplier === 2 ? 0.5 : 1;
                setSpeedMultiplier(next);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 text-white/80 hover:text-white text-xs tracking-wide transition-all backdrop-blur-md cursor-pointer shadow-lg font-mono"
              title="Toggle Speed"
            >
              {speedMultiplier}x
            </button>

            {/* Zoom In & Out */}
            <div className="flex items-center rounded-xl bg-white/[0.08] border border-white/10 backdrop-blur-md overflow-hidden shadow-lg">
              <button
                onClick={() => handleZoom("in")}
                className="p-1.5 hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn size={15} />
              </button>
              <div className="w-[1px] h-4 bg-white/10" />
              <button
                onClick={() => handleZoom("out")}
                className="p-1.5 hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut size={15} />
              </button>
            </div>
          </div>

          {/* Top-Left Help Overlay */}
          <div className="absolute top-5 left-5 z-20 pointer-events-none hidden sm:flex items-center gap-2 text-white/40 text-[11px] tracking-wider uppercase">
            <Compass size={13} />
            <span>Drag to rotate 360&deg; &middot; Scroll to zoom &middot; Click any planet</span>
          </div>

          {/* Selected Planet Information Card (Sidebar Overlay) */}
          {selectedBody && (
            <div className="absolute bottom-20 sm:bottom-auto sm:top-5 left-4 right-4 sm:right-auto sm:left-5 z-30 sm:max-w-md w-auto rounded-2xl bg-[#0E121E]/92 backdrop-blur-xl border border-white/15 p-5 sm:p-6 shadow-2xl transition-all duration-300 animate-fade-in text-white">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: selectedBody.colorHex }}
                    />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-accent-gold font-medium">
                      {selectedBody.weekday
                        ? `${selectedBody.weekday} · Celestial Ruler`
                        : "Outer Solar System Giant"}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight mt-1 flex items-center gap-2.5">
                    <span>{selectedBody.name}</span>
                    <span className="text-xl font-normal text-white/50">
                      {selectedBody.glyph}
                    </span>
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setSelectedBody(null);
                    trackingLastWorldPosRef.current = null;
                  }}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close panel"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Tagline */}
              <p className="font-serif italic text-sm text-accent-gold/90 mb-3">
                &ldquo;{selectedBody.tagline}&rdquo;
              </p>

              {/* Astronomy Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-white/[0.04] border border-white/8 text-[11px] mb-4">
                <div>
                  <p className="text-white/40 uppercase tracking-wider text-[9px]">Distance</p>
                  <p className="font-mono text-white/90 mt-0.5">{selectedBody.distanceFromSun}</p>
                </div>
                <div>
                  <p className="text-white/40 uppercase tracking-wider text-[9px]">Orbit Period</p>
                  <p className="font-mono text-white/90 mt-0.5">{selectedBody.orbitalPeriod}</p>
                </div>
                <div>
                  <p className="text-white/40 uppercase tracking-wider text-[9px]">Diameter</p>
                  <p className="font-mono text-white/90 mt-0.5">{selectedBody.diameter}</p>
                </div>
              </div>

              {/* Science & Astronomical Fact */}
              <p className="text-xs text-white/70 leading-relaxed mb-4">
                {selectedBody.astronomyFact}
              </p>

              {/* OOTD Creative Connection Box */}
              <div className="border-t border-white/10 pt-3.5 mb-4">
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1.5 font-medium flex items-center gap-1.5">
                  <Tag size={11} className="text-accent-gold" />
                  OOTD Fashion Connection
                </p>
                <p className="text-xs text-white/85 leading-relaxed">
                  {selectedBody.fashionInspiration}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                {selectedBody.dayIndex !== null ? (
                  <button
                    onClick={() => handleJumpToLook(selectedBody.dayIndex!)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-white text-[#0A0D14] hover:bg-white/90 transition-all shadow-lg cursor-pointer"
                  >
                    <Sparkles size={13} className="text-accent-gold" />
                    <span>View {selectedBody.weekday} Look</span>
                  </button>
                ) : (
                  <button
                    onClick={handleResetCamera}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/15 text-white transition-all cursor-pointer text-center"
                  >
                    Return to Overview
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Bottom Quick-Select Planet Pills Bar */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-center">
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full p-1.5 rounded-2xl bg-black/65 backdrop-blur-xl border border-white/10 shadow-2xl no-scrollbar">
              {SOLAR_BODIES.map((body) => {
                const isSelected = selectedBody?.id === body.id;
                return (
                  <button
                    key={body.id}
                    onClick={() => selectPlanet(body)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 flex-shrink-0 cursor-pointer ${
                      isSelected
                        ? "bg-white text-black font-semibold shadow-lg scale-105"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: body.colorHex }}
                    />
                    <span>{body.name.replace("The ", "")}</span>
                    <span className="text-[10px] opacity-50">{body.glyph}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
