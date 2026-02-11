import React from 'react';
import { ThemeConfig, FlowerType } from './types';

// --- Flower Components (Simple SVGs) ---
// Updated viewBox to 0 0 100 160 to show full stems

const Rose: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 160" className={className} fill="currentColor">
    <path d="M50 20C40 20 35 30 35 35C35 45 45 50 50 50C55 50 65 45 65 35C65 30 60 20 50 20Z" fill="#E11D48" />
    <path d="M50 50C40 50 30 60 30 70C30 85 45 90 50 90C55 90 70 85 70 70C70 60 60 50 50 50Z" fill="#BE123C" />
    <path d="M50 90L50 150" stroke="#15803D" strokeWidth="4" />
    <path d="M50 110Q30 100 30 120" stroke="#15803D" strokeWidth="4" fill="none" />
    <path d="M50 130Q70 120 70 140" stroke="#15803D" strokeWidth="4" fill="none" />
  </svg>
);

const Sunflower: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 160" className={className} fill="none">
    <circle cx="50" cy="50" r="15" fill="#451a03" />
    <path d="M50 20L55 35H45L50 20Z" fill="#f59e0b" />
    <path d="M80 50L65 55V45L80 50Z" fill="#f59e0b" />
    <path d="M50 80L45 65H55L50 80Z" fill="#f59e0b" />
    <path d="M20 50L35 45V55L20 50Z" fill="#f59e0b" />
    <path d="M71 29L60 40L65 35L71 29Z" fill="#fbbf24" />
    <path d="M71 71L65 65L60 60L71 71Z" fill="#fbbf24" />
    <path d="M29 71L35 60L40 65L29 71Z" fill="#fbbf24" />
    <path d="M29 29L40 35L35 40L29 29Z" fill="#fbbf24" />
    <path d="M50 85L50 150" stroke="#166534" strokeWidth="4" />
  </svg>
);

const Tulip: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 160" className={className} fill="none">
    <path d="M35 30C35 30 35 60 50 60C65 60 65 30 65 30C65 30 50 20 35 30Z" fill="#db2777" />
    <path d="M50 60L50 150" stroke="#166534" strokeWidth="4" />
    <path d="M50 140Q30 100 30 80" stroke="#166534" strokeWidth="4" fill="none" />
  </svg>
);

const Daisy: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 160" className={className} fill="none">
    <circle cx="50" cy="50" r="8" fill="#fbbf24" />
    <circle cx="50" cy="30" r="8" fill="white" />
    <circle cx="70" cy="50" r="8" fill="white" />
    <circle cx="50" cy="70" r="8" fill="white" />
    <circle cx="30" cy="50" r="8" fill="white" />
    <circle cx="64" cy="36" r="8" fill="white" />
    <circle cx="64" cy="64" r="8" fill="white" />
    <circle cx="36" cy="64" r="8" fill="white" />
    <circle cx="36" cy="36" r="8" fill="white" />
    <path d="M50 60L50 150" stroke="#15803D" strokeWidth="3" />
  </svg>
);

const Lavender: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 160" className={className} fill="none">
    <path d="M50 90L50 150" stroke="#15803D" strokeWidth="3" />
    <ellipse cx="50" cy="80" rx="3" ry="5" fill="#8b5cf6" />
    <ellipse cx="50" cy="70" rx="3" ry="5" fill="#8b5cf6" />
    <ellipse cx="50" cy="60" rx="3" ry="5" fill="#8b5cf6" />
    <ellipse cx="50" cy="50" rx="3" ry="5" fill="#8b5cf6" />
    <ellipse cx="50" cy="40" rx="3" ry="5" fill="#8b5cf6" />
    <ellipse cx="45" cy="75" rx="3" ry="5" fill="#a78bfa" />
    <ellipse cx="55" cy="65" rx="3" ry="5" fill="#a78bfa" />
    <ellipse cx="45" cy="55" rx="3" ry="5" fill="#a78bfa" />
  </svg>
);

// --- New Flowers ---

