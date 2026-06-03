import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { ModeCard } from '@/components/mode/ModeCard';
import { PressableScale } from '@/components/ui/PressableScale';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { useSessionStore } from '@/store/session';
import { usePremiumStore } from '@/store/premium';
import { premiumPacks } from '@/data/packs';
import type { GameSelection, Mode, PackId } from '@/data/types';

const MODES: Mode[] = ['chill', 'spicy', 'wild'];
const UNLOCK_GREEN = '#4ADE80';

export default function ModeScreen() {
  const players = useSessionStore(s => s.players);
  const gameType = useSessionStore(s => s.gameType);
  const setMode = useSessionStore(s => s.setMode);
  const setSelection = useSessionStore(s => s.setSelection);
  const currentSelection = useSessionStore(s => s.selection);
  const canContinue = players.length >= 2;

  const unlockedPackIds = usePremiumStore(s => s.unlockedPremiumPackIds);
  const isPackUnlocked = (id: PackId) => unlockedPackIds.includes(id);

  const [localSelection, setLocalSelection] = useState<GameSelection | null>(currentSelection);

  useFocusEffect(useCallback(() => {
    if (!gameType) {
      router.replace('/game-type');
      return;
    }

    if (!canContinue) {
      router.replace('/players');
    }
  }, [canContinue, gameType]));

  const handleSelectMode = (mode: Mode) => {
    const sel: GameSelection = { kind: 'mode', mode };
    setLocalSelection(sel);
    setMode(mode);
  };

  const handleSelectPack = (packId: PackId) => {
    const sel: GameSelection = { kind: 'pack', packId };
    setLocalSelection(sel);
    setSelection(sel);
  };

  const handleStart = () => {
    if (!canContinue || !localSelection) return;
    router.push('/rules');
  };

  const isSelected = (sel: GameSelection) => {
    if (!localSelection) return false;
    if (sel.kind === 'mode' && localSelection.kind === 'mode') return sel.mode === localSelection.mode;
    if (sel.kind === 'pack' && localSelection.kind === 'pack') return sel.packId === localSelection.packId;
    return false;
  };

  if (!gameType) {
    return null;
  }

  const showPremiumSection = gameType === 'classic';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={8} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color="#C7C0D8" />
          </TouchableOpacity>
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.title}>
            <Text style={{ color: Colors.text }}>Choose the </Text>
            <Text style={{ color: '#A78BFA' }}>vibe</Text>
          </Text>
        </View>

        {/* Free modes */}
        <View style={styles.modeList}>
          {MODES.map(mode => (
            <ModeCard
              key={mode}
              mode={mode}
              selected={isSelected({ kind: 'mode', mode })}
              onPress={() => handleSelectMode(mode)}
            />
          ))}
        </View>

        {/* Premium packs section */}
        {showPremiumSection && (
          <View style={styles.premiumSection}>
            <View style={styles.premiumSectionHeader}>
              <Ionicons name="sparkles" size={11} color={Colors.accent} />
              <Text style={styles.premiumSectionLabel}>Premium packs</Text>
            </View>

            {premiumPacks.map(pack => {
              const unlocked = isPackUnlocked(pack.id);
              const packSel: GameSelection = { kind: 'pack', packId: pack.id };
              const selected = isSelected(packSel);

              return (
                <PressableScale
                  key={pack.id}
                  style={[
                    styles.premiumPackCard,
                    selected && styles.premiumPackCardSelected,
                    !unlocked && styles.premiumPackCardLocked,
                  ]}
                  onPress={() => {
                    if (unlocked) {
                      handleSelectPack(pack.id);
                    } else {
                      router.push('/(tabs)/shop');
                    }
                  }}
                  activeOpacity={0.85}
                  pressedScale={0.985}
                >
                  {/* Lock / unlock indicator */}
                  <View style={[
                    styles.premiumPackIcon,
                    unlocked && styles.premiumPackIconUnlocked,
                  ]}>
                    <Ionicons
                      name={unlocked ? 'checkmark' : 'lock-closed'}
                      size={13}
                      color={unlocked ? UNLOCK_GREEN : '#9B91B8'}
                    />
                  </View>

                  {/* Text block */}
                  <View style={styles.premiumPackBody}>
                    <View style={styles.premiumPackTitleRow}>
                      <Text style={styles.premiumPackTitle}>{pack.title}</Text>
                      <View style={styles.premiumVibeTag}>
                        <Text style={styles.premiumVibeText}>{pack.vibeLabel}</Text>
                      </View>
                    </View>
                    <Text style={styles.premiumPackSub} numberOfLines={1}>
                      {unlocked ? `${pack.cardCount} cards ready to play` : 'Tap to preview in shop'}
                    </Text>
                  </View>

                  {/* Right indicator */}
                  {selected ? (
                    <View style={styles.selectedCheck}>
                      <Text style={styles.selectedCheckText}>✓</Text>
                    </View>
                  ) : (
                    <Ionicons
                      name={unlocked ? 'chevron-forward' : 'bag-outline'}
                      size={16}
                      color={unlocked ? '#B9A7FF' : '#5C5678'}
                    />
                  )}
                </PressableScale>
              );
            })}
          </View>
        )}

        <View style={styles.footer}>
          <Button
            label="Continue →"
            onPress={handleStart}
            fullWidth
            disabled={!localSelection}
          />
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
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
  titleBlock: {
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  modeList: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },

  // Premium packs section
  premiumSection: {
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  premiumSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  premiumSectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textDim,
    letterSpacing: 1.0,
    textTransform: 'uppercase',
  },
  premiumPackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  premiumPackCardSelected: {
    borderColor: Colors.accentBorder,
    backgroundColor: Colors.accentBg,
  },
  premiumPackCardLocked: {
    opacity: 0.55,
  },
  premiumPackIcon: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  premiumPackIconUnlocked: {
    backgroundColor: 'rgba(74, 222, 128, 0.10)',
    borderColor: 'rgba(74, 222, 128, 0.28)',
  },
  premiumPackBody: {
    flex: 1,
    gap: 3,
  },
  premiumPackTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },
  premiumPackTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.1,
  },
  premiumVibeTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.full,
    backgroundColor: Colors.accentBg,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.20)',
  },
  premiumVibeText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.accent,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  premiumPackSub: {
    fontSize: 12,
    color: Colors.textDim,
  },
  selectedCheck: {
    width: 26,
    height: 26,
    borderRadius: Radius.full,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  selectedCheckText: {
    fontSize: 14,
    color: '#0A0908',
    fontWeight: '800',
  },
  footer: {
    paddingBottom: Spacing.md,
  },
});
