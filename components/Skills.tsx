"use client";

import { motion, Variants } from "framer-motion";
import { Layout, Server, Database, Terminal, TrendingUp } from "lucide-react";
import SkillsGraph from "./SkillsGraph";

export default function Skills() {
    const skills = [
        {
            title: "Frontend Development",
            icon: <Layout className="w-8 h-8 text-[var(--color-neon-blue)]" />,
            tech: "React • HTML • CSS • JavaScript",
            description: "Creating responsive, modern, and user-friendly web interfaces.",
            glowColor: "var(--color-neon-blue)",
        },
        {
            title: "Backend Development",
            icon: <Server className="w-8 h-8 text-[var(--color-neon-purple)]" />,
            tech: "Node.js • Django • Python",
            description: "Building scalable server-side applications and APIs.",
            glowColor: "var(--color-neon-purple)",
        },
        {
            title: "Database",
            icon: <Database className="w-8 h-8 text-[var(--color-neon-cyan)]" />,
            tech: "MongoDB • Firebase • SQL",
            description: "Designing and managing efficient data storage systems.",
            glowColor: "var(--color-neon-cyan)",
        },
        {
            title: "Tools & Platforms",
            icon: <Terminal className="w-8 h-8 text-white" />,
            tech: "Git • Replit • Vercel • AI Platforms",
            description: "Using modern development tools and AI-powered platforms to build and deploy applications efficiently.",
            glowColor: "#ffffff",
        },
        {
            title: "Digital & Growth Skills",
            icon: <TrendingUp className="w-8 h-8 text-yellow-400" />,
            tech: "SEO • Digital Marketing",
            description: "Understanding search optimization, online visibility, and digital growth strategies.",
            glowColor: "#facc15",
        },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } // Custom easing for extra smoothness
        }
    };

    return (
        <motion.section
            id="skills"
            className="py-24 relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)]">Arsenal</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] mx-auto rounded-full shadow-[0_0_10px_rgba(0,243,255,0.5)]"></div>
                </motion.div>

                <div className="mb-16">
                    <SkillsGraph />
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.02,
                                boxShadow: `0 0 25px ${skill.glowColor}40`,
                                borderColor: skill.glowColor
                            }}
                            className="glass-panel p-8 rounded-2xl border border-gray-800 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
                        >
                            {/* Background Glow Effect on Hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"
                                style={{ background: `radial-gradient(circle at center, ${skill.glowColor}, transparent 70%)` }}
                            ></div>

                            <div className="mb-6 inline-block p-4 rounded-xl bg-gray-900/50 border border-gray-800 shadow-inner group-hover:scale-110 transition-transform duration-300">
                                {skill.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">
                                {skill.title}
                            </h3>

                            <p className="text-sm font-semibold mb-4" style={{ color: skill.glowColor, textShadow: `0 0 10px ${skill.glowColor}80` }}>
                                {skill.tech}
                            </p>

                            <p className="text-gray-400 text-base leading-relaxed mt-auto">
                                {skill.description}
                            </p>

                            {/* Animated Bottom Border */}
                            <div
                                className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                                style={{ backgroundColor: skill.glowColor, boxShadow: `0 -2px 10px ${skill.glowColor}` }}
                            ></div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}