const AbstractGeo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 160" className={className} fill="none">
     <line x1="50" y1="150" x2="50" y2="80" stroke="#1F2937" strokeWidth="2" />
     <rect x="40" y="40" width="20" height="40" fill="#F59E0B" />
     <circle cx="50" cy="40" r="20" fill="#EF4444" opacity="0.9" />
     <circle cx="65" cy="60" r="10" fill="#3B82F6" />
     <path d="M30 60 L50 80 L70 60" stroke="#1F2937" strokeWidth="2" fill="none" />
  </svg>
);

const PastelRose: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 160" className={className} fill="none">
    <path d="M50 90L50 150" stroke="#A7F3D0" strokeWidth="4" />
    <path d="M50 25C40 25 35 35 35 40C35 50 45 55 50 55C55 55 65 50 65 40C65 35 60 25 50 25Z" fill="#FDA4AF" />
    <path d="M50 55C40 55 30 65 30 75C30 90 45 95 50 95C55 95 70 90 70 75C70 65 60 55 50 55Z" fill="#FECDD3" />
    <path d="M50 95 L50 90" stroke="#A7F3D0" strokeWidth="4" />
  </svg>
);

const PastelHydrangea: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 100 160" className={className} fill="none">
        <path d="M50 80L50 150" stroke="#A7F3D0" strokeWidth="4" />
        <circle cx="50" cy="50" r="30" fill="#DDD6FE" />
        <circle cx="35" cy="40" r="12" fill="#C4B5FD" />
        <circle cx="65" cy="40" r="12" fill="#C4B5FD" />
        <circle cx="35" cy="65" r="12" fill="#E9D5FF" />
        <circle cx="65" cy="65" r="12" fill="#E9D5FF" />
        <circle cx="50" cy="30" r="12" fill="#E9D5FF" />
        <circle cx="50" cy="70" r="12" fill="#C4B5FD" />
    </svg>
);

const WatercolorHibiscus: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 100 160" className={className} fill="none">
         <path d="M55 90L55 150" stroke="#86EFAC" strokeWidth="3" opacity="0.6"/>
         <path d="M20 30 Q50 50 80 30 Q70 70 50 80 Q30 70 20 30" fill="#FB7185" opacity="0.4" />
         <path d="M30 40 Q50 10 70 40 Q60 80 50 90 Q40 80 30 40" fill="#F43F5E" opacity="0.4" />
         <line x1="50" y1="80" x2="50" y2="40" stroke="#FFE4E6" strokeWidth="4" opacity="0.8" />
         <circle cx="50" cy="40" r="4" fill="#FEF08A" opacity="0.8" />
    </svg>
);

const WatercolorBlue: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 100 160" className={className} fill="none">
        <path d="M50 90L50 150" stroke="#6EE7B7" strokeWidth="3" opacity="0.5" />
        <circle cx="40" cy="40" r="25" fill="#93C5FD" opacity="0.3" />
        <circle cx="60" cy="35" r="22" fill="#60A5FA" opacity="0.3" />
        <circle cx="50" cy="60" r="28" fill="#3B82F6" opacity="0.2" />
        <circle cx="30" cy="55" r="20" fill="#2563EB" opacity="0.1" />
        <circle cx="70" cy="50" r="18" fill="#1D4ED8" opacity="0.1" />
    </svg>
);

// --- Detailed Vector Flowers (Requested Style) ---

const DetailedHibiscus: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 160" className={className} fill="none">
    {/* Leaves */}
    <path d="M20 75 Q10 90 30 90 Q50 85 40 70" fill="#15803d" />
    <path d="M80 75 Q90 90 70 90 Q50 85 60 70" fill="#15803d" />
    
    {/* Petals */}
    <g>
      <path d="M50 55 C30 25 10 45 20 65 C40 75 50 60 50 55" fill="#be123c" />
      <path d="M50 55 C70 25 90 45 80 65 C60 75 50 60 50 55" fill="#be123c" />
      <path d="M50 55 C30 15 60 5 70 35 C75 45 60 55 50 55" fill="#fb7185" />
      <path d="M50 55 C70 15 40 5 30 35 C25 45 40 55 50 55" fill="#fb7185" />
      <path d="M50 55 C20 55 20 85 50 95 C80 85 80 55 50 55" fill="#e11d48" />
    </g>

    {/* Stamen */}
    <path d="M50 55 Q55 35 52 15" stroke="#fef08a" strokeWidth="2.5" fill="none" />
    <circle cx="52" cy="15" r="3" fill="#facc15" />
    <circle cx="50" cy="20" r="2" fill="#facc15" />
    <circle cx="54" cy="20" r="2" fill="#facc15" />
  </svg>
);

