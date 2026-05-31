import { useCallback, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { useSessionStore } from '@/store/session';

const RULES = [
  'All cards are optional.',
  'Skip anything, anytime.',
  'Only capture people who are okay with it.',
  'Keep it fun, not forced.',
] as const;

const RULE_ICONS = ['checkmark-circle-outline', 'play-skip-forward-outline', 'camera-outline', 'sparkles-outline'] as const;

export default function RulesScreen() {
  const players = useSessionStore(s => s.players);
  const gameType = useSessionStore(s => s.gameType);
  const mode = useSessionStore(s => s.mode);
  const startGame = useSessionStore(s => s.startGame);
  const [isStarting, setIsStarting] = useState(false);
  const startLockRef = useRef(false);
  const hasEnoughPlayers = players.length >= 2;
  const modeCfg = mode ? Colors.modes[mode] : null;

  useFocusEffect(useCallback(() => {
    if (!gameType) {
      router.replace('/game-type');
      return;
    }

    if (!hasEnoughPlayers) {
      router.replace('/players');
      return;
    }

    if (!mode) {
      router.replace('/mode');
    }
  }, [gameType, hasEnoughPlayers, mode]));

  const handleStart = () => {
    if (startLockRef.current || !gameType || !hasEnoughPlayers || !mode) return;

    startLockRef.current = true;
    setIsStarting(true);

    const didStart = startGame();
    if (!didStart) {
      startLockRef.current = false;
      setIsStarting(false);
      return;
    }

    router.push(gameType === 'classic' ? '/game' : '/truth-or-dare');
  };

  if (!gameType) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={styles.bgGlow} />
        <View style={styles.bgGlow2} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} hitSlop={8} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={20} color="#C7C0D8" />
            </TouchableOpacity>
            <Text style={styles.stepLabel}>STEP 4 OF 4</Text>
          </View>

          <View style={styles.titleBlock}>
            <Text style={styles.kicker}>HOUSE RULES</Text>
            <Text style={styles.title}>Before the night starts</Text>
          </View>

          <View style={[styles.rulesPanel, modeCfg && { borderColor: modeCfg.borderSelected }]}>
            {modeCfg ? (
              <View style={[styles.modePill, { backgroundColor: modeCfg.bg, borderColor: modeCfg.borderSelected }]}>
                <Text style={[styles.modePillText, { color: modeCfg.primary }]}>{modeCfg.name.toUpperCase()}</Text>
              </View>
            ) : null}

            <View style={styles.ruleList}>
              {RULES.map((rule, index) => (
                <View key={rule} style={[styles.ruleRow, index === RULES.length - 1 && styles.ruleRowLast]}>
                  <View
                    style={[
                      styles.ruleIcon,
                      modeCfg && { backgroundColor: modeCfg.bg, borderColor: modeCfg.borderSelected },
                    ]}
                  >
                    <Ionicons name={RULE_ICONS[index]} size={18} color={modeCfg?.primary ?? '#A78BFA'} />
                  </View>
                  <Text style={styles.ruleText}>{rule}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            label="Start the night"
            onPress={handleStart}
            fullWidth
            disabled={!gameType || !hasEnoughPlayers || !mode || isStarting}
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
    backgroundColor: '#050817',
  },
  bgGlow: {
    position: 'absolute',
    width: 390,
    height: 390,
    borderRadius: 195,
    backgroundColor: 'rgba(124, 92, 255, 0.14)',
    top: -180,
    right: -140,
  },
  bgGlow2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(54, 116, 255, 0.08)',
    bottom: 80,
    left: -160,
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
    borderColor: 'rgba(214, 203, 255, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    color: '#A78BFA',
  },
  titleBlock: {
    marginBottom: Spacing.xxl,
  },
  kicker: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    color: '#A78BFA',
    marginBottom: Spacing.sm,
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
  },
  rulesPanel: {
    backgroundColor: 'rgba(10, 15, 39, 0.9)',
    borderRadius: Radius.xxl,
    borderWidth: 1.5,
    borderColor: 'rgba(214, 203, 255, 0.18)',
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  modePill: {
    alignSelf: 'flex-start',
    borderRadius: Radius.full,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: Spacing.sm,
  },
  modePillText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  ruleList: {
    gap: 0,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(214, 203, 255, 0.08)',
  },
  ruleRowLast: {
    borderBottomWidth: 0,
  },
  ruleIcon: {
    width: 38,
    height: 38,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(167, 139, 250, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ruleText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 22,
  },
  footer: {
    gap: Spacing.sm,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
});
