/**
 * MASTER CONTENT CONFIGURATION — RAKHI 17-SCENE CINEMATIC FILM
 * 
 * TRUE SINGLE SOURCE OF TRUTH for:
 * A. User-facing narrative & UI text
 * B. Editorial timing & pacing knobs
 * C. Asset paths (portraits, gifts, fallback images)
 * D. Audio mappings & volume targets
 * E. Interaction thresholds & configuration
 * 
 * Edit values in this file to customize text, timing, assets, and story beats.
 */

export const content = {
  // ==========================================
  // GLOBAL METADATA
  // ==========================================
  meta: {
    title: "For Anwesha, From Your Brother 🧿",
    description: "A personalized interactive Rakhi gift experience for Anwesha from Diganta.",
    recipient: "Anwesha",
    author: "Diganta",
    themeColor: "#0A0709"
  },

  // ==========================================
  // AUDIO CONFIGURATION
  // ==========================================
  audio: {
    bgm: "assets/music/monta re instrumental bgm.mp3",
    alarm: "assets/music/alarm.mp3",
    ringtone: "assets/music/ringtone.mp3",
    bgmTargetVolume: 0.70,
    bgmDuckedVolume: 0.12,
    alarmVolume: 1.0,
    ringtoneVolume: 1.0,
    ringtoneStartTime: 2.0 // Starts at 2.0s to bypass initial audio silence
  },

  // ==========================================
  // BEAT 01 — THE DAWN DESK (4:30 AM)
  // ==========================================
  scene01: {
    starterText: "A Developer's Apology",
    dateHeader: "FRIDAY // 4:30 AM",
    clockSequence: ["4:27", "4:28", "4:29", "4:30 AM"],
    finallyText: "Finally.",
    timing: {
      clockCadence: 0.85,       // Seconds per clock tick (4:27 -> 4:28 -> 4:29 -> 4:30)
      typeSpeed: 60,            // Milliseconds per character for typewriter
      finallyHold: 1.4,         // Seconds holding "Finally." before scene dissolve
      starterFadeDuration: 0.35 // Dissolve speed for starter gateway overlay
    }
  },

  // ==========================================
  // BEAT 02 — BUILDING IT (CREATION FRAGMENTS)
  // ==========================================
  scene02: {
    name: "Anwesha",
    whisper: "BUILDING SOMETHING",
    forTitle: "FOR ANWESHA",
    subtitle: "Every detail crafted with intention.",
    terminalCmd: "./rakhi_protocol.sh --target=Anwesha",
    overthinkText: "Calculating overthinking level: ∞",
    timestamps: ["11:48 PM", "01:17 AM", "02:53 AM", "04:30 AM"],
    assets: {
      photo1: "assets/portraits/anwesha15.png",
      photo1Fallback: "assets/portraits/anwesha_hero.png",
      photo2: "assets/portraits/anwesha7.png",
      photo2Fallback: "assets/portraits/anwesha_calm.png"
    },
    timing: {
      fragmentStagger: 0.15,    // Stagger duration between flying creation elements
      timestampStagger: 0.18,   // Stagger duration for timestamps reveal
      textHold: 1.4,            // Reading hold after title & subtitle appear
      transitionDuration: 0.6   // Dissolve duration into Scene 03
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
    dialogue: "…but my eyes never opened.",
    timing: {
      initialDelay: 0.25,       // Delay before first alarm rings (seconds)
      dismissTransition: 0.45,  // Transition time between alarm dismissals
      dialogueFadeDuration: 0.9,// Fade-in speed for emotional dialogue
      dialogueHold: 1.2         // Reading hold before advancing to Scene 04
    }
  },

  // ==========================================
  // BEAT 04 — THE 7:30 CALL (MISSED CALL)
  // ==========================================
  scene04: {
    clockSequence: ["7:29:58", "7:29:59", "7:30:00"],
    incomingCallTag: "Incoming Call",
    callerName: "Anwesha ",
    promptTag: "UTTER DISAPPOINTMENT • 7:30 AM",
    promptText: "Kothay tui???",
    assets: {
      callerAvatar: "assets/portraits/anwesha1.png",
      callerAvatarFallback: "assets/portraits/anwesha_hero.png"
    },
    timing: {
      tickInterval: 0.9,        // Seconds per clock tick before 7:30:00
      phoneEnterDuration: 0.75, // Phone card entrance animation duration
      vibrateInterval: 1300,    // Milliseconds between phone ring shakes
      reactionHold: 1.8         // Reading hold after call response before next scene
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
      objectStagger: 0.12,      // Entrance stagger between panicked items
      tickInterval: 0.22,       // Accelerated countdown tick speed (seconds)
      rushDuration: 0.7,        // Climax banner display duration
      transitionDuration: 0.4   // Exit dissolve speed
    }
  },

  // ==========================================
  // BEAT 06 — THE METRO JOURNEY
  // ==========================================
  scene06: {
    departureLabel: "SAHID KHUDIRAM",
    routeTag: "BLUE LINE // TRANSIT TO DESTINATION",
    arrivalLabel: "RABINDRASADAN",
    dialogues: [
      "7:45 AM // The morning metro...",
      "Rushing through the city, holding the gifts tight..."
    ],
    timing: {
      travelDuration: 3.8,      // Total metro travel sequence duration (seconds)
      thoughtDelay: 0.6,        // Delay before dialogue appears
      thoughtHold: 1.4          // Duration for passenger reflection dialogue
    }
  },

  // ==========================================
  // BEAT 07 — THE BROKEN KITKAT
  // ==========================================
  scene07: {
    impactTag: "8:15 AM // THE IMPACT",
    impactText: "BROKE",
    comedicClimax: "Sudhu etai hoar baki chilo 💔",
    panicThought: "Anwesha is going to kill me.",
    assets: {
      kitkat: "assets/gifts/kitkat.png"
    }, 
    timing: {
      heroHold: 0.7,            // Time chocolate floats in golden spotlight
      dropSpeed: 0.22,          // Speed of slip and drop animation
      crackReactionHold: 0.2,   // Pause before comedy text reveals
      jokeHold: 1.1,            // Deadpan comedic reading hold (seconds)
      transitionDuration: 0.45  // Fade out into Scene 08
    }
  },

  // ==========================================
  // BEAT 08 — GOING HOME (TRAVEL TRANSFORMATION)
  // ==========================================
  scene08: {
    stages: [
      { mode: "BUS", tag: "KOLKATA // CHAOTIC TRAFFIC", bg: "urban" },
      { mode: "AUTO", tag: "OUTSKIRTS // GREENERY BEGINS", bg: "outskirts" },
      { mode: "WALK", tag: "BARGACHIA // QUIET BREEZE", bg: "village" },
      { mode: "ARRIVAL", tag: "HOME 🏡 // JOURNEY ENDS", bg: "home" }
    ],
    dialogues: [
      "The world outside slowed down.",
      "Or maybe I just stopped noticing it."
    ],
    timing: {
      travelDuration: 4.8,      // Total multi-stage travel duration (seconds)
      autoTransitionTime: 1.8,  // Point at which Bus shifts to Auto-Rickshaw
      villageTransitionTime: 3.4,// Point at which village road is reached
      arrivalHold: 0.9          // Reading hold on HOME milestone
    }
  },

  // ==========================================
  // BEAT 09 — THE CEILING (EMOTIONAL TURNING POINT)
  // ==========================================
  scene09: {
    line1: "I messed up.",
    line2: "I'm sorry.",
    line3: "You were waiting but I was not there",
    line4: "I made this same mistake on another morning",
    timing: {
      line1Hold: 1.4,           // Hold for line 1
      line2Hold: 1.5,           // Hold for line 2
      line3Hold: 1.6,           // Hold for line 3
      turningPointHold: 2.2     // Hold for warm turning point resolution line
    }
  },

  // ==========================================
  // BEAT 10 — MEMORIES (RETROSPECTIVE)
  // ==========================================
  scene10: {
    memory1: {
      caption: "Chotokhuki 🧿",
      subtext: "Boddo taratari boro hoye geli.",
      image: "assets/portraits/anwesha_hero.png",
      fallback: "assets/portraits/anwesha1.png"
    },
    memory2: {
      caption: "The Chosen Sibling ❤️",
      subtext: "Not by blood. Just by one of those good turns life makes.",
      image: "assets/portraits/anwesha2.png",
      fallback: "assets/portraits/anwesha5.png"
    },
    memory3: {
      caption: "A Bond Across Any Distance ✨",
      subtext: "Some things don't depend on whether you showed up at 7:30.",
      image: "assets/portraits/anwesha11.png",
      fallback: "assets/portraits/anwesha12.png"
    },
    timing: {
      photo1Hold: 1.4,          // Reading hold for first memory
      photo2Hold: 1.5,          // Reading hold for second memory
      photo3Hold: 1.6,          // Reading hold for third memory + thread weaving
      threadDrawDuration: 1.3   // Sacred thread drawing speed
    }
  },

  // ==========================================
  // BEAT 11 — THE GIFTS (MILKYBAR + BELLAVITA)
  // ==========================================
  scene11: {
    marketTag: "MORNING BAZAAR // GIFT PROCUREMENT",
    marketShops: [
      { name: 'SWEET BAZAAR 🍬', awning: 'repeating-linear-gradient(90deg, #dc2626 0, #dc2626 12px, #ffffff 12px, #ffffff 24px)', color: '#7c2d12', signColor: '#fef08a' },
      { name: 'GIFT STATION 🎁', awning: 'repeating-linear-gradient(90deg, #fbbf24 0, #fbbf24 12px, #1e293b 12px, #1e293b 24px)', color: '#1e293b', signColor: '#fbbf24' },
      { name: 'BAKERY & CHAI ☕', awning: 'repeating-linear-gradient(90deg, #15803d 0, #15803d 12px, #fef08a 12px, #fef08a 24px)', color: '#78350f', signColor: '#ffffff' },
      { name: 'FLOWER CORNER 🌸', awning: 'repeating-linear-gradient(90deg, #f43f5e 0, #f43f5e 12px, #ffffff 12px, #ffffff 24px)', color: '#451a03', signColor: '#fecdd3' },
      { name: 'MILKY CHOCOLATES 🍫', awning: 'repeating-linear-gradient(90deg, #fbbf24 0, #fbbf24 12px, #2563eb 12px, #2563eb 24px)', color: '#172554', signColor: '#fef08a' },
      { name: 'PERFUMERY 💐', awning: 'repeating-linear-gradient(90deg, #0284c7 0, #0284c7 12px, #ffffff 12px, #ffffff 24px)', color: '#0f172a', signColor: '#bae6fd' }
    ],
    gift1: {
      title: "Milkybar",
      subtitle: "The Official White Chocolate Selection",
      reportTitle: "CASE FILE 04 // GIFT RESEARCH REPORT",
      classifiedTag: "CLASSIFIED",
      subtext: "\"Selecting this was not as simple as it should've been.\"",
      subject: "Subject: Anwesha 🧿",
      candidates: [
        "Silk ❌ (Too sweet)",
        "KitKat 🤔 (Approved by Monojit but was broken)",
        "Milkybar 🏆 (The only backup)"
      ],
      footerNote: "Assistant Researcher: Monojit (Second opinion was legally required 💀)"
    },
    gift2: {
      title: "Random Finds 🪻",
      subtitle: "Because one was never enough."
    },
    narratives: [
      "I still wanted to give these to you myself.",
      "So here they are."
    ],
    assets: {
      chocolate: "assets/gifts/milkybar.png",
      milkybar: "assets/gifts/milkybar.png",
      kitkat: "assets/gifts/kitkat.png",
      bellavita: "assets/gifts/bellavita.png"
    },
    timing: {
      parallaxDuration: 11,     // Full street parallax cycle duration (seconds)
      chocolateHeroHold: 2,     // Dedicated moment to appreciate Milkybar
      kitkatHeroHold: 2,        // Backward compatibility alias
      casefileReadHold: 3,      // Investigation board reading pause
      bellavitaHeroHold: 3      // Bellavita collection hero moment
    },
    layout: {
      giftLabelGap: "22px" // Equal vertical spacing between narrative line, gift image, and card
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
      narrative: "Amar relationship tao dekh er por 🙂",
      image: "assets/portraits/diganta1.png"
    },
    sisterCard: {
      badge: "THE SISTER",
      title: "Anwesha 🧿",
      threatLevel: "THREAT: HIGH 🍫",
      description: "Will demand chocolate. Probably judging this scene.",
      narrative: "Ebare amay return gift dis.",
      image: "assets/portraits/anwesha6.png",
      imageFallback: "assets/portraits/anwesha1.png"
    },
    monojitCard: {
      badge: "CATALYST OF RECORD",
      title: "Monojit",
      image: "assets/portraits/monojit1.png",
      description: "\"The mastermind behind all of it. Found the photos, approved the chocolate, and started this whole sister story.\"",
      footnote: "Credit dilam but o jeno jante na pare",
      narrative: "Biye tao kore ne ebar 🙂"
    },
    statusCard: {
      badge: "OFFICIAL SIBLING DOSSIER // EVALUATION",
      status: "Brother Status: PERMANENT 💀",
      reliabilityLabel: "Reliability",
      reliability: "Questionable 🤔",
      refundPolicyLabel: "Refund Policy",
      refundPolicy: "0% Available ❌",
      sisterCareLabel: "Sister Care",
      sisterCare: "100% Guaranteed ❤️",
      narrative: "Diagnosis confirmed. You're stuck with me forever."
    },
    doNotPress: {
      tag0: "⚠️ EMERGENCY LEVEL 0 // DO NOT TOUCH",
      tag1: "⚠️ WARNING LEVEL 1 // DISOBEDIENCE DETECTED",
      tag2: "🚨 WARNING LEVEL 2 // SIBLING RETALIATION IMMINENT",
      tag3: "🔥 EMERGENCY LEVEL 3 // CHAOS OVERLOAD",
      tag4: "✨ SIBLING CONTRACT RATIFIED",
      buttonText: "DO NOT PRESS ⚠️",
      finalBtnText: "DO NOT PRESS (FINAL WARNING 🚨)",
      stage0: "Kokhono to son amar kotha!!",
      stage1: "Bolar poreo korli",
      stage2: "Ki je, ektu kotha shunte parish na?! 😐",
      stage3: "Ebare ami ar kichu bolbo na",
      revealTitle: "✨ MAXIMUM SIBLING CHAOS UNLOCKED",
      revealBody: "Alright, you've completely destroyed the warning protocol. Now comes the quiet part.",
      proceedBtnText: "A quiet note for you →"
    },
    motifs: [
      { icon: "🧿", label: "Nojor na lage." },
      { icon: "🍫", label: "Ha, Milkybar ta kha ebare giye. 🙂" },
      { icon: "💻", label: "Free er web developer. 💀" },
      { icon: "🏆", label: "Achievement unlocked: Survived the sibling website!" }
    ],
    toasts: {
      climaxAchievement: {
        title: "Cannot Follow Instructions 🚨",
        description: "Max sibling chaos unlocked!",
        icon: "🚨"
      },
      secretTitle: "Secret Discovered"
    },
    timing: {
      cardHold: 1.3,            // Reading hold for each sequential character dossier
      cardTransitionDuration: 0.4 // Transition speed between character cards
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
    closingJoke: "Ar tui hoyto bujhteo parbina exact koto ta effort ar time geche eta ke banate. But okay, just appreciation tao amar jonne enough 💝. Btw toke ami pore kokhono kitkat khaiye debo 🙂",
    keepButton: "KEEP THIS MESSAGE 🧿",
    keepSuccess: "Saved forever in memory 🧿",
    signature: {
      prefix: "With care,",
      author: "Diganta 🧿"
    },
    nextBtnText: "The Sacred Thread",
    nextBtnArrow: "→ 🧿",
    toast: {
      title: "Memory Saved",
      description: "Saved forever in memory 🧿",
      icon: "🧿"
    },
    timing: {
      paperEnterDelay: 0.2,     // Delay before paper unrolls
      paragraphCadence: 0.6,    // Interval between progressive thought reveals (seconds)
      signatureDelay: 0.5,      // Delay after paragraphs before signature appears
      threadUnspoolDuration: 1.5 // Duration for corner thread to draw
    }
  },

  // ==========================================
  // BEAT 14 — THE THREAD (COSMIC CONNECTION)
  // ==========================================
  scene14: {
    fragments: ["4:30 AM", "5:30 AM", "7:30 AM", "MISSED CALL", "METRO", "BROKEN KITKAT"],
    digantaNode: "Diganta",
    anweshaNode: "Anwesha",
    assets: {
      digantaPortrait: "assets/portraits/diganta1.png",
      anweshaPortrait: "assets/portraits/anwesha_hero.png",
      anweshaFallback: "assets/portraits/anwesha12.png"
    },
    timing: {
      fragmentStagger: 0.1,     // Stagger between memory fragment badges
      fragmentHold: 1.5,        // Reading hold for fragments
      threadDrawDuration: 1.8,  // Duration of cosmic thread drawing between nodes
      threadHold: 2.0           // Hold after connection is established
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
      thought1Hold: 0.9,
      thought2Hold: 1.1,
      thought3Hold: 0.9,
      thought4Hold: 0.9,
      thought5Hold: 0.8,
      finalThoughtHold: 1.6
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
    assets: {
      portraitBadge: "assets/portraits/anwesha12.png"
    },
    toast: {
      title: "Surprise Complete 🎉",
      description: "Happy Rakhi, Anwesha! 🧿❤️",
      icon: "🎉"
    },
    timing: {
      line1Hold: 1.2,           // Reading hold for "RAKHI TIED. FOREVER."
      line2Hold: 1.2,           // Reading hold for "FESTIVE BLESSINGS..."
      greetingHold: 1.8,        // Reading hold for emotional centerpiece name
      apologyHold: 1.4,         // Reading hold for apology callback
      signatureHold: 1.5,       // Reading hold for handwritten signature
      celebrationHold: 1.0      // Particle burst and light bloom duration
    }
  },

  // ==========================================
  // BEAT 17 — POST-CREDITS (EPILOGUE)
  // ==========================================
  scene17: {
    tag: "EPILOGUE // POST-CREDITS",
    title: "And that's the whole story. 🧿",
    easterEgg: "Psst... Go eat the Milkybar before it melts. 🍫😭",
    replayBtn: "Replay the Journey ↻",
    restartBtn: "Start from 4:30 AM",
    replayModal: {
      title: "Replay the Journey? ↻",
      question: "Are you sure? Back to 4:30 AM.",
      confirm: "YES, REPLAY →",
      cancel: "NO, LET ME EAT THE MILKYBAR 🍫"
    },
    assets: {
      kitkat: "assets/gifts/kitkat.png"
    }, 
    timing: { 
      kitkatEnterDuration: 1.0, // Broken kitkat fade in duration
      crumbDelay: 0.9,          // Timing of deadpan crumb fall
      cardEnterDelay: 1.4       // Timing of card appearance
    }
  }
};