const TropicalPlumeria: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 160" className={className} fill="none">
    <g transform="rotate(10 50 50)">
      <path d="M50 50 C40 30 45 10 60 20 C70 30 60 45 50 50" fill="#fefce8" stroke="#fde047" strokeWidth="0.5" />
      <path d="M50 50 C70 40 90 45 85 60 C80 75 60 60 50 50" fill="#fefce8" stroke="#fde047" strokeWidth="0.5" />
      <path d="M50 50 C60 80 50 95 35 85 C25 75 40 60 50 50" fill="#fefce8" stroke="#fde047" strokeWidth="0.5" />
      <path d="M50 50 C30 70 10 60 15 45 C20 30 40 45 50 50" fill="#fefce8" stroke="#fde047" strokeWidth="0.5" />
      <path d="M50 50 C30 30 30 10 45 15 C55 20 45 40 50 50" fill="#fefce8" stroke="#fde047" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="10" fill="url(#plumeriaCenter)" />
      <defs>
        <radialGradient id="plumeriaCenter">
          <stop offset="0%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#fefce8" stopOpacity="0" />
        </radialGradient>
      </defs>
    </g>
  </svg>
);

const RedPoppy: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 160" className={className} fill="none">
     <path d="M50 90 L50 150" stroke="#166534" strokeWidth="3" />
     <path d="M50 55 C20 30 20 80 50 90 C80 80 80 30 50 55" fill="#dc2626" />
     <path d="M50 55 C10 55 10 20 50 40" fill="#ef4444" />
     <path d="M50 55 C90 55 90 20 50 40" fill="#ef4444" />
     <path d="M50 40 C30 10 70 10 50 40" fill="#b91c1c" />
     <circle cx="50" cy="55" r="8" fill="#1a1a1a" />
     <circle cx="50" cy="55" r="10" fill="#1a1a1a" opacity="0.5" />
  </svg>
);

const MonsteraLeaf: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 160" className={className} fill="none">
    <defs>
      <mask id="monstera-leaf-mask">
        <rect width="100" height="160" fill="white" />
        <path d="M80 35 Q70 40 75 30" fill="black" />
        <circle cx="30" cy="35" r="3" fill="black" /> 
        <circle cx="70" cy="45" r="2" fill="black" /> 
        <ellipse cx="25" cy="50" rx="3" ry="5" fill="black" /> 
      </mask>
    </defs>
    <path d="M50 95 C50 95 45 60 20 50 C5 40 10 10 40 20 C45 22 50 25 50 35 C50 25 55 22 60 20 C90 10 95 40 80 50 C55 60 50 95 50 95" fill="#15803d" mask="url(#monstera-leaf-mask)" />
    <path d="M50 35 L50 95" stroke="#14532d" strokeWidth="1" mask="url(#monstera-leaf-mask)" />
  </svg>
);


export const FLOWERS: FlowerType[] = [
  { id: 'rose', name: 'Rose', component: Rose },
  { id: 'sunflower', name: 'Sunflower', component: Sunflower },
  { id: 'tulip', name: 'Tulip', component: Tulip },
  { id: 'daisy', name: 'Daisy', component: Daisy },
  { id: 'lavender', name: 'Lavender', component: Lavender },
  // Styled
  { id: 'detailed-hibiscus', name: 'Hibiscus', component: DetailedHibiscus },
  { id: 'tropical-plumeria', name: 'Plumeria', component: TropicalPlumeria },
  { id: 'red-poppy', name: 'Poppy', component: RedPoppy },
  { id: 'monstera-leaf', name: 'Monstera', component: MonsteraLeaf },
  // Watercolor / Soft
  { id: 'abstract-geo', name: 'Abstract', component: AbstractGeo },
  { id: 'pastel-rose', name: 'Pastel Rose', component: PastelRose },
  { id: 'pastel-hydrangea', name: 'Soft Hydrangea', component: PastelHydrangea },
  { id: 'watercolor-hibiscus', name: 'Watercolor Red', component: WatercolorHibiscus },
  { id: 'watercolor-blue', name: 'Watercolor Blue', component: WatercolorBlue },
];

