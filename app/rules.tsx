import { useCallback, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { useSessionStore } from '@/store/session';
import { premiumPackMetadata } from '@/data/packs';

const RULES = [
  'All cards are optional.',
  'Skip anything, anytime.',
  'Only capture people who are okay with it.',
  'Keep it fun, not forced.',
] as const;

export default function RulesScreen() {
  const players = useSessionStore(s => s.players);
  const gameType = useSessionStore(s => s.gameType);
  const selection = useSessionStore(s => s.selection);
  const startGame = useSessionStore(s => s.startGame);
  const [isStarting, setIsStarting] = useState(false);
  const startLockRef = useRef(false);
  const hasEnoughPlayers = players.length >= 2;

  // Derive display config from selection
  const selectionDisplay = (() => {
    if (!selection) return null;
    if (selection.kind === 'mode') {
      const cfg = Colors.modes[selection.mode];
      return { name: cfg.name.toUpperCase(), primary: cfg.primary, bg: cfg.bg, border: cfg.borderSelected };
    }
    const pack = premiumPackMetadata[selection.packId];
    return {
      name: pack.title.toUpperCase(),
      primary: Colors.accent,
      bg: Colors.accentBg,
      border: Colors.accentBorder,
    };
  })();

  const primaryColor = selectionDisplay?.primary ?? Colors.accent;

  useFocusEffect(useCallback(() => {
    if (!gameType) {
      router.replace('/game-type');
      return;
    }

    if (!hasEnoughPlayers) {
      router.replace('/players');
      return;
    }

    if (!selection) {
      router.replace('/mode');
    }
  }, [gameType, hasEnoughPlayers, selection]));

  const handleStart = () => {
    if (startLockRef.current || !gameType || !hasEnoughPlayers || !selection) return;

    startLockRef.current = true;
    setIsStarting(true);

    const didStart = startGame();
    if (!didStart) {
      startLockRef.current = false;
      setIsStarting(false);
      return;
    }

    router.push(gameType === 'truthOrDare' ? '/truth-or-dare' : '/game');
  };

  if (!gameType) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} hitSlop={8} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={20} color={Colors.textMuted} />
            </TouchableOpacity>
          </View>

          <View style={styles.titleBlock}>
            <Text style={styles.kicker}>Before the night starts</Text>
            <Text style={styles.title}>House Rules</Text>
            {selectionDisplay ? (
              <View style={[
                styles.modePill,
                { backgroundColor: selectionDisplay.bg, borderColor: selectionDisplay.border },
              ]}>
                <Text style={[styles.modePillText, { color: selectionDisplay.primary }]}>
                  {selectionDisplay.name}
                </Text>
              </View>
            ) : null}
          </View>

          <View style={styles.rulesList}>
            {RULES.map((rule, index) => (
              <View key={rule} style={[styles.ruleRow, index === RULES.length - 1 && styles.ruleRowLast]}>
                <Text style={[styles.ruleNum, { color: primaryColor }]}>
                  {String(index + 1).padStart(2, '0')}
                </Text>
                <Text style={styles.ruleText}>{rule}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            label="Start the night"
            onPress={handleStart}
            fullWidth
            disabled={!gameType || !hasEnoughPlayers || !selection || isStarting}
          />
          <Button label="Back" onPress={() => router.back()} variant="ghost" fullWidth />
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: Colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBlock: {
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  kicker: {
    fontSize: 14,
    fontWeight: '500',
    color: '#AFA8C8',
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
  },
  modePill: {
    alignSelf: 'flex-start',
    borderRadius: Radius.full,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  modePillText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  rulesList: {
    marginBottom: Spacing.lg,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.lg,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  ruleRowLast: {
    borderBottomWidth: 0,
  },
  ruleNum: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    width: 22,
    lineHeight: 26,
    flexShrink: 0,
  },
  ruleText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 26,
  },
  footer: {
    gap: Spacing.sm,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
});
