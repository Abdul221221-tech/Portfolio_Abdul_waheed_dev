"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Send, MessageCircle, Mail, Phone, CheckCircle } from "lucide-react";
import { database } from "../lib/firebase";
import { ref, push, serverTimestamp } from "firebase/database";

export default function Contact() {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = formRef.current;
        if (!form) return;

        const formData = new FormData(form);
        const name = formData.get('user_name') as string;
        const email = formData.get('user_email') as string;
        const message = formData.get('message') as string;

        // Basic Validation
        if (!name.trim() || !email.trim() || !message.trim()) {
            setError("All fields are required.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            // 1. Save to Firebase Realtime Database
            const messagesRef = ref(database, 'contact_messages');
            await push(messagesRef, {
                name,
                email,
                message,
                timestamp: serverTimestamp()
            });
        } catch (firebaseErr) {
            console.error("Firebase Database error:", firebaseErr);
            // We can continue to try sending the email even if database fails
        }

        try {
            // 2. Send email via EmailJS
            const publicKey = "uTUSG5mPZ6zgzuK_E";
            await emailjs.sendForm(
                "service_lukeh2i", // Service ID provided by user
                "template_vhu3cvw", // Template ID provided by user
                form,
                {
                    publicKey: publicKey,
                }
            );

            setIsSubmitting(false);
            setIsSuccess(true);
            form.reset();
            setTimeout(() => setIsSuccess(false), 5000);

        } catch (err: any) {
            setIsSubmitting(false);
            setError("Failed to send message. Please try again or contact via WhatsApp.");
            console.error("EmailJS Submission error:", err);
            if (err?.text) console.error("EmailJS Error text:", err.text);
            if (err?.message) console.error("Error message:", err.message);
        }
    };

    return (
        <motion.section
            id="contact"
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
                        Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)]">Connect</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] mx-auto rounded-full shadow-[0_0_10px_rgba(188,19,254,0.5)]"></div>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                        Ready to build intelligent digital products? Send me a message or reach out directly on WhatsApp.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">

                    {/* Contact Info & WhatsApp */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col justify-center space-y-8"
                    >
                        <div className="glass-panel p-8 rounded-2xl border border-[var(--color-neon-blue)]/30 hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] transition-shadow duration-300">
                            <Mail className="w-10 h-10 text-[var(--color-neon-cyan)] mb-4 animate-pulse-slow" />
                            <h3 className="text-2xl font-bold text-white mb-2">Email Me</h3>
                            <a href="mailto:ABDULWAHEED221221@gmail.com" className="text-gray-400 hover:text-[var(--color-neon-blue)] hover:text-glow transition-all duration-300 block mb-2 break-all">
                                ABDULWAHEED221221@gmail.com
                            </a>
                        </div>

                        <div className="glass-panel p-8 rounded-2xl border border-[var(--color-neon-purple)]/30 hover:shadow-[0_0_20px_rgba(188,19,254,0.2)] transition-shadow duration-300">
                            <Phone className="w-10 h-10 text-[var(--color-neon-purple)] mb-4 animate-pulse-slow" />
                            <h3 className="text-2xl font-bold text-white mb-2">Call Me</h3>
                            <a href="tel:+917234852368" className="text-gray-400 hover:text-[var(--color-neon-purple)] hover:text-glow-purple transition-all duration-300 block">
                                +91 7234852368
                            </a>
                        </div>

                        <a
                            href="https://wa.me/917234852368"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-4 w-full glass-panel p-6 rounded-2xl border border-green-500/50 hover:bg-green-500/10 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all duration-300 flex items-center justify-center gap-4 group"
                        >
                            <MessageCircle className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform" />
                            <span className="text-xl font-bold text-white tracking-wide">Chat on WhatsApp</span>
                        </a>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <form ref={formRef} onSubmit={sendEmail} className="glass-panel p-8 rounded-3xl neon-border">
                            <h3 className="text-3xl font-bold text-white mb-6">Send Message</h3>

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="user_name" className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        id="user_name"
                                        required
                                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-neon-blue)] focus:ring-1 focus:ring-[var(--color-neon-blue)] transition-all duration-300"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="user_email" className="block text-sm font-medium text-gray-400 mb-2">Your Email</label>
                                    <input
                                        type="email"
                                        name="user_email"
                                        id="user_email"
                                        required
                                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-neon-purple)] focus:ring-1 focus:ring-[var(--color-neon-purple)] transition-all duration-300"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        required
                                        rows={5}
                                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-neon-cyan)] focus:ring-1 focus:ring-[var(--color-neon-cyan)] transition-all duration-300 resize-none"
                                        placeholder="Hello, I'd like to talk about..."
                                    ></textarea>
                                </div>

                                {error && <p className="text-red-400 text-sm">{error}</p>}

                                {isSuccess ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="w-full py-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center justify-center gap-2 text-green-400"
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                        <span>Message sent successfully!</span>
                                    </motion.div>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 rounded-lg bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] text-white font-bold text-lg hover:shadow-[0_0_20px_rgba(188,19,254,0.6)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                                    >
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                )}
                            </div>
                        </form>
                    </motion.div>

                </div>
            </div>
        </motion.section>
    );
}
