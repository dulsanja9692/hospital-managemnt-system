/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Futuristic Cyber-Palette
        primary: "#020617",    // Deeper Midnight for background
        sidebar: "#0f172a",   // Original sidebar dark blue
        accent: "#a855f7",    // Neon Purple (The --accent variable)
        "accent-glow": "rgba(168, 85, 247, 0.4)",
        "medical-blue": "#3b82f6",
        "glass-border": "rgba(255, 255, 255, 0.1)",
      },
      backgroundImage: {
        // Holographic & Scanning Gradients
        'cyber-gradient': 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
        'neon-glow': 'radial-gradient(circle at center, var(--accent) 0%, transparent 70%)',
        'glass-shine': 'linear-gradient(110deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)',
      },
      boxShadow: {
        // Neon depth effects
        'neon-purple': '0 0 20px rgba(168, 85, 247, 0.3)',
        'neon-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glass-inner': 'inset 0 0 20px rgba(255, 255, 255, 0.02)',
      },
      animation: {
        // Sci-Fi UI Movements
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scanline 8s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      }
    },
  },
  plugins: [],
}