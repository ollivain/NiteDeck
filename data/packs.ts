import type { PackId, PremiumPackMetadata } from './types';

export const PREMIUM_PACK_IDS = [
  'temptations',
  'roast',
  'truth-bombs',
  'couples-chemistry',
  'after-dark',
] as const satisfies readonly PackId[];

export const premiumPackMetadata: Record<PackId, PremiumPackMetadata> = {
  temptations: {
    id: 'temptations',
    kind: 'premium-pack',
    title: 'Temptations',
    description: 'Flirty questions, bold choices and late-night tension. The only pack that turns up the heat.',
    locked: true,
    premium: true,
    comingSoon: true,
  },
  roast: {
    id: 'roast',
    kind: 'premium-pack',
    title: 'Roast',
    description: 'Savage but playful. Brutal votes, friendly fire and the kind of jokes only close friends can survive.',
    locked: true,
    premium: true,
    comingSoon: true,
  },
  'truth-bombs': {
    id: 'truth-bombs',
    kind: 'premium-pack',
    title: 'Truth Bombs',
    description: 'Honest answers and group revelations that get uncomfortable fast — but in the best way.',
    locked: true,
    premium: true,
    comingSoon: true,
  },
  'couples-chemistry': {
    id: 'couples-chemistry',
    kind: 'premium-pack',
    title: 'Couples & Chemistry',
    description: 'Date-night questions, playful romantic energy and connection-building moments.',
    locked: true,
    premium: true,
    comingSoon: true,
  },
  'after-dark': {
    id: 'after-dark',
    kind: 'premium-pack',
    title: 'After Dark',
    description: 'Bolder late-night cards for when the regular decks feel too familiar.',
    locked: true,
    premium: true,
    comingSoon: true,
  },
};

export const premiumPacks = PREMIUM_PACK_IDS.map(id => premiumPackMetadata[id]);
