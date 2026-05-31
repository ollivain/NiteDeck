import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, type DimensionValue } from 'react-native';
import { router, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { MainTabBar } from '@/constants/navigation';
import { PressableScale } from '@/components/ui/PressableScale';
import { useSessionStore } from '@/store/session';
import type { GameType } from '@/data/types';

type Speck = {
  top?: DimensionValue;
  bottom?: DimensionValue;
  left?: DimensionValue;
  right?: DimensionValue;
  size: number;
  opacity: number;
  rotate: number;
};

type GameOption = {
  id: GameType;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const SPLASH_MS = 1450;
let hasSeenLaunchSplash = false;

const SPECKS: Speck[] = [
  { top: '8%', left: '16%', size: 4, opacity: 0.16, rotate: 22 },
  { top: '14%', right: '22%', size: 3, opacity: 0.13, rotate: 40 },
  { top: '24%', left: '8%', size: 4, opacity: 0.1, rotate: -15 },
  { top: '32%', right: '10%', size: 5, opacity: 0.13, rotate: 18 },
  { top: '48%', left: '18%', size: 4, opacity: 0.1, rotate: 12 },
  { bottom: '30%', right: '18%', size: 4, opacity: 0.12, rotate: 20 },
];

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

function Background() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.bgGlow} />
      <View style={styles.bgGlow2} />
      <View style={styles.bgGlow3} />
      {SPECKS.map((s, i) => (
        <View
          key={i}
          style={[
            styles.speck,
            {
              top: s.top,
              bottom: s.bottom,
              left: s.left,
              right: s.right,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
              transform: [{ rotate: `${s.rotate}deg` }],
            },
          ]}
        />
      ))}
    </View>
  );
}

function DeckMark({ large = false }: { large?: boolean }) {
  return (
    <View style={[styles.deckMark, large && styles.deckMarkLarge]}>
      <View style={[styles.miniCard, large && styles.miniCardLarge, styles.miniCardBack]}>
        <Text style={[styles.cardLetter, large && styles.cardLetterLarge]}>N</Text>
      </View>
      <View style={[styles.miniCard, large && styles.miniCardLarge, styles.miniCardFront]}>
        <Text style={[styles.cardLetter, large && styles.cardLetterLarge]}>N</Text>
      </View>
    </View>
  );
}

function SplashScreen({ onDone }: { onDone: () => void }) {
  const reduceMotion = useReducedMotion();
  const opacity = useSharedValue(0);
  const contentOffset = useSharedValue(reduceMotion ? 0 : 18);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: reduceMotion ? 0 : 420 });
    contentOffset.value = withTiming(0, { duration: reduceMotion ? 0 : 520 });

    let exitTimer: ReturnType<typeof setTimeout> | null = null;
    const timer = setTimeout(() => {
      opacity.value = withTiming(0, { duration: reduceMotion ? 0 : 320 });
      hasSeenLaunchSplash = true;
      exitTimer = setTimeout(onDone, reduceMotion ? 0 : 260);
    }, reduceMotion ? 300 : SPLASH_MS);

    return () => {
      clearTimeout(timer);
      if (exitTimer) {
        clearTimeout(exitTimer);
      }
    };
  }, [contentOffset, onDone, opacity, reduceMotion]);

  const splashStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: contentOffset.value }],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <View style={styles.splashOrbTop} />
      <View style={styles.splashOrbBottom} />

      <Animated.View style={[styles.splashContent, splashStyle]}>
        <DeckMark large />
        <Text style={styles.splashTitle}>NiteDeck</Text>
        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Ionicons name="sparkles" size={14} color="#A78BFA" />
          <View style={styles.divider} />
        </View>
        <Text style={styles.splashTagline}>Party games. Drinking games.</Text>
        <Text style={styles.splashTagline}>Memories you’ll talk about.</Text>
      </Animated.View>
    </SafeAreaView>
  );
}

