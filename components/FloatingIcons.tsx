"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import { Atom, FileCode2, Server, FileJson, Database, BrainCircuit, Cpu, Network } from "lucide-react";
import * as THREE from "three";

// Individual icon component
function FloatingTech({
    icon: Icon,
    position,
    color,
    speed,
    label
}: {
    icon: any,
    position: [number, number, number],
    color: string,
    speed: number,
    label: string
}) {
    const ref = useRef<THREE.Group>(null);

    // Subtle mouse interaction
    useFrame((state, delta) => {
        if (ref.current) {
            // Gentle rotation towards mouse position
            const targetX = (state.mouse.x * Math.PI) / 8;
            const targetY = (state.mouse.y * Math.PI) / 8;

            ref.current.rotation.y += (targetX - ref.current.rotation.y) * delta;
            ref.current.rotation.x += (targetY - ref.current.rotation.x) * delta;
        }
    });

    return (
        <group position={position} ref={ref}>
            <Float
                speed={speed} // Animation speed
                rotationIntensity={1} // XYZ rotation intensity
                floatIntensity={2} // Up/down float intensity
            >
                <Html transform center style={{ pointerEvents: 'none' }}>
                    <div className="flex flex-col items-center justify-center opacity-80" style={{ color, textShadow: `0 0 15px ${color}` }}>
                        <Icon size={48} strokeWidth={1.5} />
                        <span className="mt-2 text-xs font-bold font-mono tracking-widest">{label}</span>
                    </div>
                </Html>
            </Float>
        </group>
    );
}

function IconScene() {
    return (
        <group>
            {/* React */}
            <FloatingTech icon={Atom} position={[-4, 2, -2]} color="#61DAFB" speed={1.5} label="REACT" />
            {/* Python */}
            <FloatingTech icon={FileCode2} position={[5, 3, -4]} color="#FFD43B" speed={2} label="PYTHON" />
            {/* Node.js */}
            <FloatingTech icon={Server} position={[-6, -1, -3]} color="#339933" speed={1.2} label="NODE.JS" />
            {/* JavaScript */}
            <FloatingTech icon={FileJson} position={[4, -2, -1]} color="#F7DF1E" speed={1.8} label="JS" />
            {/* MongoDB */}
            <FloatingTech icon={Database} position={[-2, -3, -2]} color="#47A248" speed={1.4} label="MONGODB" />
            {/* AI / Machine Learning */}
            <FloatingTech icon={BrainCircuit} position={[0, 4, -5]} color="#bc13fe" speed={2.5} label="AI/ML" />
            <FloatingTech icon={Cpu} position={[6, 0, -2]} color="#00f3ff" speed={1.7} label="TENSORFLOW" />
            <FloatingTech icon={Network} position={[-5, 4, -4]} color="#0ff0fc" speed={1.3} label="NEURAL" />
        </group>
    );
}

export default function FloatingIcons() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <ambientLight intensity={1} />
                <IconScene />
            </Canvas>
        </div>
    );
}
