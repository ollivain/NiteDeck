import { StyleSheet, Text, View } from 'react-native';
import { Colors, Radius, Spacing } from '@/constants/theme';
import type { CardIntensity, CardType } from '@/data/types';

export type CardDisplayConfig = {
  primary: string;
  name: string;
  emoji: string;
};

type GameCardProps = {
  card: {
    type: CardType;
    label: string;
    text: string;
    intensity?: CardIntensity;
  };
  displayConfig: CardDisplayConfig;
  cardNumber: number;
  totalCards: number;
};

const typeDots: Record<CardType, number> = {
  question: 1,
  vote: 1,
  pick: 2,
  challenge: 3,
  camera: 2,
  chaos: 3,
};

function cardFontSize(len: number): number {
  if (len > 160) return 19;
  if (len > 90) return 22;
  return 25;
}

export function GameCard({ card, displayConfig, cardNumber, totalCards }: GameCardProps) {
  const { primary, name, emoji } = displayConfig;
  const fontSize = cardFontSize(card.text.length);
  const dots = card.intensity ?? typeDots[card.type];

  return (
    <View style={[styles.card, { borderColor: primary }]}>
      <View style={styles.topRow}>
        <View style={[styles.typeTag, { borderColor: primary }]}>
          <Text style={[styles.typeLabel, { color: primary }]}>
            {card.label}
          </Text>
        </View>
        <View style={styles.typeDots}>
          {[0, 1, 2].map(i => (
            <View
              key={i}
              style={[
                styles.typeDot,
                { backgroundColor: i < dots ? primary : 'rgba(214, 203, 255, 0.15)' },
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.textWrap}>
        <Text style={[styles.cardText, { fontSize, lineHeight: fontSize * 1.45 }]}>
          {card.text}
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={[styles.modeChip, { borderColor: primary }]}>
          <Text style={[styles.modeName, { color: primary }]}>{emoji}  {name}</Text>
        </View>
        <Text style={styles.counter}>{cardNumber}/{totalCards}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'rgba(10, 15, 39, 0.9)',
    borderRadius: Radius.xxl,
    borderWidth: 1.5,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  typeTag: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: Radius.full,
    borderWidth: 1.5,
  },
  typeLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.3,
  },
  typeDots: {
    flexDirection: 'row',
    gap: 6,
  },
  typeDot: {
    width: 8,
    height: 8,
    borderRadius: Radius.full,
  },
  textWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  cardText: {
    fontWeight: '600',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modeChip: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: Radius.full,
    borderWidth: 1.5,
  },
  modeName: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  counter: {
    fontSize: 13,
    fontWeight: '500',
    color: '#AFA8C8',
    letterSpacing: 0.3,
  },
});
