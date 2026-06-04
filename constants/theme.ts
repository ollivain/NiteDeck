export const Colors = {
  bg: '#050817',
  surface: 'rgba(10, 15, 39, 0.88)',
  surface2: 'rgba(16, 22, 48, 0.92)',
  surfaceStrong: 'rgba(10, 15, 39, 0.90)',
  surfaceDeep: 'rgba(7, 12, 34, 0.94)',
  border: 'rgba(214, 203, 255, 0.18)',
  borderStrong: 'rgba(214, 203, 255, 0.30)',
  borderSubtle: 'rgba(214, 203, 255, 0.08)',
  borderSoft: 'rgba(214, 203, 255, 0.14)',

  text: '#F7F3FF',
  textMuted: '#C7C0D8',
  textDim: '#8D86A8',
  textOnAccent: '#F7F3FF',

  accent: '#A78BFA',
  accent2: '#7C5CFF',
  accentBg: 'rgba(167, 139, 250, 0.12)',
  accentBorder: 'rgba(167, 139, 250, 0.30)',

  modes: {
    chill: {
      primary: '#2DD4BF',
      bg: 'rgba(45, 212, 191, 0.10)',
      bgSelected: 'rgba(45, 212, 191, 0.18)',
      border: 'rgba(45, 212, 191, 0.30)',
      borderSelected: 'rgba(45, 212, 191, 0.55)',
      name: 'Chill',
      emoji: '🌊',
      description: 'Light questions, easy laughs and zero pressure.',
    },
    spicy: {
      primary: '#F87171',
      bg: 'rgba(248, 113, 113, 0.10)',
      bgSelected: 'rgba(248, 113, 113, 0.18)',
      border: 'rgba(248, 113, 113, 0.30)',
      borderSelected: 'rgba(248, 113, 113, 0.55)',
      name: 'Spicy',
      emoji: '🌶️',
      description: 'Personal questions, bold votes and honest answers.',
    },
    wild: {
      primary: '#A78BFA',
      bg: 'rgba(167, 139, 250, 0.10)',
      bgSelected: 'rgba(167, 139, 250, 0.18)',
      border: 'rgba(167, 139, 250, 0.30)',
      borderSelected: 'rgba(167, 139, 250, 0.55)',
      name: 'Wild',
      emoji: '🌀',
      description: 'Dares, camera moments and rules that change the game.',
    },
  },
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  full: 9999,
} as const;

export const Typography = {
  display: {
    fontSize: 52,
    fontWeight: '800' as const,
    letterSpacing: -2.5,
    lineHeight: 56,
  },
  h1: {
    fontSize: 34,
    fontWeight: '700' as const,
    letterSpacing: -1,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
    lineHeight: 30,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
    lineHeight: 24,
  },
  cardText: {
    fontSize: 22,
    fontWeight: '500' as const,
    letterSpacing: -0.3,
    lineHeight: 32,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyMed: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 24,
  },
  small: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
  },
  label: {
    fontSize: 11,
    fontWeight: '600' as const,
    letterSpacing: 1.4,
    lineHeight: 16,
  },
} as const;
