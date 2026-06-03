# NiteDeck — Beta Testing Guide

Thanks for helping test NiteDeck. This guide covers what to test, how to get started, and what to report.

---

## Setup

```bash
npm install
npx expo start
```

Open the app in **Expo Go** or a **development build** on a real device. A real device is strongly preferred for camera moments and media playback.

---

## What to test

### Core game flow
- [ ] Home screen loads cleanly (splash plays once, not on every visit)
- [ ] "Let's Play" and featured game cards both navigate to the games list
- [ ] Adding 2+ players works; fewer than 2 blocks the Continue button
- [ ] All three modes appear on the Mode screen: Chill, Spicy, Wild
- [ ] House Rules screen shows before the game starts
- [ ] Classic mode — cards advance, skip works, camera card triggers camera
- [ ] Truth or Dare mode — Truth and Dare choices both work, skipping works
- [ ] End game → Recap screen appears with correct stats
- [ ] "Play Again" on Recap returns to Home and resets state cleanly

### Content
- [ ] Chill mode has enough cards to play a full session (80 cards, reshuffles)
- [ ] Spicy mode feels appropriately bold without being explicit (80 cards)
- [ ] Wild mode creates distinct chaotic moments: camera, chaos, pick, vote cards (100 cards)
- [ ] Truth or Dare cards feel different across Chill / Spicy / Wild modes

### Memories
- [ ] Recap saves automatically — "Saved to Memories" indicator appears
- [ ] Memories tab shows saved nights with generated titles
- [ ] Tapping a night opens the detail screen with media grid
- [ ] Rename: pencil icon opens modal, saving updates the title in the list
- [ ] Delete: trash icon asks for confirmation, then removes the entry and returns to list
- [ ] Empty Memories state shows correct copy and "Play now" CTA

### Shop
- [ ] All 5 premium pack cards are visible
- [ ] Each pack shows a description and card teasers
- [ ] No "Buy" or purchase flow exists — packs are preview-only
- [ ] "Coming soon" badge on each pack is clear

### Settings
- [ ] Three sections visible: Game, Privacy, About
- [ ] Version number is correct
- [ ] No tappable rows that do nothing unexpected

### Camera moments
- [ ] Camera card during Wild mode prompts the camera
- [ ] Captured photo/video appears in the Recap Memory Wall
- [ ] Memory Wall shows correct collage layout for 1, 2, 3, 4+ items
- [ ] Tapping a memory opens the fullscreen viewer
- [ ] Share button on a single memory works (or shows an appropriate message)

---

## Feedback to collect

For each test session, note:

1. **Flow blockers** — anything that stops you completing a game
2. **Confusing UI** — anything that wasn't obvious on the first try
3. **Card quality** — cards that feel repeated, too vague, or out of place
4. **Crashes or freezes** — screen, action, and device/OS version
5. **Memories reliability** — did the night save correctly after each game?
6. **Camera issues** — did the camera open when expected? Did media appear in the recap?

---

## Known limitations

| Limitation | Detail |
|---|---|
| Premium packs are previews only | No purchase flow exists. Pack cards are locked and display example teasers. |
| Memories are local to the device | Saved nights and media do not sync across devices or to the cloud. |
| Deleting a saved night is partial | Removing a night clears the app entry and metadata, but does not actively delete cached media files from the OS file system. Files will be cleaned up by the OS over time. |
| Multi-file sharing not implemented | The recap Share button can share one file at a time. A branded recap poster is planned for a future version. |
| No account or sign-in | The app is fully local. There is no user profile or login. |
| Web build is limited | Camera and media features may not work in the Expo web output. Test on a real device. |

---

## Device notes

- Test on **iOS** and **Android** if possible.
- Camera permission prompt should appear the first time a camera card is drawn.
- If the camera does not open, check device permissions under Settings → NiteDeck.
- On Android, the back gesture exits the fullscreen media viewer correctly.

---

## Reporting issues

File issues in the project tracker or message the team directly. Include:
- Steps to reproduce
- Device model and OS version
- Screenshot or screen recording if relevant
