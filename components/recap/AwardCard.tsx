import { StyleSheet, Text, View } from 'react-native';
import { Colors, Radius, Spacing } from '@/constants/theme';

type AwardCardProps = {
  emoji: string;
  title: string;
  playerName: string;
  subtitle?: string;
};

export function AwardCard({ emoji, title, playerName, subtitle }: AwardCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.accentStrip} />

      <View style={styles.body}>
        <View style={styles.emojiCircle}>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.player} numberOfLines={1}>{playerName}</Text>
          {subtitle ? <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text> : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'rgba(10, 15, 39, 0.9)',
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.18)',
    overflow: 'hidden',
  },
  accentStrip: {
    height: 2,
    backgroundColor: '#A78BFA',
    width: '100%',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  emojiCircle: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(167, 139, 250, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 22,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#A78BFA',
    textTransform: 'uppercase',
  },
  player: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 11,
    color: '#C7C0D8',
  },
});