// --- Themes ---

const softswiss: ThemeConfig = {
  id: 'soft-swiss',
  name: 'Soft Swiss Pop',
  category: 'Minimal / Modern',
  colors: {
    bg: '#F3F4F6', // Light gray/off-white background
    text: '#111827', // Dark charcoal text
    accent: '#F472B6', // Soft Pink accent
    secondary: '#60A5FA', // Soft Blue secondary
    border: '#000000', // Hard black border
    card: '#FFFFFF', // White cards
  },
  typography: {
    heading: 'font-display', // Inter -> Space Grotesk/Inter
    body: 'font-flat',
    letter: 'font-flat',
    weight: 'font-bold',
    letterSpacing: 'tracking-tight',
    textTransform: 'none',
  },
  flower: {
    filter: 'none',
    shadow: '2px 2px 0px rgba(0,0,0,0.1)',
    border: 'none',
  },
  canvas: {
    bg: '#FFFFFF',
    border: '2px solid #000000',
    borderRadius: 'rounded-xl',
    shadow: 'shadow-[6px_6px_0_rgba(0,0,0,0.1)]',
    pattern: 'dots',
  },
  button: {
    bg: 'bg-black',
    text: 'text-white',
    border: 'border-2 border-black',
    borderRadius: 'rounded-full',
    hover: 'hover:bg-gray-800',
  },
  letterBox: {
    bg: 'bg-white',
    border: 'border-2 border-black',
    borderRadius: 'rounded-xl',
    fontStyle: 'normal',
  },
};


const bauhaus: ThemeConfig = {
  id: 'bauhaus',
  name: 'Bauhaus',
  category: 'Minimal / Modern',
  colors: {
    bg: '#faf9f6',
    text: '#1a1a1a',
    accent: '#be1e2d',
    secondary: '#21409a',
    border: '#1a1a1a',
    card: '#ffffff',
  },
  typography: {
    heading: 'font-bauhaus',
    body: 'font-bauhaus',
    letter: 'font-bauhaus',
    weight: 'font-bold',
    letterSpacing: 'tracking-wide',
    textTransform: 'uppercase',
  },
  flower: {
    filter: 'none',
    shadow: 'none',
    border: '3px solid #1a1a1a',
  },
  canvas: {
    bg: '#ffffff',
    border: '4px solid #1a1a1a',
    borderRadius: 'rounded-none',
    shadow: 'shadow-none',
  },
  button: {
    bg: 'bg-bh-red',
    text: 'text-white',
    border: 'border-2 border-bh-black',
    borderRadius: 'rounded-none',
    hover: 'hover:bg-bh-blue',
  },
  letterBox: {
    bg: 'bg-white',
    border: 'border-4 border-bh-black',
    borderRadius: 'rounded-none',
    fontStyle: 'normal',
  },
};

const midcentury: ThemeConfig = {
  id: 'midcentury',
  name: 'Mid-Century Modern',
  category: 'Minimal / Modern',
  colors: {
    bg: '#faf3e0',
    text: '#2c2c2c',
    accent: '#e3a72f',
    secondary: '#008080',
    border: '#2c2c2c',
    card: '#fff8ee',
  },
  typography: {
    heading: 'font-midcentury',
    body: 'font-bauhaus',
    letter: 'font-midcentury',
    weight: 'font-normal',
    letterSpacing: 'tracking-normal',
    textTransform: 'none',
  },
  flower: {
    filter: 'saturate(0.8)',
    shadow: '2px 4px 8px rgba(0,0,0,0.1)',
  },
  canvas: {
    bg: '#fff8ee',
    border: '2px solid #2c2c2c',
    borderRadius: 'rounded-2xl',
    shadow: 'shadow-[4px_4px_0_rgba(44,44,44,0.2)]',
  },
  button: {
    bg: 'bg-mc-mustard',
    text: 'text-white',
    border: 'border-none',
    borderRadius: 'rounded-full',
    hover: 'hover:bg-mc-teal',
  },
  letterBox: {
    bg: 'bg-[#fff8ee]',
    border: 'border-b-2 border-[#e3a72f]',
    borderRadius: 'rounded-none',
    fontStyle: 'italic',
  },
};

