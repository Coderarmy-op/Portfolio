"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    Float,
    MeshDistortMaterial,
    MeshWobbleMaterial,
    Environment,
    Stars,
    Text3D,
    Center,
    OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";

/**
 * ========================================
 * SHOWCASE 3D SCENE
 * ========================================
 * An elaborate 3D section showcasing creative capabilities:
 * - Interactive floating island/platform
 * - Orbiting elements
 * - Click/hover interactions
 * - OrbitControls for exploration
 */

// Interactive floating cube that changes on hover/click
function InteractiveCube({
    position,
    baseColor,
    hoverColor,
}: {
    position: [number, number, number];
    baseColor: string;
    hoverColor: string;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.01;

            // Scale animation
            const targetScale = clicked ? 1.4 : hovered ? 1.2 : 1;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh
                ref={meshRef}
                position={position}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
                onClick={() => setClicked(!clicked)}
            >
                <boxGeometry args={[1, 1, 1]} />
                <MeshDistortMaterial
                    color={hovered || clicked ? hoverColor : baseColor}
                    distort={clicked ? 0.6 : 0.3}
                    speed={3}
                    roughness={0.1}
                    metalness={0.9}
                />
            </mesh>
        </Float>
    );
}

// Wobbly torus that responds to interaction
function WobblyTorus({ position, color }: { position: [number, number, number]; color: string }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={1} floatIntensity={0.8}>
            <mesh
                ref={meshRef}
                position={position}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
            >
                <torusGeometry args={[1, 0.4, 16, 100]} />
                <MeshWobbleMaterial
                    color={color}
                    factor={hovered ? 1 : 0.3}
                    speed={hovered ? 3 : 1}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
        </Float>
    );
}

// Floating platform/island
function FloatingPlatform() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = -2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[4, 4.5, 0.5, 32]} />
            <MeshDistortMaterial
                color="#1a1a3a"
                distort={0.1}
                speed={1}
                roughness={0.3}
                metalness={0.7}
            />
        </mesh>
    );
}

// Orbiting spheres around the platform
function OrbitingSpheres() {
    const groupRef = useRef<THREE.Group>(null);

    const spheres = useMemo(() => {
        return Array.from({ length: 8 }, (_, i) => ({
            id: i,
            angle: (i / 8) * Math.PI * 2,
            radius: 3,
            yOffset: (i % 2 === 0 ? 0.3 : -0.3),
            size: 0.1 + Math.random() * 0.15,
            color: ["#6366f1", "#8b5cf6", "#22d3ee", "#ec4899"][i % 4],
        }));
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {spheres.map((sphere) => (
                <mesh
                    key={sphere.id}
                    position={[
                        Math.cos(sphere.angle) * sphere.radius,
                        sphere.yOffset,
                        Math.sin(sphere.angle) * sphere.radius,
                    ]}
                >
                    <sphereGeometry args={[sphere.size, 16, 16]} />
                    <meshStandardMaterial
                        color={sphere.color}
                        emissive={sphere.color}
                        emissiveIntensity={0.5}
                    />
                </mesh>
            ))}
        </group>
    );
}


// Animated wireframe dodecahedron
function WireframeDodecahedron() {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh
                ref={meshRef}
                position={[0, 1, 0]}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
                scale={hovered ? 1.3 : 1}
            >
                <dodecahedronGeometry args={[1.5]} />
                <meshStandardMaterial
                    color={hovered ? "#22d3ee" : "#8b5cf6"}
                    wireframe
                    emissive={hovered ? "#22d3ee" : "#8b5cf6"}
                    emissiveIntensity={hovered ? 0.8 : 0.3}
                />
            </mesh>
        </Float>
    );
}

// Particle system surrounding the scene
function SceneParticles({ count = 300 }: { count?: number }) {
    const points = useRef<THREE.Points>(null);

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 5 + Math.random() * 10;

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);
        }
        return positions;
    }, [count]);

    useFrame((state) => {
        if (points.current) {
            points.current.rotation.y = state.clock.elapsedTime * 0.03;
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particlesPosition}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#8b5cf6"
                transparent
                opacity={0.4}
                sizeAttenuation
            />
        </points>
    );
}

// Light beams emanating from platform
function LightBeams() {
    const beamsRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (beamsRef.current) {
            beamsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <group ref={beamsRef}>
            {[0, 1, 2, 3].map((i) => (
                <mesh
                    key={i}
                    position={[0, 2, 0]}
                    rotation={[0, (i / 4) * Math.PI * 2, Math.PI / 8]}
                >
                    <coneGeometry args={[0.1, 8, 4]} />
                    <meshStandardMaterial
                        color={["#6366f1", "#8b5cf6", "#22d3ee", "#ec4899"][i]}
                        transparent
                        opacity={0.1}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}
        </group>
    );
}

// Main scene content
function SceneContent() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[0, 5, 0]} intensity={1} color="#8b5cf6" />
            <pointLight position={[-5, 0, -5]} intensity={0.5} color="#22d3ee" />
            <pointLight position={[5, 0, 5]} intensity={0.5} color="#ec4899" />

            {/* Central wireframe element */}
            <WireframeDodecahedron />

            {/* Interactive cubes */}
            <InteractiveCube position={[-3, 0.5, -1]} baseColor="#6366f1" hoverColor="#22d3ee" />
            <InteractiveCube position={[3, 0.5, -1]} baseColor="#ec4899" hoverColor="#8b5cf6" />
            <InteractiveCube position={[0, 0.5, 3]} baseColor="#8b5cf6" hoverColor="#ec4899" />

            {/* Wobbly torus */}
            <WobblyTorus position={[-2, 2, 2]} color="#22d3ee" />
            <WobblyTorus position={[2, 2, -2]} color="#ec4899" />

            {/* Floating platform */}
            <FloatingPlatform />

            {/* Light beams */}
            <LightBeams />

            {/* Particles */}
            <SceneParticles count={200} />

            {/* Stars background */}
            <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />

            {/* Environment */}
            <Environment preset="night" />

            {/* Controls */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 1.5}
                minPolarAngle={Math.PI / 4}
                autoRotate
                autoRotateSpeed={0.5}
            />
        </>
    );
}

export default function ShowcaseScene() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 2, 8], fov: 60 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <SceneContent />
            </Canvas>
        </div>
    );
}
