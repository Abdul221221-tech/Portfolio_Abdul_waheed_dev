"use client";

import { motion } from "framer-motion";
import { BookOpen, Briefcase, Code, BarChart, MessagesSquare } from "lucide-react";
import CodeRain from "./CodeRain";

export default function Experience() {
    const experiences = [
        {
            year: "2026",
            title: "Python Full Stack Training",
            subtitle: "QSpiders, Noida",
            description: "Currently pursuing professional training in Python Full Stack Development at QSpiders, Noida, learning modern backend, frontend, and full-stack development technologies.",
            icon: <BookOpen className="w-6 h-6 text-[#00f3ff]" />,
            color: "var(--color-neon-blue)"
        },
        {
            year: "2026",
            title: "SEO & Digital Marketing Intern",
            subtitle: "Digital Marketing Agency",
            description: "Worked on SEO and digital marketing projects, gaining practical experience in search engine optimization, content strategy, and online visibility improvement.",
            icon: <BarChart className="w-6 h-6 text-[#bc13fe]" />,
            color: "var(--color-neon-purple)"
        },
        {
            year: "2025",
            title: "Web Development Projects",
            subtitle: "Freelance & Personal",
            description: "Developed multiple web development projects including e-commerce platforms, AI tools, and modern web applications using frontend and backend technologies.",
            icon: <Code className="w-6 h-6 text-[#0ff0fc]" />,
            color: "var(--color-neon-cyan)"
        },
        {
            year: "2025",
            title: "Machine Learning Project Intern",
            subtitle: "IBM",
            description: "Currently working on a Credit Card Scoring & Risk Management System focusing on predictive analytics and machine learning models to evaluate financial risk.",
            icon: <Briefcase className="w-6 h-6 text-[#00f3ff]" />,
            color: "var(--color-neon-blue)"
        },
        {
            year: "2024",
            title: "Communication Skills Development",
            subtitle: "Touchstone",
            description: "Completed communication and personality development training from Touchstone, improving professional communication and presentation skills.",
            icon: <MessagesSquare className="w-6 h-6 text-[#bc13fe]" />,
            color: "var(--color-neon-purple)"
        }
    ];

    return (
        <motion.section
            id="experience"
            className="py-24 relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
        >
            <CodeRain opacity={0.05} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-blue)]">Journey</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-blue)] mx-auto rounded-full shadow-[0_0_10px_rgba(188,19,254,0.5)]"></div>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Glowing Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[var(--color-neon-blue)] to-transparent transform md:-translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(0,243,255,0.8)] opacity-50"></div>

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, y: 20 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                className={`relative flex flex-col md:flex-row items-center justify-between w-full group ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Center Icon Node */}
                                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#030014] bg-gray-900 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-20 transition-transform duration-300 group-hover:scale-110" style={{ boxShadow: `0 0 15px ${exp.color}80` }}>
                                    {exp.icon}
                                </div>

                                {/* Empty Space for the other side */}
                                <div className="hidden md:block w-5/12"></div>

                                {/* Content Card */}
                                <div className="w-full pl-16 md:pl-0 md:w-5/12 pb-8 mt-4 md:mt-0">
                                    <div className="glass-panel p-6 rounded-2xl border border-gray-800 hover:border-gray-600 transition-colors duration-300 relative overflow-hidden group-hover:shadow-[0_0_30px_rgba(0,243,255,0.1)]">
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"
                                            style={{ background: `linear-gradient(45deg, transparent, ${exp.color}, transparent)` }}
                                        ></div>

                                        <span className="inline-block px-3 py-1 mb-4 text-xs font-bold rounded-full bg-gray-800 text-white" style={{ boxShadow: `0 0 10px ${exp.color}40`, border: `1px solid ${exp.color}40` }}>
                                            {exp.year}
                                        </span>

                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-glow transition-all duration-300" style={{ textShadow: `0 0 10px ${exp.color}50` }}>
                                            {exp.title}
                                        </h3>

                                        <h4 className="text-sm font-medium text-[var(--color-neon-blue)] mb-4">
                                            {exp.subtitle}
                                        </h4>

                                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>

                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