const flat: ThemeConfig = {
  id: 'flat',
  name: 'Flat Design',
  category: 'Minimal / Modern',
  colors: {
    bg: '#ecf0f1',
    text: '#2c3e50',
    accent: '#3498db',
    secondary: '#2ecc71',
    border: 'transparent',
    card: '#ffffff',
  },
  typography: {
    heading: 'font-flat',
    body: 'font-flat',
    letter: 'font-flat',
    weight: 'font-medium',
    letterSpacing: 'tracking-normal',
    textTransform: 'none',
  },
  flower: {
    filter: 'none',
    shadow: 'none',
  },
  canvas: {
    bg: '#ffffff',
    border: 'none',
    borderRadius: 'rounded-2xl',
    shadow: 'shadow-sm',
  },
  button: {
    bg: 'bg-flat-river',
    text: 'text-white',
    border: 'border-none',
    borderRadius: 'rounded-lg',
    hover: 'hover:bg-flat-emerald',
  },
  letterBox: {
    bg: 'bg-white',
    border: 'border-none',
    borderRadius: 'rounded-xl',
    fontStyle: 'normal',
  },
};

const maximalismo: ThemeConfig = {
  id: 'maximalismo',
  name: 'Maximalismo',
  category: 'Minimal / Modern',
  colors: {
    bg: '#1a0533',
    bgGradient: 'linear-gradient(135deg, #1a0533, #4a0e4e, #0d2137)',
    text: '#ffffff',
    accent: '#ffd700',
    secondary: '#ff00ff',
    border: '#ffd700',
    card: 'rgba(255,255,255,0.05)',
  },
  typography: {
    heading: 'font-serif',
    body: 'font-flat',
    letter: 'font-serif',
    weight: 'font-normal',
    letterSpacing: 'tracking-wide',
    textTransform: 'none',
  },
  flower: {
    filter: 'saturate(1.5) brightness(1.1)',
    shadow: '0 0 20px rgba(255,0,255,0.3)',
  },
  canvas: {
    bg: 'rgba(255,255,255,0.05)',
    border: '2px solid #ffd700',
    borderRadius: 'rounded-3xl',
    shadow: 'shadow-2xl',
  },
  button: {
    bg: 'bg-max-gold',
    text: 'text-black',
    border: 'border-none',
    borderRadius: 'rounded-full',
    hover: 'hover:bg-max-fuchsia hover:text-white',
  },
  letterBox: {
    bg: 'bg-black/20',
    border: 'border border-[#ffd700]/30',
    borderRadius: 'rounded-2xl',
    fontStyle: 'italic',
  },
};

const cyberpunk: ThemeConfig = {
  id: 'cyberpunk',
  name: 'Cyberpunk',
  category: 'Bold / Experimental',
  colors: {
    bg: '#0a0a0a',
    bgGradient: 'linear-gradient(180deg, #0a0a0a 0%, #1a0030 100%)',
    text: '#00ffff',
    accent: '#ff00ff',
    secondary: '#39ff14',
    border: '#ff00ff',
    card: 'rgba(0,255,255,0.05)',
  },
  typography: {
    heading: 'font-cyber',
    body: 'font-cyber',
    letter: 'font-cyber',
    weight: 'font-normal',
    letterSpacing: 'tracking-widest',
    textTransform: 'uppercase',
  },
  flower: {
    filter: 'brightness(1.2) contrast(1.3)',
    shadow: '0 0 15px #ff00ff, 0 0 30px #00ffff',
    animation: 'neon-pulse',
  },
  canvas: {
    bg: 'rgba(0,255,255,0.03)',
    border: '1px solid #ff00ff',
    borderRadius: 'rounded-none',
    shadow: 'shadow-[0_0_30px_rgba(255,0,255,0.3)]',
    pattern: 'cyber-grid',
  },
  button: {
    bg: 'bg-transparent',
    text: 'text-neon-cyan',
    border: 'border-2 border-neon-pink',
    borderRadius: 'rounded-none',
    hover: 'hover:bg-neon-pink hover:text-black',
  },
  letterBox: {
    bg: 'bg-black/50',
    border: 'border border-[#00ffff]/30',
    borderRadius: 'rounded-none',
    fontStyle: 'normal',
  },
};

