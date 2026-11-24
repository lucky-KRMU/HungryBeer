import React, { useState, useRef, useEffect } from 'react';
import { Moon, Sun, Heart, ChevronDown } from 'lucide-react';

export default function ThemeSwitcher({ theme = 'dark', setTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themes = [
    {
      id: 'dark',
      label: 'Dark (Classic)',
      icon: Moon,
      color: 'text-amber-400',
      description: 'Yellow, Black & Red signature'
    },
    {
      id: 'light',
      label: 'Light Mode',
      icon: Sun,
      color: 'text-amber-500',
      description: 'Clean ivory & warm amber'
    },
    {
      id: 'valentine',
      label: 'Valentine Mode',
      icon: Heart,
      color: 'text-rose-500 fill-rose-500',
      description: 'Romantic wine, rose & candlelight'
    }
  ];

  const currentOption = themes.find((t) => t.id === theme) || themes[0];
  const IconComponent = currentOption.icon;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
          theme === 'valentine'
            ? 'bg-rose-950/60 border-rose-500/50 text-rose-200 hover:bg-rose-900/60 shadow-lg shadow-rose-900/30'
            : theme === 'light'
            ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
            : 'bg-zinc-800/90 border-zinc-700 text-gray-200 hover:bg-zinc-700'
        }`}
        title="Switch theme (Classic Dark, Crisp Light, Romantic Valentine)"
      >
        <IconComponent className={`w-3.5 h-3.5 ${currentOption.color} ${theme === 'valentine' ? 'animate-pulse' : ''}`} />
        <span className="hidden sm:inline">
          {theme === 'valentine' ? 'Valentine' : theme === 'light' ? 'Light' : 'Theme'}
        </span>
        <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
      </button>

      {isOpen && (
        <div className={`absolute right-0 top-full mt-2 w-56 rounded-2xl p-1.5 shadow-2xl border z-50 animate-in fade-in zoom-in-95 duration-150 ${
          theme === 'valentine'
            ? 'bg-[#220718] border-rose-800/80 text-rose-100 shadow-rose-950/80'
            : theme === 'light'
            ? 'bg-white border-slate-200 text-slate-900 shadow-slate-400/20'
            : 'bg-zinc-900 border-zinc-700 text-gray-100'
        }`}>
          <div className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider opacity-50">
            Select Visual Theme
          </div>
          <div className="space-y-1 mt-1">
            {themes.map((t) => {
              const ItemIcon = t.icon;
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-xl flex items-center gap-2.5 text-xs font-bold transition-all ${
                    isSelected
                      ? theme === 'valentine'
                        ? 'bg-rose-600/30 text-rose-200 border border-rose-500/40'
                        : theme === 'light'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-amber-400/20 text-amber-300 border border-amber-500/30'
                      : 'hover:bg-zinc-800/40 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    t.id === 'valentine'
                      ? 'bg-rose-500/20 text-rose-400'
                      : t.id === 'light'
                      ? 'bg-amber-500/20 text-amber-600'
                      : 'bg-zinc-800 text-amber-400'
                  }`}>
                    <ItemIcon className={`w-4 h-4 ${t.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span>{t.label}</span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      )}
                    </div>
                    <div className="text-[10px] font-normal opacity-70">
                      {t.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
