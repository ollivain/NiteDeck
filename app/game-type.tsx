import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { PressableScale } from '@/components/ui/PressableScale';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { useSessionStore } from '@/store/session';
import type { GameType } from '@/data/types';

type GameOption = {
  id: GameType;
  title: string;
  description: string;
  icon?: keyof typeof Ionicons.glyphMap;
};

const GAME_OPTIONS: GameOption[] = [
  {
    id: 'classic',
    title: 'Classic',
    description: 'Cards, votes, dares and camera moments for the whole group.',
    icon: 'albums',
  },
  {
    id: 'truthOrDare',
    title: 'Truth or Dare',
    description: 'Pick Truth or Dare every turn. Fast, personal and easy to play.',
    icon: 'help-buoy',
  },
  {
    id: 'neverHaveIEver',
    title: 'Never Have I Ever',
    description: "Reveal what you have and haven't done.",
    icon: 'hand-left-outline',
  },
];

export default function GameTypeScreen() {
  const reset = useSessionStore(s => s.reset);
  const setGameType = useSessionStore(s => s.setGameType);

  const handleSelect = (gameType: GameType) => {
    reset();
    setGameType(gameType);
    router.push('/players');
  };

  return (
    <Screen scroll style={styles.screen} contentStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color="#D8D2EA" />
        </TouchableOpacity>
        <View style={styles.headerPill}>
          <Ionicons name="sparkles" size={12} color={Colors.accent} />
          <Text style={styles.stepLabel}>CHOOSE GAME</Text>
        </View>
      </View>

      <View style={styles.titleBlock}>
        <Text style={styles.eyebrow}>NiteDeck</Text>
        <Text style={styles.title}>Choose your game</Text>
        <Text style={styles.subtitle}>Pick the party mode for tonight.</Text>
      </View>

      <View style={styles.optionList}>
        {GAME_OPTIONS.map(option => (
          <PressableScale
            key={option.id}
            onPress={() => handleSelect(option.id)}
            activeOpacity={0.84}
            pressedScale={0.985}
            style={styles.optionCard}
          >
            <View style={styles.cardGlow} />

            <View style={styles.iconBox}>
              {option.icon ? (
                <Ionicons name={option.icon} size={26} color="#EEE9FF" />
              ) : null}
            </View>

            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <View style={styles.smallDividerRow}>
                <View style={styles.smallDivider} />
                <Ionicons name="sparkles" size={11} color={Colors.accent} />
                <View style={styles.smallDivider} />
              </View>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>

            <View style={styles.rightIcon}>
              <Ionicons name="chevron-forward" size={20} color="#B9A7FF" />
            </View>
          </PressableScale>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.bg,
  },
  content: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.18)',
    backgroundColor: 'rgba(13, 19, 48, 0.78)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.26)',
    backgroundColor: 'rgba(124, 92, 255, 0.12)',
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  stepLabel: {
    ...Typography.label,
    color: '#C8BFFF',
  },
  titleBlock: {
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  eyebrow: {
    ...Typography.label,
    color: Colors.accent,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: Colors.text,
    lineHeight: 46,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textMuted,
  },
  optionList: {
    gap: Spacing.md,
  },
  optionCard: {
    minHeight: 166,
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    overflow: 'hidden',
  },
  cardGlow: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(124, 92, 255, 0.18)',
    top: -86,
    right: -42,
  },
  iconBox: {
    width: 58,
    height: 58,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.2)',
    backgroundColor: 'rgba(124, 92, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  optionText: {
    paddingRight: Spacing.xl,
    gap: Spacing.sm,
  },
  optionTitle: {
    fontSize: 25,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 31,
  },
  smallDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  smallDivider: {
    width: 34,
    height: 1,
    backgroundColor: 'rgba(167, 139, 250, 0.5)',
  },
  optionDescription: {
    fontSize: 15,
    color: Colors.textMuted,
    lineHeight: 22,
  },
  rightIcon: {
    position: 'absolute',
    right: Spacing.lg,
    top: Spacing.lg,
    width: 34,
    height: 34,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.18)',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
