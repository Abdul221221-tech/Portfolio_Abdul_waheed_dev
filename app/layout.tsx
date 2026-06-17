import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background from "@/components/Background";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Abdul Waheed | AI & Full Stack Developer",
  description: "Futuristic AI developer portfolio for Abdul Waheed. Showcasing Full Stack Development, Machine Learning, and Next.js applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased text-white bg-[#030014]`}>
        <Background />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
