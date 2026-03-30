'use client';

import { Menu, TrendingUp } from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';

interface MobileHeaderProps {
  readonly onMenuOpen: () => void;
}

export function MobileHeader({ onMenuOpen }: MobileHeaderProps) {
  const { user } = useAuthContext();

  return (
    <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 h-14 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <button
        type="button"
        aria-label="Abrir menú"
        onClick={onMenuOpen}
        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-2">
        <div className="bg-emerald-500 p-1.5 rounded-lg">
          <TrendingUp className="h-4 w-4 text-white" />
        </div>
        <span className="text-base font-bold text-white">FinanzasPro</span>
      </div>

      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
        <span className="text-emerald-400 text-sm font-semibold">
          {user?.primer_nombre?.[0]?.toUpperCase() ?? 'U'}
        </span>
      </div>
    </header>
  );
}
