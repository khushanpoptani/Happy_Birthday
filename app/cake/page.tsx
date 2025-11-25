// cake/page.tsx
"use client";

import Link from "next/link";
import CakePageBackground from "@/components/cake_page_background";
import Cake from "@/components/Cake"; // Import the new component

export default function CakePage() {
    return (
        <main className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center">

            {/* 1. BACKGROUND */}
            <CakePageBackground />

            {/* 2. THE CAKE ANIMATION */}
            <div className="relative z-10 scale-125 md:scale-150 mt-20">
                <Cake />
            </div>

        </main>
    );
}
