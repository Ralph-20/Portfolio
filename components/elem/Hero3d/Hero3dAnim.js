import * as THREE from 'three';
import { useEffect, useRef } from 'react';

function MyThree() {
  const refContainer = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

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

    // Attach renderer to ref container
    if (refContainer.current) {
      refContainer.current.appendChild(renderer.domElement);
    }

    // Create a group to hold all the stars
    const starGroup = new THREE.Group();
    const starCount = 400;
    const sphereRadius = 30;

    const velocities = [];
    const starVelocity = 0.015;

    for (let i = 0; i < starCount; i++) {
      const geometry = new THREE.SphereGeometry(0.0325, 25, 25);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);

      // Randomized spherical distribution
      const radius = sphereRadius * Math.sqrt(Math.random());
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      star.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );

      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * starVelocity,
        (Math.random() - 0.5) * starVelocity,
        (Math.random() - 0.5) * starVelocity
      );

      velocities.push(velocity);
      starGroup.add(star);
    }

    scene.add(starGroup);

    camera.position.set(5, 0, 8);

    let targetRotationX = 0;
    let targetRotationY = 0;
    const easingFactor = 0.005;

    const animate = () => {
      requestAnimationFrame(animate);

      starGroup.rotation.x += (targetRotationX - starGroup.rotation.x) * easingFactor;
      starGroup.rotation.y += (targetRotationY - starGroup.rotation.y) * easingFactor;

      const maxDistance = sphereRadius * 1.5;

      starGroup.children.forEach((star, index) => {
        star.position.add(velocities[index]);

        if (star.position.length() > maxDistance) {
          star.position.setLength(sphereRadius); // pull it back in
          velocities[index].negate(); // bounce back in opposite direction
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    document.addEventListener('mousemove', (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      targetRotationY = mouseX * 2;
      targetRotationX = mouseY * 2;
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', () => {});

      if (refContainer.current) {
        refContainer.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={refContainer} style={{ width: '100vw', height: '100vh' }} />;
}

export default MyThree;

