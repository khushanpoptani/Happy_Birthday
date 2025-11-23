import Link from 'next/link';

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 text-center text-white">

        {/* Main Container with Glassmorphism effect */}
        <div className="w-full max-w-md rounded-2xl bg-white/10 p-8 shadow-2xl backdrop-blur-md border border-white/20">

          {/* Title */}
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight drop-shadow-lg">
            Happy Birthday! <br />
            <span className="text-yellow-300">✨ Anoliyyaaa! ✨</span>
          </h1>

          {/* Message */}
          <p className="mb-8 text-lg font-medium text-white/90 leading-relaxed">
            I created this little corner of the internet just for you.
            There is a special surprise waiting inside...
          </p>

          {/* Button */}
          <Link href="/cake">
            <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-yellow-400 px-8 py-4 font-bold text-purple-900 transition-all duration-300 hover:scale-105 hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-300/50 shadow-lg animate-bounce">
              <span className="mr-2">🎂</span>
              Go to Cake
              <svg
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </Link>
        </div>

      </main>
  );
}
