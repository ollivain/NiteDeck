import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { premiumPacks } from '@/data/packs';
import { premiumCardsByPack } from '@/data/cards';
import { PressableScale } from '@/components/ui/PressableScale';
import { usePremiumStore } from '@/store/premium';
import type { PackId, PremiumCard } from '@/data/types';

const FALLBACK_PREVIEW_COUNT = 5;

export default function ShopScreen() {
  const insets = useSafeAreaInsets();
  const [selectedPackId, setSelectedPackId] = useState<PackId | null>(null);

  // Premium entitlement state
  const unlockedPackIds = usePremiumStore(s => s.unlockedPremiumPackIds);
  const unlockForTesting = usePremiumStore(s => s.unlockPremiumPackForTesting);
  const lockForTesting = usePremiumStore(s => s.lockPremiumPackForTesting);

  const isUnlocked = (id: PackId) => unlockedPackIds.includes(id);

  const selectedPack = selectedPackId
    ? (premiumPacks.find(p => p.id === selectedPackId) ?? null)
    : null;

  const isSelectedPackUnlocked = selectedPack ? isUnlocked(selectedPack.id) : false;

  const previewCards: PremiumCard[] = (() => {
    if (!selectedPack || !selectedPackId) return [];
    const packCards = premiumCardsByPack[selectedPackId] ?? [];
    const ids = selectedPack.previewCardIds;
    if (ids.length > 0) {
      const byId = new Map(packCards.map(c => [c.id, c]));
      const resolved = ids.map(id => byId.get(id)).filter((c): c is PremiumCard => c !== undefined);
      if (resolved.length > 0) return resolved;
    }
    return packCards.slice(0, FALLBACK_PREVIEW_COUNT);
  })();

  const closeModal = () => setSelectedPackId(null);

  const toggleUnlockForTesting = (packId: PackId) => {
    if (isUnlocked(packId)) {
      lockForTesting(packId);
    } else {
      unlockForTesting(packId);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Premium packs</Text>
        </View>

        <View style={styles.noticeCard}>
          <View style={styles.noticeIcon}>
            <Ionicons name="sparkles" size={22} color={Colors.accent} />
          </View>
          <View style={styles.noticeCopy}>
            <Text style={styles.noticeTitle}>Core game is free</Text>
            <Text style={styles.noticeText}>
              Premium packs are in development. Temptations, Roast, Truth Bombs and more are on the way.
            </Text>
          </View>
        </View>

        <View style={styles.packGrid}>
          {premiumPacks.map(pack => {
            const unlocked = isUnlocked(pack.id);
            return (
              <PressableScale
                key={pack.id}
                style={styles.packCard}
                onPress={() => setSelectedPackId(pack.id)}
                onLongPress={__DEV__ ? () => toggleUnlockForTesting(pack.id) : undefined}
                activeOpacity={0.85}
                pressedScale={0.985}
              >
                <View style={styles.packGlow} />

                {/* Status row */}
                <View style={styles.packHeader}>
                  {unlocked ? (
                    <View style={styles.unlockedIconCircle}>
                      <Ionicons name="checkmark" size={16} color={UNLOCK_GREEN} />
                    </View>
                  ) : (
                    <View style={styles.lockIcon}>
                      <Ionicons name="lock-closed" size={16} color="#D8D2EA" />
                    </View>
                  )}
                  {unlocked ? (
                    <View style={styles.unlockedBadge}>
                      <Text style={styles.unlockedBadgeText}>Unlocked</Text>
                    </View>
                  ) : (
                    <View style={styles.comingSoonBadge}>
                      <Text style={styles.comingSoonText}>Coming soon</Text>
                    </View>
                  )}
                </View>

                <View style={styles.vibeTag}>
                  <Text style={styles.vibeText}>{pack.vibeLabel}</Text>
                </View>

                <Text style={styles.packTitle}>{pack.title}</Text>
                <Text style={styles.cardCount}>{pack.cardCount} cards</Text>
                <Text style={styles.packDescription}>{pack.description}</Text>

                {pack.previewLines.length > 0 && (
                  <View style={styles.teaserList}>
                    {pack.previewLines.map((line, i) => (
                      <View key={i} style={styles.teaserRow}>
                        <View style={styles.teaserDot} />
                        <Text style={styles.teaserText}>{line}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </PressableScale>
            );
          })}
        </View>
      </ScrollView>

      {/* Pack preview modal */}
      <Modal
        visible={selectedPack !== null}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
        statusBarTranslucent
      >
        <View style={styles.modalRoot}>
          <Pressable style={styles.backdrop} onPress={closeModal} />
          <View
            style={[
              styles.sheet,
              { paddingBottom: Math.max(insets.bottom, Spacing.lg) },
            ]}
          >
            {/* Drag handle */}
            <View style={styles.dragHandle} />

            <ScrollView
              style={styles.modalScroll}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalContent}
              bounces={false}
              nestedScrollEnabled
              keyboardShouldPersistTaps="handled"
            >
              {selectedPack !== null && (
                <>
                  {/* Status row + close */}
                  <View style={styles.modalTopRow}>
                    {isSelectedPackUnlocked ? (
                      <View style={styles.unlockedIconCircle}>
                        <Ionicons name="checkmark" size={15} color={UNLOCK_GREEN} />
                      </View>
                    ) : (
                      <View style={styles.modalLockIcon}>
                        <Ionicons name="lock-closed" size={15} color="#D8D2EA" />
                      </View>
                    )}
                    {isSelectedPackUnlocked ? (
                      <View style={styles.unlockedBadge}>
                        <Text style={styles.unlockedBadgeText}>Unlocked</Text>
                      </View>
                    ) : (
                      <View style={styles.comingSoonBadge}>
                        <Text style={styles.comingSoonText}>Coming soon</Text>
                      </View>
                    )}
                    <View style={styles.modalTopSpacer} />
                    <PressableScale
                      onPress={closeModal}
                      style={styles.closeButton}
                      activeOpacity={0.8}
                      pressedScale={0.92}
                    >
                      <Ionicons name="close" size={17} color={Colors.textMuted} />
                    </PressableScale>
                  </View>

                  {/* Vibe label */}
                  <View style={styles.vibeTag}>
                    <Text style={styles.vibeText}>{selectedPack.vibeLabel}</Text>
                  </View>

                  {/* Title */}
                  <Text style={styles.modalTitle}>{selectedPack.title}</Text>

                  {/* Card count */}
                  <Text style={styles.cardCount}>{selectedPack.cardCount} cards</Text>

                  {/* Description */}
                  <Text style={styles.modalDescription}>{selectedPack.description}</Text>

                  {/* Preview cards section */}
                  <View style={styles.previewSection}>
                    <Text style={styles.previewSectionLabel}>Preview cards</Text>
                    <View style={styles.previewCardList}>
                      {previewCards.map(card => (
                        <View key={card.id} style={styles.previewCard}>
                          <Text style={styles.previewCardLabel}>{card.label}</Text>
                          <Text style={styles.previewCardText}>{card.text}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* CTA */}
                  <View style={styles.ctaRow}>
                    {isSelectedPackUnlocked ? (
                      <View style={styles.ctaUnlocked}>
                        <Ionicons name="checkmark-circle" size={15} color={UNLOCK_GREEN} />
                        <Text style={styles.ctaUnlockedText}>Unlocked</Text>
                      </View>
                    ) : (
                      <View style={styles.ctaLocked}>
                        <Ionicons name="lock-closed" size={13} color={Colors.textDim} />
                        <Text style={styles.ctaLockedText}>Coming soon</Text>
                      </View>
                    )}
                  </View>

                  {/* DEV-only toggle */}
                  {__DEV__ && (
                    <Pressable
                      onPress={() => toggleUnlockForTesting(selectedPack.id)}
                      style={styles.devToggle}
                    >
                      <Text style={styles.devToggleText}>
                        {'DEV · '}
                        {isSelectedPackUnlocked ? 'Lock pack' : 'Unlock pack'}
                      </Text>
                    </Pressable>
                  )}
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const UNLOCK_GREEN = '#4ADE80';

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
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
  },

  // Notice card
  noticeCard: {
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  noticeIcon: {
    width: 48,
    height: 48,
    borderRadius: Radius.full,
    backgroundColor: Colors.accentBg,
    borderWidth: 1,
    borderColor: Colors.accentBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noticeCopy: {
    flex: 1,
    gap: 4,
  },
  noticeTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  noticeText: {
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 18,
  },

  // Pack grid
  packGrid: {
    gap: Spacing.md,
  },
  packCard: {
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    overflow: 'hidden',
  },
  packGlow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(124, 92, 255, 0.10)',
    top: -80,
    right: -40,
  },
  packHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },

  // Lock / unlock icon circles
  lockIcon: {
    width: 34,
    height: 34,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unlockedIconCircle: {
    width: 34,
    height: 34,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(74, 222, 128, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.28)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Badges
  comingSoonBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
    backgroundColor: Colors.accentBg,
    borderWidth: 1,
    borderColor: Colors.accentBorder,
  },
  comingSoonText: {
    ...Typography.label,
    color: Colors.accent,
    textTransform: 'uppercase',
  },
  unlockedBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(74, 222, 128, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.30)',
  },
  unlockedBadgeText: {
    ...Typography.label,
    color: UNLOCK_GREEN,
    textTransform: 'uppercase',
  },

  // Vibe tag
  vibeTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(167, 139, 250, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.20)',
    marginBottom: 10,
  },
  vibeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.accent,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },

  // Card count (shared)
  cardCount: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textDim,
    marginBottom: Spacing.sm,
    letterSpacing: 0.2,
  },

  // Pack card body
  packTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  packDescription: {
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 19,
    marginBottom: Spacing.md,
  },
  teaserList: {
    gap: 9,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.borderSubtle,
  },
  teaserRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
  },
  teaserDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.accent2,
    marginTop: 8,
    flexShrink: 0,
  },
  teaserText: {
    flex: 1,
    fontSize: 12,
    color: Colors.textDim,
    lineHeight: 18,
    fontStyle: 'italic',
  },

  // Modal backdrop + sheet
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
  },
  sheet: {
    backgroundColor: Colors.surface2,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: Colors.border,
    maxHeight: '88%',
  },
  modalScroll: {
    flexGrow: 0,
    flexShrink: 1,
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(214, 203, 255, 0.18)',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 2,
  },
  modalContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },

  // Modal header row
  modalTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  modalLockIcon: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTopSpacer: {
    flex: 1,
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Modal body
  modalTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.6,
    marginBottom: 4,
  },
  modalDescription: {
    fontSize: 14,
    color: Colors.textMuted,
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },

  // Preview cards section
  previewSection: {
    marginBottom: Spacing.lg,
  },
  previewSectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textDim,
    letterSpacing: 1.0,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  previewCardList: {
    gap: Spacing.sm,
  },
  previewCard: {
    backgroundColor: 'rgba(10, 15, 39, 0.7)',
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    padding: Spacing.md,
    gap: 6,
  },
  previewCardLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.accent,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  previewCardText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },

  // CTA row
  ctaRow: {
    paddingTop: 4,
  },
  ctaLocked: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: Radius.xl,
    borderWidth: 1.5,
    borderColor: Colors.borderSubtle,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    opacity: 0.55,
  },
  ctaLockedText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textDim,
    letterSpacing: 0.3,
  },
  ctaUnlocked: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: Radius.xl,
    borderWidth: 1.5,
    borderColor: 'rgba(74, 222, 128, 0.30)',
    backgroundColor: 'rgba(74, 222, 128, 0.06)',
  },
  ctaUnlockedText: {
    fontSize: 15,
    fontWeight: '700',
    color: UNLOCK_GREEN,
    letterSpacing: 0.3,
  },

  // DEV-only toggle
  devToggle: {
    marginTop: Spacing.md,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  devToggleText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textDim,
    letterSpacing: 0.5,
    opacity: 0.6,
  },
});
