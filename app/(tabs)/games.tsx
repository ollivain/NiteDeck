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
  icon: keyof typeof Ionicons.glyphMap;
};

const GAME_OPTIONS: GameOption[] = [
  {
    id: 'classic',
    title: 'Classic',
    description: 'Group prompts, camera moments and chaotic recaps.',
    icon: 'albums',
  },
  {
    id: 'truth-or-dare',
    title: 'Truth or Dare',
    description: 'Personal truths, bold dares and party-ready chaos.',
    icon: 'help-buoy',
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
          <Text style={styles.title}>Choose the night</Text>
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
    backgroundColor: '#050817',
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
  list: {
    gap: Spacing.md,
  },
  gameRow: {
    minHeight: 116,
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.22)',
    backgroundColor: 'rgba(10, 15, 39, 0.9)',
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    overflow: 'hidden',
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
    fontFamily: 'serif',
  },
  description: {
    fontSize: 14,
    color: '#C7C0D8',
    lineHeight: 20,
  },
});
