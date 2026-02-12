import React, { useState, useEffect, useRef } from 'react';
import { THEMES, FLOWERS, CATEGORIES } from './constants';
import { BouquetData, FlowerData, ThemeConfig } from './types';
import { encodeBouquet, decodeBouquet, generateRandomPosition, generateSmartPosition } from './utils';
import { Share2, Flower as FlowerIcon, Check, Copy, ArrowLeft, Eye, RefreshCw, X, Wand2, Hand, Palette, PenTool, Type, Heart, Shuffle, Download } from 'lucide-react';
import kjua from 'kjua';
import { nanoid } from 'nanoid';

// --- Components ---

const KjuaQR = ({ text, fill, back, size = 200 }: { text: string, fill: string, back?: string, size?: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear existing QR
    containerRef.current.innerHTML = '';

    // Generate new QR
    const qr = kjua({
      text,
      fill: fill || '#000000',
      size,
      rounded: 30, // As requested
      render: 'image', // Makes it easier to download/copy
      ecLevel: 'L', // Lowest for simplicity
      back: back || '#ffffff' // Use provided background or white
    });

    containerRef.current.appendChild(qr);
  }, [text, fill, back, size]);

  return <div ref={containerRef} className="flex items-center justify-center p-4 bg-white rounded-2xl" />;
};

const FallingParticles = () => {
  const particles = React.useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 10 + Math.random() * 20,
      type: ['circle', 'square', 'triangle', 'cross'][Math.floor(Math.random() * 4)],
      size: 20 + Math.random() * 40,
      // Swiss Pop Palette: Red, Blue, Yellow, Black
      color: ['#FF3B30', '#007AFF', '#FFCC00', '#000000'][Math.floor(Math.random() * 4)],
      rotation: Math.random() * 360,
    }));
  }, []);

  const ShapeIcon = ({ type, className }: { type: string, className?: string }) => {
    if (type === 'circle') return <div className={`${className} rounded-full bg-current`} />;
    if (type === 'square') return <div className={`${className} bg-current`} />;
    if (type === 'triangle') return (
      <div className={className} style={{ width: 0, height: 0, backgroundColor: 'transparent', borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '20px solid currentColor' }} />
    );
    return ( // Cross
      <div className={`${className} relative flex items-center justify-center`}>
        <div className="absolute w-full h-[20%] bg-current"></div>
        <div className="absolute h-full w-[20%] bg-current"></div>
      </div>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute -top-10 opacity-0 animate-fall"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            color: p.color,
            transform: `rotate(${p.rotation}deg)`,
            opacity: 0.6,
          }}
        >
          <ShapeIcon type={p.type} className="w-full h-full mix-blend-multiply" />
        </div>
      ))}
    </div>
  )
};

const Confetti = ({ colors }: { colors: string[] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];
    const particleCount = 120;

    for (let i = 0; i < particleCount; i++) {
      const isCircle = Math.random() > 0.5;
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 25,
        vy: (Math.random() - 1) * 25 - 5,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        opacity: 1,
        friction: 0.96,
        gravity: 0.8,
        shape: isCircle ? 'circle' : 'rect'
      });
    }

    let animationId: number;
    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let activeParticles = 0;

      particles.forEach(p => {
        if (p.opacity <= 0.05) return;
        activeParticles++;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.008;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }

        ctx.restore();
      });

      if (activeParticles > 0) {
        animationId = requestAnimationFrame(update);
      }
    };

    update();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [colors]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[60]" />;
};

const Header = ({ onReset, isViewMode }: { onReset?: () => void, isViewMode?: boolean }) => (
  <header className="w-full px-8 py-6 flex justify-between items-center z-50 sticky top-0 bg-[#F5F5F0]/90 backdrop-blur-md border-b-4 border-black">
    <div className="flex items-center gap-3">
      <div className="bg-black text-white p-2 shadow-[4px_4px_0px_#000]">
        <FlowerIcon className="w-6 h-6 fill-current" />
      </div>
      <h1 className="text-3xl font-display font-black tracking-tighter text-black uppercase">BouqLink</h1>
    </div>
    {!isViewMode && onReset && (
      <button
        onClick={onReset}
        title="Start Over"
        className="p-2 rounded-full text-black hover:bg-black hover:text-white transition-all border-2 border-transparent hover:border-black"
      >
        <RefreshCw size={18} />
      </button>
    )}
  </header>
);

