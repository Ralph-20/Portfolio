import * as THREE from 'three';
import { useEffect, useRef } from 'react';

function MyThree() {
  const refContainer = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect mobile for performance optimizations
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    const isLowPower = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Adaptive settings based on device
    const starCount = isMobile ? 200 : 400;
    const sphereSegments = isMobile ? 3 : 4; // Low poly is fine for small stars
    const pixelRatioLimit = isMobile ? 1.5 : 2;

    // Initialize scene, camera, and renderer with optimizations
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Black background
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Optimized renderer settings
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile, // Disable AA on mobile for performance
      alpha: true,
      powerPreference: 'high-performance', // Prioritize performance
    });

    // Limit pixel ratio to prevent rendering too many pixels on high-DPI displays
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, pixelRatioLimit));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Attach renderer to ref container
    if (refContainer.current) {
      refContainer.current.appendChild(renderer.domElement);
    }

    // Create instanced mesh for massive performance improvement
    // Instead of 400 individual meshes (400 draw calls), we use 1 draw call
    const sphereRadius = 30;

    // Low-poly geometry - stars are small, don't need high detail
    const geometry = new THREE.SphereGeometry(0.0325, sphereSegments, sphereSegments);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const instancedMesh = new THREE.InstancedMesh(geometry, material, starCount);

    // Store velocities and positions for animation
    const velocities = [];
    const dummy = new THREE.Object3D(); // Reusable object for setting transforms
    const starVelocity = 0.015;

    // Initialize each instance with position and velocity
    for (let i = 0; i < starCount; i++) {
      // Randomized spherical distribution
      const radius = sphereRadius * Math.sqrt(Math.random());
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      const position = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );

      dummy.position.copy(position);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);

      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * starVelocity,
        (Math.random() - 0.5) * starVelocity,
        (Math.random() - 0.5) * starVelocity
      );

      velocities.push({ position, velocity });
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
    scene.add(instancedMesh);

    camera.position.set(5, 0, 8);

    let targetRotationX = 0;
    let targetRotationY = 0;
    let delayedRotationX = 0;
    let delayedRotationY = 0;
    const easingFactor = 0.02; // Increased for smoother "bounce" lag effect
    const delayFactor = 0.02; // Controls the delay before rotation starts following (lower = more delay)
    const maxDistance = sphereRadius * 1.5;

    // Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Add delay effect - delayed values slowly catch up to target
      delayedRotationX += (targetRotationX - delayedRotationX) * delayFactor;
      delayedRotationY += (targetRotationY - delayedRotationY) * delayFactor;

      // Apply eased rotation to entire instanced mesh using delayed values
      instancedMesh.rotation.x += (delayedRotationX - instancedMesh.rotation.x) * easingFactor;
      instancedMesh.rotation.y += (delayedRotationY - instancedMesh.rotation.y) * easingFactor;

      // Update each star's position
      for (let i = 0; i < starCount; i++) {
        const { position, velocity } = velocities[i];

        position.add(velocity);

        // Bounce stars back if they go too far
        if (position.length() > maxDistance) {
          position.setLength(sphereRadius);
          velocity.negate();
        }

        // Update instance matrix
        dummy.position.copy(position);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      }

      instancedMesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    };

    // Only animate if user hasn't requested reduced motion
    if (!isLowPower) {
      animate();
    } else {
      // Just render once if reduced motion is preferred
      renderer.render(scene, camera);
    }

    // Resize handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    // Mouse move handler - store reference for proper cleanup
    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      targetRotationY = mouseX * 1;
      targetRotationX = mouseY * 1;
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup function - properly dispose of all resources
    cleanupRef.current = () => {
      // Cancel animation frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      // Remove event listeners
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);

      // Dispose of Three.js resources to prevent memory leaks
      geometry.dispose();
      material.dispose();
      renderer.dispose();

      // Remove DOM element
      if (refContainer.current && renderer.domElement) {
        refContainer.current.removeChild(renderer.domElement);
      }
    };

    return cleanupRef.current;
  }, []); // Empty dependency array - only run once

  return (
    <div
      ref={refContainer}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    />
  );
}

export default MyThree;

