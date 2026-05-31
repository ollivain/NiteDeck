import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { PressableScale } from '@/components/ui/PressableScale';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { useSessionStore } from '@/store/session';

const GHOST_WIDTHS = [62, 45, 55] as const;
const MAX_PLAYERS = 10;
const ADD_PRESS_LOCK_MS = 250;
const ADD_TO_CONTINUE_GUARD_MS = 250;

export default function PlayersScreen() {
  const [inputValue, setInputValue] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [isContinuing, setIsContinuing] = useState(false);
  const addLockRef = useRef(false);
  const addLockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const continueLockRef = useRef(false);
  const lastAddAtRef = useRef(0);
  const players = useSessionStore(s => s.players);
  const gameType = useSessionStore(s => s.gameType);
  const addPlayer = useSessionStore(s => s.addPlayer);
  const removePlayer = useSessionStore(s => s.removePlayer);

  useFocusEffect(useCallback(() => {
    if (!gameType) {
      router.replace('/game-type');
    }
  }, [gameType]));

  useEffect(() => {
    return () => {
      if (addLockTimerRef.current) {
        clearTimeout(addLockTimerRef.current);
      }
    };
  }, []);

  const handleAdd = () => {
    if (addLockRef.current) return;

    const trimmedName = inputValue.trim();
    if (!trimmedName) return;

    if (players.length >= MAX_PLAYERS) {
      Alert.alert('Max players', 'You can have up to 10 players.');
      return;
    }

    addLockRef.current = true;
    lastAddAtRef.current = Date.now();
    setInputValue('');
    addPlayer(trimmedName);

    if (addLockTimerRef.current) {
      clearTimeout(addLockTimerRef.current);
    }
    addLockTimerRef.current = setTimeout(() => {
      addLockRef.current = false;
      addLockTimerRef.current = null;
    }, ADD_PRESS_LOCK_MS);
  };

  const canContinue = players.length >= 2;
  const trimmedInputValue = inputValue.trim();
  const isAtMaxPlayers = players.length >= MAX_PLAYERS;
  const canAddPlayer = Boolean(trimmedInputValue) && !isAtMaxPlayers;

  const handleContinue = () => {
    if (!canContinue || isContinuing || continueLockRef.current) return;
    if (Date.now() - lastAddAtRef.current < ADD_TO_CONTINUE_GUARD_MS) return;

    continueLockRef.current = true;
    setIsContinuing(true);
    router.push('/mode');
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
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={8} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color="#C7C0D8" />
          </TouchableOpacity>
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.title}>
            <Text style={{ color: Colors.text }}>Who is{'\n'}</Text>
            <Text style={{ color: '#A78BFA' }}>playing?</Text>
          </Text>
          <Text style={styles.subtitle}>Add at least 2 players to start</Text>
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, inputFocused && styles.inputFocused]}
            placeholder="Enter a name..."
            placeholderTextColor="rgba(167, 139, 250, 0.38)"
            value={inputValue}
            onChangeText={setInputValue}
            onSubmitEditing={handleAdd}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            returnKeyType="done"
            maxLength={20}
            autoCapitalize="words"
            selectionColor="#A78BFA"
            autoFocus
          />
          <PressableScale
            style={[styles.addBtn, !canAddPlayer && styles.addBtnDisabled]}
            onPress={handleAdd}
            disabled={!canAddPlayer}
            activeOpacity={0.8}
            pressedScale={0.94}
          >
            <Ionicons name="add" size={24} color={canAddPlayer ? '#0A0908' : 'rgba(167, 139, 250, 0.38)'} />
          </PressableScale>
        </View>

        {players.length > 0 ? (
          <View style={styles.playerCard}>
            <Text style={styles.sectionLabel}>
              {players.length} PLAYER{players.length !== 1 ? 'S' : ''}
            </Text>
            {players.map((p, i) => (
              <View key={p.id} style={[styles.playerRow, i === players.length - 1 && styles.playerRowLast]}>
                <View style={styles.playerIdxCircle}>
                  <Text style={styles.playerIdx}>{i + 1}</Text>
                </View>
                <Text style={styles.playerRowName} numberOfLines={1}>{p.name}</Text>
                <TouchableOpacity
                  onPress={() => removePlayer(p.id)}
                  style={styles.rowRemoveBtn}
                  hitSlop={{ top: 12, bottom: 12, left: 16, right: 16 }}
                >
                  <Ionicons name="close" size={15} color="rgba(167, 139, 250, 0.5)" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.ghostCard}>
            <Text style={styles.ghostHeading}>PLAYERS</Text>
            {GHOST_WIDTHS.map((w, i) => (
              <View key={i} style={[styles.ghostRow, { opacity: 0.52 - i * 0.14 }]}>
                <View style={styles.ghostIdx} />
                <View style={[styles.ghostBar, { width: `${w}%` }]} />
              </View>
            ))}
            <Text style={styles.ghostHint}>Add players above to get started</Text>
          </View>
        )}

        <View style={styles.footer}>
          <Button
            label={!canContinue ? `Need ${2 - players.length} more player${players.length === 1 ? '' : 's'}` : 'Continue →'}
            onPress={handleContinue}
            fullWidth
            disabled={!canContinue || isContinuing}
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
  subtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#C7C0D8',
    lineHeight: 22,
  },
  inputRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  input: {
    flex: 1,
    height: 56,
    backgroundColor: 'rgba(10, 15, 39, 0.9)',
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.18)',
    paddingHorizontal: Spacing.md,
    color: Colors.text,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: 'rgba(167, 139, 250, 0.55)',
    borderWidth: 1.5,
  },
  addBtn: {
    width: 56,
    height: 56,
    borderRadius: Radius.lg,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.12)',
  },
  playerCard: {
    backgroundColor: 'rgba(10, 15, 39, 0.9)',
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.18)',
    padding: Spacing.md,
    marginBottom: Spacing.xl,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    color: '#A78BFA',
    marginBottom: Spacing.sm,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(214, 203, 255, 0.08)',
  },
  playerRowLast: {
    borderBottomWidth: 0,
  },
  playerIdxCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#A78BFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerIdx: {
    fontSize: 13,
    fontWeight: '700',
    color: '#A78BFA',
  },
  playerRowName: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: Colors.text,
    letterSpacing: -0.2,
  },
  rowRemoveBtn: {
    width: 28,
    height: 28,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostCard: {
    backgroundColor: 'rgba(10, 15, 39, 0.7)',
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.1)',
    borderStyle: 'dashed',
    padding: Spacing.md,
    marginBottom: Spacing.xl,
  },
  ghostHeading: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    color: 'rgba(167, 139, 250, 0.35)',
    marginBottom: Spacing.sm,
  },
  ghostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(214, 203, 255, 0.06)',
  },
  ghostIdx: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(167, 139, 250, 0.15)',
  },
  ghostBar: {
    height: 12,
    borderRadius: 4,
    backgroundColor: 'rgba(167, 139, 250, 0.08)',
  },
  ghostHint: {
    fontSize: 13,
    color: 'rgba(167, 139, 250, 0.45)',
    textAlign: 'center',
    marginTop: Spacing.lg,
    letterSpacing: 0.1,
  },
  footer: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
});
