import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { useSessionStore } from '@/store/session';
import type { SavedNight } from '@/store/session';

function formatNightDate(createdAt: string) {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return 'Recent night';
  }

  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function formatDuration(seconds?: number) {
  if (!seconds) return null;

  const minutes = Math.floor(seconds / 60);
  if (minutes > 0) {
    return `${minutes}m`;
  }

  return `${seconds}s`;
}

function gameTypeLabel(night: SavedNight) {
  return night.gameType === 'truth-or-dare' ? 'Truth or Dare' : 'Classic';
}

function SavedNightCard({ night }: { night: SavedNight }) {
  const firstMedia = night.mediaMoments[0];
  const modeCfg = Colors.modes[night.mode];
  const duration = formatDuration(night.stats.durationSeconds);

  return (
    <View style={styles.nightCard}>
      <View style={styles.nightPreview}>
        {firstMedia?.mediaType === 'photo' ? (
          <Image source={{ uri: firstMedia.uri }} style={styles.previewImage} resizeMode="cover" />
        ) : firstMedia?.mediaType === 'video' ? (
          <View style={styles.videoPreview}>
            <Ionicons name="play" size={24} color="#050817" />
            <Text style={styles.videoText}>VIDEO</Text>
          </View>
        ) : (
          <View style={styles.noMediaPreview}>
            <Ionicons name="moon" size={26} color="#A78BFA" />
          </View>
        )}
      </View>

      <View style={styles.nightBody}>
        <View style={styles.nightTopRow}>
          <Text style={styles.nightGame}>{gameTypeLabel(night)}</Text>
          <Text style={styles.nightDate}>{formatNightDate(night.createdAt)}</Text>
        </View>

        <View style={styles.modeRow}>
          <View style={[styles.modeDot, { backgroundColor: modeCfg.primary }]} />
          <Text style={[styles.modeText, { color: modeCfg.primary }]}>
            {modeCfg.name}
          </Text>
          <Text style={styles.playerText} numberOfLines={1}>
            {night.players.join(', ')}
          </Text>
        </View>

        <View style={styles.statPills}>
          <View style={styles.statPill}>
            <Ionicons name="images-outline" size={13} color="#A78BFA" />
            <Text style={styles.statPillText}>
              {night.mediaMoments.length} media
            </Text>
          </View>
          <View style={styles.statPill}>
            <Ionicons name="albums-outline" size={13} color="#A78BFA" />
            <Text style={styles.statPillText}>
              {night.stats.totalTurnsOrCards} played
            </Text>
          </View>
          {duration ? (
            <View style={styles.statPill}>
              <Ionicons name="time-outline" size={13} color="#A78BFA" />
              <Text style={styles.statPillText}>{duration}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

export default function MemoriesScreen() {
  const savedNights = useSessionStore(s => s.savedNights);
  const mediaMoments = useSessionStore(s => s.mediaMoments);
  const mediaUris = useSessionStore(s => s.mediaUris);
  const currentItems = mediaMoments.length > 0
    ? mediaMoments
    : mediaUris.map((uri, index) => ({ uri, mediaType: 'photo' as const, createdAt: index }));
  const hasSavedNights = savedNights.length > 0;
  const showCurrentPreview = !hasSavedNights && currentItems.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.bgGlow} />
        <View style={styles.bgGlow2} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Memories</Text>
          <Text style={styles.subtitle}>Recaps from finished games, saved automatically.</Text>
        </View>

        {hasSavedNights ? (
          <View style={styles.nightsList}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Saved Nights</Text>
              <Text style={styles.sectionCount}>
                {savedNights.length} night{savedNights.length === 1 ? '' : 's'}
              </Text>
            </View>

            {savedNights.map(night => (
              <SavedNightCard key={night.id} night={night} />
            ))}
          </View>
        ) : showCurrentPreview ? (
          <View style={styles.mediaSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Current Night</Text>
              <Text style={styles.sectionCount}>
                {currentItems.length} memor{currentItems.length === 1 ? 'y' : 'ies'}
              </Text>
            </View>
            <View style={styles.grid}>
              {currentItems.slice(0, 12).map((item, index) => (
                <View key={`${item.uri}-${index}`} style={styles.memoryTile}>
                  {item.mediaType === 'photo' ? (
                    <Image source={{ uri: item.uri }} style={styles.memoryImage} resizeMode="cover" />
                  ) : (
                    <View style={styles.videoTile}>
                      <Ionicons name="play" size={24} color="#050817" />
                      <Text style={styles.videoText}>VIDEO</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Ionicons name="images" size={28} color="#A78BFA" />
            </View>
            <Text style={styles.emptyTitle}>No saved nights yet.</Text>
            <Text style={styles.emptyText}>
              Finish a game and your recap will appear here.
            </Text>
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
  bgGlow: {
    position: 'absolute',
    width: 390,
    height: 390,
    borderRadius: 195,
    backgroundColor: 'rgba(124, 92, 255, 0.14)',
    top: -180,
    right: -150,
  },
  bgGlow2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(54, 116, 255, 0.08)',
    bottom: 40,
    left: -170,
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
  subtitle: {
    ...Typography.body,
    color: '#C7C0D8',
  },
  nightsList: {
    gap: Spacing.md,
  },
  nightCard: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.18)',
    backgroundColor: 'rgba(10, 15, 39, 0.9)',
  },
  nightPreview: {
    width: 82,
    height: 102,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    backgroundColor: 'rgba(124, 92, 255, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.16)',
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
    gap: 5,
  },
  noMediaPreview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nightBody: {
    flex: 1,
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  nightTopRow: {
    gap: 3,
  },
  nightGame: {
    fontSize: 19,
    fontWeight: '800',
    color: Colors.text,
  },
  nightDate: {
    fontSize: 12,
    fontWeight: '600',
    color: '#AFA8C8',
  },
  modeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  modeDot: {
    width: 7,
    height: 7,
    borderRadius: Radius.full,
  },
  modeText: {
    fontSize: 12,
    fontWeight: '800',
  },
  playerText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#C7C0D8',
  },
  statPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(124, 92, 255, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.14)',
  },
  statPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D8D2EA',
  },
  mediaSection: {
    gap: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },
  sectionCount: {
    fontSize: 11,
    fontWeight: '800',
    color: '#A78BFA',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  memoryTile: {
    width: '31.6%',
    aspectRatio: 1,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    backgroundColor: 'rgba(10, 15, 39, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.18)',
  },
  memoryImage: {
    width: '100%',
    height: '100%',
  },
  videoTile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(124, 92, 255, 0.22)',
    gap: 5,
  },
  videoText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#D8D2EA',
    letterSpacing: 0.8,
  },
  emptyCard: {
    minHeight: 260,
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.22)',
    backgroundColor: 'rgba(10, 15, 39, 0.9)',
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  emptyIcon: {
    width: 62,
    height: 62,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(124, 92, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#C7C0D8',
    lineHeight: 22,
    textAlign: 'center',
  },
});
