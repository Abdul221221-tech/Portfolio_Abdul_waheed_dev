"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

type Message = {
    id: string;
    type: "bot" | "user";
    text: string;
};

const PREDEFINED_QUESTIONS = [
    "Tell me about Abdul Waheed",
    "What technologies does he use?",
    "Show his projects",
    "How can I contact him?"
];

const PREDEFINED_ANSWERS: Record<string, string> = {
    "Tell me about Abdul Waheed": "Abdul Waheed is an aspiring Python Full Stack Developer and AI & ML Student. He loves building smart web applications and exploring Artificial Intelligence to create intelligent digital products.",
    "What technologies does he use?": "He specializes in Frontend (React, HTML/CSS/JS), Backend (Node.js, Django, Python), and Database management (MongoDB, Firebase, SQL), alongside AI platforms and tools like Git and Vercel.",
    "Show his projects": "Check out the Projects section! He has built an AI Image Generator Platform using OpenAI API, a Credit Risk ML Model, and a full-stack E-Commerce Web App.",
    "How can I contact him?": "You can reach out via the Contact section below, email him at ABDULWAHEED221221@gmail.com, or use the WhatsApp click-to-chat button (+91 7234852368)."
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            type: "bot",
            text: "Hi, I'm Abdul's AI assistant. I can tell you about his projects, skills, and experience. How can I help you today?"
        }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleQuestionClick = (question: string) => {
        // Add user message
        const userMsg: Message = { id: Date.now().toString(), type: "user", text: question };
        setMessages(prev => [...prev, userMsg]);

        // Simulate thinking delay
        setTimeout(() => {
            const response = PREDEFINED_ANSWERS[question] || "I don't have that information right now, but please reach out to Abdul directly!";
            const botMsg: Message = { id: (Date.now() + 1).toString(), type: "bot", text: response };
            setMessages(prev => [...prev, botMsg]);
        }, 600);
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] flex items-center justify-center shadow-[0_0_20px_rgba(188,19,254,0.5)] hover:shadow-[0_0_30px_rgba(0,243,255,0.8)] transition-shadow duration-300"
                    >
                        <MessageSquare className="w-6 h-6 text-white" />
                        <span className="absolute -top-1 -right-1 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-neon-cyan)] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-[var(--color-neon-cyan)]"></span>
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-[500px] max-h-[80vh] flex flex-col glass-panel rounded-2xl overflow-hidden border border-[var(--color-neon-purple)]/30 shadow-[0_0_40px_rgba(188,19,254,0.15)]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-black/40">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-neon-blue)] to-[var(--color-neon-cyan)] flex items-center justify-center shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                                    <Bot className="w-5 h-5 text-black" />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium text-sm">AI Assistant</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></span>
                                        <span className="text-xs text-gray-400">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`flex gap-2 max-w-[85%] ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                        <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${msg.type === "user"
                                                ? "bg-gray-700"
                                                : "bg-[var(--color-neon-purple)]/20 border border-[var(--color-neon-purple)]"
                                            }`}>
                                            {msg.type === "user" ? <User className="w-4 h-4 text-gray-300" /> : <Bot className="w-4 h-4 text-[var(--color-neon-purple)]" />}
                                        </div>
                                        <div className={`p-3 rounded-2xl text-sm ${msg.type === "user"
                                                ? "bg-gradient-to-br from-gray-700 to-gray-800 text-white rounded-tr-sm"
                                                : "bg-black/50 border border-gray-800 text-gray-300 rounded-tl-sm shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]"
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input / Quick Actions */}
                        <div className="p-4 border-t border-gray-800 bg-black/40">
                            <div className="text-xs text-gray-500 mb-2 px-1">Ask a question:</div>
                            <div className="flex flex-wrap gap-2">
                                {PREDEFINED_QUESTIONS.map((q, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleQuestionClick(q)}
                                        className="text-xs bg-[var(--color-neon-blue)]/10 hover:bg-[var(--color-neon-blue)]/20 border border-[var(--color-neon-blue)]/30 text-[var(--color-neon-blue)] px-3 py-1.5 rounded-full transition-colors truncate max-w-full text-left"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
