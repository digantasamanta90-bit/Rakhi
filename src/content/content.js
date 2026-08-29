/**
 * MASTER CONTENT CONFIGURATION — RAKHI 17-SCENE FILM
 * Centralized, decoupled source of truth for all user-facing text, timestamps,
 * narrative dialogs, character dossiers, letter paragraphs, thread fragments,
 * finale text, and high-level editorial timing knobs.
 */

export const content = {
  // ==========================================
  // BEAT 01 — THE DAWN DESK (4:30 AM)
  // ==========================================
  scene01: {
    starterText: "A Developer's Apology",
    dateHeader: "FRIDAY // 4:30 AM",
    clockSequence: ["4:27", "4:28", "4:29", "4:30 AM"],
    finallyText: "Finally.",
    timing: {
      clockCadence: 0.85, // Time spent on each timestamp while sky & clouds drift
      finallyHold: 1.4    // Time before transition into Scene 02
    }
  },

  // ==========================================
  // BEAT 02 — SIBLING REVELATION
  // ==========================================
  scene02: {
    envTag: "BEAT 02 // SIBLING REVELATION",
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
    timing: {
      shot1Hold: 1.6,
      shot2Hold: 1.8,
      shot3Hold: 1.8,
      shot4Hold: 2.0
    }
  },

  // ==========================================
  // BEAT 03 — THE 3 ALARMS (DAWN PROGRESSION)
  // ==========================================
  scene03: {
    alarms: [
      { time: "5:30 AM", label: "ALARM 1 OF 3" },
      { time: "5:45 AM", label: "ALARM 2 OF 3" },
      { time: "6:00 AM", label: "ALARM 3 OF 3" }
    ],
    dismissBtnText: "Dismiss Alarm",
    narratives: {
      postAlarm1: "Just five more minutes...",
      postAlarm2: "Okay, getting up for real now...",
      finalDismissed: "Woke up. Determined to make it on time."
    },
    timing: {
      alarm1Wait: 2.4,
      alarm2Wait: 2.2,
      alarm3Wait: 2.6
    }
  },

  // ==========================================
  // BEAT 04 — THE 7:30 CALL (MISSED CALL)
  // ==========================================
  scene04: {
    time: "7:30 AM",
    callerName: "ANWESHA",
    location: "Metro Station Gate 2",
    callStatus: "1 MISSED CALL",
    promptText: "Kothay tui???",
    subtext: "Phone vibrating silently on the desk...",
    timing: {
      ringDuration: 2.4,
      reactionHold: 1.6
    }
  },

  // ==========================================
  // BEAT 05 — THE PANIC (MORNING WHIRLWIND)
  // ==========================================
  scene05: {
    timerStart: "15:00",
    timerTicks: ["14:32", "11:15", "08:40", "05:22", "02:08", "00:45", "00:10", "00:00"],
    items: [
      { emoji: "📱", label: "PHONE" },
      { emoji: "👕", label: "SHIRT" },
      { emoji: "🎒", label: "BAG" },
      { emoji: "💻", label: "LAPTOP" },
      { emoji: "🔌", label: "CHARGER" },
      { emoji: "👛", label: "WALLET" },
      { emoji: "🎁", label: "GIFT" },
      { emoji: "👟", label: "SHOES" }
    ],
    climaxBanner: "METRO",
    timing: {
      rushDuration: 2.8,
      impactHold: 0.8
    }
  },

  // ==========================================
  // BEAT 06 — THE METRO JOURNEY
  // ==========================================
  scene06: {
    routeTag: "BLUE LINE // TRANSIT TO DESTINATION",
    dialogues: [
      "7:45 AM // The morning metro...",
      "Rushing through the city, holding the gifts tight..."
    ],
    timing: {
      travelHold: 7.6
    }
  },

  // ==========================================
  // BEAT 07 — THE BROKEN KITKAT
  // ==========================================
  scene07: {
    impactTag: "8:15 AM // THE IMPACT",
    leadReaction: "Oh no.",
    comedicClimax: "The Bad Luck Charm.💀",
    panicThought: "Anwesha is going to kill me.",
    timing: {
      crackReactionHold: 1.8,
      jokeHold: 2.0
    }
  },

  // ==========================================
  // BEAT 08 — GOING HOME (TRAVEL TRANSFORMATION)
  // ==========================================
  scene08: {
    stages: [
      { mode: "BUS", tag: "CITY TRANSIT // CHAOTIC TRAFFIC", bg: "urban" },
      { mode: "AUTO", tag: "OUTSKIRTS // GREENERY BEGINS", bg: "outskirts" },
      { mode: "WALK", tag: "VILLAGE ROAD // QUIET BREEZE", bg: "village" },
      { mode: "ARRIVAL", tag: "HOME 🏡 // JOURNEY ENDS", bg: "home" }
    ],
    timing: {
      busDuration: 4,
      autoDuration: 4,
      arrivalDuration: 3
    }
  },

  // ==========================================
  // BEAT 09 — THE CEILING (EMOTIONAL TURNING POINT)
  // ==========================================
  scene09: {
    line1: "I messed up.",
    line2: "I'm sorry.",
    line3: "I made this same mistake on another morning",
    timing: {
      line1Hold: 1.4,
      line2Hold: 1.5,
      turningPointHold: 2.0
    }
  },

  // ==========================================
  // BEAT 10 — MEMORIES (RETROSPECTIVE)
  // ==========================================
  scene10: {
    memory1: {
      caption: "Chotokhuki 🧿",
      subtext: "The little girl who grew up too fast."
    },
    memory2: {
      caption: "The Chosen Sibling ❤️",
      subtext: "Not by blood. Just by one of those good turns life makes."
    },
    memory3: {
      caption: "A Bond Across Any Distance ✨",
      subtext: "Some things don't depend on whether you showed up at 7:30."
    },
    timing: {
      photo1Hold: 3.0,
      photo2Hold: 3.0,
      photo3Hold: 3.4
    }
  },

  // ==========================================
  // BEAT 11 — THE GIFTS (KITKAT + BELLAVITA)
  // ==========================================
  scene11: {
    marketTag: "MORNING BAZAAR // GIFT PROCUREMENT",
    gift1: {
      title: "KitKat Rich 🍫",
      subtitle: "The Official Chocolate Selection",
      reportTitle: "CASE FILE 04 // GIFT RESEARCH REPORT",
      subject: "Subject: Anwesha 🧿",
      candidates: [
        "Chocolate A ❌ (Too sweet)",
        "Chocolate B 🤔 (Dubious quality)",
        "KitKat Rich 🏆 (Approved by Monojit)"
      ],
      footerNote: "Assistant Researcher: Monojit (Second opinion was legally required 💀)"
    },
    gift2: {
      title: "Random Finds 🪻",
      subtitle: "Because one was never enough."
    },
    timing: {
      kitkatSpotlight: 3.6,
      casefileReadHold: 3.8,
      bellavitaSpotlight: 3.0
    }
  },

  // ==========================================
  // BEAT 12 — THE SIBLING ZONE
  // ==========================================
  scene12: {
    envTag: "BEAT 12 // THE SIBLING REALM",
    brotherCard: {
      badge: "THE ARCHETYPE",
      title: "ME",
      description: "\"Professional overthinker. Occasional nuisance. Effort: unnecessarily high.\"",
      pill: "Will build entire apps instead of texting 🫡",
      narrative: "Technically your brother. No refunds available."
    },
    sisterCard: {
      badge: "THE SISTER",
      title: "Anwesha 🧿",
      threatLevel: "THREAT: HIGH 🍫",
      description: "Will demand chocolate. Probably judging this scene.",
      narrative: "Will demand KitKat. Probably judging this website right now."
    },
    monojitCard: {
      badge: "CATALYST OF RECORD",
      title: "Monojit",
      image: "assets/portraits/monojit1.png",
      description: "\"The mastermind behind all of it. Found the photos, approved the chocolate, and started this whole sister story.\"",
      footnote: "Credit given. Don't let it go to his head 💀",
      narrative: "Don't let the credit go to his head though. 💀"
    },
    statusCard: {
      badge: "OFFICIAL SIBLING DOSSIER // EVALUATION",
      status: "Brother Status: PERMANENT 💀",
      reliability: "Questionable 🤔",
      refundPolicy: "0% Available ❌",
      sisterCare: "100% Guaranteed ❤️",
      narrative: "Diagnosis confirmed. You're stuck with me forever."
    },
    doNotPress: {
      buttonText: "DO NOT PRESS ⚠️",
      stage0: "Seriously. Do not press it.",
      stage1: "I literally told you not to.",
      stage2: "Okay, now you're just doing it because I told you not to.",
      stage3: "Fine. Achievement unlocked: Cannot Follow Instructions. 🚨",
      revealTitle: "✨ MAXIMUM SIBLING CHAOS UNLOCKED",
      revealBody: "Alright, you've completely destroyed the warning protocol. Now comes the quiet part.",
      proceedBtnText: "A quiet note for you →"
    },
    motifs: [
      { icon: "🧿", label: "Protection against bad vibes activated." },
      { icon: "🍫", label: "Yes, the KitKat is still real. Go eat it!" },
      { icon: "💻", label: "This is what happens when your brother learns HTML." },
      { icon: "🏆", label: "Achievement unlocked: Survived the sibling website!" }
    ],
    timing: {
      cardHold: 1.8
    }
  },

  // ==========================================
  // BEAT 13 — THE LETTER (TABLETOP DESK)
  // ==========================================
  scene13: {
    tag: "FOR ANWESHA // FROM DIGANTA",
    header: "A Note for You 💕",
    leadQuote: "Okay... jokes aside for a minute. There's something I actually wanted to tell you.",
    messageParagraphs: [
      "This is the first time I’ve made something like this for Rakhi, and honestly, I wasn’t sure how to do it without overthinking every single detail. 😭",
      "Technically, life didn't start us off as siblings, but somehow in the path, you became the sister I chose. And that’s something I’m genuinely grateful for.",
      "The gifts are just small tokens, and this website is admittedly an overengineered delivery mechanism 😭, but the care behind it is 100% real.",
      "Stay happy, take care of yourself and of him. And most importantly don't change, stay this cheerful forever. I'm really glad to have you as my sister from another mother."
    ],
    closingJoke: "And unfortunately for you... you're permanently stuck with me as your brother. 💀🧿",
    keepButton: "KEEP THIS MESSAGE 🧿",
    keepSuccess: "Saved forever in memory 🧿",
    signature: {
      prefix: "With care,",
      author: "Diganta 🧿"
    },
    nextBtnText: "The Sacred Thread",
    timing: {
      paragraphCadence: 0.8 
    }
  }, 

  // ==========================================
  // BEAT 14 — THE THREAD (COSMIC CONNECTION)
  // ==========================================
  scene14: {
    fragments: ["4:30 AM", "5:30 AM", "7:30 AM", "MISSED CALL", "METRO", "BROKEN KITKAT"],
    digantaNode: "Diganta",
    anweshaNode: "Anwesha 🧿",
    timing: {
      fragmentHold: 1.8,
      threadDrawHold: 2.2
    }
  },

  // ==========================================
  // BEAT 15 — THE APOLOGY (INTIMATE RESOLUTION)
  // ==========================================
  scene15: {
    thoughts: [
      "I ruined Friday.",
      "I'm sorry for that.",
      "Not exactly how I imagined that day.",
      "But maybe that's okay.",
      "Some moments don't happen the way you planned.",
      "But I'll make sure the next one does."
    ],
    timing: {
      thoughtCadence: 0.9,
      finalThoughtHold: 2.0
    }
  },

  // ==========================================
  // BEAT 16 — THE FINALE (RAKHI CELEBRATION)
  // ==========================================
  scene16: {
    envTag: "BEAT 16 // THE SACRED KNOT",
    hintText: "Tap the Rakhi to tie the bond 🧿",
    knotActionText: "Tie the Knot ✨",
    line1: "RAKHI TIED. FOREVER. 🧿",
    line2: "FESTIVE BLESSINGS • FOREVER BOND",
    greetingLead: "HAPPY RAKHI,",
    greetingName: "ANWESHA ❤️",
    apologyCallback1: "A little late.",
    apologyCallback2: "But still from the heart.",
    signature: "— Diganta",
    postCreditsBtn: "Epilogue: The Story Continues →",
    timing: {
      lineHold: 1.5,
      greetingHold: 2.2,
      celebrationHold: 2.0
    }
  },

  // ==========================================
  // BEAT 17 — POST-CREDITS (EPILOGUE)
  // ==========================================
  scene17: {
    tag: "EPILOGUE // POST-CREDITS",
    title: "And that's the whole story. 🧿",
    easterEgg: "Psst... Go eat the KitKat before it melts. 🍫😭",
    replayBtn: "Replay the Journey ↻",
    restartBtn: "Start from 4:30 AM",
    replayModal: {
      title: "Replay the Journey? ↻",
      question: "Are you sure? We'll take you back to 4:30 AM.",
      confirm: "YES, REPLAY →",
      cancel: "NO, LET ME EAT THE KITKAT 🍫"
    }
  }
};

