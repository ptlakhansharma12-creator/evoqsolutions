import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  className?: string;
  variant?: 'hero' | 'grid' | 'ambient';
}

export function ThreeCanvas({ className = '', variant = 'hero' }: ThreeCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = variant === 'hero' ? 14 : 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for objects
    const group = new THREE.Group();
    scene.add(group);

    // 3D Outer Wireframe Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(variant === 'hero' ? 5.5 : 7, 2);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    group.add(icoMesh);

    // 3D Inner Glowing Core (Torus Knot or Octahedron)
    const coreGeometry = new THREE.TorusKnotGeometry(2.5, 0.6, 100, 16);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.5,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    // 3D Orbit Ring 1
    const ring1Geo = new THREE.TorusGeometry(8, 0.04, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.35 });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.x = Math.PI / 3;
    group.add(ring1Mesh);

    // 3D Orbit Ring 2
    const ring2Geo = new THREE.TorusGeometry(9.5, 0.03, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.25 });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.y = Math.PI / 4;
    group.add(ring2Mesh);

    // 3D Particle Cloud
    const particleCount = variant === 'hero' ? 180 : 100;
    const particlesGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 35;
      particlePositions[i + 1] = (Math.random() - 0.5) * 35;
      particlePositions[i + 2] = (Math.random() - 0.5) * 35;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particlesMat = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.12,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    group.add(particleSystem);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 3, 50);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 2, 50);
    purpleLight.position.set(-10, -10, -10);
    scene.add(purpleLight);

    // Mouse Interaction Tracking
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.0008;
      mouseY = (event.clientY - windowHalfY) * 0.0008;
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

      // Rotation animation
      icoMesh.rotation.y = elapsedTime * 0.08;
      icoMesh.rotation.x = elapsedTime * 0.05;

      coreMesh.rotation.y = -elapsedTime * 0.15;
      coreMesh.rotation.z = elapsedTime * 0.1;

      ring1Mesh.rotation.z = elapsedTime * 0.05;
      ring2Mesh.rotation.x = elapsedTime * 0.04;

      particleSystem.rotation.y = elapsedTime * 0.02;

      // Smooth mouse damping
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      group.rotation.y = targetX * 1.5;
      group.rotation.x = targetY * 1.5;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Clean up Three.js resources
      icoGeometry.dispose();
      icoMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [variant]);

  return <div ref={mountRef} className={`pointer-events-none ${className}`} />;
}
