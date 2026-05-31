import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { useSessionStore } from '@/store/session';

export default function MemoriesScreen() {
  const mediaMoments = useSessionStore(s => s.mediaMoments);
  const mediaUris = useSessionStore(s => s.mediaUris);
  const items = mediaMoments.length > 0
    ? mediaMoments
    : mediaUris.map((uri, index) => ({ uri, mediaType: 'photo' as const, createdAt: index }));

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
          <Text style={styles.kicker}>MEMORIES</Text>
          <Text style={styles.title}>Saved nights</Text>
          <Text style={styles.subtitle}>A lightweight preview of moments from the current session.</Text>
        </View>

        {items.length > 0 ? (
          <View style={styles.grid}>
            {items.slice(0, 12).map((item, index) => (
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
        ) : (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Ionicons name="images" size={28} color="#A78BFA" />
            </View>
            <Text style={styles.emptyTitle}>No saved nights yet.</Text>
            <Text style={styles.emptyText}>
              Capture moments during games and they’ll appear here.
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
  kicker: {
    ...Typography.label,
    color: '#A78BFA',
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.body,
    color: '#C7C0D8',
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
