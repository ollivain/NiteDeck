import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { PressableScale } from '@/components/ui/PressableScale';
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

export default function GamesScreen() {
  const reset = useSessionStore(s => s.reset);
  const setGameType = useSessionStore(s => s.setGameType);

  const handleSelectGame = (gameType: GameType) => {
    reset();
    setGameType(gameType);
    router.push('/players');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Choose a game</Text>
          <Text style={styles.subtitle}>Pick the format first. The vibe comes next.</Text>
        </View>

        <View style={styles.list}>
          {GAME_OPTIONS.map(option => (
            <PressableScale
              key={option.id}
              onPress={() => handleSelectGame(option.id)}
              activeOpacity={0.84}
              pressedScale={0.985}
              style={styles.gameRow}
            >
              <View style={styles.iconBox}>
                {option.icon ? (
                  <Ionicons name={option.icon} size={22} color={Colors.accent} />
                ) : null}
              </View>
              <View style={styles.copy}>
                <Text style={styles.gameTitle}>{option.title}</Text>
                <Text style={styles.description}>{option.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#B9A7FF" />
            </PressableScale>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
    paddingBottom: 124,
  },
  header: {
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textDim,
    lineHeight: 20,
  },
  list: {
    gap: Spacing.md,
  },
  gameRow: {
    minHeight: 116,
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceStrong,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    overflow: 'hidden',
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: Radius.lg,
    backgroundColor: Colors.accentBg,
    borderWidth: 1,
    borderColor: Colors.accentBorder,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  copy: {
    flex: 1,
    gap: 5,
  },
  gameTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
    lineHeight: 27,
  },
  description: {
    fontSize: 14,
    color: Colors.textMuted,
    lineHeight: 20,
  },
});
