"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({
    children,
    className,
    as: Component = "button",
    ...props
}: any) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();

        // Calculate the center of the element
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        // Apply a subtle movement map (divide by a factor to keep it magnetic and not jumpy)
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    // We wrap the component in a motion.div
    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="inline-block" // Ensures wrapper matches button dimensions
        >
            <Component className={className} {...props}>
                {children}
            </Component>
        </motion.div>
    );
}