const Hero = ({ onStart }: { onStart: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-[90vh] p-6 bg-[#F5F5F0] relative overflow-hidden">

    <FallingParticles />

    {/* Swiss Pop Background Elements */}
    <div className="absolute top-0 left-0 w-64 h-64 bg-[#FF3B30] rounded-full mix-blend-multiply opacity-80 -translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#007AFF] mix-blend-multiply opacity-80 translate-x-1/3 translate-y-1/3 rotate-12"></div>
    <div className="absolute top-1/4 right-10 w-32 h-32 bg-[#FFCC00] rounded-full mix-blend-multiply opacity-80"></div>
    <div className="absolute bottom-20 left-20 w-48 h-12 bg-black -rotate-6"></div>

    <div className="relative z-10 text-center max-w-5xl flex flex-col items-center">
      <div className="mb-8 animate-fade-in-up bg-black text-white px-4 py-1 rotate-3 shadow-[6px_6px_0px_#FF3B30]">
        <p className="font-display font-bold tracking-widest uppercase text-sm">Digital Floristry</p>
      </div>

      <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-display font-black mb-6 leading-[0.85] text-black tracking-tighter animate-fade-in-up uppercase mix-blend-hard-light" style={{ animationDelay: '0.1s' }}>
        Bouq<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B30] to-[#FF3B30]">Link</span>
      </h1>

      <div className="flex items-center justify-center gap-4 md:gap-8 mb-12 opacity-90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="h-[2px] w-12 md:w-24 bg-black"></div>
        <p className="text-lg md:text-3xl font-display font-bold text-black uppercase tracking-tight">
          Send Flowers.<br />No Water Required.
        </p>
        <div className="h-[2px] w-12 md:w-24 bg-black"></div>
      </div>

      <button
        onClick={onStart}
        className="group relative px-12 py-6 bg-black text-white text-xl font-display font-bold uppercase tracking-widest hover:bg-[#007AFF] transition-colors shadow-[8px_8px_0px_#000000] hover:shadow-[12px_12px_0px_#000000] hover:-translate-y-1 active:translate-y-0 active:shadow-none"
        style={{ animationDelay: '0.3s' }}
      >
        <span className="relative z-10">Start Curating</span>
      </button>
    </div>
  </div>
);

const PatternBackground = ({ pattern }: { pattern?: string }) => {
  if (!pattern) return null;

  if (pattern === 'dots') {
    return (
      <div className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: 'radial-gradient(#e5e7eb 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}>
      </div>
    );
  }

  if (pattern === 'noise') {
    return (
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")` }}>
      </div>
    );
  }

  if (pattern === 'cyber-grid') {
    return (
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}>
      </div>
    );
  }

  if (pattern === 'halftone') {
    return (
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, #000000 1px, transparent 1px)`,
          backgroundSize: '8px 8px'
        }}>
      </div>
    );
  }

  return null;
}

const WashiTape = ({ className, color }: { className?: string, color?: string }) => (
  <div
    className={`absolute h-8 w-28 z-20 pointer-events-none opacity-90 mix-blend-multiply ${className}`}
    style={{
      backgroundColor: color || 'rgba(230, 230, 230, 0.7)',
      maskImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 100 100' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L100 0 L100 100 L0 100 Z' fill='black'/%3E%3C/svg%3E")`,
      // Jagged edges simulated with clip-path
      clipPath: 'polygon(2% 4%, 5% 0%, 95% 1%, 100% 0%, 98% 96%, 100% 100%, 5% 99%, 0% 100%)',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
    }}
  >
    {/* Texture overlay for tape */}
    <div className="w-full h-full opacity-30"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}>
    </div>
  </div>
);

