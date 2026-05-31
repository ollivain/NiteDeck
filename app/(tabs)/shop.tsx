import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

const PACKS = [
  'Temptations',
  'Roast',
  'Truth Bombs',
  'Couples & Chemistry',
  'After Dark',
] as const;

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
            <Text style={styles.noticeTitle}>Premium packs coming soon</Text>
            <Text style={styles.noticeText}>No purchases or payment flows are available yet.</Text>
          </View>
        </View>

        <View style={styles.packGrid}>
          {PACKS.map(pack => (
            <View key={pack} style={styles.packCard}>
              <View style={styles.packGlow} />
              <View style={styles.lockIcon}>
                <Ionicons name="lock-closed" size={18} color="#D8D2EA" />
              </View>
              <Text style={styles.packTitle}>{pack}</Text>
              <Text style={styles.packStatus}>Coming soon</Text>
            </View>
          ))}
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
    minHeight: 124,
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
  lockIcon: {
    width: 38,
    height: 38,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  packTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: Colors.text,
    fontFamily: 'serif',
  },
  packStatus: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '800',
    color: '#A78BFA',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
