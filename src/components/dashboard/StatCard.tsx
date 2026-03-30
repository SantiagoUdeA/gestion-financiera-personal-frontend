import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  variant: 'emerald' | 'red' | 'blue' | 'amber';
  trend?: { value: string; positive: boolean };
}

const VARIANTS = {
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    icon: 'text-emerald-400',
    text: 'text-emerald-400',
  },
  red: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    icon: 'text-red-400',
    text: 'text-red-400',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    icon: 'text-blue-400',
    text: 'text-blue-400',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    icon: 'text-amber-400',
    text: 'text-amber-400',
  },
};

export function StatCard({ title, value, subtitle, icon: Icon, variant, trend }: StatCardProps) {
  const v = VARIANTS[variant];
  return (
    <div className={cn('rounded-xl border p-5 bg-slate-800/50', v.border)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm mb-1">{title}</p>
          <p className={cn('text-2xl font-bold', v.text)}>{value}</p>
          {subtitle && <p className="text-slate-500 text-xs mt-1">{subtitle}</p>}
        </div>
        <div className={cn('p-2.5 rounded-lg', v.bg)}>
          <Icon className={cn('h-5 w-5', v.icon)} />
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1">
          <span
            className={cn('text-xs font-medium', trend.positive ? 'text-emerald-400' : 'text-red-400')}
          >
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
          <span className="text-slate-500 text-xs">este mes</span>
        </div>
      )}
    </div>
  );
}
