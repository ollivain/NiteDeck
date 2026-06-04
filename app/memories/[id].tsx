import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { FullscreenMediaViewer } from '@/components/recap/FullscreenMediaViewer';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { premiumPackMetadata } from '@/data/packs';
import { useSessionStore } from '@/store/session';
import type { SavedNight } from '@/store/session';

function formatNightDate(createdAt: string) {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function gameTypeLabel(gameType: string) {
  if (gameType === 'truthOrDare') return 'Truth or Dare';
  if (gameType === 'neverHaveIEver') return 'Never Have I Ever';
  return 'Classic';
}

function getNightDisplay(night: SavedNight): { primary: string; name: string } {
  if (night.packId) {
    const pack = premiumPackMetadata[night.packId];
    return { primary: Colors.accent, name: pack?.title ?? 'Premium' };
  }
  if (night.mode) {
    const cfg = Colors.modes[night.mode];
    return { primary: cfg.primary, name: cfg.name };
  }
  return { primary: Colors.accent, name: 'NiteDeck' };
}

function getNightTitle(night: SavedNight, nightNumber: number | null): string {
  if (night.title) return night.title;
  const dateStr = formatNightDate(night.createdAt);
  if (night.gameType === 'truthOrDare') {
    return dateStr ? `Truth or Dare · ${dateStr}` : 'Truth or Dare Night';
  }
  if (night.gameType === 'neverHaveIEver') {
    return dateStr ? `Never Have I Ever - ${dateStr}` : 'Never Have I Ever Night';
  }
  const modeLabel = getNightDisplay(night).name;
  return dateStr ? `${modeLabel} Night · ${dateStr}` : `Night #${nightNumber ?? '?'}`;
}

type RenameModalProps = {
  visible: boolean;
  initialValue: string;
  onConfirm: (title: string) => void;
  onCancel: () => void;
};

function RenameModal({ visible, initialValue, onConfirm, onCancel }: RenameModalProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (visible) setValue(initialValue);
  }, [visible, initialValue]);

  const canSave = value.trim().length > 0;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <KeyboardAvoidingView
        style={styles.modalOverlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableOpacity style={StyleSheet.absoluteFillObject} onPress={onCancel} activeOpacity={1} />
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Rename night</Text>
          <TextInput
            style={styles.modalInput}
            value={value}
            onChangeText={setValue}
            placeholder="Enter a name…"
            placeholderTextColor="#6E6582"
            autoFocus
            maxLength={60}
            returnKeyType="done"
            onSubmitEditing={() => canSave && onConfirm(value.trim())}
            selectionColor="#A78BFA"
          />
          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.modalBtnSecondary} onPress={onCancel} activeOpacity={0.82}>
              <Text style={styles.modalBtnSecondaryText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalBtnPrimary, !canSave && styles.modalBtnPrimaryDisabled]}
              onPress={() => canSave && onConfirm(value.trim())}
              activeOpacity={0.82}
            >
              <Text style={styles.modalBtnPrimaryText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default function NightDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const rawId = params.id;
  const nightId = Array.isArray(rawId) ? rawId[0] : rawId;

  const savedNights = useSessionStore(s => s.savedNights);
  const renameNight = useSessionStore(s => s.renameNight);
  const deleteNight = useSessionStore(s => s.deleteNight);

  const nightIndex = savedNights.findIndex(n => n.id === nightId);
  const night = nightIndex >= 0 ? savedNights[nightIndex] : null;
  const nightNumber = night ? savedNights.length - nightIndex : null;

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);
  const [isRenameVisible, setIsRenameVisible] = useState(false);

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

  const nightDisplay = getNightDisplay(night);
  const mediaItems = night.mediaMoments;
  const dateStr = formatNightDate(night.createdAt);
  const displayTitle = getNightTitle(night, nightNumber);

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

  const handleRename = (newTitle: string) => {
    renameNight(night.id, newTitle);
    setIsRenameVisible(false);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete night',
      'This night will be removed from Memories. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteNight(night.id);
            router.back();
          },
        },
      ],
    );
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
          <View style={styles.topActions}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => setIsRenameVisible(true)}
              hitSlop={8}
            >
              <Ionicons name="pencil-outline" size={17} color="#C7C0D8" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={handleDelete} hitSlop={8}>
              <Ionicons name="trash-outline" size={17} color="#C7C0D8" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.nightTitle}>{displayTitle}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{gameTypeLabel(night.gameType)}</Text>
            <Text style={styles.metaDot}>·</Text>
            <Text style={[styles.metaMode, { color: nightDisplay.primary }]}>{nightDisplay.name}</Text>
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

      <RenameModal
        visible={isRenameVisible}
        initialValue={night.title ?? ''}
        onConfirm={handleRename}
        onCancel={() => setIsRenameVisible(false)}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconBtn: {
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
  nightTitle: {
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
  // Rename modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#0D1230',
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.2)',
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },
  modalInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.22)',
    borderRadius: Radius.lg,
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  modalActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  modalBtnSecondary: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.2)',
    alignItems: 'center',
  },
  modalBtnSecondaryText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#C7C0D8',
  },
  modalBtnPrimary: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: Radius.lg,
    backgroundColor: '#7C5CFF',
    alignItems: 'center',
  },
  modalBtnPrimaryDisabled: {
    opacity: 0.4,
  },
  modalBtnPrimaryText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
