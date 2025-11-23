"use client";

import React, { useEffect, useState, useRef } from "react";
import { Luckiest_Guy } from "next/font/google";
import confetti from "canvas-confetti";

// Initialize Fancy Font
const fancyFont = Luckiest_Guy({ subsets: ["latin"], weight: "400" });

// Helper for random numbers
const random = (min: number, max: number) => Math.random() * (max - min) + min;

export default function CakePageBackground() {
    // --- STATE ---
    const [balloons, setBalloons] = useState<Array<{
        id: number;
        left: number;
        speed: number;
        delay: number;
        hue: number;
        scale: number;
        wobbleSpeed: number;
    }>>([]);

    const textLines = ["HAPPY", "BIRTHDAY"];
    let charGlobalIndex = 0;

    // Refs for cleanup and canvas access
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // --- EFFECT 1: INITIALIZE BALLOONS & FIREWORKS ---
    useEffect(() => {
        // A. Generate Balloons
        const balloonCount = 20;
        const newBalloons = Array.from({ length: balloonCount }).map((_, i) => {
            const speed = random(15, 25);
            return {
                id: i,
                left: random(0, 100),
                speed: speed,
                delay: random(0, speed) * -1, // Negative delay for instant screen fill
                hue: random(0, 360),
                scale: random(0.5, 1.5),
                wobbleSpeed: random(2, 4)
            };
        });
        setBalloons(newBalloons);

        // B. Firework Loop Logic
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        const fire = () => {
            confetti({
                particleCount: random(50, 100),
                spread: random(100, 160),
                startVelocity: random(30, 45),
                origin: { y: 1, x: random(0.1, 0.9) },
                colors: [colors[Math.floor(random(0, colors.length))], colors[Math.floor(random(0, colors.length))]],
                gravity: 1.2,
                decay: 0.90,
                ticks: 100,
                zIndex: 1,
                shapes: ['circle'],
                scalar: random(0.8, 1.2)
            });
            // Randomize next firework time
            timeoutRef.current = setTimeout(fire, random(500, 2500));
        };

        // Start Fireworks
        fire();

        // Cleanup
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            confetti.reset();
        };
    }, []);


    // --- EFFECT 2: MOUSE & TOUCH TRAIL (CANVAS) ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set Canvas Size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles: Array<any> = [];

        // Handle Resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // Particle Creator
        const createParticles = (x: number, y: number) => {
            for (let i = 0; i < 3; i++) {
                particles.push({
                    x: x,
                    y: y,
                    size: Math.random() * 5 + 1,
                    speedX: Math.random() * 3 - 1.5,
                    speedY: Math.random() * 3 - 1.5,
                    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                    shrink: 0.1
                });
            }
        };

        // Mouse Listener
        const handleMouseMove = (e: MouseEvent) => {
            createParticles(e.clientX, e.clientY);
        };

        // Touch Listener (Mobile Support)
        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            createParticles(touch.clientX, touch.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Physics
                p.x += p.speedX;
                p.y += p.speedY;
                p.size -= p.shrink;

                // Remove dead particles
                if (p.size < 0.1) {
                    particles.splice(i, 1);
                    i--;
                }
            }
            requestAnimationFrame(animate);
        };
        animate();

        // Cleanup Listeners
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-gradient-to-br from-rose-300 via-purple-300 to-indigo-400 bg-[length:400%_400%] animate-gradient-xy">

            {/* --- CSS ANIMATIONS --- */}
            <style jsx>{`
                @keyframes gradient-xy {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient-xy {
                    animation: gradient-xy 15s ease infinite;
                }

                @keyframes infiniteFloat {
                    0% { transform: translateY(110vh); }
                    100% { transform: translateY(-20vh); }
                }
                @keyframes gentleWobble {
                    0%, 100% { transform: translateX(-5px) rotate(-5deg); }
                    50% { transform: translateX(5px) rotate(5deg); }
                }
                .balloon-container {
                    position: absolute;
                    top: 0;
                    will-change: transform;
                    animation-name: infiniteFloat;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }

                @keyframes dance {
                    0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
                    25% { transform: translateY(-10px) rotate(-3deg) scale(1.1); }
                    75% { transform: translateY(5px) rotate(3deg) scale(0.95); }
                }
                .animate-dance {
                    display: inline-block;
                    animation: dance 2s ease-in-out infinite;
                }

                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
            `}</style>

            {/* 1. MAGIC DUST CANVAS (Z-Index 20) */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-20 pointer-events-none"
            />

            {/* 2. BOKEH ORBS (Z-Index 0) */}
            <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            {/* 3. BACKGROUND TEXT (Z-Index 0) */}
            <div className="absolute inset-0 flex flex-col items-center justify-start pt-16 md:pt-24 select-none z-0">
                {textLines.map((line, lineIdx) => (
                    <div key={lineIdx} className="flex justify-center w-full mb-2 md:mb-4">
                        {line.split("").map((char, charIdx) => {
                            const delay = charGlobalIndex * 0.1;
                            charGlobalIndex++;
                            return (
                                <span
                                    key={charIdx}
                                    className={`${fancyFont.className} text-[13vw] md:text-[9rem] font-black animate-dance leading-none 
                  text-transparent bg-clip-text bg-gradient-to-b from-purple-600/40 to-pink-600/40
                  drop-shadow-sm`}
                                    style={{ animationDelay: `${delay}s`, padding: '0 0.5vw' }}
                                >
                  {char}
                </span>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* 4. VIGNETTE OVERLAY (Z-Index 0) */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_20%,_rgba(0,0,0,0.15)_100%)] z-0" />

            {/* 5. BALLOONS (Z-Index 10) */}
            {balloons.map((b) => (
                <div
                    key={b.id}
                    className="balloon-container z-10"
                    style={{
                        left: `${b.left}%`,
                        animationDuration: `${b.speed}s`,
                        animationDelay: `${b.delay}s`,
                    }}
                >
                    <div
                        style={{
                            transform: `scale(${b.scale})`,
                            animation: `gentleWobble ${b.wobbleSpeed}s ease-in-out infinite alternate`
                        }}
                    >
                        <img
                            src="/balloon.png"
                            alt="balloon"
                            className="w-24 h-auto drop-shadow-lg opacity-90"
                            style={{ filter: `hue-rotate(${b.hue}deg)` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
