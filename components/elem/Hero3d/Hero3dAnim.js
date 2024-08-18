import * as THREE from 'three';
import { useEffect, useRef } from 'react';

function MyThree() {
  const refContainer = useRef(null);

  useEffect(() => {
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Use ref as a mount point for the Three.js scene instead of document.body
    if (refContainer.current) {
      refContainer.current.appendChild(renderer.domElement);
    }

    // Create a group to hold all the stars
    const starGroup = new THREE.Group();

    // Create stars within a smaller spherical area
    const starCount = 400; // Number of stars
    const sphereRadius = 30; // Radius for the sphere containing stars

    const velocities = []; // Store velocities for random movement
    const starVelocity = 0.015;

    for (let i = 0; i < starCount; i++) {
      const geometry = new THREE.SphereGeometry(0.0325, 25, 25);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);

      // Use a square root distribution to reduce the likelihood of stars in the center
      const radius = sphereRadius * Math.sqrt(Math.random()); // Square root distribution
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      star.position.x = radius * Math.sin(phi) * Math.cos(theta);
      star.position.y = radius * Math.sin(phi) * Math.sin(theta);
      star.position.z = radius * Math.cos(phi);

      // Assign a small random velocity for each star
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * starVelocity,
        (Math.random() - 0.5) * starVelocity,
        (Math.random() - 0.5) * starVelocity
      );

      velocities.push(velocity);

      starGroup.add(star);
    }

    scene.add(starGroup);

    camera.position.z = 8; // Place the camera inside the sphere
    camera.position.x = 5;
    camera.position.y = 0;

    // Variables to track mouse movement and easing
    let targetRotationX = 0;
    let targetRotationY = 0;
    const easingFactor = 0.005; // Adjust this value for more or less easing

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Smoothly interpolate towards the target rotation for the star group
      starGroup.rotation.x += (targetRotationX - starGroup.rotation.x) * easingFactor;
      starGroup.rotation.y += (targetRotationY - starGroup.rotation.y) * easingFactor;

      // Apply random movement to the stars
      starGroup.children.forEach((star, index) => {
        star.position.add(velocities[index]);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Mouse movement tracking with more significant rotation
    document.addEventListener('mousemove', (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      // Increase the multipliers for more significant rotation
      targetRotationY = mouseX * 2;
      targetRotationX = mouseY * 2;
    });

    // Cleanup function to remove the renderer on component unmount
    return () => {
      if (refContainer.current) {
        refContainer.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return <div ref={refContainer}></div>;
}

export default MyThree;

