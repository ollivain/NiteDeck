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
    description: 'Flirty questions, bold choices and late-night tension. The pack that turns up the heat.',
    locked: true,
    premium: true,
    comingSoon: true,
    vibeLabel: 'Flirty',
    cardCount: 60,
    previewLines: [
      '"Pick someone in this room. Make eye contact for 10 seconds without looking away or laughing."',
      '"Vote: who in this room has the most magnetic energy right now?"',
      '"What would you do if someone here made a move tonight?"',
    ],
    previewCardIds: ['te001', 'te004', 'te009', 'te016', 'te034'],
  },
  roast: {
    id: 'roast',
    kind: 'premium-pack',
    title: 'Roast',
    description: 'Savage but playful. Brutal votes, friendly fire and jokes only close friends survive.',
    locked: true,
    premium: true,
    comingSoon: true,
    vibeLabel: 'Savage',
    cardCount: 60,
    previewLines: [
      '"Roast the person on your left in exactly two sentences. Keep it survivable."',
      '"Vote: who here is most likely to turn a calm conversation into an argument without meaning to?"',
      '"Give yourself a roast in one sentence. Make it accurate enough that the group agrees."',
    ],
    previewCardIds: ['ro002', 'ro005', 'ro012', 'ro013', 'ro042'],
  },
  'truth-bombs': {
    id: 'truth-bombs',
    kind: 'premium-pack',
    title: 'Truth Bombs',
    description: 'Honest answers, sharp questions and group revelations that get real fast.',
    locked: true,
    premium: true,
    comingSoon: true,
    vibeLabel: 'Honest',
    cardCount: 60,
    previewLines: [
      '"What is something you are currently pretending you are okay with?"',
      '"Pick someone. Ask them anything. They must answer in full with no deflection."',
      '"Vote: who here is most likely to say yes when they mean no?"',
    ],
    previewCardIds: ['tb006', 'tb005', 'tb017', 'tb016', 'tb037'],
  },
  'couples-chemistry': {
    id: 'couples-chemistry',
    kind: 'premium-pack',
    title: 'Couples & Chemistry',
    description: 'Date-night questions, playful romantic energy and connection-building moments.',
    locked: true,
    premium: true,
    comingSoon: true,
    vibeLabel: 'Romantic',
    cardCount: 60,
    previewLines: [
      '"Describe your ideal evening with someone you care about. Give it a beginning and an ending."',
      '"Pick someone and tell them one quality that would make them a genuinely wonderful partner."',
      '"What is a small act of care that has stayed with you longer than most grand gestures?"',
    ],
    previewCardIds: ['cc003', 'cc006', 'cc007', 'cc008', 'cc014'],
  },
  'after-dark': {
    id: 'after-dark',
    kind: 'premium-pack',
    title: 'After Dark',
    description: 'Bolder late-night cards for when the regular decks feel too safe.',
    locked: true,
    premium: true,
    comingSoon: true,
    vibeLabel: 'Bold',
    cardCount: 60,
    previewLines: [
      '"What have you said yes to at night that you would never say yes to in the morning?"',
      '"Say something out loud that you would normally wait until later in the night to say."',
      '"Vote: who here is most likely to still be awake at 4am doing something they cannot explain?"',
    ],
    previewCardIds: ['ad004', 'ad011', 'ad003', 'ad014', 'ad031'],
  },
};

export const premiumPacks = PREMIUM_PACK_IDS.map(id => premiumPackMetadata[id]);
