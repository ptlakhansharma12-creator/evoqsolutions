import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeGlobeProps {
  className?: string;
}

export function ThreeGlobe({ className = '' }: ThreeGlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Globe Mesh (Wireframe Sphere)
    const globeGeo = new THREE.SphereGeometry(4.5, 36, 36);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    mainGroup.add(globeMesh);

    // 2. Inner Glowing Core
    const innerGeo = new THREE.SphereGeometry(3.8, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.1,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // 3. Faridabad Pin Beacon Marker (28.4089° N, 77.3178° E)
    // Convert lat/lon to 3D Cartesian coordinates
    const lat = 28.4089 * (Math.PI / 180);
    const lon = 77.3178 * (Math.PI / 180);
    const radius = 4.52;

    const x = radius * Math.cos(lat) * Math.sin(lon);
    const y = radius * Math.sin(lat);
    const z = radius * Math.cos(lat) * Math.cos(lon);

    // Faridabad Glowing Marker Sphere
    const markerGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const markerMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const markerMesh = new THREE.Mesh(markerGeo, markerMat);
    markerMesh.position.set(x, y, z);
    mainGroup.add(markerMesh);

    // Pulsing Ring around Faridabad Marker
    const ringGeo = new THREE.RingGeometry(0.25, 0.45, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(x, y, z);
    ringMesh.lookAt(0, 0, 0);
    mainGroup.add(ringMesh);

    // 4. Orbiting Cyber Ring 1
    const orbit1Geo = new THREE.TorusGeometry(6.2, 0.03, 16, 100);
    const orbit1Mat = new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.4 });
    const orbit1Mesh = new THREE.Mesh(orbit1Geo, orbit1Mat);
    orbit1Mesh.rotation.x = Math.PI / 3;
    mainGroup.add(orbit1Mesh);

    // 5. Orbiting Cyber Ring 2
    const orbit2Geo = new THREE.TorusGeometry(7.2, 0.02, 16, 100);
    const orbit2Mat = new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.3 });
    const orbit2Mesh = new THREE.Mesh(orbit2Geo, orbit2Mat);
    orbit2Mesh.rotation.y = Math.PI / 4;
    mainGroup.add(orbit2Mesh);

    // 6. Global Node Particles
    const particleCount = 150;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 4.6;

      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.12,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    mainGroup.add(particleSystem);

    // Mouse Interaction
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.0006;
      mouseY = (event.clientY - windowHalfY) * 0.0006;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Globe continuous rotation
      globeMesh.rotation.y = elapsedTime * 0.12;
      innerMesh.rotation.y = -elapsedTime * 0.08;
      particleSystem.rotation.y = elapsedTime * 0.12;

      orbit1Mesh.rotation.z = elapsedTime * 0.08;
      orbit2Mesh.rotation.x = elapsedTime * 0.06;

      // Pulse ring scale
      const scale = 1 + Math.sin(elapsedTime * 4) * 0.25;
      ringMesh.scale.set(scale, scale, 1);

      // Smooth mouse damping
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      mainGroup.rotation.y = targetX * 1.5;
      mainGroup.rotation.x = targetY * 1.5;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      globeGeo.dispose();
      globeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      markerGeo.dispose();
      markerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      orbit1Geo.dispose();
      orbit1Mat.dispose();
      orbit2Geo.dispose();
      orbit2Mat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={`pointer-events-none ${className}`} />;
}
