import { chillCards } from './cards.chill';
import { spicyCards } from './cards.spicy';
import { wildCards } from './cards.wild';
import { neverHaveIEverCards } from './cards.neverHaveIEver';
import { temptationsCards } from './cards.temptations';
import { roastCards } from './cards.roast';
import { truthBombsCards } from './cards.truthBombs';
import { couplesChemistryCards } from './cards.couplesChemistry';
import { afterDarkCards } from './cards.afterDark';
import type { Card, GameType, PackId, PremiumCard } from './types';

export const allCards: Card[] = [...chillCards, ...spicyCards, ...wildCards];

export const coreCardsByGameType: Record<Exclude<GameType, 'truthOrDare'>, Card[]> = {
  classic: allCards,
  neverHaveIEver: neverHaveIEverCards,
};

export function getCoreCardsForGameType(gameType: GameType): Card[] {
  return gameType === 'truthOrDare' ? [] : coreCardsByGameType[gameType];
}

export const cardsById: Record<string, Card> = Object.fromEntries(
  [...allCards, ...neverHaveIEverCards].map(c => [c.id, c])
);

export const premiumCardsByPack: Record<PackId, PremiumCard[]> = {
  temptations: temptationsCards,
  roast: roastCards,
  'truth-bombs': truthBombsCards,
  'couples-chemistry': couplesChemistryCards,
  'after-dark': afterDarkCards,
};

export const premiumCardsById: Record<string, PremiumCard> = Object.fromEntries(
  Object.values(premiumCardsByPack).flat().map(c => [c.id, c])
);

export function getCardById(cardId: string): Card | PremiumCard | undefined {
  return cardsById[cardId] ?? premiumCardsById[cardId];
}
