"use client";

import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti"; // Using the library from your package.json
import styles from "./cake.module.css";

export default function Cake() {
    // --- STATE ---
    const [candlesDropped, setCandlesDropped] = useState(false); // Candles finished dropping?
    const [isBlowing, setIsBlowing] = useState(false);           // Wind animation active?
    const [candlesBlown, setCandlesBlown] = useState(false);     // Flames extinguished?
    const [cakeCut, setCakeCut] = useState(false);               // Cake cut?

    const audioRef = useRef<HTMLAudioElement | null>(null);

    // --- EFFECT: DETECT ANIMATION END ---
    useEffect(() => {
        // Candles animation is set to ~5s total in CSS (4s delay + 0.5s drop + slight buffer)
        const timer = setTimeout(() => {
            setCandlesDropped(true);
        }, 5500);
        return () => clearTimeout(timer);
    }, []);

    // --- ACTION: BLOW CANDLES ---
    const handleBlow = () => {
        // 1. Start Wind Animation
        setIsBlowing(true);

        // 2. Play Music
        if (audioRef.current) {
            audioRef.current.volume = 0.6;
            audioRef.current.play().catch(e => console.error("Audio error:", e));
        }

        // 3. Extinguish Candles (after wind starts)
        setTimeout(() => {
            setCandlesBlown(true);
        }, 300);

        // 4. Stop Wind Animation
        setTimeout(() => {
            setIsBlowing(false);
        }, 1000);
    };

    // --- ACTION: CUT CAKE ---
    const handleCut = () => {
        setCakeCut(true);

        // Explosion of confetti to celebrate
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };
        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function() {
            const timeLeft = 500; // duration
            const particleCount = 50;

            // Generate confetti from center
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.4, 0.6), y: randomInRange(0.4, 0.6) }
            }));

            clearInterval(interval);
        }, 250);
    };

    return (
        <div className="relative flex flex-col items-center justify-center pt-32">

            {/* AUDIO SOURCE */}
            <audio ref={audioRef} src="/happy_birthday.mp3" preload="auto" />

            {/* --- WIND ANIMATION --- */}
            {isBlowing && (
                <div className={styles.wind}>
                    <div className={styles.windLine}></div>
                    <div className={styles.windLine}></div>
                    <div className={styles.windLine}></div>
                </div>
            )}

            {/* --- BUTTONS CONTAINER --- */}
            <div className="absolute top-[480px] z-50 flex flex-col gap-4 items-center">

                {/* BLOW BUTTON: Visible after candles drop & before they are blown */}
                {candlesDropped && !candlesBlown && (
                    <button
                        onClick={handleBlow}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg animate-bounce transition-transform transform active:scale-95"
                    >
                        💨 Blow
                    </button>
                )}

                {/* CUT BUTTON: Visible after candles blown & before cut */}
                {candlesBlown && !cakeCut && (
                    <button
                        onClick={handleCut}
                        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-transform transform active:scale-95 animate-pulse"
                    >
                        🔪 Cut Cake
                    </button>
                )}

                {/* SUCCESS MESSAGE */}
                {cakeCut && (
                    <div className="text-2xl font-black text-pink-600 drop-shadow-md animate-bounce">
                        🎉 YAY! 🎉
                    </div>
                )}
            </div>

            {/* --- CANDLES (2 and 1) --- */}
            <div className={styles.holder}>
                <div className={styles.velas}>
                    <span className={styles.number}>2</span>
                    {/* Add "out" class if candlesBlown is true */}
                    <div className={`${styles.fuego} ${candlesBlown ? styles.out : ''}`}></div>
                    <div className={`${styles.fuego} ${candlesBlown ? styles.out : ''}`}></div>
                    <div className={`${styles.fuego} ${candlesBlown ? styles.out : ''}`}></div>
                    <div className={`${styles.fuego} ${candlesBlown ? styles.out : ''}`}></div>
                    <div className={`${styles.fuego} ${candlesBlown ? styles.out : ''}`}></div>
                </div>
                <div className={styles.velas}>
                    <span className={styles.number}>1</span>
                    <div className={`${styles.fuego} ${candlesBlown ? styles.out : ''}`}></div>
                    <div className={`${styles.fuego} ${candlesBlown ? styles.out : ''}`}></div>
                    <div className={`${styles.fuego} ${candlesBlown ? styles.out : ''}`}></div>
                    <div className={`${styles.fuego} ${candlesBlown ? styles.out : ''}`}></div>
                    <div className={`${styles.fuego} ${candlesBlown ? styles.out : ''}`}></div>
                </div>
            </div>

            {/* --- SVG CAKE --- */}
            <svg
                id="cake"
                className={styles.cakeContainer}
                version="1.1"
                width="200px"
                height="500px"
                viewBox="0 0 200 500"
                enableBackground="new 0 0 200 500"
                xmlSpace="preserve"
                style={{
                    // Simple cut animation: scale down slightly
                    transform: cakeCut ? 'scale(0.95)' : 'scale(1)',
                    transition: 'transform 0.2s ease-in-out'
                }}
            >
                {/* ... (Keep all existing SVG paths and animations unchanged) ... */}

                {/* Example path block for reference, ensure you include ALL paths from your original file */}
                <path fill="#a88679" d="M173.667-13.94c-49.298,0-102.782,0-147.334,0c-3.999,0-4-16.002,0-16.002 c44.697,0,96.586,0,147.334,0C177.667-29.942,177.668-13.94,173.667-13.94z">
                    <animate id="bizcocho_3" attributeName="d" calcMode="spline" keySplines="0 0 1 1; 0 0 1 1" begin="2.3s" dur="0.3s" fill="freeze"
                             values="M173.667-13.94c-49.298,0-102.782,0-147.334,0c-3.999,0-4-16.002,0-16.002 c44.697,0,96.586,0,147.334,0C177.667-29.942,177.668-13.94,173.667-13.94z; M173.667,411.567c-47.995,12.408-102.955,12.561-147.334,0 c-3.848-1.089-0.189-16.089,3.661-15.002c44.836,12.66,90.519,12.753,139.427,0.07 C173.293,395.631,177.541,410.566,173.667,411.567z; M173.667,427.569c-49.795,0-101.101,0-147.334,0c-3.999,0-4-16.002,0-16.002 c46.385,0,97.539,0,147.334,0C177.668,411.567,177.667,427.569,173.667,427.569z" />
                </path>
                {/* ... Include Layer 2, Layer 1, Cream Animation, etc. from your original file ... */}
                <path fill="#8b6a60" d="M100-178.521c1.858,0,3.364,1.506,3.364,3.363c0,0,0,33.17,0,44.227 c0,19.144,0,57.431,0,76.574c0,10.152,0,40.607,0,40.607c0,1.858-1.506,3.364-3.364,3.364l0,0c-1.858,0-3.364-1.506-3.364-3.364c0,0,0-30.455,0-40.607c0-19.144,0-57.432,0-76.575c0-11.057,0-44.226,0-44.226C96.636-177.015,98.142-178.521,100-178.521 L100-178.521z">
                    <animate id="relleno_2" attributeName="d" calcMode="spline" keySplines="0 0 1 1; 0 0 1 1; 0 0 0.58 1" begin="1.8s" dur="0.5s" fill="freeze" values="M100-178.521c1.858,0,3.364,1.506,3.364,3.363c0,0,0,33.17,0,44.227 c0,19.144,0,57.431,0,76.574c0,10.152,0,40.607,0,40.607c0,1.858-1.506,3.364-3.364,3.364l0,0c-1.858,0-3.364-1.506-3.364-3.364c0,0,0-30.455,0-40.607c0-19.144,0-57.432,0-76.575c0-11.057,0-44.226,0-44.226C96.636-177.015,98.142-178.521,100-178.521 L100-178.521z; M100,267.257c1.858,0,3.364,1.506,3.364,3.363c0,0,0,33.17,0,44.227 c0,19.143,0,57.43,0,76.574c0,10.151,0,40.606,0,40.606c0,1.858-1.506,3.364-3.364,3.364l0,0c-1.858,0-3.364-1.506-3.364-3.364 c0,0,0-30.455,0-40.606c0-19.145,0-57.432,0-76.576c0-11.057,0-44.225,0-44.225C96.636,268.763,98.142,267.257,100,267.257 L100,267.257z; M93.928,405.433c-0.655,6.444-0.102,9.067,2.957,11.798c0,0,8.083,5.571,16.828,3.503 c18.629-4.406,43.813,6.194,50.792,7.791c14.75,3.375,9.162,6.867,9.162,6.867c-2.412,2.258-58.328,0-73.667,0l0,0 c-1.858,0-69.995,2.133-73.667,0c0,0-3.337-2.439,6.172-5.992c11.375-4.25,52.875,8.822,47.139-9.442 c-6.333-20.167,5.226-21.514,5.226-21.514c3.435-0.915,12.78-6.663,10.923-0.546L93.928,405.433z; M102.242,427.569c5.348,0,14.079,0,17.462,0c0,0,17.026,0,27.504,0 c19.143,0,20.39-3.797,26.459,0c3,1.877,0,7.823,0,7.823c-2.412,2.258-58.328,0-73.667,0l0,0c-1.858,0-67.187,0-73.667,0 c0,0-4.125-4.983,0-7.823c5.201-3.58,16.085,0,23.725,0c8.841,0,20.762,0,20.762,0c3.686,0,8.597,0,19.511,0H102.242z" />
                </path>
                <path fill="#a88679" d="M173.667-15.929c-46.512,0-105.486,0-147.334,0c-3.999,0-4-16.002,0-16.002 c43.566,0,97.96,0,147.334,0C177.667-31.931,177.666-15.929,173.667-15.929z">
                    <animate id="bizcocho_2" attributeName="d" calcMode="spline" keySplines="0 0 1 1; 0 0 1 1; 0.25 0 0.58 1" begin="1.3s" dur="0.5s" fill="freeze" values="M173.667-15.929c-46.512,0-105.486,0-147.334,0c-3.999,0-4-16.002,0-16.002 c44.697,0,96.586,0,147.334,0C177.667-31.931,177.666-15.929,173.667-15.929z; M173.434,445.393c-47.269,8.001-105.245,8.001-147.334,0c-3.929-0.747-0.692-16.543,3.243-15.824 c43.828,8.001,92.165,8.001,140.739,0C174.029,428.918,177.377,444.726,173.434,445.393z; M173.667,449.514c-47.576-5.454-102.799-5.744-147.333,0c-3.966,0.512-3.938-15.297,0-16.002 c43.683-7.823,97.646-8.026,147.333,0C177.616,434.15,177.642,449.969,173.667,449.514z; M173.667,451.394c-49.298,0-102.782,0-147.334,0c-3.999,0-4-16.002,0-16.002 c44.697,0,96.586,0,147.334,0C177.667,435.392,177.668,451.394,173.667,451.394z" />
                </path>
                <path fill="#8b6a60" d="M101.368-73.685c0,12.164,0,15.18,0,28.519c0,22.702,0-13.661,0,8.304c0,14.48,0,18.233,0,30.512 c0,1.753-2.958,1.847-2.958,0c0-12.68,0-16.277,0-30.401c0-21.983,0,11.66,0-8.305c0-13.027,0-15.992,0-28.628 C98.411-75.883,101.368-75.592,101.368-73.685z">
                    <animate id="relleno_1" attributeName="d" calcMode="spline" keySplines="0 0 1 1; 0 0 1 1; 0 0 0.6 1" begin="0.8s" dur="0.5s" fill="freeze" values="M101.368-73.685c0,12.164,0,15.18,0,28.519c0,22.702,0-13.661,0,8.304c0,14.48,0,18.233,0,30.512 c0,1.753-2.958,1.847-2.958,0c0-12.68,0-16.277,0-30.401c0-21.983,0,11.66,0-8.305c0-13.027,0-15.992,0-28.628 C98.411-75.883,101.368-75.592,101.368-73.685z; M101.368,350.885c0,12.164,0,65.18,0,78.518c0,22.703,0-33.66,0-11.695c0,14.48,0,28.232,0,40.512 c0,1.753-2.958,1.847-2.958,0c0-12.68,0-26.277,0-40.402c0-21.982,0,31.66,0,11.695c0-13.027,0-65.992,0-78.627 C98.411,348.686,101.368,348.977,101.368,350.885z; M128.38,447.567c37.626,6.312,39.303,13.658,26.833,12.833c-22.653-1.499-13.636-0.831-23.302-0.831 c-14.48,0-17.884,0-30.163,0c-2.087,0-2.068,0-3.915,0c-13.333,0-8.963,0-23.088,0c-11.668,0-14.062,5.995-27.532,1.164 c-12.629-4.529,38.667-3.167,46.833-17.333C100.077,432.94,105.546,443.736,128.38,447.567z; M173.667,451.394c2.875,0,2.997,9.257,0,9.131c-22.662-0.956-32.09-0.956-41.756-0.956 c-14.48,0-17.884,0-30.163,0c-2.087,0-2.068,0-3.915,0c-13.333,0-8.963,0-23.088,0c-11.668,0-34.99-0.294-48.412,1.831 c-4.109,0.65-3.01-10.006,0-10.006C37.129,451.394,149.379,451.394,173.667,451.394z" />
                </path>
                <path fill="#a88679" d="M173.667,21.571c-33.174,0-111.467,0-147.334,0c-4,0-4-16.002,0-16.002c39.836,0,105.982,0,147.334,0 C177.668,5.569,177.667,21.571,173.667,21.571z">
                    <animate id="bizcocho_1" attributeName="d" calcMode="spline" keySplines="0 0 1 1; 0 0 1 1; 0 0 1 1; 0.25 0 1 1; 0 0 1 1; 0.25 0 0.6 1" begin="0s" dur="0.8s" fill="freeze" values="M173.667,21.571c-33.174,0-111.467,0-147.334,0c-4,0-4-16.002,0-16.002c39.836,0,105.982,0,147.334,0 C177.668,5.569,177.667,21.571,173.667,21.571z; M173.667,459.569c-33.197,16.002-110.782,16.002-147.334,0c-3.664-1.604,1.614-15.617,5.337-14.153 c40.702,16.002,94.289,16.104,136.505,0.103C171.917,444.1,177.271,457.832,173.667,459.569z; M171.817,475.571c-39.361-3.001-105.438-2.571-143.556,0c-3.991,0.27-7.377-14.736-3.387-15.014 c41.553-2.888,104.421-3.121,150.51-0.233C179.378,460.574,175.806,475.875,171.817,475.571z; M171.817,459.564c-38.8-12.188-104.504-13.762-143.556,0c-3.772,1.329-7.961-12.604-4.178-13.905 c40.864-14.064,105.114-15.52,151.918-0.973C179.822,445.874,175.634,460.762,171.817,459.564z; M173.667,475.571c-46.376-5.005-105.924-4.003-147.334,0c-3.981,0.385-3.479-15.421,0.479-16.002 c43.087-6.327,97.705-7.083,146.855,0.438C177.621,460.613,177.644,476,173.667,475.571z; M173.667,474.117c-46.376,1.866-105.638,2.01-147.334,0c-3.995-0.192-3.52-16.144,0.479-16.002 c43.794,1.55,96.341,1.541,145.723,0C176.532,457.99,177.663,473.956,173.667,474.117z; M173.667,475.571c-46.512,0-105.486,0-147.334,0c-3.999,0-4-16.002,0-16.002c43.566,0,97.96,0,147.334,0 C177.667,459.569,177.666,475.571,173.667,475.571z" />
                </path>
                <circle cx="100" cy="-50" r="15" fill="#fefae9">
                    <animate attributeName="cy" from="-50" to="400" begin="2.6s" dur="0.8s" fill="freeze" calcMode="spline" keySplines="0.42 0 0.58 1" />
                    <animate attributeName="r" values="15;0" begin="3.3s" dur="0.1s" fill="freeze" />
                </circle>
                <path id="crema-final" fill="#fefae9" opacity="0" transformOrigin="100 415" d="M111.547,415.233c-6.667-0.834-9.667,4.667-13.833,3.333c-19.649-6.291-8.158,22.176-14.5,22.334 c-6.667,0.166,2.833-18-13.333-22.167c-29.544-7.615-9.667,43.833-20.167,43.833c-10.333,0,8.004-55.006-16.833-39 c-7.5,4.833-9.508-3.78-9.299-7.004c0.799-12.329,23.592-7.153,38.132-7.329c10.234-0.124,20.238-1.505,38.287-2.167 c16.642-0.61,32.903,1.125,46.213,1.5c12.438,0.351,35.058-5.579,31.863,6.451c-5.532,20.833,1.25,28.216-4.409,27.883 c-7.606-0.447-6.058-37.895-20.62-23.333c-10.167,10.166-15.972-0.747-25,12C119.547,443.568,121.798,416.515,111.547,415.233z">
                    <animate attributeName="opacity" from="0" to="1" begin="3.35s" dur="0.1s" fill="freeze" />
                    <animateTransform attributeName="transform" type="scale" from="0" to="1" begin="3.4s" dur="0.5s" fill="freeze" calcMode="spline" keySplines="0.175 0.885 0.32 1.275" />
                </path>
                <rect x="10" y="475.571" fill="#fefae9" width="180" height="4" />
            </svg>
        </div>
    );
}
