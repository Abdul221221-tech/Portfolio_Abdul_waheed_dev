"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

function NetworkGlobe() {
    const groupRef = useRef<THREE.Group>(null);
    const mouse = useRef({ x: 0, y: 0 });

    // Add mouse interaction
    useFrame((state, delta) => {
        if (groupRef.current) {
            // Base slow rotation
            groupRef.current.rotation.y += delta * 0.1;

            // Target rotation based on mouse position
            const targetX = state.mouse.y * 0.5;
            const targetY = state.mouse.x * 0.5;

            // Smooth interpolation for mouse interaction
            groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * delta * 2;
            groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * delta * 2;
        }
    });

    // Generate points for the globe
    const { points, lines } = useMemo(() => {
        const pointCount = 100;
        const radius = 2.5;
        const pts: THREE.Vector3[] = [];
        const connectionLines: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];

        // Create points using golden spiral method
        const phi = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < pointCount; i++) {
            const y = 1 - (i / (pointCount - 1)) * 2;
            const r = Math.sqrt(1 - y * y);
            const theta = phi * i;

            const x = Math.cos(theta) * r;
            const z = Math.sin(theta) * r;

            pts.push(new THREE.Vector3(x * radius, y * radius, z * radius));
        }

        // Connect close points
        for (let i = 0; i < pts.length; i++) {
            for (let j = i + 1; j < pts.length; j++) {
                const distance = pts[i].distanceTo(pts[j]);
                if (distance < 1.2) {
                    connectionLines.push({ start: pts[i], end: pts[j] });
                }
            }
        }

        return { points: pts, lines: connectionLines };
    }, []);

    return (
        <group ref={groupRef}>
            {/* Glow sphere in the center */}
            <Sphere args={[2.4, 32, 32]}>
                <meshBasicMaterial color="#0ff0fc" transparent opacity={0.03} />
            </Sphere>

            {/* Nodes */}
            {points.map((point, i) => (
                <mesh key={i} position={point}>
                    <sphereGeometry args={[0.03, 8, 8]} />
                    <meshBasicMaterial
                        color={i % 3 === 0 ? "#bc13fe" : "#00f3ff"}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            ))}

            {/* Connection Lines */}
            {lines.map((line, i) => (
                <Line
                    key={`line-${i}`}
                    points={[line.start, line.end]}
                    color="#0ff0fc"
                    transparent
                    opacity={0.15}
                    lineWidth={1}
                />
            ))}
        </group>
    );
}

export default function Globe() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30 flex items-center justify-center">
            <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <NetworkGlobe />
            </Canvas>
        </div>
    );
}
