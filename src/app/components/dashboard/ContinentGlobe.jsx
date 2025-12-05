'use client';
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

const ContinentGlobe = () => {
    const pointsRef = useRef();

    const positions = useMemo(() => {
        const radius = 4;
        const positions = [];

        // 🌍 Outer surface dots (like current earth shell)
        for (let lat = -60; lat <= 90; lat += 2) {
            for (let lon = -180; lon <= 180; lon += 2) {
                const phi = (90 - lat) * (Math.PI / 180);
                const theta = (lon + 180) * (Math.PI / 180);

                const x = -(radius * Math.sin(phi) * Math.cos(theta));
                const y = radius * Math.cos(phi);
                const z = radius * Math.sin(phi) * Math.sin(theta);

                positions.push(x, y, z);
            }
        }

        // 🌍 Fill inside with random scattered dots (to mimic continents/space)
        const innerDots = 5000; // number of filler dots
        for (let i = 0; i < innerDots; i++) {
            const r = Math.random() * radius; // random distance from center
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.cos(phi);
            const z = r * Math.sin(phi) * Math.sin(theta);

            positions.push(x, y, z);
        }

        return new Float32Array(positions);
    }, []);

    useFrame(() => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.001; // slow rotation
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#00bfff"
                size={0.035}
                transparent
                opacity={0.9}
            />
        </points>
    );
};

export default ContinentGlobe;
