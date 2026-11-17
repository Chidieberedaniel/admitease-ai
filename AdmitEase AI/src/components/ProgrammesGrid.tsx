import {
  Cpu,
  Code2,
  Calculator,
  Briefcase,
  TrendingUp,
  Landmark,
  Radio,
  FlaskConical,
  type LucideIcon,
} from 'lucide-react';
import { PROGRAMMES } from '@/data/programmes';

const ICONS: Record<string, LucideIcon> = {
  Cpu,
  Code2,
  Calculator,
  Briefcase,
  TrendingUp,
  Landmark,
  Radio,
  FlaskConical,
};

export default function ProgrammesGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {PROGRAMMES.map((p, i) => {
        const Icon = ICONS[p.icon];
        return (
          <article
            key={p.name}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-navy-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-lg hover:shadow-navy-900/5"
          >
            <span className="absolute right-0 top-0 h-16 w-16 translate-x-6 -translate-y-6 rounded-full bg-navy-50/80 transition-transform duration-300 group-hover:scale-150 group-hover:bg-gold-50" />
            <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-navy-900 text-gold-300 transition-colors group-hover:bg-gold-400 group-hover:text-navy-900">
              <Icon className="h-6 w-6" />
            </div>
            <div className="relative">
              <span className="font-mono text-[11px] font-medium text-gold-500">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-1 font-serif text-lg font-semibold text-navy-900">
                {p.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                {p.blurb}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
