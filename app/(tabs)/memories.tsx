import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { premiumPackMetadata } from '@/data/packs';
import { useSessionStore } from '@/store/session';
import type { SavedNight } from '@/store/session';

function formatNightDate(createdAt: string) {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function gameTypeLabel(night: SavedNight) {
  return night.gameType === 'truth-or-dare' ? 'Truth or Dare' : 'Classic';
}

function getNightDisplay(night: SavedNight): { primary: string; name: string } {
  if (night.packId) {
    const pack = premiumPackMetadata[night.packId];
    return { primary: Colors.accent, name: pack?.title ?? 'Premium' };
  }
  if (night.mode) {
    const cfg = Colors.modes[night.mode];
    return { primary: cfg.primary, name: cfg.name };
  }
  return { primary: Colors.accent, name: 'NiteDeck' };
}

function getNightTitle(night: SavedNight, nightNumber: number): string {
  if (night.title) return night.title;
  const dateStr = formatNightDate(night.createdAt);
  if (night.gameType === 'truth-or-dare') {
    return dateStr ? `Truth or Dare · ${dateStr}` : 'Truth or Dare Night';
  }
  const modeLabel = getNightDisplay(night).name;
  return dateStr ? `${modeLabel} Night · ${dateStr}` : `Night #${nightNumber}`;
}

type SavedNightCardProps = {
  night: SavedNight;
  nightNumber: number;
  onPress: () => void;
};

function SavedNightCard({ night, nightNumber, onPress }: SavedNightCardProps) {
  const firstMedia = night.mediaMoments[0];
  const display = getNightDisplay(night);
  const mediaCount = night.mediaMoments.length;
  const title = getNightTitle(night, nightNumber);

  return (
    <TouchableOpacity style={styles.nightCard} onPress={onPress} activeOpacity={0.82}>
      <View style={styles.nightPreview}>
        {firstMedia?.mediaType === 'photo' ? (
          <Image source={{ uri: firstMedia.uri }} style={styles.previewImage} resizeMode="cover" />
        ) : firstMedia?.mediaType === 'video' ? (
          <View style={styles.videoPreview}>
            <Ionicons name="play" size={22} color="#A78BFA" />
          </View>
        ) : (
          <View style={styles.noMediaPreview}>
            <Ionicons name="moon" size={24} color="#A78BFA" />
          </View>
        )}
      </View>

      <View style={styles.nightBody}>
        <Text style={styles.nightTitle} numberOfLines={1}>{title}</Text>

        <View style={styles.nightMeta}>
          <Text style={styles.nightGameType}>{gameTypeLabel(night)}</Text>
          <Text style={styles.nightDot}>·</Text>
          <Text style={[styles.nightMode, { color: display.primary }]}>{display.name}</Text>
        </View>

        <View style={styles.nightFooter}>
          {mediaCount > 0 ? (
            <View style={styles.memoryPill}>
              <Ionicons name="images-outline" size={11} color="#A78BFA" />
              <Text style={styles.memoryPillText}>
                {mediaCount} {mediaCount === 1 ? 'memory' : 'memories'}
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      <View style={styles.nightChevron}>
        <Ionicons name="chevron-forward" size={16} color="rgba(214, 203, 255, 0.35)" />
      </View>
    </TouchableOpacity>
  );
}

export default function MemoriesScreen() {
  const savedNights = useSessionStore(s => s.savedNights);
  const total = savedNights.length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Memories</Text>
        </View>

        {total > 0 ? (
          <View style={styles.nightsList}>
            {savedNights.map((night, index) => (
              <SavedNightCard
                key={night.id}
                night={night}
                nightNumber={total - index}
                onPress={() => router.push({ pathname: '/memories/[id]', params: { id: night.id } })}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Ionicons name="images" size={26} color="#A78BFA" />
            </View>
            <Text style={styles.emptyTitle}>No nights saved yet</Text>
            <Text style={styles.emptyText}>
              Play a game and your recap will appear here.
            </Text>
            <TouchableOpacity
              style={styles.emptyBtn}
              onPress={() => router.push('/')}
              activeOpacity={0.82}
            >
              <Text style={styles.emptyBtnText}>Play now</Text>
              <Ionicons name="arrow-forward" size={14} color="#A78BFA" />
            </TouchableOpacity>
          </View>
        )}
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
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
  },
  nightsList: {
    gap: Spacing.sm,
  },
  nightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.18)',
    backgroundColor: 'rgba(10, 15, 39, 0.9)',
  },
  nightPreview: {
    width: 72,
    height: 88,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    backgroundColor: 'rgba(124, 92, 255, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.16)',
    flexShrink: 0,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  videoPreview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(124, 92, 255, 0.32)',
  },
  noMediaPreview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nightBody: {
    flex: 1,
    gap: 5,
  },
  nightTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.2,
  },
  nightMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  nightGameType: {
    fontSize: 13,
    fontWeight: '600',
    color: '#C7C0D8',
  },
  nightDot: {
    fontSize: 13,
    color: '#5A526A',
  },
  nightMode: {
    fontSize: 13,
    fontWeight: '800',
  },
  nightFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  memoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(124, 92, 255, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.14)',
  },
  memoryPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D8D2EA',
  },
  nightChevron: {
    flexShrink: 0,
    paddingLeft: 4,
  },
  emptyCard: {
    minHeight: 280,
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.22)',
    backgroundColor: 'rgba(10, 15, 39, 0.9)',
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(124, 92, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9B91B8',
    textAlign: 'center',
    lineHeight: 20,
  },
  emptyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: Spacing.sm,
    paddingVertical: 10,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(124, 92, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.35)',
  },
  emptyBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#A78BFA',
  },
});
