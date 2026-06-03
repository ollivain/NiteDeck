import type { PremiumCard } from './types';

export const roastCards: PremiumCard[] = [
  // ro001-ro018 (original)
  { id: 'ro001', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: 'Everyone points to the person with the most chaotic texting style. They must invent one painfully in-character recent message.', intensity: 2 },
  { id: 'ro002', packId: 'roast', type: 'challenge', label: 'CHALLENGE', text: 'Roast the person on your left in exactly two sentences, as if you are still legally claiming to be friends.', intensity: 2 },
  { id: 'ro003', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room would crack first under light peer pressure? That person has 15 seconds to defend themselves.', intensity: 2 },
  // ro004 rewritten: "most visible flaw" edges toward mean; reframed as personality quirk
  { id: 'ro004', packId: 'roast', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and give them a fake job title that perfectly captures their most specific personality quirk.', intensity: 2 },
  { id: 'ro005', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who here would become the main villain in a reality TV show about this group?', intensity: 2 },
  { id: 'ro006', packId: 'roast', type: 'challenge', label: 'CHALLENGE', text: 'Give the group your best impression of what your most embarrassing habit looks like from the outside.', intensity: 2 },
  { id: 'ro007', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room is most likely to turn a calm conversation into an argument without meaning to?', intensity: 2 },
  { id: 'ro008', packId: 'roast', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and describe their morning routine as if you have witnessed it and were horrified.', intensity: 2 },
  { id: 'ro009', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who has the most questionable taste in at least one thing? That person has 15 seconds to defend one choice.', intensity: 2 },
  { id: 'ro010', packId: 'roast', type: 'challenge', label: 'CHALLENGE', text: 'Rank the three people nearest to you from most to least likely to cancel plans with a suspicious excuse.', intensity: 3 },
  { id: 'ro011', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: 'Everyone points to the person most likely to have a completely irrational villain origin story. They confirm or deny.', intensity: 2 },
  { id: 'ro012', packId: 'roast', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and write the headline for their most dramatic minor inconvenience. One sentence.', intensity: 2 },
  { id: 'ro013', packId: 'roast', type: 'challenge', label: 'CHALLENGE', text: 'Give yourself a roast in one sentence. Make it accurate enough that the group agrees.', intensity: 2 },
  { id: 'ro014', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who here is most likely to dramatically quit something they just started? That person argues back.', intensity: 2 },
  // ro015 rewritten: "most likely downfall" edges toward mean; reframed as accidental drama
  { id: 'ro015', packId: 'roast', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and describe what their villain arc would look like based on what you actually know about them.', intensity: 2 },
  { id: 'ro016', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room would be the first eliminated from a survival show? That person reacts.', intensity: 2 },
  { id: 'ro017', packId: 'roast', type: 'challenge', label: 'CHALLENGE', text: 'Tell the group the most embarrassing compliment you have ever given someone. Deliver it again now the same way.', intensity: 2 },
  { id: 'ro018', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room has the most suspicious combination of hobbies and personality traits?', intensity: 2 },

  // ro019-ro060
  { id: 'ro019', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room is most likely to write a strongly worded letter to a business for a completely minor reason?', intensity: 2 },
  { id: 'ro020', packId: 'roast', type: 'challenge', label: 'CHALLENGE', text: 'Assign every person in the group a reason they would derail a simple group project. Be specific.', intensity: 2 },
  { id: 'ro021', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who here is most likely to explain something you already understand, at length, unprompted?', intensity: 2 },
  // ro022 rewritten: "most obvious trait is biggest problem" edges toward mean; reframed as observable stress behavior
  { id: 'ro022', packId: 'roast', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and describe what their stress response looks like to everyone in the room except them.', intensity: 2 },
  { id: 'ro023', packId: 'roast', type: 'challenge', label: 'CHALLENGE', text: 'Tell the group who would make a shared kitchen most complicated and give two very specific reasons.', intensity: 3 },
  { id: 'ro024', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room is most likely to dramatically overreact to something completely minor?', intensity: 2 },
  { id: 'ro025', packId: 'roast', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and name the single most likely reason they would be late to their own birthday dinner.', intensity: 2 },
  { id: 'ro026', packId: 'roast', type: 'challenge', label: 'CHALLENGE', text: 'Rank everyone at the table from most to least likely to win a debate by talking louder rather than making better points.', intensity: 2 },
  { id: 'ro027', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who here has the most chaotic approach to making a simple decision?', intensity: 2 },
  // ro028 rewritten: too similar to ro004 (fake titles); now a different "press statement" format
  { id: 'ro028', packId: 'roast', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and deliver their most elaborate excuse as a formal press statement. Read it aloud.', intensity: 2 },
  { id: 'ro029', packId: 'roast', type: 'challenge', label: 'CHALLENGE', text: 'Give the person on your right a villain backstory in one sentence. Make it disturbingly plausible.', intensity: 2 },
  { id: 'ro030', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: "Vote: who in this room is most likely to reply 'I'm fine' when they are absolutely not fine?", intensity: 2 },
  { id: 'ro031', packId: 'roast', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and describe their most commonly used excuse. Make it accurate.', intensity: 2 },
  { id: 'ro032', packId: 'roast', type: 'challenge', label: 'CHALLENGE', text: 'Tell the group the most specific harmless petty thing you have noticed about someone here tonight.', intensity: 2 },
  { id: 'ro033', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room holds the most suspicious opinion about something most people agree on?', intensity: 2 },
  { id: 'ro034', packId: 'roast', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and give them a reality TV show based entirely on how they have behaved tonight. Name it and pitch the premise.', intensity: 2 },
  // ro035 rewritten: "three most avoidable mistakes" edges toward mean; replaced with a warning label format
  { id: 'ro035', packId: 'roast', type: 'challenge', label: 'CHALLENGE', text: 'If the person to your left had their own warning label, what would it say in three words? Say it out loud.', intensity: 2 },
  { id: 'ro036', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who here would confidently give directions to a place they have never actually been?', intensity: 2 },
  { id: 'ro037', packId: 'roast', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and describe the specific kind of nonsense only they would get themselves into.', intensity: 2 },
  { id: 'ro038', packId: 'roast', type: 'challenge', label: 'CHALLENGE', text: 'Invent a bureaucratic award for the person most likely to overthink a single text message. Present it with a short speech.', intensity: 2 },
  { id: 'ro039', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room is most likely to take a mild joke too personally and then deny it completely?', intensity: 2 },
  // ro040 rewritten: near-duplicate of ro002 ("roast in two sentences about visible habit")
  { id: 'ro040', packId: 'roast', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and describe what they look like when they are absolutely convinced they are right about something incorrect.', intensity: 2 },
  { id: 'ro041', packId: 'roast', type: 'challenge', label: 'CHALLENGE', text: 'Put this group on trial for one ridiculous charge. Name the charge and the person most clearly guilty.', intensity: 2 },
  { id: 'ro042', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room is most likely to start a podcast that gets four listeners and still call it a success?', intensity: 2 },
  { id: 'ro043', packId: 'roast', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and give them a fake award no ceremony would be brave enough to announce.', intensity: 2 },
  // ro044 rewritten: "subtly damning" reference feels mean-adjacent; replaced with product listing format
  { id: 'ro044', packId: 'roast', type: 'challenge', label: 'CHALLENGE', text: 'Describe the person across from you as a product listing on a marketplace. Include three features and one known issue.', intensity: 2 },
  { id: 'ro045', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who here is most likely to bring unnecessary tension to a completely relaxed group activity?', intensity: 2 },
  { id: 'ro046', packId: 'roast', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and identify which of their stories would be funnier if they admitted it was at least partly their fault.', intensity: 2 },
  { id: 'ro047', packId: 'roast', type: 'challenge', label: 'CHALLENGE', text: 'Assign everyone in the group a title from a fictional failed startup. Read them out with full sincerity.', intensity: 2 },
  { id: 'ro048', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room is most likely to turn declining a group plan into a whole emotional event?', intensity: 2 },
  // ro049 rewritten: confusing Wikipedia disambiguation premise; replaced with TripAdvisor format
  { id: 'ro049', packId: 'roast', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and describe them as a travel destination. Include the main attraction and one confusing local custom.', intensity: 2 },
  { id: 'ro050', packId: 'roast', type: 'challenge', label: 'CHALLENGE', text: 'Tell the group one thing about yourself that you would happily judge someone else for doing.', intensity: 2 },
  { id: 'ro051', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who here is most likely to commit to a bit long after the room has moved on?', intensity: 2 },
  { id: 'ro052', packId: 'roast', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and name their least convincing lie. Not their worst, the one that fooled nobody.', intensity: 2 },
  // ro053 rewritten: third "business document" card (after ro044/ro055 Yelp); replaced with weather format
  { id: 'ro053', packId: 'roast', type: 'challenge', label: 'CHALLENGE', text: 'Describe the person to your left as a specific type of weather. Be accurate enough that they have to agree.', intensity: 2 },
  { id: 'ro054', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room is most likely to order something complicated and still find a reason to be disappointed?', intensity: 2 },
  { id: 'ro055', packId: 'roast', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and write a one-star review for how they showed up tonight, including one oddly specific complaint.', intensity: 2 },
  { id: 'ro056', packId: 'roast', type: 'challenge', label: 'CHALLENGE', text: 'Give yourself a performance review for tonight. Rate your social skills out of 10 and justify the score.', intensity: 2 },
  { id: 'ro057', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who in this room takes the longest to do something simple and then provides a detailed explanation for why?', intensity: 2 },
  { id: 'ro058', packId: 'roast', type: 'pick', label: 'PICK SOMEONE', text: 'Pick someone and describe the most specific reason they would lose a game show in the very first round.', intensity: 2 },
  { id: 'ro059', packId: 'roast', type: 'challenge', label: 'CHALLENGE', text: 'Read out a fake status update from the person on your right about something that happened tonight.', intensity: 2 },
  { id: 'ro060', packId: 'roast', type: 'vote', label: 'GROUP VOTE', text: 'Vote: who here is most likely to apologize in a way that somehow makes the situation worse?', intensity: 2 },
];
