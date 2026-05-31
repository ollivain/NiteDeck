import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

type SettingItem = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const SETTINGS: SettingItem[] = [
  {
    title: 'House Rules',
    description: 'Skip anything, keep it fun, and only capture people who are okay with it.',
    icon: 'sparkles',
  },
  {
    title: 'Camera permissions',
    description: 'Capture moments during games when your device allows camera access.',
    icon: 'camera',
  },
  {
    title: 'Restore purchases',
    description: 'Coming later with premium packs.',
    icon: 'refresh',
  },
  {
    title: 'App info',
    description: `NiteDeck ${Constants.expoConfig?.version ?? '1.0.0'}`,
    icon: 'information-circle',
  },
];

export default function SettingsScreen() {
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
          <Text style={styles.kicker}>SETTINGS</Text>
          <Text style={styles.title}>NiteDeck</Text>
          <Text style={styles.subtitle}>Simple controls and app information.</Text>
        </View>

        <View style={styles.list}>
          {SETTINGS.map(item => (
            <View key={item.title} style={styles.row}>
              <View style={styles.iconBox}>
                <Ionicons name={item.icon} size={22} color="#EEE9FF" />
              </View>
              <View style={styles.copy}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
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
  list: {
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.22)',
    backgroundColor: 'rgba(10, 15, 39, 0.9)',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(214, 203, 255, 0.12)',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.2)',
    backgroundColor: 'rgba(124, 92, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  description: {
    fontSize: 13,
    color: '#C7C0D8',
    lineHeight: 19,
  },
});
