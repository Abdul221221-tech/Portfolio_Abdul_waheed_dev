import { Github, Linkedin, Instagram, Code2, Heart } from "lucide-react";
import CodeRain from "./CodeRain";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-gray-800 bg-[#030014]/90 backdrop-blur-md pt-12 pb-8 overflow-hidden z-20">
            <CodeRain opacity={0.05} />
            {/* Top glowing line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-neon-blue)] to-transparent opacity-50"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">

                    {/* Logo & Brand */}
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <Code2 className="w-8 h-8 text-[var(--color-neon-blue)] group-hover:text-[var(--color-neon-purple)] transition-colors duration-300" />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] text-glow">
                            AW.dev
                        </span>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-6">
                        <a
                            href="https://www.linkedin.com/in/abdul-waheed-009301339?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-gray-800/80 p-3 rounded-full hover:bg-[var(--color-neon-blue)]/20 hover:text-[var(--color-neon-blue)] transition-all duration-300 border border-gray-700 hover:border-[var(--color-neon-blue)]/50 hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] group"
                        >
                            <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </a>
                        <a
                            href="https://github.com/Abdul221221-tech"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-gray-800/80 p-3 rounded-full hover:bg-[var(--color-neon-purple)]/20 hover:text-[var(--color-neon-purple)] transition-all duration-300 border border-gray-700 hover:border-[var(--color-neon-purple)]/50 hover:shadow-[0_0_15px_rgba(188,19,254,0.3)] group"
                        >
                            <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/abdul-waheed-009301339?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-400 hover:text-[#e1306c] transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_15px_rgba(225,48,108,0.5)] rounded-full p-2"
                            aria-label="Instagram"
                        >
                            <Instagram className="w-6 h-6" />
                        </a>
                    </div>

                </div>

                {/* Separator */}
                <div className="w-full h-[1px] bg-gray-800 mb-8"></div>

                {/* Bottom Text */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© {currentYear} Abdul Waheed. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
