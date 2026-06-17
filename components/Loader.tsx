"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onLoadingComplete }: { onLoadingComplete: () => void }) {
    const [loadingTextIndex, setLoadingTextIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const loadingTexts = [
        "Loading Abdul Waheed Portfolio...",
        "Preparing Developer Interface..."
    ];

    useEffect(() => {
        // Sequentially change the text every 1 second
        const interval = setInterval(() => {
            setLoadingTextIndex((prev) => {
                if (prev < loadingTexts.length - 1) {
                    return prev + 1;
                }
                clearInterval(interval);
                return prev;
            });
        }, 1000);

        // Total loading time calculation (2 texts * 1000ms = 2000ms)
        const timeout = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onLoadingComplete, 500); // Wait for fade out animation before removing from DOM
        }, 2000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [loadingTexts.length, onLoadingComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030014] overflow-hidden"
                >
                    {/* Subtle Background Glows */}
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--color-neon-blue)]/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[var(--color-neon-purple)]/20 rounded-full blur-[100px]" />

                    {/* AI Circular Loader Animation */}
                    <div className="relative w-32 h-32 flex items-center justify-center mb-12">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--color-neon-blue)] border-r-[var(--color-neon-purple)]"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-4 rounded-full border-2 border-transparent border-t-[var(--color-neon-cyan)] border-l-[var(--color-neon-blue)]"
                        />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-12 h-12 rounded-full bg-gradient-to-tr from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] blur-md"
                        />
                        <div className="w-8 h-8 rounded-full bg-[#030014] absolute z-10 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.5)]" />
                    </div>

                    {/* Animated Logo Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-cyan)] text-glow">
                            AW.dev
                        </h1>
                    </motion.div>

                    {/* Typewriter Text Progression */}
                    <div className="h-8 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={loadingTextIndex}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.3 }}
                                className="text-gray-400 font-mono text-sm md:text-base tracking-wider"
                            >
                                {loadingTexts[loadingTextIndex]}
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="inline-block w-2 h-4 bg-[var(--color-neon-blue)] ml-1 align-middle"
                                />
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    {/* Progress Bar Line */}
                    <div className="absolute bottom-20 w-64 h-[2px] bg-gray-900 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="h-full bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] shadow-[0_0_10px_rgba(188,19,254,0.8)]"
                        />
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}
