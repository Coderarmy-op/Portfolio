"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, GradientTexture, Environment, Stars } from "@react-three/drei";
import * as THREE from "three";

/**
 * ========================================
 * HERO 3D SCENE
 * ========================================
 * Interactive 3D scene for the hero section featuring:
 * - Floating geometric shapes with distortion
 * - Mouse-responsive camera movement
 * - Particle system
 * - Dynamic lighting
 */

// Floating geometric shape with distortion
function FloatingShape({
    position,
    scale,
    color,
    speed = 1,
    distort = 0.3,
}: {
    position: [number, number, number];
    scale: number;
    color: string;
    speed?: number;
    distort?: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 * speed) * 0.2;
            meshRef.current.rotation.y += 0.005 * speed;
        }
    });

    return (
        <Float
            speed={2 * speed}
            rotationIntensity={0.5}
            floatIntensity={1}
            floatingRange={[-0.2, 0.2]}
        >
            <mesh ref={meshRef} position={position} scale={scale}>
                <icosahedronGeometry args={[1, 4]} />
                <MeshDistortMaterial
                    color={color}
                    distort={distort}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
        </Float>
    );
}

// Glowing sphere with gradient
function GlowingSphere({ position, scale }: { position: [number, number, number]; scale: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.scale.setScalar(scale + Math.sin(state.clock.elapsedTime) * 0.1);
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh ref={meshRef} position={position}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                    emissive="#8b5cf6"
                    emissiveIntensity={0.5}
                    toneMapped={false}
                >
                    <GradientTexture
                        stops={[0, 0.5, 1]}
                        colors={["#6366f1", "#8b5cf6", "#ec4899"]}
                    />
                </meshStandardMaterial>
            </mesh>
        </Float>
    );
}

// Orbiting ring
function OrbitRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
            ringRef.current.rotation.y = state.clock.elapsedTime * speed;
        }
    });

    return (
        <mesh ref={ringRef}>
            <torusGeometry args={[radius, 0.02, 16, 100]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.3}
                transparent
                opacity={0.6}
            />
        </mesh>
    );
}

// Particle field
function Particles({ count = 200 }: { count?: number }) {
    const points = useRef<THREE.Points>(null);

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
        return positions;
    }, [count]);

    useFrame((state) => {
        if (points.current) {
            points.current.rotation.y = state.clock.elapsedTime * 0.02;
            points.current.rotation.x = state.clock.elapsedTime * 0.01;
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
                size={0.02}
                color="#8b5cf6"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

// Mouse-follow camera effect
function CameraRig() {
    const { camera, pointer } = useThree();

    useFrame(() => {
        camera.position.x += (pointer.x * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (pointer.y * 0.3 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
    });

    return null;
}

// Main scene content
function SceneContent() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.2} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
            <pointLight position={[-5, 5, -5]} intensity={0.5} color="#6366f1" />
            <pointLight position={[5, -5, 5]} intensity={0.5} color="#ec4899" />

            {/* Main floating shapes */}
            <FloatingShape position={[2, 0.5, -1]} scale={1.2} color="#6366f1" speed={0.8} distort={0.4} />
            <FloatingShape position={[-2.5, -0.5, 0]} scale={0.8} color="#8b5cf6" speed={1.2} distort={0.3} />
            <FloatingShape position={[0, 1.5, -2]} scale={0.6} color="#22d3ee" speed={1} distort={0.5} />
            <FloatingShape position={[-1, -1.5, -1]} scale={0.5} color="#ec4899" speed={0.9} distort={0.35} />

            {/* Glowing central element */}
            <GlowingSphere position={[0, 0, 0]} scale={0.4} />

            {/* Orbiting rings */}
            <OrbitRing radius={2.5} speed={0.3} color="#6366f1" />
            <OrbitRing radius={3} speed={0.2} color="#8b5cf6" />
            <OrbitRing radius={3.5} speed={0.15} color="#ec4899" />

            {/* Particle field */}
            <Particles count={150} />

            {/* Background stars */}
            <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

            {/* Environment for reflections */}
            <Environment preset="night" />

            {/* Camera rig for mouse follow */}
            <CameraRig />
        </>
    );
}

export default function HeroScene() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 60 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <SceneContent />
            </Canvas>

            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-dark-900/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent pointer-events-none" />
        </div>
    );
}