export default function HomeScreen() {
  const [showSplash, setShowSplash] = useState(!hasSeenLaunchSplash);
  const navigation = useNavigation();
  const reset = useSessionStore(s => s.reset);
  const setGameType = useSessionStore(s => s.setGameType);
  const reduceMotion = useReducedMotion();
  const homeOpacity = useSharedValue(hasSeenLaunchSplash || reduceMotion ? 1 : 0);
  const homeOffset = useSharedValue(hasSeenLaunchSplash || reduceMotion ? 0 : 16);

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: showSplash
        ? [MainTabBar.style, styles.hiddenTabBar]
        : MainTabBar.style,
    });

    if (!showSplash) {
      homeOpacity.value = withDelay(
        reduceMotion ? 0 : 80,
        withTiming(1, { duration: reduceMotion ? 0 : 360 })
      );
      homeOffset.value = withTiming(0, { duration: reduceMotion ? 0 : 420 });
    }
  }, [homeOffset, homeOpacity, navigation, reduceMotion, showSplash]);

  const homeStyle = useAnimatedStyle(() => ({
    opacity: homeOpacity.value,
    transform: [{ translateY: homeOffset.value }],
  }));

  const handleSplashDone = useCallback(() => {
    setShowSplash(false);
  }, []);

  const handleSelectGame = (gameType: GameType) => {
    reset();
    setGameType(gameType);
    router.push('/players');
  };

  if (showSplash) {
    return <SplashScreen onDone={handleSplashDone} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Background />

      <Animated.View style={[styles.home, homeStyle]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.hero}>
            <DeckMark />

            <Text
              style={styles.title}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.72}
            >
              NiteDeck
            </Text>

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Ionicons name="sparkles" size={14} color="#A78BFA" />
              <View style={styles.divider} />
            </View>

            <Text style={styles.tagline}>Party games. Drinking games.</Text>
            <Text style={styles.tagline}>Memories you’ll talk about.</Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Games</Text>
          </View>

          <View style={styles.gameList}>
            {GAME_OPTIONS.map(option => (
              <PressableScale
                key={option.id}
                onPress={() => handleSelectGame(option.id)}
                activeOpacity={0.84}
                pressedScale={0.985}
                style={styles.gameCard}
              >
                <View style={styles.gameCardGlow} />
                <View style={styles.gameIcon}>
                  <Ionicons name={option.icon} size={28} color="#EEE9FF" />
                </View>
                <Text style={styles.gameTitle}>{option.title}</Text>
                <View style={styles.smallDividerRow}>
                  <View style={styles.smallDivider} />
                  <Ionicons name="sparkles" size={11} color="#A78BFA" />
                  <View style={styles.smallDivider} />
                </View>
                <Text style={styles.gameDescription}>{option.description}</Text>
                <View style={styles.gameArrow}>
                  <Ionicons name="chevron-forward" size={18} color="#B9A7FF" />
                </View>
              </PressableScale>
            ))}
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050817',
  },
  bgGlow: {
    position: 'absolute',
    width: 460,
    height: 460,
    borderRadius: 230,
    backgroundColor: 'rgba(124, 92, 255, 0.16)',
    top: -210,
    right: -170,
  },
  bgGlow2: {
    position: 'absolute',
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: 'rgba(54, 116, 255, 0.1)',
    top: 190,
    left: -190,
  },
  bgGlow3: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(167, 139, 250, 0.09)',
    bottom: 40,
    right: -140,
  },
  splashOrbTop: {
    position: 'absolute',
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: 'rgba(129, 92, 255, 0.14)',
    top: 70,
    left: -92,
  },
  splashOrbBottom: {
    position: 'absolute',
    width: 310,
    height: 310,
    borderRadius: 155,
    backgroundColor: 'rgba(88, 61, 204, 0.18)',
    bottom: -96,
    right: -84,
  },
  speck: {
    position: 'absolute',
    backgroundColor: '#B9A7FF',
    borderRadius: Radius.full,
  },
  splashContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  home: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxxl,
    paddingBottom: 124,
  },
  hero: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  deckMark: {
    width: 112,
    height: 112,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  deckMarkLarge: {
    width: 148,
    height: 148,
    marginBottom: Spacing.xl,
  },
  miniCard: {
    position: 'absolute',
    width: 68,
    height: 94,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(205, 190, 255, 0.62)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniCardLarge: {
    width: 82,
    height: 112,
  },
  miniCardBack: {
    backgroundColor: 'rgba(113, 70, 255, 0.68)',
    transform: [{ rotate: '10deg' }, { translateX: 18 }],
  },
  miniCardFront: {
    backgroundColor: 'rgba(7, 12, 34, 0.94)',
    transform: [{ rotate: '-8deg' }, { translateX: -10 }],
  },
  cardLetter: {
    fontSize: 38,
    fontWeight: '700',
    color: '#F7F3FF',
    fontFamily: 'serif',
  },
  cardLetterLarge: {
    fontSize: 48,
  },
  splashTitle: {
    fontSize: 62,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 70,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  title: {
    fontSize: 60,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 68,
    marginBottom: Spacing.sm,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  divider: {
    height: 1,
    width: 74,
    backgroundColor: 'rgba(167, 139, 250, 0.55)',
  },
  splashTagline: {
    fontSize: 21,
    fontWeight: '500',
    color: '#D8D2EA',
    lineHeight: 30,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 20,
    fontWeight: '500',
    color: '#D8D2EA',
    lineHeight: 29,
    textAlign: 'center',
  },
  sectionHeader: {
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.text,
  },
  gameList: {
    gap: Spacing.md,
  },
  gameCard: {
    minHeight: 178,
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.22)',
    backgroundColor: 'rgba(10, 15, 39, 0.9)',
    padding: Spacing.lg,
    overflow: 'hidden',
  },
  gameCardGlow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(124, 92, 255, 0.18)',
    top: -94,
    right: -48,
  },
  gameIcon: {
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
  gameTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 34,
    fontFamily: 'serif',
  },
  smallDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  smallDivider: {
    width: 34,
    height: 1,
    backgroundColor: 'rgba(167, 139, 250, 0.5)',
  },
  gameDescription: {
    maxWidth: '82%',
    fontSize: 15,
    color: '#C7C0D8',
    lineHeight: 22,
  },
  gameArrow: {
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
  hiddenTabBar: {
    display: 'none',
  },
});