const brutalism: ThemeConfig = {
  id: 'brutalism',
  name: 'Neo-Brutalism',
  category: 'Bold / Experimental',
  colors: {
    bg: '#ffffff',
    text: '#000000',
    accent: '#FF5E5E', // Softer/modern red
    secondary: '#888888',
    border: '#000000',
    card: '#E0E7FF', // Soft blue card
  },
  typography: {
    heading: 'font-brutal',
    body: 'font-brutal',
    letter: 'font-brutal',
    weight: 'font-bold',
    letterSpacing: 'tracking-tight',
    textTransform: 'uppercase',
  },
  flower: {
    filter: 'contrast(1.2) drop-shadow(4px 4px 0px #000)',
    shadow: 'none',
    border: '3px solid #000000',
  },
  canvas: {
    bg: '#F3F4F6',
    border: '4px solid #000000',
    borderRadius: 'rounded-none',
    shadow: 'shadow-[8px_8px_0_#000000]',
  },
  button: {
    bg: 'bg-[#B4F8C8]', // Pastel Green
    text: 'text-black',
    border: 'border-4 border-black',
    borderRadius: 'rounded-none',
    hover: 'hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[4px_4px_0_#000]',
  },
  letterBox: {
    bg: 'bg-white',
    border: 'border-4 border-black',
    borderRadius: 'rounded-none',
    fontStyle: 'normal',
  },
};

const antidesign: ThemeConfig = {
  id: 'anti-design',
  name: 'Anti-Design',
  category: 'Bold / Experimental',
  colors: {
    bg: '#000000',
    text: '#ccff00',
    accent: '#ff0090',
    secondary: '#7df9ff',
    border: '#ccff00',
    card: '#111111',
  },
  typography: {
    heading: 'font-display',
    body: 'font-cyber',
    letter: 'font-display',
    weight: 'font-bold',
    letterSpacing: 'tracking-normal',
    textTransform: 'none',
  },
  flower: {
    filter: 'hue-rotate(90deg) saturate(2)',
    shadow: '0 0 10px #ff0090',
  },
  canvas: {
    bg: '#111111',
    border: '3px dashed #ccff00',
    borderRadius: 'rounded-none',
    shadow: 'shadow-none',
  },
  button: {
    bg: 'bg-ad-lime',
    text: 'text-black',
    border: 'border-none',
    borderRadius: 'rounded-none',
    hover: 'hover:bg-ad-magenta hover:text-white',
  },
  letterBox: {
    bg: 'bg-[#111111]',
    border: 'border-2 border-dashed border-[#ccff00]',
    borderRadius: 'rounded-none',
    fontStyle: 'normal',
  },
};

