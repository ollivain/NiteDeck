import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

const version = Constants.expoConfig?.version ?? '1.0.0';

type SettingRow = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};

type Section = {
  label: string;
  rows: SettingRow[];
};

const SECTIONS: Section[] = [
  {
    label: 'Game',
    rows: [
      {
        title: 'House Rules',
        description: 'All cards are optional. Skip anything, anytime. Only capture moments everyone is comfortable with. Keep it fun.',
        icon: 'sparkles',
      },
    ],
  },
  {
    label: 'Privacy',
    rows: [
      {
        title: 'Camera',
        description: 'Used to capture moments during games. Photos and videos stay on your device.',
        icon: 'camera',
      },
      {
        title: 'Local saves',
        description: 'All your saved nights and memories are stored on this device only. Nothing is uploaded.',
        icon: 'lock-closed',
      },
    ],
  },
  {
    label: 'About',
    rows: [
      {
        title: 'NiteDeck',
        description: `Version ${version}`,
        icon: 'information-circle',
      },
    ],
  },
];

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        {SECTIONS.map(section => (
          <View key={section.label} style={styles.section}>
            <Text style={styles.sectionLabel}>{section.label.toUpperCase()}</Text>
            <View style={styles.card}>
              {section.rows.map((item, i) => (
                <View
                  key={item.title}
                  style={[
                    styles.row,
                    i === section.rows.length - 1 && styles.rowLast,
                  ]}
                >
                  <View style={styles.iconBox}>
                    <Ionicons name={item.icon} size={20} color="#EEE9FF" />
                  </View>
                  <View style={styles.copy}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
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
    gap: Spacing.lg,
  },
  header: {
    marginBottom: Spacing.sm,
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
  },
  section: {
    gap: Spacing.sm,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#6E6582',
    paddingHorizontal: 4,
  },
  card: {
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
    borderBottomColor: 'rgba(214, 203, 255, 0.10)',
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.2)',
    backgroundColor: 'rgba(124, 92, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  copy: {
    flex: 1,
    gap: 4,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  description: {
    fontSize: 13,
    color: '#C7C0D8',
    lineHeight: 19,
  },
});
