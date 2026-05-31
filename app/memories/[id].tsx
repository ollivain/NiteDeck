import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { FullscreenMediaViewer } from '@/components/recap/FullscreenMediaViewer';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { useSessionStore } from '@/store/session';

function formatNightDate(createdAt: string) {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function gameTypeLabel(gameType: string) {
  return gameType === 'truth-or-dare' ? 'Truth or Dare' : 'Classic';
}

export default function NightDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const rawId = params.id;
  const nightId = Array.isArray(rawId) ? rawId[0] : rawId;

  const savedNights = useSessionStore(s => s.savedNights);
  const nightIndex = savedNights.findIndex(n => n.id === nightId);
  const night = nightIndex >= 0 ? savedNights[nightIndex] : null;
  const nightNumber = night ? savedNights.length - nightIndex : null;

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);

  if (!night) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="arrow-back" size={20} color="#C7C0D8" />
        </TouchableOpacity>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Night not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const modeCfg = Colors.modes[night.mode];
  const mediaItems = night.mediaMoments;
  const dateStr = formatNightDate(night.createdAt);

  const openMedia = (index: number) => {
    if (index >= 0 && index < mediaItems.length) {
      setSelectedMediaIndex(index);
      setIsViewerOpen(true);
    }
  };

  const closeMedia = () => {
    setIsViewerOpen(false);
    setSelectedMediaIndex(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
            <Ionicons name="arrow-back" size={20} color="#C7C0D8" />
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={styles.nightNumber}>Night #{nightNumber}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{gameTypeLabel(night.gameType)}</Text>
            <Text style={styles.metaDot}>·</Text>
            <Text style={[styles.metaMode, { color: modeCfg.primary }]}>{modeCfg.name}</Text>
            {dateStr ? (
              <>
                <Text style={styles.metaDot}>·</Text>
                <Text style={styles.metaText}>{dateStr}</Text>
              </>
            ) : null}
          </View>
        </View>

        {mediaItems.length > 0 ? (
          <View style={styles.grid}>
            {mediaItems.map((item, index) => (
              <TouchableOpacity
                key={`${item.uri}-${index}`}
                style={styles.gridTile}
                onPress={() => openMedia(index)}
                activeOpacity={0.84}
              >
                {item.mediaType === 'photo' ? (
                  <Image source={{ uri: item.uri }} style={styles.tileImage} resizeMode="cover" />
                ) : (
                  <View style={styles.videoTile}>
                    <View style={styles.videoPlayBadge}>
                      <Ionicons name="play" size={16} color="#0A0908" />
                    </View>
                    <Text style={styles.videoText}>VIDEO</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="images-outline" size={26} color="#A78BFA" />
            <Text style={styles.emptyText}>No memories captured this night.</Text>
          </View>
        )}
      </ScrollView>

      <FullscreenMediaViewer
        mediaItems={mediaItems}
        isOpen={isViewerOpen}
        selectedIndex={selectedMediaIndex}
        onClose={closeMedia}
        onSelectIndex={setSelectedMediaIndex}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050817',
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 48,
  },
  topBar: {
    paddingTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: Spacing.xl,
    gap: Spacing.xs,
  },
  nightNumber: {
    ...Typography.h1,
    color: Colors.text,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  metaText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#C7C0D8',
  },
  metaDot: {
    fontSize: 15,
    color: '#5A526A',
  },
  metaMode: {
    fontSize: 15,
    fontWeight: '800',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  gridTile: {
    width: '31.6%',
    aspectRatio: 1,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    backgroundColor: 'rgba(10, 15, 39, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.18)',
  },
  tileImage: {
    width: '100%',
    height: '100%',
  },
  videoTile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(124, 92, 255, 0.22)',
    gap: 6,
  },
  videoPlayBadge: {
    width: 34,
    height: 34,
    borderRadius: Radius.full,
    backgroundColor: '#A78BFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#D8D2EA',
    letterSpacing: 0.8,
  },
  emptyState: {
    minHeight: 200,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.18)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#C7C0D8',
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#C7C0D8',
  },
});
