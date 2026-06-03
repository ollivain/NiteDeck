import type { PremiumCard } from './types';

export const temptationsCards: PremiumCard[] = [
  // te001-te018 (original)
  { id: 'te001', packId: 'temptations', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone in this room. Make eye contact for 10 seconds without looking away or laughing.', intensity: 2 },
  { id: 'te002', packId: 'temptations', type: 'question', label: 'QUESTION', text: 'Would you rather have one perfect charged moment with someone new or weeks of slow tension with someone you already know?', intensity: 2 },
  { id: 'te003', packId: 'temptations', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room has the most magnetic energy right now?', intensity: 2 },
  { id: 'te004', packId: 'temptations', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and tell them one thing you find genuinely attractive about them. Be specific.', intensity: 2 },
  { id: 'te005', packId: 'temptations', type: 'question', label: 'QUESTION', text: 'What is something someone could do right now that would immediately make you more attracted to them?', intensity: 2 },
  { id: 'te006', packId: 'temptations', type: 'vote', label: 'GROUP VOTE', text: 'Everyone points to the person they would most want beside them during a suspiciously long power cut.', intensity: 2 },
  { id: 'te007', packId: 'temptations', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and describe the vibe they give off in exactly three words.', intensity: 1 },
  { id: 'te008', packId: 'temptations', type: 'question', label: 'QUESTION', text: 'Would you rather say too much or say too little when someone clearly wants you to make a move?', intensity: 2 },
  { id: 'te009', packId: 'temptations', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room would be the most dangerous person to fall for?', intensity: 2 },
  { id: 'te010', packId: 'temptations', type: 'question', label: 'QUESTION', text: 'What tiny move at a party can make someone suddenly much more attractive to you?', intensity: 2 },
  { id: 'te011', packId: 'temptations', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone in the room. Tell them what kind of first impression they made on you, honestly.', intensity: 2 },
  { id: 'te012', packId: 'temptations', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room would be the most effortlessly charming on a first date?', intensity: 1 },
  { id: 'te013', packId: 'temptations', type: 'question', label: 'QUESTION', text: 'Rate your flirting tonight out of 10, then name the one thing that would raise the score.', intensity: 2 },
  { id: 'te014', packId: 'temptations', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and ask them one question you have been too subtle to ask before tonight.', intensity: 3 },
  { id: 'te015', packId: 'temptations', type: 'vote', label: 'GROUP VOTE', text: 'Everyone points to the person in this room who is the most difficult to read.', intensity: 2 },
  { id: 'te016', packId: 'temptations', type: 'question', label: 'QUESTION', text: 'What would you do if someone here made a move tonight?', intensity: 3 },
  // te017 rewritten: was too Couples & Chemistry ("plan tomorrow for them")
  { id: 'te017', packId: 'temptations', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and tell them the most specific thing you noticed about them before they said a word tonight.', intensity: 2 },
  { id: 'te018', packId: 'temptations', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room is most likely to keep someone guessing for weeks?', intensity: 2 },

  // te019-te060
  { id: 'te019', packId: 'temptations', type: 'question', label: 'QUESTION', text: 'Would you rather always know if someone is attracted to you, or always be the one who has to guess?', intensity: 2 },
  // te020 rewritten: was too passive/generic ("hardest to forget after honest conversation")
  { id: 'te020', packId: 'temptations', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room would be the most difficult person to walk away from mid-conversation?', intensity: 2 },
  // te021 rewritten: duplicate of te004/te057 compliment territory - now more specific and action-oriented
  { id: 'te021', packId: 'temptations', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and tell them the most specific thing they did tonight that you found compelling.', intensity: 2 },
  { id: 'te022', packId: 'temptations', type: 'question', label: 'QUESTION', text: 'What is the most attractive quality someone in this room has shown since you arrived?', intensity: 2 },
  { id: 'te023', packId: 'temptations', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room walks in and immediately changes the energy in a space?', intensity: 2 },
  { id: 'te024', packId: 'temptations', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone. If you could send them one text right now with no context, what would it say?', intensity: 3 },
  { id: 'te025', packId: 'temptations', type: 'question', label: 'QUESTION', text: 'Would you rather someone tell you they find you attractive or show it without saying a word?', intensity: 2 },
  { id: 'te026', packId: 'temptations', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room would be the most difficult person to say no to?', intensity: 2 },
  // te027 rewritten: near-duplicate of te036 (both "specific moment tonight changed how you see them")
  { id: 'te027', packId: 'temptations', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and tell them something specific about the way they carry themselves that makes you want to know more.', intensity: 2 },
  { id: 'te028', packId: 'temptations', type: 'question', label: 'QUESTION', text: 'What could someone say right now that would make everything between you two more interesting?', intensity: 3 },
  // te029 rewritten: too generic ("exciting life outside this room")
  { id: 'te029', packId: 'temptations', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room looks like they are holding back something they want to say?', intensity: 2 },
  // te030 rewritten: near-duplicate of te001 (both sustained eye contact)
  { id: 'te030', packId: 'temptations', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and tell them which kind of message from them would be hardest to ignore: early, late or unexpected.', intensity: 2 },
  { id: 'te031', packId: 'temptations', type: 'question', label: 'QUESTION', text: 'What kind of tension do you find hardest to ignore: intellectual, emotional or physical?', intensity: 2 },
  { id: 'te032', packId: 'temptations', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room is most likely to send a risky text at exactly the wrong moment and mean every word of it?', intensity: 2 },
  { id: 'te033', packId: 'temptations', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and tell them one thing that makes them genuinely hard to read.', intensity: 2 },
  { id: 'te034', packId: 'temptations', type: 'question', label: 'QUESTION', text: 'What would change between you and someone here if you both stopped being polite about it?', intensity: 3 },
  { id: 'te035', packId: 'temptations', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room gives off the most "this could go somewhere" energy tonight?', intensity: 2 },
  { id: 'te036', packId: 'temptations', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and answer honestly: has one specific moment tonight changed how you see them? Name it.', intensity: 3 },
  { id: 'te037', packId: 'temptations', type: 'question', label: 'QUESTION', text: 'Which person here would you most want to catch looking at you from across the room?', intensity: 2 },
  // te038 rewritten: too generic ("most memorable six months from now") - now distinctly Temptations
  { id: 'te038', packId: 'temptations', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room is most likely to start something tonight that goes further than anyone planned?', intensity: 2 },
  { id: 'te039', packId: 'temptations', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and sit closer to them for the next three cards.', intensity: 2 },
  { id: 'te040', packId: 'temptations', type: 'question', label: 'QUESTION', text: 'What is something you notice about a person early on that tells you things could get interesting?', intensity: 2 },
  { id: 'te041', packId: 'temptations', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room would win a slow-burn by waiting longest before making a move?', intensity: 2 },
  { id: 'te042', packId: 'temptations', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and tell them what energy they give off when they think nobody is paying attention.', intensity: 2 },
  { id: 'te043', packId: 'temptations', type: 'question', label: 'QUESTION', text: 'Would you rather someone say exactly what they want from you, or let it stay unspoken a little longer?', intensity: 2 },
  { id: 'te044', packId: 'temptations', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room seems completely different one-on-one compared to in a group?', intensity: 2 },
  // te045 rewritten: too Wild/generic ("describe as a city")
  { id: 'te045', packId: 'temptations', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and tell them one thing you have been consciously choosing not to make obvious tonight.', intensity: 3 },
  { id: 'te046', packId: 'temptations', type: 'question', label: 'QUESTION', text: 'What was the last thing someone did that made you think: this person is actually interesting?', intensity: 2 },
  { id: 'te047', packId: 'temptations', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who here would be the most compelling person to run into unexpectedly at 2am?', intensity: 2 },
  { id: 'te048', packId: 'temptations', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and tell them one thing about them that you think is completely underrated.', intensity: 2 },
  { id: 'te049', packId: 'temptations', type: 'question', label: 'QUESTION', text: 'What signals do you give off when you are actually interested in someone, without meaning to?', intensity: 2 },
  { id: 'te050', packId: 'temptations', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room would handle an unmistakably flirtatious situation with the most composure?', intensity: 2 },
  // te051 rewritten: too Couples & Chemistry ("perfect evening for them")
  { id: 'te051', packId: 'temptations', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and tell them what you think they actually want to happen between the two of you tonight.', intensity: 3 },
  { id: 'te052', packId: 'temptations', type: 'question', label: 'QUESTION', text: 'What bit of chemistry in this room does everyone seem to be pretending not to notice?', intensity: 3 },
  // te053 rewritten: too generic ("best timing, says right thing")
  { id: 'te053', packId: 'temptations', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room would make someone want to stay up much later than they planned?', intensity: 2 },
  { id: 'te054', packId: 'temptations', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and tell them what impression you think they are actually making on people tonight.', intensity: 2 },
  { id: 'te055', packId: 'temptations', type: 'question', label: 'QUESTION', text: 'What flirty line would be too bold to send but perfect to say across this table?', intensity: 3 },
  { id: 'te056', packId: 'temptations', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who here seems most likely to make the first unmistakably flirty move before the night ends?', intensity: 2 },
  { id: 'te057', packId: 'temptations', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and give them one compliment with just enough tension that the group notices.', intensity: 1 },
  // te058 rewritten: too abstract/similar to te049 ("what about not knowing where you stand")
  { id: 'te058', packId: 'temptations', type: 'question', label: 'QUESTION', text: 'What is the last thing someone here did that made you look at them more than you intended to?', intensity: 2 },
  { id: 'te059', packId: 'temptations', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room would react most unexpectedly if someone told them directly that they liked them?', intensity: 2 },
  { id: 'te060', packId: 'temptations', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and tell them honestly whether you would want to know if they were interested in you.', intensity: 3 },
];
