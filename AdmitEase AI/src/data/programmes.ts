import { PROGRAMMES as KB_PROGRAMMES } from '@/data/knowledgeBase';

export type Programme = {
  name: string;
  icon: 'Cpu' | 'Code2' | 'Calculator' | 'Briefcase' | 'TrendingUp' | 'Landmark' | 'Radio' | 'FlaskConical';
  blurb: string;
};

// Card blurbs are presentation-only summaries; authoritative descriptions live in the KB.
export const PROGRAMMES: Programme[] = KB_PROGRAMMES.map((p) => ({
  name: p.name,
  icon: p.icon,
  blurb: p.description,
}));
