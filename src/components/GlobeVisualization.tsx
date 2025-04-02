import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type ThreeScene = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  meshWave?: THREE.Mesh;
  clock?: THREE.Clock;
  stars?: THREE.Points;
};

const GlobeVisualization = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const threeScene = useRef<ThreeScene | null>(null);
  const [documentHeight, setDocumentHeight] = useState<number>(0);

  // Add this useEffect to set the body background color
  useEffect(() => {
    // Save original background color to restore later if needed
    const originalBackground = document.body.style.backgroundColor;
    
    // Set the background color to match space theme
    document.body.style.backgroundColor = '#000000';
    document.documentElement.style.backgroundColor = '#000000';
    
    // Add overflow handling to ensure scrolling works properly
    document.body.style.overflow = 'auto';
    
    return () => {
      // Restore original styles when component unmounts
      document.body.style.backgroundColor = originalBackground;
    };
  }, []);

  useEffect(() => {
    // Function to update document height state
    const updateDocumentHeight = () => {
      const height = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      setDocumentHeight(height);
    };

    // Initial height measurement
    updateDocumentHeight();

    // Setup resize observer to update height when content changes
    const resizeObserver = new ResizeObserver(() => {
      updateDocumentHeight();
    });
    
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!mountRef.current || documentHeight === 0) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const clock = new THREE.Clock();
    
    let meshWave: THREE.Mesh | undefined;
    let waveRadius: number;
    let stars: THREE.Points;
    
    threeScene.current = { scene, camera, renderer, clock };
    mountRef.current.appendChild(renderer.domElement);

    const rotationAngle = 0.0005;
    const axialTilt = THREE.MathUtils.degToRad(10);
    const waveColor = 0x646CFF;

    const createStarField = () => {
      // Calculate how many stars we need based on document height
      const contentRatio = documentHeight / window.innerHeight;
      // Increase star count for denser field
      const starCount = Math.max(5000, Math.floor(1500 * contentRatio));
      
      const starGeometry = new THREE.BufferGeometry();
      const starVertices = [];
      
      // Create stars distributed through the entire scrollable area
      for (let i = 0; i < starCount; i++) {
        const x = (Math.random() - 0.5) * 2000;
        // Extend y-range based on document height (add extra padding)
        const heightFactor = contentRatio * 2.0; // Increased from 1.5 for more stars
        const y = (Math.random() - 0.5) * 2000 * heightFactor;
        const z = -Math.random() * 1500 - 200; // Increased depth for more parallax
        starVertices.push(x, y, z);
      }
      
      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
      
      // Varying star sizes for more realistic look
      const starSizes = new Float32Array(starCount);
      for (let i = 0; i < starCount; i++) {
        starSizes[i] = Math.random() * 2.0 + 0.5;
      }
      starGeometry.setAttribute('size', new THREE.Float32BufferAttribute(starSizes, 1));
      
      const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.0,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.7
      });
      
      stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);
      
      return stars;
    };

    const createResponsiveSphere = () => {
      const screenWidth = window.innerWidth;
      // Increase waveRadius for a larger base size
      waveRadius = screenWidth < 600 ? screenWidth / 20 : screenWidth / 120; // Increased from 40 and 130

      // Create extended star field
      stars = createStarField();
      threeScene.current!.stars = stars;

      // Increase geometry size slightly for larger waves
      const geometryWave = new THREE.IcosahedronGeometry(waveRadius * 1.2, 32); // Scaled up from waveRadius

      const waveMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0.0 },
          color: { value: new THREE.Color(waveColor) },
          noiseScale: { value: 8.0 },
          amplitude: { value: 0.4 }, // Increased from 0.2 for larger waves
          frequency: { value: 0.6 }  // Increased from 0.4 for more dynamic motion
        },
        vertexShader: `
          uniform float time;
          uniform float noiseScale;
          uniform float amplitude;
          uniform float frequency;
          varying vec2 vUv;
          varying float noise;
          varying float elevation;
          varying vec3 vPosition;
          
          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
          vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
          
          float snoise(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i  = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute(permute(permute(
                      i.z + vec4(0.0, i1.z, i2.z, 1.0))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            float n_ = 0.142857142857;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
          }
          
          float fbm(vec3 p) {
            float value = 0.0;
            float amplitude = 0.5;
            float frequency = 1.0;
            for (int i = 0; i < 3; i++) {
                value += amplitude * snoise(p * frequency);
                frequency *= 2.0;
                amplitude *= 0.5;
            }
            return value;
          }
          
          void main() {
            vUv = uv;
            vPosition = position;
            
            vec3 pos = position;
            float mainNoise = fbm(vec3(
                pos.x * noiseScale * 0.03, 
                pos.y * noiseScale * 0.03, 
                time * frequency * 0.2
            ));
            float flowNoise = snoise(vec3(
                pos.y * noiseScale * 0.1, 
                pos.z * noiseScale * 0.1, 
                time * frequency * 0.4
            ));
            noise = mainNoise * 0.7 + flowNoise * 0.3;
            float gentleAmplitude = amplitude * (1.0 + 0.3 * sin(time * 0.2));
            pos.x += noise * gentleAmplitude * 1.5; // Increased multiplier for larger waves
            pos.y += noise * gentleAmplitude * 1.5;
            pos.z += noise * gentleAmplitude * 1.5;
            
            elevation = noise;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          uniform float time;
          varying vec2 vUv;
          varying float noise;
          varying float elevation;
          varying vec3 vPosition;
          
          void main() {
            vec3 baseColor = color;
            vec3 lightBlue = vec3(0.2, 0.6, 1.0);
            vec3 darkBlue = vec3(0.0, 0.3, 0.7);
            float flowPattern = sin(vUv.x * 10.0 + time * 0.5) * sin(vUv.y * 10.0 - time * 0.3);
            flowPattern = smoothstep(0.0, 0.8, flowPattern);
            float edgeFactor = smoothstep(0.4, 0.5, abs(dot(normalize(vPosition), vec3(0.0, 1.0, 0.0))));
            vec3 edgeColor = vec3(0.4, 0.7, 1.0) * edgeFactor * 0.2;
            float pulse = 0.85 + 0.15 * sin(time * 0.2 + elevation * 3.0);
            vec3 finalColor = mix(darkBlue, baseColor, pulse);
            finalColor = mix(finalColor, lightBlue, elevation * 0.3);
            finalColor += vec3(0.4, 0.7, 1.0) * flowPattern * 0.1;
            finalColor += edgeColor * 0.15;
            float brightnessVariation = 0.9 + 0.1 * sin(time * 0.05);
            gl_FragColor = vec4(finalColor * brightnessVariation, 0.5);
          }
        `,
        wireframe: true,
        transparent: true,
      });

      meshWave = new THREE.Mesh(geometryWave, waveMaterial);
      scene.add(meshWave);
      
      const glowGeometry = new THREE.SphereGeometry(waveRadius * 1.25, 32, 32); // Increased from 1.15
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(waveColor) },
          time: { value: 0.0 }
        },
        vertexShader: `
          uniform float time;
          varying vec3 vPosition;
          
          void main() {
            vPosition = position;
            vec3 pos = position;
            pos.x += sin(pos.y * 1.0 + time * 0.2) * 0.02;
            pos.y += cos(pos.z * 1.0 + time * 0.1) * 0.02;
            pos.z += sin(pos.x * 1.0 + time * 0.3) * 0.02;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          uniform float time;
          varying vec3 vPosition;
          
          void main() {
            float radial = length(gl_PointCoord - vec2(0.5, 0.5)) * 2.0;
            float intensity = 0.2 - radial;
            intensity = max(0.0, intensity);
            float pulse = 0.85 + 0.15 * sin(time * 0.2);
            vec3 glowColor = color;
            gl_FragColor = vec4(glowColor, intensity * pulse * 0.4);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
      });
      
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      scene.add(glowMesh);
      
      const particleGeometry = new THREE.BufferGeometry();
      const particleCount = 80;
      const particlePositions = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount; i++) {
        const radius = waveRadius * (1.2 + Math.random() * 0.4); // Adjusted for larger waves
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particlePositions[i * 3 + 2] = radius * Math.cos(phi);
      }
      
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      
      const particleMaterial = new THREE.PointsMaterial({
        color: 0x0073f3,
        size: 0.15,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
      });
      
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      meshWave.rotation.x = axialTilt;
      glowMesh.rotation.x = axialTilt;
      particles.rotation.x = axialTilt;
    };

    const updateCameraPosition = () => {
      const screenWidth = window.innerWidth;
      camera.position.z = screenWidth < 600 ? 35 : screenWidth / 50; // Adjusted for larger size
      camera.position.y = 3;
      camera.position.x = -2;
      camera.fov = 70;
      camera.lookAt(0, 0, 0);
    };

    const handleResize = () => {
      if (!threeScene.current) return;
      const parentWidth = mountRef.current?.clientWidth || window.innerWidth;
      const parentHeight = mountRef.current?.clientHeight || window.innerHeight;
      threeScene.current.renderer.setSize(parentWidth, parentHeight);
      threeScene.current.camera.aspect = parentWidth / parentHeight;
      threeScene.current.camera.updateProjectionMatrix();
      
      // Recreate stars when window is resized to adjust to new document height
      if (threeScene.current.stars) {
        scene.remove(threeScene.current.stars);
        threeScene.current.stars = createStarField();
      }
    };

    // Handle scroll to parallax effect
    const handleScroll = () => {
      if (!threeScene.current?.stars) return;
      
      // Calculate scroll position as percentage of page
      const scrollY = window.scrollY;
      const documentHeight = Math.max(
        document.body.scrollHeight, 
        document.documentElement.scrollHeight
      );
      const windowHeight = window.innerHeight;
      const maxScroll = documentHeight - windowHeight;
      const scrollPercent = scrollY / maxScroll;
      
      // Move stars slightly based on scroll position
      // The camera stays fixed, but we move the stars to create parallax
      const starsPositionY = scrollPercent * -50; // Adjust this value to control parallax intensity
      threeScene.current.stars.position.y = starsPositionY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (meshWave) {
        const material = meshWave.material as THREE.ShaderMaterial;
        material.uniforms.time.value = elapsedTime;
        meshWave.rotation.y += rotationAngle;
        meshWave.rotation.z = Math.sin(elapsedTime * 0.05) * 0.02;
        meshWave.rotation.x = axialTilt + Math.sin(elapsedTime * 0.07) * 0.02;
      }
      
      scene.children.forEach(child => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial && 
            child.material !== meshWave?.material) {
          child.material.uniforms.time.value = elapsedTime;
          child.rotation.y += rotationAngle * 0.5;
          child.rotation.z = Math.sin(elapsedTime * 0.1) * 0.02;
        }
        
        if (child instanceof THREE.Points && !(child.material instanceof THREE.ShaderMaterial) && child !== stars) {
          child.rotation.y += rotationAngle * 0.2;
          const scalePulse = 1.0 + 0.05 * Math.sin(elapsedTime * 0.3);
          child.scale.set(scalePulse, scalePulse, scalePulse);
          
          if (Math.random() > 0.99) {
            const positions = child.geometry.getAttribute('position');
            const index = Math.floor(Math.random() * positions.count);
            const radius = waveRadius * (1.2 + Math.random() * 0.3);
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            
            positions.setXYZ(
              index,
              radius * Math.sin(phi) * Math.cos(theta),
              radius * Math.sin(phi) * Math.sin(theta),
              radius * Math.cos(phi)
            );
            positions.needsUpdate = true;
          }
        }
      });

      renderer.render(scene, camera);
    };

    createResponsiveSphere();
    updateCameraPosition();
    camera.updateProjectionMatrix();
    
    const parentWidth = mountRef.current.clientWidth;
    const parentHeight = mountRef.current.clientHeight;
    
    renderer.setSize(parentWidth, parentHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (threeScene.current?.renderer && mountRef.current) {
        mountRef.current.removeChild(threeScene.current.renderer.domElement);
      }
      threeScene.current = null;
    };
  }, [documentHeight]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default GlobeVisualization;