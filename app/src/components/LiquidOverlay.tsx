import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const LiquidOverlay = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Liquid Physics Constants
    const DENSITY = 0.8;
    const VISCOSITY = 0.5;

    // Shader for Fluid Ripple Distortion
    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uDensity: { value: DENSITY },
        uViscosity: { value: VISCOSITY }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec2 uResolution;
        uniform float uDensity;
        uniform float uViscosity;
        varying vec2 vUv;

        void main() {
          vec2 st = gl_FragCoord.xy / uResolution.xy;
          float dist = distance(st, uMouse);
          
          // Liquid Ripple Logic
          float ripple = sin(dist * 20.0 - uTime * 2.0) * exp(-dist * 5.0 * uDensity);
          float distortion = ripple * uViscosity * 0.05;
          
          // Subtle Ambient Grid for Glass to Blur
          vec2 gridST = st * 40.0;
          float grid = (step(0.98, fract(gridST.x)) + step(0.98, fract(gridST.y))) * 0.05;
          
          // Technical Crosshair following mouse
          float crosshair = (step(0.998, 1.0 - abs(st.x - uMouse.x)) + step(0.998, 1.0 - abs(st.y - uMouse.y))) * 0.1;

          // Subtle Noise
          float noise = fract(sin(dot(st.xy ,vec2(12.9898,78.233))) * 43758.5453) * 0.02;
          
          vec4 color = vec4(vec3(grid + crosshair + noise), 0.1); 
          
          // Distort the background grid based on ripples
          if (dist < 0.3) {
            color.a += distortion * 0.8;
            color.rgb += distortion * 0.2;
          }

          gl_FragColor = color;
        }
      `
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1.0 - (e.clientY / window.innerHeight);
    };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const animate = (time: number) => {
      material.uniforms.uTime.value = time * 0.001;
      material.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="liquid-overlay"
      className="fixed inset-0 z-[-1] pointer-events-none"
    />
  );
};

export default LiquidOverlay;
