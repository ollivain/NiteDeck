# NiteDeck - Beta Testing Guide

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
- [ ] "Let's Play" opens the Games hub
- [ ] Home quick-start cards begin the selected game flow
- [ ] Adding 2+ players works; fewer than 2 blocks the Continue button
- [ ] All three modes appear on the Mode screen: Chill, Spicy, Wild
- [ ] House Rules screen shows before the game starts
- [ ] Classic mode - cards advance, skip works, camera card triggers camera
- [ ] Truth or Dare mode - Truth and Dare choices both work, skipping works
- [ ] End game -> Recap screen appears with correct stats
- [ ] "Play Again" on Recap returns to Home and resets state cleanly

### Content
- [ ] Chill mode has enough cards to play a full session (80 cards, reshuffles)
- [ ] Spicy mode feels appropriately bold without being explicit (80 cards)
- [ ] Wild mode creates distinct chaotic moments: camera, chaos, pick, vote cards (100 cards)
- [ ] Truth or Dare cards feel different across Chill / Spicy / Wild modes

### Memories
- [ ] Recap saves automatically - "Saved to Memories" indicator appears
- [ ] Memories tab shows saved nights with generated titles
- [ ] Tapping a night opens the detail screen with media grid
- [ ] Rename: pencil icon opens modal, saving updates the title in the list
- [ ] Delete: trash icon asks for confirmation, then removes the entry and returns to list
- [ ] Empty Memories state shows correct copy and "Play now" CTA

### Shop
- [ ] All 5 premium pack cards are visible
- [ ] Each pack shows a description and card teasers
- [ ] No "Buy" or purchase flow exists - packs are preview-only
- [ ] "Coming soon" badge on each pack is clear

### Premium Packs QA

Use this checklist before any payment or purchase integration work. Premium packs are currently dev-testable only and should remain locked in production builds.

#### Locked state
- [ ] Open Shop
- [ ] Confirm all 5 premium packs appear locked / coming soon
- [ ] Tap each pack
- [ ] Confirm preview modal opens
- [ ] Confirm 5 preview cards appear
- [ ] Confirm no purchase flow starts

#### Dev unlock state
- [ ] In development, long-press a premium pack or use the DEV unlock button in the modal
- [ ] Confirm the pack changes to unlocked state
- [ ] Confirm production builds should not show DEV controls

#### Gameplay flow
- [ ] Start a Classic game
- [ ] Go to mode selection
- [ ] Confirm the unlocked premium pack appears selectable
- [ ] Select it
- [ ] Continue to House Rules
- [ ] Start game
- [ ] Confirm premium card text appears
- [ ] Confirm pack title/display style works

#### Locked gameplay protection
- [ ] Confirm locked premium packs cannot be selected for gameplay
- [ ] Confirm pressing locked packs routes to Shop or locked preview behavior

#### Truth or Dare protection
- [ ] Start Truth or Dare flow
- [ ] Confirm premium packs are hidden or unavailable
- [ ] Confirm premium cards do not enter Truth or Dare gameplay

#### Recap
- [ ] Finish a premium pack game
- [ ] Confirm recap loads
- [ ] Confirm pack title is shown
- [ ] Confirm no Wild-only chaos/camera stats appear incorrectly

#### Memories
- [ ] Save a premium night
- [ ] Open Memories
- [ ] Confirm premium pack title appears
- [ ] Open saved premium night
- [ ] Confirm pack title appears there too
- [ ] Confirm old free-mode nights still display Chill/Spicy/Wild correctly

#### Regression checks
- [ ] Play Chill
- [ ] Play Spicy
- [ ] Play Wild
- [ ] Confirm all free modes still work normally
- [ ] Confirm premium cards do not leak into free modes

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

## Launch readiness checklist

- [ ] Test camera permission prompt on a fresh install
- [ ] Take a photo from a camera card
- [ ] Record a video from a camera card
- [ ] Use flash/zoom controls if available on the test device
- [ ] Complete a Classic game
- [ ] View Recap
- [ ] Save a night
- [ ] Reopen the saved night from Memories
- [ ] Share a single media item
- [ ] Preview a premium pack
- [ ] Scroll the premium preview modal to the final card and CTA
- [ ] Clear saved nights from Settings
- [ ] Check small-screen layout
- [ ] Check iOS and Android if available

---

## Feedback to collect

For each test session, note:

1. **Flow blockers** - anything that stops you completing a game
2. **Confusing UI** - anything that wasn't obvious on the first try
3. **Card quality** - cards that feel repeated, too vague, or out of place
4. **Crashes or freezes** - screen, action, and device/OS version
5. **Memories reliability** - did the night save correctly after each game?
6. **Camera issues** - did the camera open when expected? Did media appear in the recap?

---

## Known premium limitations

- No real purchases yet
- No RevenueCat or App Store / Play Store IAP yet
- Premium unlock state is in-memory and dev-only
- Premium packs are intended for the Classic flow only, not Truth or Dare
- Production release should keep premium packs locked until purchase integration exists

---

## Known limitations

| Limitation | Detail |
|---|---|
| Premium packs are previews only | No purchase flow exists. Pack cards are locked outside dev unlock testing and display example teasers. |
| Memories are local to the device | Saved nights and media do not sync across devices or to the cloud. |
| Deleting a saved night is partial | Removing a night clears the app entry and metadata, but does not actively delete cached media files from the OS file system. Files will be cleaned up by the OS over time. |
| Multi-file sharing not implemented | The recap Share button can share one file at a time. A branded recap poster is planned for a future version. |
| No account or sign-in | The app is fully local. There is no user profile or login. |
| Web build is limited | Camera and media features may not work in the Expo web output. Test on a real device. |

---

## Device notes

- Test on **iOS** and **Android** if possible.
- Camera permission prompt should appear the first time a camera card is drawn.
- If the camera does not open, check device permissions under Settings -> NiteDeck.
- On Android, the back gesture exits the fullscreen media viewer correctly.

---

## Reporting issues

File issues in the project tracker or message the team directly. Include:
- Steps to reproduce
- Device model and OS version
- Screenshot or screen recording if relevant