const Canvas = ({
  bouquet,
  setBouquet,
  readOnly = false,
  buildMode = 'manual',
  className = ""
}: {
  bouquet: BouquetData,
  setBouquet?: React.Dispatch<React.SetStateAction<BouquetData>>,
  readOnly?: boolean,
  buildMode?: 'auto' | 'manual',
  className?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const theme = THEMES.find(t => t.id === bouquet.themeId) || THEMES[0];

  const handleRemoveFlower = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!setBouquet) return;
    setBouquet(prev => ({
      ...prev,
      flowers: prev.flowers.filter(f => f.id !== id)
    }));
  };

  const handleMouseUp = () => {
    setDragId(null);
    window.removeEventListener('mousemove', handleGlobalMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const handleGlobalMouseMove = (e: MouseEvent) => {
    if (!dragId || !containerRef.current || !setBouquet) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Calculate percentage position
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    let y = ((e.clientY - rect.top) / rect.height) * 100;

    // Clamp to canvas boundaries (optional, but good for UX)
    // x = Math.max(0, Math.min(100, x));
    // y = Math.max(0, Math.min(100, y));

    setBouquet(prev => ({
      ...prev,
      flowers: prev.flowers.map(f =>
        f.id === dragId ? { ...f, x, y } : f
      )
    }));
  };

  const handleDragStart = (id: string, e: React.MouseEvent) => {
    if (readOnly || buildMode === 'auto') return;
    e.preventDefault(); // Prevent native drag
    e.stopPropagation();
    setDragId(id);
    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragId]); // Re-bind if dragId changes (though handlers are stable enough)

  return (
    <div
      ref={containerRef}
      // Remove onMouseMove and onMouseUp from here as they are now global
      className={`relative w-full h-full overflow-hidden transition-all duration-500 ${readOnly ? '' : `min-h-[500px] ${buildMode === 'manual' ? 'cursor-crosshair' : 'cursor-default'} ${theme.canvas.borderRadius} border`}`}
      style={{
        background: theme.canvas.bg,
        borderColor: !readOnly ? theme.colors.border : undefined,
        boxShadow: !readOnly ? theme.canvas.shadow : undefined,
      }}
    >
      <PatternBackground pattern={theme.canvas.pattern} />

      {!readOnly && bouquet.flowers.length === 0 && (
        <div className={`absolute inset-0 flex flex-col items-center justify-center opacity-40 pointer-events-none ${theme.typography.body}`} style={{ color: theme.colors.text }}>
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
            <FlowerIcon size={24} />
          </div>
          <p className="text-lg font-medium text-gray-400">Canvas Empty</p>
          <p className="text-sm text-gray-300">Add beauty from the left</p>
        </div>
      )}

      {bouquet.flowers.map(flower => {
        const FlowerDef = FLOWERS.find(f => f.id === flower.flowerId);
        if (!FlowerDef) return null;
        const Comp = FlowerDef.component;

        return (
          <div
            key={flower.id}
            onMouseDown={(e) => handleDragStart(flower.id, e)}
            style={{
              position: 'absolute',
              left: `${flower.x}%`,
              top: `${flower.y}%`,
              transform: `translate(-50%, -100%) rotate(${flower.rotation}deg) scale(${flower.scale})`,
              cursor: readOnly || buildMode === 'auto' ? 'default' : (dragId === flower.id ? 'grabbing' : 'grab'),
              zIndex: dragId === flower.id ? 50 : 10,
              transition: dragId === flower.id ? 'none' : 'transform 0.3s ease-out'
            }}
            className="group"
          >
            <div
              className={`w-24 h-48 md:w-32 md:h-64 origin-bottom pointer-events-none animate-pop`}
              style={{
                filter: theme.flower.filter,
              }}
            >
              <div style={{ filter: `drop-shadow(${theme.flower.shadow})` }} className="w-full h-full">
                <Comp className={`w-full h-full ${theme.flower.border ? 'flower-bordered' : ''}`} />
              </div>
            </div>

            {!readOnly && (
              <button
                onClick={(e) => handleRemoveFlower(flower.id, e)}
                className="absolute -top-4 -right-4 bg-white text-red-500 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-50 shadow-md border border-gray-100"
              >
                <X size={14} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

// --- Studio Components ---

const StudioPanel = ({ title, icon: Icon, children, className = "" }: { title: string, icon: any, children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-[2rem] overflow-hidden shadow-sm border-2 border-indigo-100 flex flex-col ${className}`}>
    <div className="px-6 py-4 flex items-center gap-2 border-b border-gray-50 bg-white/50 backdrop-blur-sm shrink-0">
      <Icon size={16} className="text-gray-400" />
      <h3 className="font-bold text-xs uppercase tracking-widest text-gray-400">{title}</h3>
    </div>
    <div className="p-4 flex-1 overflow-y-auto custom-scrollbar relative">
      {children}
    </div>
  </div>
);

const FlowerPicker = ({ onAdd }: { onAdd: (id: string) => void }) => (
  <div className="grid grid-cols-3 gap-3 pb-4">
    {FLOWERS.map(f => {
      const FComp = f.component;
      return (
        <button
          key={f.id}
          onClick={() => onAdd(f.id)}
          className="aspect-square flex items-center justify-center bg-gray-50 rounded-2xl border border-transparent hover:border-pink-200 hover:bg-pink-50/50 transition-all hover:-translate-y-1 group"
          title={f.name}
        >
          <div className="w-10 h-10 group-hover:scale-110 transition-transform duration-500 text-gray-700">
            <FComp />
          </div>
        </button>
      )
    })}
  </div>
);

const ThemePicker = ({ currentThemeId, onSelect }: { currentThemeId: string, onSelect: (id: string) => void }) => (
  <div className="flex flex-col gap-6 pb-4">
    {CATEGORIES.map(cat => (
      <div key={cat}>
        <h4 className="text-[10px] font-bold text-gray-400 mb-3 uppercase tracking-wider pl-1">{cat}</h4>
        <div className="grid grid-cols-2 gap-2">
          {THEMES.filter(t => t.category === cat).map(t => (
            <button
              key={t.id}
              onClick={() => onSelect(t.id)}
              className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${currentThemeId === t.id ? 'bg-gray-900 text-white shadow-lg scale-105' : 'bg-gray-50 hover:bg-white hover:shadow-md text-gray-600'}`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const SuccessOverlay = ({ bouquet, onClose, onPreview }: { bouquet: BouquetData, onClose: () => void, onPreview: () => void }) => {
  const [shareUrl, setShareUrl] = useState('');
  const theme = THEMES.find(t => t.id === bouquet.themeId) || THEMES[0];
  const qrRef = useRef<HTMLDivElement>(null);

  // Derive confetti palette from theme
  const confettiColors = [
    theme.colors.accent,
    theme.colors.secondary,
    theme.colors.text !== '#000000' && theme.colors.text !== '#ffffff' ? theme.colors.text : theme.colors.accent
  ];

  useEffect(() => {
    const hash = encodeBouquet(bouquet);
    // Use query params instead of hash for better shortener compatibility
    const url = `${window.location.origin}${window.location.pathname}?data=${hash}`;
    setShareUrl(url);
  }, [bouquet]);

  const handleDownloadQR = () => {
    const img = qrRef.current?.querySelector("img");
    if (!img) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();

    image.crossOrigin = "anonymous";
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "bouqlink-qr.png";
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };

    image.src = img.src;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      {/* Confetti Explosion on Mount */}
      <Confetti colors={confettiColors} />

      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-6 md:p-10 relative border border-white/50 transform transition-all animate-pop flex flex-col items-center max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-gray-600 transition-colors z-10">
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Check size={32} />
          </div>
          <h2 className="text-3xl font-midcentury font-bold text-gray-900 mb-2">Ready to Gift.</h2>
          <p className="text-gray-500">Share this QR code with your special someone.</p>
        </div>

        <div
          className="p-8 rounded-xl border-4 mb-8 transition-colors duration-300"
          style={{
            borderColor: theme.colors.border === 'transparent' ? '#eee' : theme.colors.border,
            backgroundColor: theme.colors.bg === '#000000' || theme.id === 'cyberpunk' ? '#ffffff' : theme.colors.bg
          }}
          ref={qrRef}
        >
          <div className="p-8 rounded-3xl shadow-lg mb-6 flex justify-center items-center overflow-hidden" style={{
            backgroundColor: theme.colors.card === 'rgba(212,175,55,0.05)' || theme.colors.card === 'rgba(255,255,255,0.6)' || theme.colors.card === 'rgba(255,255,255,0.5)' ? '#ffffff' : theme.colors.card,
            border: `3px solid ${theme.colors.accent}`,
          }}>
            <KjuaQR
              text={shareUrl}
              fill={theme.colors.accent}
              size={200}
              back="#ffffff"
            />
          </div>
        </div>

        <div className="w-full mb-6 p-3 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Shareable Link</p>
          <p className="text-xs text-gray-600 truncate font-mono">{shareUrl}</p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              alert("Link copied to clipboard!");
            }}
            className="w-full py-4 bg-indigo-500 text-white font-medium rounded-2xl shadow-lg hover:bg-indigo-600 transition-all flex items-center justify-center gap-2"
          >
            <Copy size={18} /> Copy Link
          </button>
          <button onClick={handleDownloadQR} className="w-full py-4 bg-gray-900 text-white font-medium rounded-2xl shadow-lg hover:bg-black hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
            <Download size={18} /> Download QR Code
          </button>
          <button onClick={onPreview} className="w-full py-4 bg-white text-gray-900 border border-gray-200 font-medium rounded-2xl hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
            <Eye size={18} /> Preview Experience
          </button>
        </div>
      </div>
    </div>
  );
};

const ReceiverView = ({ bouquet, onBack }: { bouquet: BouquetData, onBack?: () => void }) => {
  const theme = THEMES.find(t => t.id === bouquet.themeId) || THEMES[0];

  return (
    <div
      className={`min-h-screen w-full flex flex-col xl:flex-row items-center justify-center gap-12 p-8 transition-colors duration-1000 overflow-y-auto overflow-x-hidden`}
      style={{
        background: theme.colors.bgGradient || theme.colors.bg,
      }}
    >
      {/* Background Texture Overlay (Subtle Noise) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Left/Top: The Bouquet - "Taped Photo" Style */}
      <div className={`relative group max-w-lg w-full shrink-0 transform -rotate-1 hover:rotate-0 transition-transform duration-500 z-10 animate-fade-in`}>

        {/* Tape Top Center */}
        <WashiTape className="-top-3 left-1/2 -translate-x-1/2 rotate-1" color={theme.colors.accent} />

        <div
          className="p-3 bg-white shadow-xl relative transition-all"
          style={{
            borderRadius: '2px', // Slight rounded corners like photo paper
            transform: 'rotate(1deg)' // Slight internal rotation for imperfection
          }}
        >
          <div
            className="aspect-[4/5] w-full overflow-hidden relative border border-gray-100"
            style={{
              background: theme.canvas.bg,
              borderRadius: '0'
            }}
          >
            <Canvas bouquet={bouquet} readOnly className="!h-full !max-w-none !border-0 !rounded-none" />
          </div>

          <div className="pt-4 pb-2 text-center">
            <span className={`${theme.typography.body} text-lg font-medium opacity-80`} style={{ color: theme.colors.text }}>
              Captured for eternity
            </span>
          </div>
        </div>
      </div>

      {/* Right/Bottom: The Letter - "Taped Note" Style */}
      <div className={`relative max-w-lg w-full transform rotate-1 hover:rotate-0 transition-transform duration-500 z-0 animate-fade-in delay-100`}>

        {/* Tape Corners */}
        <WashiTape className="-top-3 right-8 rotate-3" color={theme.colors.secondary} />
        <WashiTape className="bottom-[-10px] left-8 -rotate-2" color={theme.colors.accent} />

        <div
          className={`p-10 shadow-lg min-h-[360px] flex flex-col justify-center relative transition-all`}
          style={{
            // Fallback to white/off-white if theme uses bg-* class
            backgroundColor: theme.colors.card === '#ffffff' ? '#fdfbf7' : theme.colors.card,
            // Lined Paper Effect using Theme Border Color
            backgroundImage: `linear-gradient(${theme.colors.border}20 1px, transparent 1px)`,
            backgroundSize: '100% 2rem',
            clipPath: 'polygon(1% 0%, 99% 1%, 100% 99%, 0% 100%)', // Subtle organic shape
          }}
        >
          <div className="flex-1 flex flex-col justify-center relative z-10">
            <p
              className={`text-xl md:text-2xl leading-[2rem] whitespace-pre-wrap mb-8 ${theme.typography.letter} ${theme.typography.textTransform}`}
              style={{ color: theme.colors.text }}
            >
              {bouquet.letter}
            </p>
            {bouquet.sender && (
              <p
                className={`text-right font-medium italic opacity-70 ${theme.typography.body} mt-4`}
                style={{ color: theme.colors.text }}
              >
                — {bouquet.sender}
              </p>
            )}
          </div>

          {!onBack && (
            <div className="mt-8 text-center pt-6 opacity-30">
              <a href="/" className={`text-xs uppercase tracking-widest hover:opacity-100 transition-opacity ${theme.typography.body}`} style={{ color: theme.colors.text }}>
                Sent via BouqLink
              </a>
            </div>
          )}
        </div>
      </div>

      {onBack && (
        <button
          onClick={onBack}
          className="fixed top-6 right-6 z-50 px-6 py-3 rounded-full bg-black text-white font-bold shadow-lg hover:scale-105 transition-transform"
        >
          Close Preview
        </button>
      )}
    </div>
  );
};

// --- Main App Logic ---

export default function App() {
  const [mode, setMode] = useState<'landing' | 'studio' | 'view'>('landing');
  const [showSuccess, setShowSuccess] = useState(false);
  const [buildMode, setBuildMode] = useState<'auto' | 'manual'>('manual');

  const [bouquet, setBouquet] = useState<BouquetData>({
    themeId: 'soft-swiss',
    flowers: [],
    letter: '',
    sender: ''
  });

  const studioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    // decodeBouquet now handles both hash and query params internally
    const data = decodeBouquet(hash);
    if (data) {
      setBouquet(data);
      setMode('view');
    }
  }, []);

  const handleStart = () => {
    setMode('studio');

    // PRE-FILL: If empty, generate 6 random flowers so it's not a blank canvas.
    if (bouquet.flowers.length === 0) {
      handleShuffle();
    }

    setTimeout(() => {
      studioRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleShuffle = () => {
    const randomFlowerCount = 5 + Math.floor(Math.random() * 4); // 5 to 8 flowers
    const newFlowers: FlowerData[] = [];

    for (let i = 0; i < randomFlowerCount; i++) {
      const randomFlowerType = FLOWERS[Math.floor(Math.random() * FLOWERS.length)];
      const pos = generateSmartPosition(i);
      newFlowers.push({
        id: nanoid(4),
        flowerId: randomFlowerType.id,
        x: pos.x,
        y: pos.y,
        rotation: pos.rotation,
        scale: pos.scale
      });
    }
    setBouquet(prev => ({ ...prev, flowers: newFlowers }));
  };

  const handleAddFlower = (id: string) => {
    if (bouquet.flowers.length >= 25) return;

    let pos;
    if (buildMode === 'auto') {
      pos = generateSmartPosition(bouquet.flowers.length);
    } else {
      pos = generateRandomPosition();
    }

    const newFlower: FlowerData = {
      id: nanoid(4),
      flowerId: id,
      x: pos.x,
      y: pos.y,
      rotation: pos.rotation,
      scale: pos.scale
    };

    setBouquet(prev => ({
      ...prev,
      flowers: [...prev.flowers, newFlower]
    }));
  };

  const currentTheme = THEMES.find(t => t.id === bouquet.themeId) || THEMES[0];

  if (mode === 'view') {
    const isPreview = !window.location.hash;
    return <ReceiverView bouquet={bouquet} onBack={isPreview ? () => setMode('studio') : undefined} />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-black font-sans selection:bg-[#FF3B30] selection:text-white">
      {mode === 'landing' && <Hero onStart={handleStart} />}

      <div ref={studioRef} className={`${mode === 'landing' ? 'hidden' : 'block'} animate-fade-in`}>
        <Header onReset={() => window.location.reload()} />

        <main className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[calc(100vh-140px)] lg:min-h-[700px] h-auto">

            {/* LEFT SIDEBAR: Tools */}
            <div className="lg:col-span-2 flex flex-col gap-4 lg:h-full h-auto overflow-hidden order-1">
              {/* Mode Toggle */}
              <div className="bg-white p-2 rounded-[2rem] shadow-sm border border-white/60 shrink-0">
                <div className="flex bg-gray-50/80 p-1 rounded-3xl">
                  <button
                    onClick={() => setBuildMode('manual')}
                    className={`flex-1 py-3 text-xs font-bold rounded-2xl transition-all duration-300 ${buildMode === 'manual' ? 'bg-white shadow-md text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Manual
                  </button>
                  <button
                    onClick={() => setBuildMode('auto')}
                    className={`flex-1 py-3 text-xs font-bold rounded-2xl transition-all duration-300 ${buildMode === 'auto' ? 'bg-white shadow-md text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Auto
                  </button>
                </div>
              </div>

              {/* Flowers (Scrollable Panel) */}
              <StudioPanel title="Florist" icon={FlowerIcon} className="flex-1 min-h-[300px] lg:min-h-0">
                <FlowerPicker onAdd={handleAddFlower} />
              </StudioPanel>

              {/* Theme (Scrollable Panel) */}
              <StudioPanel title="Aesthetic" icon={Palette} className="flex-1 min-h-[200px] lg:min-h-0">
                <ThemePicker currentThemeId={bouquet.themeId} onSelect={(id) => setBouquet(prev => ({ ...prev, themeId: id }))} />
              </StudioPanel>
            </div>

            {/* CENTER: Canvas */}
            <div className="lg:col-span-8 flex flex-col lg:h-full h-[600px] order-2">
              <div className="bg-white rounded-[2rem] p-4 shadow-xl shadow-pink-100/50 flex-1 relative flex flex-col border border-white/80">
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <div className="bg-white/80 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest pointer-events-none border border-gray-100 shadow-sm">
                    Canvas
                  </div>
                  <button
                    onClick={handleShuffle}
                    className="bg-white/80 hover:bg-white backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold text-gray-600 uppercase tracking-widest border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-1"
                    title="Randomize Arrangement"
                  >
                    <Shuffle size={10} /> Shuffle
                  </button>
                </div>

                <div className="flex-1 w-full h-full rounded-3xl overflow-hidden">
                  <Canvas bouquet={bouquet} setBouquet={setBouquet} buildMode={buildMode} className="!h-full !max-w-none !rounded-3xl !border-0" />
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center px-4">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  {bouquet.flowers.length} Stems
                </div>
                <div className="text-[10px] text-gray-400 font-medium tracking-wide">
                  AUTO-SAVED
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR: Letter & Actions */}
            <div className="lg:col-span-2 flex flex-col gap-4 lg:h-full h-auto overflow-hidden order-3">
              <StudioPanel title="The Note" icon={PenTool} className="flex-1 flex flex-col min-h-[300px] lg:min-h-0">
                <div className="flex-1 flex flex-col gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-wider">Message</label>
                    <textarea
                      value={bouquet.letter}
                      onChange={(e) => setBouquet(prev => ({ ...prev, letter: e.target.value.slice(0, 300) }))}
                      className={`w-full p-4 h-48 bg-gray-50 border border-gray-100 rounded-2xl focus:border-pink-200 focus:bg-white focus:ring-4 focus:ring-pink-50 outline-none transition-all resize-none text-gray-700 leading-relaxed ${currentTheme.typography.letter}`}
                      placeholder="Type your feelings here..."
                    />
                    <div className="text-right text-[10px] text-gray-400 mt-2 font-medium">{bouquet.letter.length}/300</div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-wider">Signed</label>
                    <input
                      type="text"
                      value={bouquet.sender}
                      onChange={(e) => setBouquet(prev => ({ ...prev, sender: e.target.value.slice(0, 30) }))}
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-pink-200 focus:bg-white focus:ring-4 focus:ring-pink-50 outline-none transition-all text-gray-700 font-medium"
                      placeholder="Your Name (Optional)"
                    />
                  </div>
                </div>
              </StudioPanel>

              <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-white/60 shrink-0">
                <button
                  onClick={() => setShowSuccess(true)}
                  disabled={!bouquet.letter.trim() || bouquet.flowers.length === 0}
                  className={`w-full py-5 text-lg font-medium rounded-2xl shadow-lg flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:translate-y-0
                        ${!bouquet.letter.trim() || bouquet.flowers.length === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                      : 'bg-gray-900 text-white hover:bg-black shadow-gray-200 hover:shadow-xl'}`}
                >
                  <span>Wrap Gift</span>
                  <Heart size={20} className={(!bouquet.letter.trim() || bouquet.flowers.length === 0) ? 'text-gray-300' : 'text-pink-400 fill-pink-400'} />
                </button>
                {(!bouquet.letter.trim() || bouquet.flowers.length === 0) && (
                  <p className="text-center text-[10px] text-red-400 mt-3 font-medium tracking-wide uppercase">
                    {bouquet.flowers.length === 0 ? "Add flowers first" : "Write a note first"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {showSuccess && (
        <SuccessOverlay
          bouquet={bouquet}
          onClose={() => setShowSuccess(false)}
          onPreview={() => setMode('view')}
        />
      )}
    </div>
  );
}