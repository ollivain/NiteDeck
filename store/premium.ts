import { create } from 'zustand';
import type { PackId } from '@/data/types';

type PremiumStore = {
  unlockedPremiumPackIds: PackId[];
  isPremiumPackUnlocked: (packId: PackId) => boolean;
  unlockPremiumPackForTesting: (packId: PackId) => void;
  lockPremiumPackForTesting: (packId: PackId) => void;
  resetPremiumUnlocksForTesting: () => void;
};

export const usePremiumStore = create<PremiumStore>((set, get) => ({
  unlockedPremiumPackIds: [],

  isPremiumPackUnlocked: (packId: PackId) =>
    get().unlockedPremiumPackIds.includes(packId),

  unlockPremiumPackForTesting: (packId: PackId) =>
    set(s => ({
      unlockedPremiumPackIds: s.unlockedPremiumPackIds.includes(packId)
        ? s.unlockedPremiumPackIds
        : [...s.unlockedPremiumPackIds, packId],
    })),

  lockPremiumPackForTesting: (packId: PackId) =>
    set(s => ({
      unlockedPremiumPackIds: s.unlockedPremiumPackIds.filter(id => id !== packId),
    })),

  resetPremiumUnlocksForTesting: () =>
    set({ unlockedPremiumPackIds: [] }),
}));
