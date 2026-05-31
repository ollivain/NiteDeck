import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import { useVideoPlayer, VideoView } from 'expo-video';
import { PressableScale } from '@/components/ui/PressableScale';
import { Colors, Radius, Spacing } from '@/constants/theme';
import type { MediaMoment } from '@/store/session';

const FULLSCREEN_MEDIA_FIT = 'cover' as const;

export async function shareMediaMoment(moment: MediaMoment, dialogTitle: string) {
  const isAvailable = await Sharing.isAvailableAsync();
  if (!isAvailable) return 'unavailable';
  await Sharing.shareAsync(moment.uri, {
    dialogTitle,
    mimeType: moment.mediaType === 'video' ? 'video/*' : 'image/*',
    UTI: moment.mediaType === 'video' ? 'public.movie' : 'public.image',
  });
  return 'shared';
}

function FullscreenVideo({ uri }: { uri: string }) {
  const player = useVideoPlayer(uri, p => {
    p.loop = false;
    p.play();
  });

  return (
    <VideoView
      player={player}
      style={styles.fullscreenMedia}
      nativeControls={false}
      contentFit={FULLSCREEN_MEDIA_FIT}
      surfaceType="textureView"
    />
  );
}

export type MediaViewerProps = {
  mediaItems: MediaMoment[];
  isOpen: boolean;
  selectedIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
};

export function FullscreenMediaViewer({
  mediaItems,
  isOpen,
  selectedIndex,
  onClose,
  onSelectIndex,
}: MediaViewerProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<MediaMoment>>(null);
  const viewerWasClosedRef = useRef(true);
  const [isSharing, setIsSharing] = useState(false);
  const selectedMoment = selectedIndex === null ? null : mediaItems[selectedIndex];

  useEffect(() => {
    if (!isOpen || selectedIndex === null || !selectedMoment) {
      viewerWasClosedRef.current = true;
      return;
    }
    if (!viewerWasClosedRef.current) return;
    viewerWasClosedRef.current = false;
    requestAnimationFrame(() => {
      listRef.current?.scrollToIndex({ index: selectedIndex, animated: false });
    });
  }, [isOpen, selectedIndex, selectedMoment]);

  const handleMomentumEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!isOpen) return;
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    const boundedIndex = Math.max(0, Math.min(mediaItems.length - 1, nextIndex));
    if (boundedIndex !== selectedIndex) onSelectIndex(boundedIndex);
  };

  const renderMediaPage = ({ item, index }: { item: MediaMoment; index: number }) => (
    <View style={[styles.viewerPage, { width }]}>
      {item.mediaType === 'photo' ? (
        <Image
          source={{ uri: item.uri }}
          style={styles.fullscreenMedia}
          resizeMode={FULLSCREEN_MEDIA_FIT}
        />
      ) : index === selectedIndex ? (
        <FullscreenVideo key={item.uri} uri={item.uri} />
      ) : (
        <View style={styles.inactiveVideoPage}>
          <View style={styles.inactiveVideoBadge}>
            <Ionicons name="play" size={22} color="#0A0908" />
          </View>
          <Text style={styles.inactiveVideoText}>VIDEO</Text>
        </View>
      )}
    </View>
  );

  const shareActiveMoment = async () => {
    if (!selectedMoment || isSharing) return;
    try {
      setIsSharing(true);
      const result = await shareMediaMoment(selectedMoment, 'Share NiteDeck moment');
      if (result === 'unavailable') {
        Alert.alert('Sharing unavailable', 'Sharing is not available on this device.');
      }
    } catch {
      Alert.alert('Share failed', 'This moment could not be shared. Try again from the recap.');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Modal
      visible={isOpen && Boolean(selectedMoment)}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.viewerBackdrop}>
        <View style={styles.viewerSafe}>
          <View style={styles.viewerContent}>
            <FlatList
              ref={listRef}
              data={mediaItems}
              keyExtractor={(item, index) => `${item.uri}-${index}`}
              renderItem={renderMediaPage}
              horizontal
              pagingEnabled
              initialScrollIndex={selectedIndex ?? 0}
              getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
              onMomentumScrollEnd={handleMomentumEnd}
              showsHorizontalScrollIndicator={false}
              bounces={false}
              decelerationRate="fast"
              scrollEventThrottle={16}
              extraData={selectedIndex}
              onScrollToIndexFailed={({ index }) => {
                requestAnimationFrame(() => {
                  listRef.current?.scrollToIndex({ index, animated: false });
                });
              }}
            />
          </View>
          <SafeAreaView pointerEvents="box-none" style={styles.viewerControlOverlay}>
            <View
              style={[
                styles.viewerTopBar,
                { paddingTop: Math.max(insets.top + Spacing.sm, Spacing.xl) },
              ]}
              pointerEvents="box-none"
            >
              <TouchableOpacity onPress={onClose} style={styles.viewerCloseBtn} activeOpacity={0.8}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
              {selectedMoment && selectedIndex !== null ? (
                <View style={styles.viewerCounterPill}>
                  <Text style={styles.viewerCounterText}>
                    {selectedIndex + 1} / {mediaItems.length}
                  </Text>
                </View>
              ) : null}
              <PressableScale
                onPress={shareActiveMoment}
                disabled={!selectedMoment || isSharing}
                style={[
                  styles.viewerShareBtn,
                  (!selectedMoment || isSharing) && styles.viewerShareBtnDisabled,
                ]}
                activeOpacity={0.8}
                pressedScale={0.97}
              >
                <Ionicons name="share-outline" size={18} color={Colors.text} />
                <Text style={styles.viewerShareText}>Share</Text>
              </PressableScale>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fullscreenMedia: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  viewerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.96)',
  },
  viewerSafe: {
    flex: 1,
  },
  viewerControlOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
  viewerTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  viewerCloseBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  viewerCounterPill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(10, 15, 39, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(214, 203, 255, 0.2)',
  },
  viewerCounterText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#C7C0D8',
    letterSpacing: 0.4,
  },
  viewerShareBtn: {
    minWidth: 82,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 12,
  },
  viewerShareBtnDisabled: {
    opacity: 0.5,
  },
  viewerShareText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.text,
  },
  viewerContent: {
    flex: 1,
  },
  viewerPage: {
    flex: 1,
    backgroundColor: '#000',
  },
  inactiveVideoPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: '#000',
  },
  inactiveVideoBadge: {
    width: 58,
    height: 58,
    borderRadius: Radius.full,
    backgroundColor: '#A78BFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveVideoText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#A78BFA',
    letterSpacing: 1.2,
  },
});
