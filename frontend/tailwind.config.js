/** @type {import('tailwindcss').Config} */
export default {

  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: ['bg-slate-500', 'bg-slate-600', 'bg-slate-700', 'bg-slate-800', 'bg-slate-900',
    'bg-gray-600', 'bg-gray-700', 'bg-gray-800', 'bg-gray-900',
    'bg-neutral-600', 'bg-neutral-700', 'bg-neutral-800', 'bg-neutral-900',
    'bg-stone-600', 'bg-stone-700', 'bg-stone-800', 'bg-stone-900',

    // Blue
    'bg-blue-600', 'bg-blue-700', 'bg-blue-800', 'bg-blue-900',

    // Green
    'bg-green-600', 'bg-green-700', 'bg-green-800', 'bg-green-900',

    // Red
    'bg-red-600', 'bg-red-700', 'bg-red-800', 'bg-red-900',

    // Amber / Yellow (darker only)
    'bg-amber-700', 'bg-amber-800', 'bg-amber-900',

    // Violet / Purple
    'bg-purple-600', 'bg-purple-700', 'bg-purple-800', 'bg-purple-900',
    'bg-violet-600', 'bg-violet-700', 'bg-violet-800', 'bg-violet-900',

    // Orange
    'bg-orange-600', 'bg-orange-700', 'bg-orange-800', 'bg-orange-900',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

