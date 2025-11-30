// components/main_background.tsx
'use client';

import React, { ReactNode, useState, useEffect } from 'react';

interface MainBackgroundProps {
    children: ReactNode;
}

export default function MainBackground({ children }: MainBackgroundProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    // We use isMounted to ensure the mask only applies on the client side
    // to prevent server/client mismatch errors.
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Set initial position to center of screen roughly so it's not stuck at 0,0 on load
        if (typeof window !== 'undefined') {
            setMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
        }
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // The size of the "flashlight" beam
    const SPOTLIGHT_SIZE = '500px';

    // The CSS mask style. It creates a radial gradient that is solid black in the center
    // (which means 'show image' in mask terms) and transparent on the edges.
    const maskStyle = isMounted ? {
        WebkitMaskImage: `radial-gradient(circle ${SPOTLIGHT_SIZE} at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 70%)`,
        maskImage: `radial-gradient(circle ${SPOTLIGHT_SIZE} at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 70%)`,
    } : {};


    return (
        <main
            onMouseMove={handleMouseMove}
            // The base background is solid black
            className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-white"
        >

            {/* --- LAYER 1 (Optional): The faint outline layer ---
          If you want the background to be PURE black outside the spotlight, remove this block.
          Keeping it adds a 5% opacity grayscale version of the image so you can barely see shapes in the dark.
      */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-5 grayscale"
                style={{ backgroundImage: "url('/main_bg_image.jpg')" }}
            />

            {/* --- LAYER 2: The Revealed Image Layer ---
          This layer has the full color image, but it is hidden by the mask
          except where the mouse is positioned.
      */}
            <div
                className="absolute inset-0 z-10 bg-cover bg-center transition-opacity duration-200"
                style={{
                    backgroundImage: "url('/main_bg_image.jpg')",
                    ...maskStyle
                }}
            />

            {/* --- LAYER 3: Noise Texture ---
          Adds a little grit to the darkness.
      */}
            <div className="absolute inset-0 z-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none" />

            {/* --- CONTENT CONTAINER ---
          Ensure content is well above the background layers (z-30)
      */}
            <div className="relative z-30 w-full flex flex-col items-center">
                {children}
            </div>
        </main>
    );
}
