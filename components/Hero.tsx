"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const Globe = dynamic(() => import("./Globe"), { ssr: false });
import { ArrowRight, Download, Mail, Github, Linkedin, Instagram, Code2 } from "lucide-react";
import { useState, useEffect } from "react";
import MagneticButton from "./MagneticButton";

export default function Hero() {
    const [text, setText] = useState("");
    const fullText = "Aspiring Python Full Stack Developer | AI & ML Student";

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                setText(fullText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);
        return () => clearInterval(typingInterval);
    }, []);

    return (
        <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
            <Globe />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col space-y-6 text-center lg:text-left"
                    >
                        <div className="inline-block">
                            <span className="px-3 py-1 text-sm font-semibold rounded-full border border-[var(--color-neon-blue)] text-[var(--color-neon-blue)] bg-[var(--color-neon-blue)]/10 shadow-[0_0_10px_rgba(0,243,255,0.3)]">
                                AI & Full Stack Enthusiast
                            </span>
                        </div>

                        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
                            Hi, I'm <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-blue)] via-[var(--color-neon-purple)] to-[var(--color-neon-cyan)] text-glow animate-pulse-slow">
                                Abdul Waheed
                            </span>
                        </h1>

                        <div className="h-8 sm:h-12 flex items-center justify-center lg:justify-start">
                            <p className="text-xl sm:text-2xl font-medium text-gray-300">
                                {text}
                                <span className="animate-pulse inline-block ml-1 w-1 h-6 bg-[var(--color-neon-blue)] align-middle"></span>
                            </p>
                        </div>

                        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0">
                            I love building smart web applications and exploring the power of Artificial Intelligence and Machine Learning. My goal is to create intelligent digital products that combine clean design, strong functionality, and real-world problem solving.
                        </p>

                        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                            <MagneticButton as="a" href="#projects" className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-cyan)] text-black font-semibold hover:shadow-[0_0_20px_rgba(0,243,255,0.6)] transition-all duration-300 flex items-center justify-center gap-2 group">
                                View Projects
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </MagneticButton>
                            <MagneticButton as="a" href="#contact" className="w-full sm:w-auto px-6 py-3 rounded-lg neon-border text-white font-semibold hover:bg-[var(--color-neon-purple)]/10 transition-all duration-300 flex items-center justify-center gap-2">
                                Contact Me
                                <Mail className="w-5 h-5" />
                            </MagneticButton>
                            <MagneticButton as="a" href="https://drive.google.com/file/d/1FnN39ykfDfEVIWKiy-nzjldqWKomzGtm/view?usp=drivesdk" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-6 py-3 rounded-lg border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                                Resume
                                <Download className="w-5 h-5" />
                            </MagneticButton>
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-center lg:justify-start space-x-6">
                            <a href="https://www.linkedin.com/in/abdul-waheed-009301339?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#0077b5] hover:drop-shadow-[0_0_10px_rgba(0,119,181,0.8)] transition-all duration-300 transform hover:scale-110">
                                <Linkedin className="w-8 h-8" />
                            </a>
                            <a href="https://github.com/Abdul221221-tech" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 transform hover:scale-110">
                                <Github className="w-8 h-8" />
                            </a>
                            <a href="https://www.linkedin.com/in/abdul-waheed-009301339?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#E1306C] hover:drop-shadow-[0_0_10px_rgba(225,48,108,0.8)] transition-all duration-300 transform hover:scale-110">
                                <Instagram className="w-6 h-6" />
                            </a>
                        </div>

                    </motion.div>

                    {/* Image/Visual Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative hidden lg:flex items-center justify-center"
                    >
                        {/* Glowing Ring Background */}
                        <div className="absolute w-[400px] h-[400px] rounded-full border-2 border-transparent bg-gradient-to-tr from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] p-1 animate-[spin_10s_linear_infinite] opacity-50">
                            <div className="w-full h-full bg-[#030014] rounded-full"></div>
                        </div>
                        <div className="absolute w-[450px] h-[450px] rounded-full border border-[var(--color-neon-cyan)]/30 border-dashed animate-[spin_15s_linear_infinite_reverse]"></div>

                        {/* Profile Avatar / Placeholder */}
                        <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-[#030014] shadow-[0_0_30px_rgba(188,19,254,0.4)] z-10 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center object-cover">
                            {/* using a styled icon representing AI dev as a placeholder for actual image */}
                            <Code2 className="w-32 h-32 text-[var(--color-neon-cyan)] animate-pulse-slow" />
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-10 -left-10 glass-panel p-4 rounded-xl flex items-center gap-3"
                        >
                            <div className="w-3 h-3 rounded-full bg-[var(--color-neon-blue)] shadow-[0_0_10px_rgba(0,243,255,0.8)] animate-pulse"></div>
                            <span className="font-mono text-sm">AI Models</span>
                        </motion.div>

                        <motion.div
                            animate={{ y: [10, -10, 10] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-20 -right-5 glass-panel p-4 rounded-xl flex items-center gap-3"
                        >
                            <div className="w-3 h-3 rounded-full bg-[var(--color-neon-purple)] shadow-[0_0_10px_rgba(188,19,254,0.8)] animate-pulse"></div>
                            <span className="font-mono text-sm">Full Stack</span>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
