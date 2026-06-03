import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { premiumPacks } from '@/data/packs';
import type { PackId } from '@/data/types';

const PACK_TEASERS: Record<PackId, string[]> = {
  temptations: [
    '"Would you rather kiss someone here or let the group decide who?"',
    '"Pick someone in the room. Tell them one thing you find genuinely attractive about them."',
    '"Rate your current romantic life from 1 to 10. Justify it."',
  ],
  roast: [
    '"Everyone points to the person with the worst fashion sense. They have 20 seconds to defend it."',
    '"Roast the person on your left in exactly two sentences. Keep it friendly."',
    '"Vote on who would win a petty argument. They get to prove it right now."',
  ],
  'truth-bombs': [
    '"Name something about yourself you have never admitted in a group setting."',
    '"What is the most honest thing you could say about someone in this room?"',
    '"Pick someone. Ask them anything. They have to answer in full."',
  ],
  'couples-chemistry': [
    '"What is one small thing your person does that you hope they never stop?"',
    '"Describe your ideal night with someone in two sentences. No clichés."',
    '"Pick someone here. Tell them what you genuinely admire about how they love people."',
  ],
  'after-dark': [
    '"What is the most reckless thing you have done this year that you would do again?"',
    '"Admit something you only do after midnight."',
    '"Name a moment tonight that would make a good opening scene for a film."',
  ],
};

export default function ShopScreen() {
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
            <Ionicons name="sparkles" size={22} color="#A78BFA" />
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
            const teasers = PACK_TEASERS[pack.id] ?? [];
            return (
              <View key={pack.id} style={styles.packCard}>
                <View style={styles.packGlow} />
                <View style={styles.packHeader}>
                  <View style={styles.lockIcon}>
                    <Ionicons name="lock-closed" size={18} color="#D8D2EA" />
                  </View>
                  <View style={styles.comingSoonBadge}>
                    <Text style={styles.comingSoonText}>Coming soon</Text>
                  </View>
                </View>
                <Text style={styles.packTitle}>{pack.title}</Text>
                <Text style={styles.packDescription}>{pack.description}</Text>
                {teasers.length > 0 && (
                  <View style={styles.teaserList}>
                    {teasers.map((teaser, i) => (
                      <View key={i} style={styles.teaserRow}>
                        <View style={styles.teaserDot} />
                        <Text style={styles.teaserText}>{teaser}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
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
  noticeCard: {
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.22)',
    backgroundColor: 'rgba(10, 15, 39, 0.9)',
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  noticeIcon: {
    width: 50,
    height: 50,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(124, 92, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noticeCopy: {
    flex: 1,
    gap: 4,
  },
  noticeTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.text,
  },
  noticeText: {
    fontSize: 13,
    color: '#C7C0D8',
    lineHeight: 18,
  },
  packGrid: {
    gap: Spacing.md,
  },
  packCard: {
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.18)',
    backgroundColor: 'rgba(10, 15, 39, 0.82)',
    padding: Spacing.lg,
    overflow: 'hidden',
  },
  packGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(124, 92, 255, 0.16)',
    top: -76,
    right: -36,
  },
  packHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  lockIcon: {
    width: 38,
    height: 38,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  comingSoonBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(167, 139, 250, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.3)',
  },
  comingSoonText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#A78BFA',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  packTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: Colors.text,
    fontFamily: 'serif',
    marginBottom: 6,
  },
  packDescription: {
    fontSize: 13,
    color: '#C7C0D8',
    lineHeight: 19,
    marginBottom: Spacing.md,
  },
  teaserList: {
    gap: 8,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(214, 203, 255, 0.1)',
  },
  teaserRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  teaserDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#7C5CFF',
    marginTop: 7,
    flexShrink: 0,
  },
  teaserText: {
    flex: 1,
    fontSize: 12,
    color: '#9B91B8',
    lineHeight: 18,
    fontStyle: 'italic',
  },
});
