/**
 * CENTRALIZED CONTENT CONFIGURATION
 * All user-facing text, personal messages, jokes, reports, profile cards,
 * button labels, and achievements for the personalized Rakhi experience.
 */

export const content = {
  // --- SCENE 1: THE INVITATION ---
  scene1: {
    greeting: "Hey, Anwesha...",
    subtextLine1: "Before you open anything else...",
    subtextLine2: "there’s something I wanted you to see first.",
    subtextLine3: "I could've just given you the gift and called it a day.",
    subtextLine4: "But apparently, I don't know how to do things normally. :)",
    systemHeader: "rakhi_protocol.sh",
    systemLogs: [
      { text: "Initializing something special...", delayMs: 500, color: "var(--text-plum-muted)" },
      { text: "Finding Anwesha... ✓", delayMs: 650, color: "#3d8b59" },
      { text: "Checking sibling status... ✓", delayMs: 650, color: "#3d8b59" },
      { text: "Confirming Rakhi protocol... ✓", delayMs: 700, color: "#3d8b59" },
      { text: "Calculating brother's level of overthinking...", delayMs: 1200, color: "var(--gold-dark)" },
      { text: "ERROR 💀", delayMs: 700, color: "#c84b5c", isGlitch: true },
      { text: "Status: Still your brother.", delayMs: 650, color: "var(--text-plum-dark)" },
      { text: "No refunds available.", delayMs: 550, color: "var(--rose-primary)" },
      { text: "SURPRISE SUCCESSFULLY PREPARED ✨", delayMs: 600, color: "var(--gold-dark)", isBold: true }
    ],
    ctaText: "OPEN YOUR SURPRISE"
  },

  // --- SCENE 2: THE GRAND RAKHI REVEAL ---
  scene2: {
    preTitle: "Okay...",
    subTitle: "Now you can look.",
    name: "Anwesha",
    greeting: "Happy Raksha Bandhan. 🧿",
    chosenSiblingLines: [
      "You know, technically, you're not my sister by blood.",
      "But somehow, somewhere along the way...",
      "you became my sister anyway. ❤️"
    ],
    monojitCreditLines: [
      "And honestly, I have to give Monojit some credit for that.",
      "If it wasn't for him, I probably wouldn't have ended up with a sister like you.",
      "So I suppose I should thank him.",
      "Just this once. Don't get used to it. 💀"
    ],
    closingJoke: "Anyway... since apparently having a sister wasn't enough, I decided to build an entire story about it.",
    ctaText: "CONTINUE THE JOURNEY"
  },

  // --- SCENE 3: WHY A WEBSITE? ---
  scene3: {
    title: "Now you might be wondering...",
    headline: "Why the hell is there a webpage?",
    alternatives: [
      "I could've just bought you something.",
      "I could've written a tiny note.",
      "I could've said “Happy Rakhi” and called it a day."
    ],
    punchline: "But apparently... that would've been too normal.",
    websiteCreated: "So I made a website instead. 💀",
    steps: [
      { num: "Step 01", desc: "Learn some HTML." },
      { num: "Step 02", desc: "Learn CSS." },
      { num: "Step 03", desc: "Learn JavaScript." },
      { num: "Step 04", desc: "Realise this has gone way too far." }
    ],
    escalation: "And somewhere between “I'll make something small” and “wait, I can animate this...” this happened.",
    intention: "So no... this wasn't necessary. Not even remotely. But I wanted to make something that you'd actually remember.",
    suffering: "Also, I've already spent too much time on this. Please appreciate the suffering. 🫡",
    transition: "Okay, enough explanation. There's still a gift waiting.",
    evidenceButton: "WANT TO SEE THE EVIDENCE? 📊",
    ctaText: "CONTINUE →"
  },

  // --- SCENE 4: THE GIFTS (KITKAT RICH + BELLAVITA) ---
  scene4: {
    introLead: "Okay, enough about the website.",
    introHeadline: "Let's talk about the actual reason you're holding this thing.",
    giftCountTease: "I got you something... Actually, two things. 👀",
    gift1: {
      tag: "Gift No. 01",
      title: "KitKat Rich 🍫",
      subtitle: "The Official Chocolate Selection",
      reportButton: "VIEW THE RESEARCH REPORT 📊"
    },
    report: {
      title: "RAKHI GIFT SELECTION REPORT",
      subject: "Anwesha 🧿",
      requirements: [
        "✓ Must be chocolate",
        "✓ Must taste good",
        "✓ Must not be too sweet"
      ],
      candidates: [
        "Chocolate A ❌",
        "Chocolate B 🤔",
        "Chocolate C ❌"
      ],
      finalSelection: "KITKAT RICH 🏆",
      researcher: "Diganta, Professional Overthinker",
      assistant: "Monojit",
      assistantRole: "Best friend & the special person",
      assistantNote: "Because apparently I needed a second opinion before buying you chocolate. 💀"
    },
    gift2: {
      bridge: "But... you didn't think that was it, did you?",
      tag: "Gift No. 02",
      title: "Bellavita 🌸",
      description: "Because one gift clearly wasn't enough. I saw it and thought of you, so... here we are.",
      punchline: "Apparently I got carried away again. 😭",
      shortSummary: "Saw it. Thought of you. Bought it."
    },
    physicalHandoff: {
      lead: "Now look away from the screen for a second.",
      action: "Look at your actual gifts. 👀",
      affirmation: "Yep. They're right there.",
      closing: "I told you this website was only the beginning."
    },
    ctaText: "KEEP GOING →"
  },

  // --- SCENE 5: THE SINCERE PERSONAL LETTER ---
  scene5: {
    header: "A Note for Anwesha 🧿",
    leadQuote: "Okay... jokes aside for a minute. There's something I actually wanted to tell you.",
    messageParagraphs: [
      "This is the first time I’ve made something like this for Rakhi, and honestly, I wasn’t sure how to do it without overthinking every single detail. 😭",
      "Technically, life didn't start us off as siblings, but somehow in the path, you became the sister I chose. And that’s something I’m genuinely grateful for.",
      "The gifts are just small tokens, and this website is admittedly an overengineered delivery mechanism 😭, but the care behind it is 100% real.",
      "Stay happy, take care of yourself, and don't change. I'm really glad to have you as my sister."
    ],
    closingJoke: "And unfortunately for you... you're permanently stuck with me as your brother. 💀🧿",
    signature: {
      prefix: "With love,",
      author: "The brother in question \n Diganta 🧿"
    },
    keepButton: "KEEP THIS MESSAGE 🧿",
    keepSuccess: "Saved forever in memory. No refunds. 💀",
    ctaLead: "Okay, that's enough emotional nonsense. 😭 There's still more.",
    ctaText: "LET'S GET BACK TO BEING NORMAL →"
  },

  // --- SCENE 6: THE SIBLING ZONE ---
  scene6: {
    header: "Welcome to the Sibling Zone. 💀",
    subtext: "Since you're officially stuck with me now, I feel like you should know what you've signed up for.",
    modeTag: "SIBLING MODE ACTIVATED | Chaos: ENABLED ✓",
    brotherCard: {
      title: "Me",
      description: "Professional overthinker. Occasional nuisance. Somehow still one of the persons who cares about you.",
      reliability: "questionable",
      effort: "unnecessarily high",
      refundPolicy: "unavailable",
      actionText: "Inspect brother",
      diagnosis: "Diagnosis: Unfortunately, he's permanent. 💀"
    },
    sisterCard: {
      title: "Anwesha",
      knownFor: "Being the sister I didn't know I needed",
      currently: "Probably judging this website",
      threatLevel: "High (Might demand more chocolate) 🍫"
    },
    monojitCard: {
      title: "The Man behind all of it",
      role: "The person who is partly responsible for this entire situation.",
      points: [
        "Helped find the photo for this website.",
        "Helped choose the chocolate.",
        "And more importantly... he's the reason I got you as my sister in the first place."
      ],
      closing: "So yeah. He gets some credit. Don't let it go to his head though. 😭"
    },
    doNotPress: {
      buttonText: "DO NOT PRESS ⚠️",
      stage0: "Seriously. Do not press it.",
      stage1: "I literally told you not to.",
      stage2: "Okay, now you're just doing it because I told you not to.",
      stage3: "Fine. Achievement unlocked: Cannot Follow Instructions. 🚨"
    },
    motifs: [
      { icon: "🧿", label: "Protection against bad vibes activated." },
      { icon: "🍫", label: "Yes, the KitKat is still real. Go eat it!" },
      { icon: "💻", label: "This is what happens when your brother learns HTML." },
      { icon: "🏆", label: "Achievement unlocked: Survived the sibling website!" }
    ],
    closingLead: "Alright. You've explored enough chaos for one day.",
    closingSub: "Before we finish, there's one thing I need to be honest about.",
    ctaText: "A NOTE I DIDN'T PLAN →"
  },

  // --- SCENE 7: THE ONE THING I DIDN'T PLAN (PERSONAL APOLOGY) ---
  scene7: {
    badge: "FIELD NOTE // 07:30 AM",
    protocolStatus: "Rakhi protocol: delayed, not cancelled.",
    title: "Okay...",
    subTitle: "There’s one thing I didn’t plan for.",
    openingLines: [
      "I had imagined giving you this on a very different morning.",
      "I was supposed to meet you at 7:30.",
      "You were there waiting for me. And I wasn't."
    ],
    explanation: [
      "I had stayed up until around 4:30 AM finishing this thing, after barely sleeping for two days between college work, assignments, and SIH, and I set three alarms because I was determined to make it on time.",
      "Apparently, even three alarms were no match for exhaustion. I slept right through them.",
      "I know that doesn't change the fact that you stood near the metro gate waiting for me. And I'm genuinely sorry."
    ],
    accountability: [
      "I don't want to turn this into a hundred excuses.",
      "I just want to acknowledge that I let you down."
    ],
    forwardLook: [
      "I can't rewind that morning. But I can still show up.",
      "Maybe this part of the story didn't go the way I planned.",
      "That doesn't mean the story ends here."
    ],
    noteFooter: "No excuses. Just an honest apology.",
    ctaText: "LET'S TRY THIS AGAIN → 🧿"
  },

  // --- SCENE 8: THE FINALE ---
  scene8: {
    recapIntro: "And that's the whole story. Well... almost.",
    recapLines: [
      "Some things arrive late. That doesn't make them less meaningful.",
      "Somewhere along the way... you became the sister I'm grateful to have.",
      "Not by blood. Just by one of those weird little turns life makes sometimes.",
      "So, I guess Monojit gets a proper thank-you too for starting this chain of events.",
      "I just decided to overengineer the ending. 💀"
    ],
    greeting: "Happy Rakhi, Chotokhuki. 🧿",
    subtext: "I hope you liked this little ridiculous thing I made for you.",
    realRakhiNote: "And yes... there's an actual Rakhi waiting for you too. Go on. You've got gifts to open. 👀",
    signature: "— Diganta",
    footnote: "Made with HTML, CSS, JavaScript, questionable decisions, and very little sleep. 😭",
    celebrateCta: "TAP THE RAKHI ONE LAST TIME 🧿",
    replayButton: "REPLAY THE CHAOS ↻",
    replayModal: {
      title: "Replay the Chaos? ↻",
      question: "Are you sure? I had to build all of this. 😭",
      confirm: "YES, AGAIN →",
      cancel: "NO, LET ME EAT THE CHOCOLATE 🍫"
    },
    easterEgg: "Psst... Go eat the KitKat before it melts. 🍫😭"
  }
};