const grunge: ThemeConfig = {
  id: 'grunge',
  name: 'Grunge',
  category: 'Bold / Experimental',
  colors: {
    bg: '#d4c5a9',
    text: '#2c2c2c',
    accent: '#8b4513',
    secondary: '#556b2f',
    border: '#3e2723',
    card: '#c4b896',
  },
  typography: {
    heading: 'font-mono',
    body: 'font-mono',
    letter: 'font-mono',
    weight: 'font-normal',
    letterSpacing: 'tracking-wide',
    textTransform: 'none',
  },
  flower: {
    filter: 'sepia(0.4) saturate(0.7)',
    shadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  canvas: {
    bg: '#c4b896',
    border: '2px solid #3e2723',
    borderRadius: 'rounded-sm',
    shadow: 'shadow-inner',
    pattern: 'noise',
  },
  button: {
    bg: 'bg-grunge-brown',
    text: 'text-grunge-paper',
    border: 'border-2 border-grunge-brown',
    borderRadius: 'rounded-sm',
    hover: 'hover:bg-grunge-olive',
  },
  letterBox: {
    bg: 'bg-[#d4c5a9]',
    border: 'border border-[#3e2723]/40',
    borderRadius: 'rounded-sm',
    fontStyle: 'normal',
  },
};

const popart: ThemeConfig = {
  id: 'pop-art',
  name: 'Pop Art',
  category: 'Artistic Styles',
  colors: {
    bg: '#ffea00',
    text: '#000000',
    accent: '#ff1744',
    secondary: '#2979ff',
    border: '#000000',
    card: '#ffffff',
  },
  typography: {
    heading: 'font-display',
    body: 'font-brutal',
    letter: 'font-brutal',
    weight: 'font-bold',
    letterSpacing: 'tracking-wide',
    textTransform: 'uppercase',
  },
  flower: {
    filter: 'saturate(1.8) contrast(1.2)',
    shadow: '3px 3px 0 #000000',
    border: '3px solid #000000',
  },
  canvas: {
    bg: '#ffffff',
    border: '4px solid #000000',
    borderRadius: 'rounded-xl',
    shadow: 'shadow-[6px_6px_0_#000000]',
    pattern: 'halftone',
  },
  button: {
    bg: 'bg-pop-red',
    text: 'text-white',
    border: 'border-3 border-black',
    borderRadius: 'rounded-xl',
    hover: 'hover:bg-pop-blue',
  },
  letterBox: {
    bg: 'bg-white',
    border: 'border-4 border-black',
    borderRadius: 'rounded-xl',
    fontStyle: 'normal',
  },
};

const artnouveau: ThemeConfig = {
  id: 'art-nouveau',
  name: 'Art Nouveau',
  category: 'Artistic Styles',
  colors: {
    bg: '#f5f0e1',
    text: '#3e3e3e',
    accent: '#c4694f',
    secondary: '#9caf88',
    border: '#c4694f',
    card: '#faf5e8',
  },
  typography: {
    heading: 'font-serif',
    body: 'font-serif',
    letter: 'font-serif',
    weight: 'font-normal',
    letterSpacing: 'tracking-wide',
    textTransform: 'none',
  },
  flower: {
    filter: 'sepia(0.15) saturate(0.9)',
    shadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  canvas: {
    bg: '#faf5e8',
    border: '2px solid #c4694f',
    borderRadius: 'rounded-[2rem]',
    shadow: 'shadow-lg',
  },
  button: {
    bg: 'bg-[#c4694f]',
    text: 'text-white',
    border: 'border-none',
    borderRadius: 'rounded-full',
    hover: 'hover:bg-[#9caf88]',
  },
  letterBox: {
    bg: 'bg-[#faf5e8]',
    border: 'border border-[#c4694f]/30',
    borderRadius: 'rounded-2xl',
    fontStyle: 'italic',
  },
};

const artdeco: ThemeConfig = {
  id: 'art-deco',
  name: 'Art Deco',
  category: 'Artistic Styles',
  colors: {
    bg: '#1a1a2e',
    text: '#fdf5e6',
    accent: '#d4af37',
    secondary: '#fdf5e6',
    border: '#d4af37',
    card: 'rgba(212,175,55,0.05)',
  },
  typography: {
    heading: 'font-display',
    body: 'font-flat',
    letter: 'font-display',
    weight: 'font-normal',
    letterSpacing: 'tracking-[0.2em]',
    textTransform: 'uppercase',
  },
  flower: {
    filter: 'brightness(1.1)',
    shadow: '0 0 15px rgba(212,175,55,0.3)',
  },
  canvas: {
    bg: 'rgba(212,175,55,0.05)',
    border: '2px solid #d4af37',
    borderRadius: 'rounded-none',
    shadow: 'shadow-[0_0_30px_rgba(212,175,55,0.15)]',
  },
  button: {
    bg: 'bg-gold',
    text: 'text-deco-black',
    border: 'border-2 border-gold',
    borderRadius: 'rounded-none',
    hover: 'hover:bg-transparent hover:text-gold',
  },
  letterBox: {
    bg: 'bg-transparent',
    border: 'border border-[#d4af37]/40',
    borderRadius: 'rounded-none',
    fontStyle: 'normal',
  },
};

const collage: ThemeConfig = {
  id: 'collage',
  name: 'Collage',
  category: 'Artistic Styles',
  colors: {
    bg: '#f5e6c8',
    text: '#2c2c2c',
    accent: '#c4694f',
    secondary: '#4a6741',
    border: '#2c2c2c',
    card: '#ffffff',
  },
  typography: {
    heading: 'font-mono',
    body: 'font-mono',
    letter: 'font-mono',
    weight: 'font-normal',
    letterSpacing: 'tracking-normal',
    textTransform: 'none',
  },
  flower: {
    filter: 'none',
    shadow: '2px 2px 0 rgba(0,0,0,0.2)',
    border: '1px solid #2c2c2c',
  },
  canvas: {
    bg: '#f5e6c8',
    border: '1px dashed #2c2c2c',
    borderRadius: 'rounded-sm',
    shadow: 'shadow-none',
  },
  button: {
    bg: 'bg-collage-ink',
    text: 'text-collage-kraft',
    border: 'border-none',
    borderRadius: 'rounded-sm',
    hover: 'hover:bg-[#c4694f]',
  },
  letterBox: {
    bg: 'bg-white',
    border: 'border border-dashed border-[#2c2c2c]',
    borderRadius: 'rounded-sm',
    fontStyle: 'normal',
  },
};

const y2k: ThemeConfig = {
  id: 'y2k',
  name: 'Y2K',
  category: 'Nostalgic / Trend',
  colors: {
    bg: '#ffe6f0',
    bgGradient: 'linear-gradient(135deg, #ffe6f0, #e6e6ff, #e6fff0)',
    text: '#6b4c9a',
    accent: '#ff69b4',
    secondary: '#00bfff',
    border: '#bf5fff',
    card: 'rgba(255,255,255,0.6)',
  },
  typography: {
    heading: 'font-y2k',
    body: 'font-y2k',
    letter: 'font-y2k',
    weight: 'font-semibold',
    letterSpacing: 'tracking-wide',
    textTransform: 'none',
  },
  flower: {
    filter: 'brightness(1.1) saturate(1.2)',
    shadow: '0 0 10px rgba(191,95,255,0.3)',
  },
  canvas: {
    bg: 'rgba(255,255,255,0.5)',
    border: '2px solid #bf5fff',
    borderRadius: 'rounded-3xl',
    shadow: 'shadow-lg',
  },
  button: {
    bg: 'bg-y2k-pink',
    text: 'text-white',
    border: 'border-2 border-y2k-purple',
    borderRadius: 'rounded-full',
    hover: 'hover:bg-y2k-blue',
  },
  letterBox: {
    bg: 'bg-white/50',
    border: 'border border-[#bf5fff]/30',
    borderRadius: 'rounded-2xl',
    fontStyle: 'normal',
  },
};

const superflat: ThemeConfig = {
  id: 'superflat',
  name: 'Superflat Pop-up',
  category: 'Nostalgic / Trend',
  colors: {
    bg: '#ffffff',
    text: '#000000',
    accent: '#ed1c24',
    secondary: '#0055a4',
    border: '#000000',
    card: '#ffffff',
  },
  typography: {
    heading: 'font-superflat',
    body: 'font-flat',
    letter: 'font-flat',
    weight: 'font-bold',
    letterSpacing: 'tracking-normal',
    textTransform: 'none',
  },
  flower: {
    filter: 'saturate(1.5)',
    shadow: 'none',
    border: '2px solid #000000',
  },
  canvas: {
    bg: '#ffffff',
    border: '3px solid #000000',
    borderRadius: 'rounded-2xl',
    shadow: 'shadow-none',
  },
  button: {
    bg: 'bg-sf-red',
    text: 'text-white',
    border: 'border-2 border-black',
    borderRadius: 'rounded-full',
    hover: 'hover:bg-sf-blue',
  },
  letterBox: {
    bg: 'bg-white',
    border: 'border-2 border-black',
    borderRadius: 'rounded-xl',
    fontStyle: 'normal',
  },
};

export const THEMES: ThemeConfig[] = [
  softswiss,
  bauhaus,
  midcentury,
  flat,
  maximalismo,
  cyberpunk,
  brutalism,
  antidesign,
  grunge,
  popart,
  artnouveau,
  artdeco,
  collage,
  y2k,
  superflat,
];

export const CATEGORIES = [
  'Minimal / Modern',
  'Bold / Experimental',
  'Artistic Styles',
  'Nostalgic / Trend'
];