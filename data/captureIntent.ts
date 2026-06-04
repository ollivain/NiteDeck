import type { CaptureType } from '@/data/types';

type CaptureCardLike = {
  type?: string;
  text?: string;
  captureType?: CaptureType;
};

export type CaptureIntent = {
  isCaptureCard: boolean;
  captureType: CaptureType | null;
  label: string;
  hint: string;
  actionLabel: string;
};

const noCaptureIntent: CaptureIntent = {
  isCaptureCard: false,
  captureType: null,
  label: '',
  hint: '',
  actionLabel: '',
};

function normalizeCaptureType(captureType?: CaptureType): CaptureType | null {
  return captureType ?? null;
}

function inferCaptureTypeFromText(text: string): CaptureType | null {
  const normalized = text.trim().toLowerCase();

  if (
    /^(film|record)\b/.test(normalized) ||
    /[.!?]\s+(film|record)\b/.test(normalized) ||
    /\bfilm (?:a|the|this|your)\b/.test(normalized) ||
    /\brecord (?:a|the|this|your|everyone)\b/.test(normalized)
  ) {
    return 'video';
  }

  if (
    /\btake (?:a |the |one |single |group |your )?(?:photo|picture)\b/.test(normalized) ||
    /\btakes a selfie\b/.test(normalized) ||
    /\btake .*selfie\b/.test(normalized) ||
    /\bgroup selfie\b/.test(normalized) ||
    /\bcapture (?:this|a|the) moment\b/.test(normalized)
  ) {
    return 'photo';
  }

  if (/\buse (?:the )?camera\b/.test(normalized)) {
    return 'camera';
  }

  return null;
}

function getDisplayForCaptureType(captureType: CaptureType): Omit<CaptureIntent, 'isCaptureCard' | 'captureType'> {
  if (captureType === 'video') {
    return {
      label: 'Video Moment',
      hint: 'Record this moment with the camera.',
      actionLabel: 'Record',
    };
  }

  if (captureType === 'photo') {
    return {
      label: 'Camera Moment',
      hint: 'Take a photo to capture this moment.',
      actionLabel: 'Capture',
    };
  }

  return {
    label: 'Camera Moment',
    hint: 'Tap the camera to capture this moment.',
    actionLabel: 'Capture',
  };
}

export function getCardCaptureIntent(card?: CaptureCardLike | null): CaptureIntent {
  if (!card) return noCaptureIntent;

  const explicitCaptureType = normalizeCaptureType(card.captureType);
  const fallbackCaptureType = card.text ? inferCaptureTypeFromText(card.text) : null;
  const captureType = explicitCaptureType ?? fallbackCaptureType ?? (card.type === 'camera' ? 'camera' : null);

  if (!captureType) return noCaptureIntent;

  return {
    isCaptureCard: true,
    captureType,
    ...getDisplayForCaptureType(captureType),
  };
}
