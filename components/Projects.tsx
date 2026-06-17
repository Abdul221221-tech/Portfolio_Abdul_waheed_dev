"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import CodeRain from "./CodeRain";

// Helper component for the 3D Tilt Effect
function TiltCard({ children }: { children: React.ReactNode }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{
                perspective: 1000,
            }}
            className="group h-full"
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full rounded-2xl p-[1px] bg-gradient-to-br from-[var(--color-neon-blue)] via-gray-800 to-[var(--color-neon-purple)]"
            >
                <div className="h-full w-full rounded-2xl glass-panel overflow-hidden flex flex-col relative">
                    {children}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    const projects = [
        {
            title: "AI Image Generator SaaS",
            description: "A full-stack SaaS platform utilizing advanced machine learning models to generate high-quality images from text descriptions. Features user authentication, token-based credits, and an interactive modern canvas.",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
            tags: ["Next.js", "React", "Node.js", "MongoDB", "OpenAI API", "TailwindCSS"],
            github: "https://github.com/AbdulWaheed/ai-image-gen",
            live: "https://ai-waheed.vercel.app",
            glowColor: "var(--color-neon-blue)"
        },
        {
            title: "Credit Risk Scoring System",
            description: "A machine learning pipeline built during my IBM internship. It analyzes financial data to predict credit default risk with over 90% accuracy, providing explainable AI (XAI) insights.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
            tags: ["Python", "Pandas", "Scikit-Learn", "Django", "PostgreSQL"],
            github: "https://github.com/Abdul221221-tech/credit-risk-prediction-with-dataset",
            live: "#",
            glowColor: "var(--color-neon-purple)"
        },
        {
            title: "Smart E-Commerce Platform",
            description: "A next-generation e-commerce web app with an AI-powered recommendation engine, real-time inventory tracking, and seamless payment gateway integration using Stripe.",
            image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800",
            tags: ["React", "Firebase", "Stripe API", "Redux"],
            github: "https://github.com/AbdulWaheed/smart-ecommerce",
            live: "#",
            glowColor: "var(--color-neon-cyan)"
        },
        {
            title: "Gradient Color Generator",
            description: "A modern frontend tool for creating, customizing, and previewing CSS gradients in real time with random color generation and copy-ready code output.",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
            tags: ["HTML", "CSS", "JavaScript", "UI", "Responsive"],
            github: "https://github.com/Abdul221221-tech/Color_gradeint",
            live: "#",
            glowColor: "var(--color-neon-green)"
        },
        {
            title: "Todo List Web Application",
            description: "A clean, responsive task manager built with HTML, CSS, and JavaScript that saves items in browser localStorage for persistence after refresh.",
            image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800",
            tags: ["HTML", "CSS", "JavaScript", "localStorage", "Responsive"],
            github: "https://github.com/Abdul221221-tech/javascript-todo-list",
            live: "#",
            glowColor: "var(--color-neon-orange)"
        },
        {
            title: "More Projects on GitHub",
            description: "Explore my full portfolio of projects and contributions on GitHub. Click to view my profile and see all completed work.",
            image: "https://images.unsplash.com/photo-1517430816045-df4b7de01ca8?auto=format&fit=crop&q=80&w=800",
            tags: ["GitHub", "Portfolio", "Open Source", "Projects"],
            github: "https://github.com/Abdul221221-tech",
            live: "https://github.com/Abdul221221-tech",
            glowColor: "var(--color-neon-yellow)"
        }
    ];

    return (
        <motion.section
            id="projects"
            className="py-24 relative z-10 hidden-scrollbar section-bg-blur"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
        >
            <CodeRain opacity={0.05} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-neon-blue)]">Projects</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-neon-blue)] mx-auto rounded-full shadow-[0_0_10px_rgba(15,240,252,0.5)]"></div>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                        A showcase of my recent work bridging the gap between intelligent algorithms and beautiful user interfaces.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50, boxShadow: "0 0 0px transparent" }}
                            whileInView={{ opacity: 1, y: 0, boxShadow: `0 0 20px ${project.glowColor}40` }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                            className="h-full rounded-2xl"
                        >
                            <TiltCard>
                                {/* Image Section */}
                                <div className="relative h-48 w-full overflow-hidden border-b border-gray-800">
                                    <div className="absolute inset-0 bg-gray-900 animate-pulse"></div>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110"
                                        style={{ filter: "brightness(0.8) contrast(1.2)" }}
                                    />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1e] to-transparent opacity-80"></div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 flex flex-col flex-grow relative z-10" style={{ transform: "translateZ(30px)" }}>
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-glow transition-colors duration-300" style={{ textShadow: `0 0 10px ${project.glowColor}50` }}>
                                        {project.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6" style={{ transform: "translateZ(20px)" }}>
                                        {project.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 text-xs rounded-md border border-gray-700 bg-gray-900/50 text-gray-300"
                                                style={{ borderColor: `color-mix(in srgb, ${project.glowColor} 30%, transparent)` }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-4 mt-auto" style={{ transform: "translateZ(40px)" }}>
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium transition-colors"
                                        >
                                            <Github className="w-4 h-4" />
                                            Code
                                        </a>
                                        {project.live !== "#" && (
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[var(--color-neon-blue)] text-[var(--color-neon-blue)] hover:bg-[var(--color-neon-blue)]/10 font-medium transition-colors shadow-[0_0_10px_rgba(0,243,255,0.2)] hover:shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Live
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
