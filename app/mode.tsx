import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { ModeCard } from '@/components/mode/ModeCard';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { useSessionStore } from '@/store/session';
import type { Mode } from '@/data/types';

const MODES: Mode[] = ['chill', 'spicy', 'wild'];

export default function ModeScreen() {
  const players = useSessionStore(s => s.players);
  const gameType = useSessionStore(s => s.gameType);
  const setMode = useSessionStore(s => s.setMode);
  const currentMode = useSessionStore(s => s.mode);
  const [selected, setSelected] = useState<Mode | null>(currentMode);
  const canContinue = players.length >= 2;

  useFocusEffect(useCallback(() => {
    if (!gameType) {
      router.replace('/game-type');
      return;
    }

    if (!canContinue) {
      router.replace('/players');
    }
  }, [canContinue, gameType]));

  const handleSelect = (mode: Mode) => {
    setSelected(mode);
    setMode(mode);
  };

  const handleStart = () => {
    if (!canContinue || !selected) return;
    router.push('/rules');
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

        <View style={styles.modeList}>
          {MODES.map(mode => (
            <ModeCard
              key={mode}
              mode={mode}
              selected={selected === mode}
              onPress={() => handleSelect(mode)}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Button
            label="Continue →"
            onPress={handleStart}
            fullWidth
            disabled={!selected}
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
  footer: {
    paddingBottom: Spacing.md,
  },
});
