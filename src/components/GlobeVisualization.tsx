import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type ThreeScene = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  meshWave?: THREE.Mesh;
  clock?: THREE.Clock;
  stars?: THREE.Points;
  orbitalParticles?: THREE.Points;
};

const GlobeVisualization = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const threeScene = useRef<ThreeScene | null>(null);
  const [documentHeight, setDocumentHeight] = useState<number>(0);

  useEffect(() => {
    const originalBackground = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#000000';
    document.documentElement.style.backgroundColor = '#000000';
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.backgroundColor = originalBackground;
    };
  }, []);

  useEffect(() => {
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

    updateDocumentHeight();
    const resizeObserver = new ResizeObserver(updateDocumentHeight);
    resizeObserver.observe(document.body);
    return () => resizeObserver.disconnect();
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
    let orbitalParticles: THREE.Points;
    
    threeScene.current = { scene, camera, renderer, clock };
    mountRef.current.appendChild(renderer.domElement);

    const rotationAngle = 0.0005;
    const axialTilt = THREE.MathUtils.degToRad(10);
    const waveColor = 0x646CFF;

    const createStarField = () => {
      const contentRatio = documentHeight / window.innerHeight;
      const starCount = Math.max(5000, Math.floor(1500 * contentRatio));
      
      const starGeometry = new THREE.BufferGeometry();
      const starVertices = [];
      
      for (let i = 0; i < starCount; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const heightFactor = contentRatio * 2.0;
        const y = (Math.random() - 0.5) * 2000 * heightFactor;
        const z = -Math.random() * 1500 - 200;
        starVertices.push(x, y, z);
      }
      
      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
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

    // Create orbital ring particles that behave like planet rings
    const createOrbitalParticles = () => {
      const particleCount = 1500;
      const geometry = new THREE.BufferGeometry();
      
      const positions = new Float32Array(particleCount * 3);
      const ringData = new Float32Array(particleCount * 4); // radius, phase, speed, size
      const visibilityData = new Float32Array(particleCount * 2); // visible, entryTime
      
      const minRadius = waveRadius * 1.5;
      const maxRadius = waveRadius * 3.0;
    
      for (let i = 0; i < particleCount; i++) {
        // Spherical coordinates for more uniform distribution
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2.0 * Math.random() - 1.0); // Better spherical distribution
        
        // Random radius with slight clustering
        const radius = minRadius + (maxRadius - minRadius) * Math.pow(Math.random(), 2);
        
        // Add noise for natural variation
        const noiseFactor = 0.1;
        const radiusNoise = radius * (1.0 + (Math.random() - 0.5) * noiseFactor);
        
        // Initial position
        positions[i * 3] = radiusNoise * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radiusNoise * Math.cos(phi);
        positions[i * 3 + 2] = radiusNoise * Math.sin(phi) * Math.sin(theta);
        
        // Store orbital parameters
        ringData[i * 4] = radius; // Target radius
        ringData[i * 4 + 1] = theta; // Initial phase
        ringData[i * 4 + 2] = 0.02 + Math.random() * 0.03; // Slower orbital speed
        ringData[i * 4 + 3] = 0.6 + Math.random() * 0.3; // Particle size
        
        visibilityData[i * 2] = 1.0; // Start visible
        visibilityData[i * 2 + 1] = 0.0; // No entry delay
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('ringData', new THREE.BufferAttribute(ringData, 4));
      geometry.setAttribute('visibilityData', new THREE.BufferAttribute(visibilityData, 2));
      
      const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          baseColor: { value: new THREE.Color(0x88ccff) },
          planetRadius: { value: waveRadius }
        },
        vertexShader: `
          attribute vec4 ringData;
          attribute vec2 visibilityData;
          uniform float time;
          uniform float planetRadius;
          
          varying float vOpacity;
          varying float vSize;
          varying vec3 vColor;
          
          void main() {
            float radius = ringData.x;
            float initialPhase = ringData.y;
            float orbitSpeed = ringData.z;
            float particleSize = ringData.w;
            
            // Calculate current orbital position
            float currentPhase = initialPhase + time * orbitSpeed;
            
            // Add small perturbations for natural movement
            float perturbation = sin(time * 0.1 + initialPhase) * 0.05;
            vec3 orbitPos = vec3(
              radius * cos(currentPhase) * (1.0 + perturbation),
              radius * sin(time * 0.05 + initialPhase) * 0.1, // Small vertical oscillation
              radius * sin(currentPhase) * (1.0 + perturbation)
            );
            
            // Add subtle eccentricity
            float eccentricity = 0.05 + sin(initialPhase) * 0.03;
            orbitPos.x *= (1.0 + eccentricity);
            orbitPos.z *= (1.0 - eccentricity);
            
            // Apply slight random tilt per particle
            float tiltAngle = initialPhase * 0.1;
            mat3 tiltMatrix = mat3(
              cos(tiltAngle), 0.0, sin(tiltAngle),
              0.0, 1.0, 0.0,
              -sin(tiltAngle), 0.0, cos(tiltAngle)
            );
            vec3 newPos = tiltMatrix * orbitPos;
            
            vOpacity = 0.8 + sin(time * 0.1 + initialPhase) * 0.2;
            vSize = particleSize * (0.8 + 0.2 * sin(currentPhase));
            
            float hue = 0.6 + (radius - planetRadius) * 0.03;
            vColor = vec3(
              0.5 + 0.1 * sin(hue * 10.0),
              0.7 + 0.2 * sin(hue * 12.0),
              1.0
            );
            
            vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = vSize * (300.0 / length(mvPosition.xyz));
          }
        `,
        fragmentShader: `
          uniform vec3 baseColor;
          varying float vOpacity;
          varying float vSize;
          varying vec3 vColor;
          
          void main() {
            float r = length(gl_PointCoord - vec2(0.5));
            if (r > 0.5) discard;
            float alpha = smoothstep(0.5, 0.2, r) * vOpacity;
            gl_FragColor = vec4(baseColor * vColor, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      
      orbitalParticles = new THREE.Points(geometry, shaderMaterial);
      scene.add(orbitalParticles);
      return orbitalParticles;
    };

    const createResponsiveSphere = () => {
      const screenWidth = window.innerWidth;
      waveRadius = screenWidth < 600 ? screenWidth / 60 : screenWidth / 160;
      
      stars = createStarField();
      threeScene.current!.stars = stars;
      
      orbitalParticles = createOrbitalParticles();
      threeScene.current!.orbitalParticles = orbitalParticles;

      const geometryWave = new THREE.IcosahedronGeometry(waveRadius * 1.2, 32);
      const waveMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0.0 },
          color: { value: new THREE.Color(waveColor) },
          noiseScale: { value: 8.0 },
          amplitude: { value: 0.4 },
          frequency: { value: 0.6 }
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
            pos.x += noise * gentleAmplitude * 1.5;
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
      
      const glowGeometry = new THREE.SphereGeometry(waveRadius * 1.25, 32, 32);
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

      meshWave.rotation.x = axialTilt;
      glowMesh.rotation.x = axialTilt;
      orbitalParticles.rotation.x = axialTilt * 0.5; // Slightly less tilt for rings
    };

    const updateCameraPosition = () => {
      const screenWidth = window.innerWidth;
      camera.position.z = screenWidth < 600 ? 35 : screenWidth / 50;
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
      
      if (threeScene.current.stars) {
        scene.remove(threeScene.current.stars);
        threeScene.current.stars = createStarField();
      }
      
      if (threeScene.current.orbitalParticles) {
        scene.remove(threeScene.current.orbitalParticles);
        threeScene.current.orbitalParticles = createOrbitalParticles();
      }
    };

    const handleScroll = () => {
      if (!threeScene.current?.stars || !threeScene.current?.meshWave) return;
      
      const scrollY = window.scrollY;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const windowHeight = window.innerHeight;
      const maxScroll = documentHeight - windowHeight;
      const scrollPercent = scrollY / maxScroll;
      
      // Move stars independently
      threeScene.current.stars.position.y = scrollPercent * -50;
      
      // Keep particles and planet together
      const planetGroupY = scrollPercent * -15;
      threeScene.current.meshWave.position.y = planetGroupY;
      if (threeScene.current.orbitalParticles) {
        threeScene.current.orbitalParticles.position.y = planetGroupY;
      }
      scene.children.forEach(child => {
        if (child instanceof THREE.Mesh && child !== threeScene.current.meshWave) {
          child.position.y = planetGroupY;
        }
      });
    };

    // Create new particles to maintain the flow of orbital particles
    const refreshOrbitalParticles = () => {
      if (!threeScene.current?.orbitalParticles) return;
      
      const geometry = threeScene.current.orbitalParticles.geometry;
      const positions = geometry.getAttribute('position');
      const ringData = geometry.getAttribute('ringData');
      const visibilityData = geometry.getAttribute('visibilityData');
      const elapsedTime = clock.getElapsedTime();
      
      // Refresh a small number of particles each frame
      const refreshCount = 3;
      for (let i = 0; i < refreshCount; i++) {
        // Select random particles to refresh
        const index = Math.floor(Math.random() * positions.count);
        
        // Get current ring data
        const ringRadius = ringData.getX(index);
        
        // Create new approach position (far outside)
        const approachRadius = ringRadius * (5 + Math.random() * 5);
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() * 0.3 + 0.85) * Math.PI / 2;
        
        // Set new position and refresh timing
        positions.setXYZ(
          index,
          approachRadius * Math.sin(phi) * Math.cos(theta),
          approachRadius * Math.cos(phi) * 0.3,
          approachRadius * Math.sin(phi) * Math.sin(theta)
        );
        
        // Update orbit phase
        ringData.setY(index, Math.random() * Math.PI * 2);
        
        // Reset visibility and entry timing
        visibilityData.setX(index, 0);
        visibilityData.setY(index, elapsedTime + Math.random() * 5);
      }
      
      // Mark attributes for update
      positions.needsUpdate = true;
      ringData.needsUpdate = true;
      visibilityData.needsUpdate = true;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    const animate = () => {
      if (!threeScene.current) return;
      
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (meshWave) {
        const material = meshWave.material as THREE.ShaderMaterial;
        material.uniforms.time.value = elapsedTime;
        meshWave.rotation.y += rotationAngle;
        meshWave.rotation.z = Math.sin(elapsedTime * 0.05) * 0.02;
        meshWave.rotation.x = axialTilt + Math.sin(elapsedTime * 0.07) * 0.02;
      }
      
      if (threeScene.current.orbitalParticles) {
        const material = threeScene.current.orbitalParticles.material as THREE.ShaderMaterial;
        material.uniforms.time.value = elapsedTime;
        
        // Gently rotate the entire ring system
        threeScene.current.orbitalParticles.rotation.y += rotationAngle * 0.2;
        
        // Add very slight wobble to rings
        threeScene.current.orbitalParticles.rotation.z = Math.sin(elapsedTime * 0.02) * 0.01;
        
        // Periodically refresh particles to maintain continuous flow
        if (Math.random() > 0.95) {
          refreshOrbitalParticles();
        }
      }
      
      scene.children.forEach(child => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial && 
            child.material !== meshWave?.material) {
          child.material.uniforms.time.value = elapsedTime;
          child.rotation.y += rotationAngle * 0.5;
          child.rotation.z = Math.sin(elapsedTime * 0.1) * 0.02;
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