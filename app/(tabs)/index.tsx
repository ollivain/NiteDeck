import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
import { Colors, Radius, Spacing } from '@/constants/theme';
import { MainTabBar } from '@/constants/navigation';
import { PressableScale } from '@/components/ui/PressableScale';
import { useSessionStore } from '@/store/session';
import type { GameType } from '@/data/types';

type GameOption = {
  id: GameType;
  title: string;
  description: string;
};

const SPLASH_MS = 1450;
let hasSeenLaunchSplash = false;

const GAME_OPTIONS: GameOption[] = [
  {
    id: 'classic',
    title: 'Classic',
    description: 'Group prompts, camera moments and chaotic recaps.',
  },
  {
    id: 'truth-or-dare',
    title: 'Truth or Dare',
    description: 'Personal truths, bold dares and party-ready chaos.',
  },
];


function DeckMark({ large = false }: { large?: boolean }) {
  return (
    <View style={[styles.deckMark, large && styles.deckMarkLarge]}>
      <View style={[styles.miniCard, large && styles.miniCardLarge, styles.miniCardBack]}>
        <Text style={[styles.cardLetter, large && styles.cardLetterLarge]}>D</Text>
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
      if (exitTimer) clearTimeout(exitTimer);
    };
  }, [contentOffset, onDone, opacity, reduceMotion]);

  const splashStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: contentOffset.value }],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.splashContent, splashStyle]}>
        <DeckMark large />
        <Text style={styles.splashTitle}>NiteDeck</Text>
        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Ionicons name="sparkles" size={14} color="#A78BFA" />
          <View style={styles.divider} />
        </View>
        <Text style={styles.splashTagline}>Party games. Drinking games.</Text>
        <Text style={styles.splashTagline}>{"Memories you'll talk about."}</Text>
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

      <Animated.View style={[styles.home, homeStyle]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.scrollContent}
        >
          {/* Hero */}
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
            <Text style={styles.tagline}>{"Memories you'll talk about."}</Text>
          </View>

          {/* Primary CTA */}
          <PressableScale
            onPress={() => router.navigate('/(tabs)/games')}
            activeOpacity={0.82}
            pressedScale={0.96}
            style={styles.ctaButton}
          >
            <Ionicons name="wine-outline" size={20} color="#F7F3FF" />
            <Text style={styles.ctaText}>{"Let's Play"}</Text>
          </PressableScale>

          {/* Featured Games */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Games</Text>
            <TouchableOpacity
              onPress={() => router.navigate('/(tabs)/games')}
              hitSlop={12}
              activeOpacity={0.7}
            >
              <Text style={styles.viewAll}>View all ›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.gameGrid}>
            {GAME_OPTIONS.map(option => (
              <PressableScale
                key={option.id}
                onPress={() => handleSelectGame(option.id)}
                activeOpacity={0.84}
                pressedScale={0.975}
                style={styles.gameCard}
              >
                {/* Visual area */}
                <View style={styles.cardIconArea}>
                  {option.id === 'classic' ? (
                    <View style={styles.classicVisual}>
                      <View style={[styles.miniGameCard, styles.miniGameCardBack]}>
                        <Text style={styles.miniCardRank}>K</Text>
                        <Text style={styles.miniCardSuit}>♠</Text>
                      </View>
                      <View style={[styles.miniGameCard, styles.miniGameCardFront]}>
                        <Text style={styles.miniCardRank}>A</Text>
                        <Text style={styles.miniCardSuit}>♠</Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.todVisual}>
                      <View style={styles.bubbleLight}>
                        <Text style={styles.bubbleLightSymbol}>♥</Text>
                      </View>
                      <View style={styles.bubbleDark}>
                        <Text style={styles.bubbleDarkSymbol}>?</Text>
                      </View>
                    </View>
                  )}
                </View>

                {/* Title */}
                <Text style={styles.cardTitle} numberOfLines={2}>{option.title}</Text>

                {/* Micro divider */}
                <View style={styles.cardDividerRow}>
                  <View style={styles.cardDividerLine} />
                  <Text style={styles.cardDividerSymbol}>♠</Text>
                  <View style={styles.cardDividerLine} />
                </View>

                {/* Description */}
                <Text style={styles.cardDesc}>{option.description}</Text>

                {/* Players pill */}
                <View style={styles.cardPlayerPill}>
                  <Ionicons name="people-outline" size={11} color={Colors.textDim} />
                  <Text style={styles.cardPlayerText}>2+ players</Text>
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

  // Hero
  hero: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
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
    backgroundColor: 'rgba(167, 139, 250, 0.45)',
  },
  splashTagline: {
    fontSize: 19,
    fontWeight: '400',
    color: Colors.textMuted,
    lineHeight: 28,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 17,
    fontWeight: '400',
    color: Colors.textMuted,
    lineHeight: 26,
    textAlign: 'center',
  },

  // CTA Button
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: '#7C5CFF',
    borderRadius: Radius.full,
    paddingVertical: 16,
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xxl,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.45)',
    shadowColor: '#7C5CFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 6,
  },
  ctaText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#F7F3FF',
    letterSpacing: 0.3,
  },

  // Section header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    letterSpacing: 0.2,
  },
  viewAll: {
    fontSize: 14,
    color: Colors.accent,
    fontWeight: '500',
  },

  // Game grid
  gameGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  gameCard: {
    flex: 1,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.16)',
    backgroundColor: 'rgba(10, 15, 39, 0.92)',
    padding: Spacing.md,
    overflow: 'hidden',
  },
  cardIconArea: {
    height: 76,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    backgroundColor: 'rgba(124, 92, 255, 0.05)',
  },
  classicVisual: {
    width: 68,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniGameCard: {
    position: 'absolute',
    width: 34,
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  miniGameCardBack: {
    backgroundColor: 'rgba(124, 92, 255, 0.20)',
    borderColor: 'rgba(205, 190, 255, 0.38)',
    transform: [{ rotate: '9deg' }, { translateX: 11 }],
  },
  miniGameCardFront: {
    backgroundColor: 'rgba(7, 12, 34, 0.92)',
    borderColor: 'rgba(205, 190, 255, 0.52)',
    transform: [{ rotate: '-6deg' }, { translateX: -9 }],
  },
  miniCardRank: {
    fontSize: 15,
    fontWeight: '700',
    color: 'rgba(231, 224, 255, 0.90)',
    fontFamily: 'serif',
    lineHeight: 17,
  },
  miniCardSuit: {
    fontSize: 9,
    color: 'rgba(205, 190, 255, 0.60)',
    lineHeight: 11,
  },
  todVisual: {
    width: 68,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleLight: {
    position: 'absolute',
    width: 40,
    height: 28,
    borderRadius: 9,
    backgroundColor: 'rgba(167, 139, 250, 0.20)',
    borderWidth: 1,
    borderColor: 'rgba(205, 190, 255, 0.42)',
    alignItems: 'center',
    justifyContent: 'center',
    top: 4,
    right: 4,
  },
  bubbleDark: {
    position: 'absolute',
    width: 40,
    height: 28,
    borderRadius: 9,
    backgroundColor: 'rgba(7, 12, 34, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(205, 190, 255, 0.50)',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 4,
    left: 4,
  },
  bubbleLightSymbol: {
    fontSize: 12,
    color: 'rgba(205, 190, 255, 0.72)',
    lineHeight: 14,
  },
  bubbleDarkSymbol: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(231, 224, 255, 0.88)',
    fontFamily: 'serif',
    lineHeight: 17,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
    fontFamily: 'serif',
    lineHeight: 22,
    marginBottom: 8,
  },
  cardDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  cardDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(167, 139, 250, 0.18)',
  },
  cardDividerSymbol: {
    fontSize: 9,
    color: Colors.textDim,
  },
  cardDesc: {
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 18,
    marginBottom: 14,
  },
  cardPlayerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: Radius.full,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.10)',
  },
  cardPlayerText: {
    fontSize: 11,
    color: Colors.textDim,
    fontWeight: '500',
  },

  hiddenTabBar: {
    display: 'none',
  },
});
