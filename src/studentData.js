// src/studentData.js
// ============================================================================
// SPIKEARC SCHOLAR • CONSOLIDATED MASTER DATA ENGINE (OCT 2026)
// ============================================================================

export const IS_FIRST_100_LAUNCH_OFFER = true;
export const SPIKE_LAB_VIDEO_EMBED_URL = "";

export const FX_BENCHMARKS_2026 = {
  dateLabel: "Oct 2026 • LRS Bank TT Selling + TCS Benchmark",
  USD: 96.0,
  GBP: 124.0,
  EUR: 104.0,
  SGD: 72.0,
  INR: 1.0,
};

export const GRADE_CONFIG = {
  7: {
    grade: "7",
    label: "Grade 7 (Age 12–13)",
    startYear: 2032,
    yearsToCollege: 6,
    stageTitle: "Grade 7: Home & Classroom Explorer",
    projectWeeks: "4-Week Starter Mini-Project",
    sampleSizeNum: 15,
    sampleTarget: "15 classmates",
    wordTarget: "4-Slide Visual Chart / Practical Record",
    toolStack: "Simple Google Sheet Table + Canva Visual Chart",
    deliverablePrefix: "Grade 7 Starter Build (15-Sample Test): ",
  },
  8: {
    grade: "8",
    label: "Grade 8 (Age 13–14)",
    startYear: 2031,
    yearsToCollege: 5,
    stageTitle: "Grade 8: Neighbourhood & Skill Builder",
    projectWeeks: "4-Week Skill Builder Sprint",
    sampleSizeNum: 25,
    sampleTarget: "25 neighbours",
    wordTarget: "6-Slide Data & Working Model Deck",
    toolStack: "Google Sheets Formulas + Canva / Mockup",
    deliverablePrefix: "Grade 8 Skill Builder (25-Sample Test): ",
  },
  9: {
    grade: "9",
    label: "Grade 9 (Age 14–15)",
    startYear: 2030,
    yearsToCollege: 4,
    stageTitle: "Grade 9: National Fair & Prototype Spike",
    projectWeeks: "4-Week Competition Prototype",
    sampleSizeNum: 35,
    sampleTarget: "35 people in 2 groups",
    wordTarget: "5-Part Competition Report + Working Calculator",
    toolStack: "Sheets Analytics + Working Calculator",
    deliverablePrefix: "Grade 9 Competition Spike (35-User Pilot): ",
  },
  10: {
    grade: "10",
    label: "Grade 10 (Age 15–16)",
    startYear: 2029,
    yearsToCollege: 3,
    stageTitle: "Grade 10: Holistic Admissions Flagship",
    projectWeeks: "4-Week Flagship Admissions Asset",
    sampleSizeNum: 50,
    sampleTarget: "50 students",
    wordTarget: "1,200-Word Case Study + 90-Sec Defense Pitch",
    toolStack: "Full Data Model + Case Study + Interview Deck",
    deliverablePrefix: "Grade 10 Admissions Flagship (50-User Trial): ",
  },
};

export const BOARD_CONFIG = {
  CBSE: {
    code: "CBSE",
    name: "CBSE",
    isIndianTrack: true,
    langNote: "Simple English + optional Hindi/Regional survey questions.",
    boardComp: {
      name: "CBSE National Science Exhibition & ATL Tinkerfest",
      window: "Oct – Jan",
      fit: "Official CBSE 20% Internal Assessment & Atal Tinkering Lab Showcase",
    },
  },
  ICSE: {
    code: "ICSE",
    name: "ICSE / ISC",
    isIndianTrack: true,
    langNote: "Structured descriptive English + CISCE practical tables.",
    boardComp: {
      name: "CISCE National Science, Innovation & SUPW Showcase",
      window: "Sep – Dec",
      fit: "Official ICSE 20% Internal Practical & SUPW Portfolio Credit",
    },
  },
  STATE: {
    code: "STATE",
    name: "State board",
    isIndianTrack: true,
    langNote: "Zero-jargon English + Bilingual regional survey templates.",
    boardComp: {
      name: "INSPIRE Awards MANAK & National Children's Science Congress",
      window: "Aug – Dec",
      fit: "Official State Practical Record & Government Innovation Track",
    },
  },
  IB: {
    code: "IB",
    name: "IB",
    isIndianTrack: false,
    langNote:
      "IB Inquiry framing (Global Context, Inquiry Question & Criteria A–D).",
    boardComp: {
      name: "IB Global Youth Action Fund & MYP Personal Project Showcase",
      window: "Nov – Mar",
      fit: "Maps to IB MYP Service as Action (SAA) & Year 5 Personal Project",
    },
  },
  IGCSE: {
    code: "IGCSE",
    name: "IGCSE",
    isIndianTrack: false,
    langNote:
      "Cambridge Global Perspectives framing (Issue, Evidence & Action).",
    boardComp: {
      name: "Cambridge Upper Secondary Science & Global Perspectives Showcase",
      window: "Oct – Feb",
      fit: "Supports IGCSE Global Perspectives Coursework & A-Level IPQ Prep",
    },
  },
};

export function getBoardDifficultyCalibration(boardCode, gradeStr) {
  const gNum = parseInt(gradeStr, 10) || 8;
  const bCfg = BOARD_CONFIG[boardCode] || BOARD_CONFIG.CBSE;
  const isJunior = gNum <= 8;
  const formatMap = {
    STATE: isJunior
      ? "Tally, sheet & 4-slide chart"
      : "1,200-word case study + 90-second pitch",
    CBSE: isJunior
      ? "Survey in 2 languages + working model"
      : "1,200-word case study + 90-second pitch",
    ICSE: isJunior
      ? "Survey in 2 languages + SUPW model"
      : "1,200-word case study + 90-second pitch",
    IB:
      gNum === 7
        ? "Service as Action mini-journal"
        : gNum === 8
        ? "Inquiry question + data table + 6-slide reflection"
        : gNum === 9
        ? "Global Perspectives report + prototype"
        : "Personal Project, criteria A to D",
    IGCSE:
      gNum === 7
        ? "Service mini-journal"
        : gNum === 8
        ? "Inquiry question + data table + 6-slide reflection"
        : gNum === 9
        ? "Global Perspectives report + prototype"
        : "Personal Project, criteria A to D",
  };
  return {
    badge: bCfg.code + " · Grade " + gNum,
    formatName: formatMap[boardCode] || formatMap.CBSE,
    rubricFocus: "4 weeks · 20 min a weekend",
    langBadge: bCfg.langNote,
  };
}

export const GRADE_PROGRESSION_THEMES = {
  COMP: {
    7: {
      indTitle: "Homework-time tracker",
      gloTitle: "Paper-waste tracker",
      beforeLabel: "Hours / Sheets Before",
      afterLabel: "Hours / Sheets After",
      whatItIs:
        "Find out how long classmates spend on homework (or paper waste), and test one small action.",
      whyAdmissionsLoveIt: "Turns daily habits into clean numbers and charts.",
    },
    8: {
      indTitle: "Lift-wait tracker",
      gloTitle: "Lift-wait tracker",
      beforeLabel: "Morning min",
      afterLabel: "Evening min",
      whatItIs:
        "Find out when neighbours wait longest for the lift, then show a fix.",
      whyAdmissionsLoveIt: "Proves you can measure and fix a real bottleneck.",
    },
    9: {
      indTitle: "Leave-on-time calculator",
      gloTitle: "Leave-on-time calculator",
      beforeLabel: "Before (mins early/late)",
      afterLabel: "After (mins early/late)",
      whatItIs:
        "Test whether a simple calculator helps 35 people in 2 groups arrive on time.",
      whyAdmissionsLoveIt: "Controlled Group A vs Group B fair test.",
    },
    10: {
      indTitle: "Canteen queue case study",
      gloTitle: "Canteen queue project",
      beforeLabel: "Wait min (Day 1)",
      afterLabel: "Wait min (Day 2)",
      whatItIs:
        "Study one school service with 50 students and recommend a change.",
      whyAdmissionsLoveIt:
        "Built for pitches to Ashoka, Plaksha, IIIT-H, and global admissions.",
    },
  },
  BIO: {
    7: {
      indTitle: "Snack hidden-sugar tally",
      gloTitle: "Nutrition label mini-journal",
      beforeLabel: "Packaged Sugar (g)",
      afterLabel: "Swap Sugar (g)",
      whatItIs:
        "Check hidden sugar across 15 kitchen snacks and test one healthy swap.",
      whyAdmissionsLoveIt: "Practical nutrition and data literacy.",
    },
    8: {
      indTitle: "Apartment RO water tracker",
      gloTitle: "Greywater reuse inquiry",
      beforeLabel: "Water Wasted (L)",
      afterLabel: "Water Saved (L)",
      whatItIs:
        "Measure daily RO reject water across 25 flats and test a plant reuse fix.",
      whyAdmissionsLoveIt: "Hands-on environmental conservation.",
    },
    9: {
      indTitle: "Athlete hydration calculator",
      gloTitle: "Hydration Global Perspectives report",
      beforeLabel: "Fatigue Group B",
      afterLabel: "Fatigue Group A",
      whatItIs:
        "Test an electrolyte calculator across 35 school athletes in 2 groups.",
      whyAdmissionsLoveIt: "Combines biology with a working calculator.",
    },
    10: {
      indTitle: "Lunch slump vs. recall case study",
      gloTitle: "Glycemic load Personal Project",
      beforeLabel: "High-Carb Recall",
      afterLabel: "Protein Swap Recall",
      whatItIs:
        "Study afternoon focus across 50 students and pitch a lunchbox change.",
      whyAdmissionsLoveIt: "Flagship biosciences case study.",
    },
  },
  BIZ: {
    7: {
      indTitle: "Quick-app vs. kirana price tally",
      gloTitle: "Retail unit-price mini-journal",
      beforeLabel: "App Bill (₹)",
      afterLabel: "Kirana Bill (₹)",
      whatItIs: "Compare 15 everyday items on delivery apps vs. local shops.",
      whyAdmissionsLoveIt: "Teaches unit economics early.",
    },
    8: {
      indTitle: "Fest stall bundle profit tracker",
      gloTitle: "Price-bundle inquiry study",
      beforeLabel: "Solo Profit (₹)",
      afterLabel: "Combo Profit (₹)",
      whatItIs: "Test single pricing vs. a ₹50 combo across 25 orders.",
      whyAdmissionsLoveIt: "Real revenue and margin tracking.",
    },
    9: {
      indTitle: "Bakery 8 PM discount calculator",
      gloTitle: "Perishable pricing GP report",
      beforeLabel: "Spoilage Loss Before",
      afterLabel: "Loss After Bundle",
      whatItIs: "Test an evening discount calculator across 35 orders/days.",
      whyAdmissionsLoveIt: "Street-level commercial math.",
    },
    10: {
      indTitle: "UPI vs. cash spend case study",
      gloTitle: "Digital payment Personal Project",
      beforeLabel: "UPI Spend (₹)",
      afterLabel: "24-Hr Rule Spend (₹)",
      whatItIs:
        "Study impulse spending with 50 students and pitch a budget rule.",
      whyAdmissionsLoveIt: "Behavioural economics flagship study.",
    },
  },
  LAW: {
    7: {
      indTitle: "Sports-ground fair rules tally",
      gloTitle: "Fair-play rules mini-journal",
      beforeLabel: "Old Rule Score",
      afterLabel: "New Charter Score",
      whatItIs:
        "Survey 15 classmates on playground rules and draft a fair charter.",
      whyAdmissionsLoveIt: "Builds early policy and mediation skills.",
    },
    8: {
      indTitle: "RWA play-hour compromise rule",
      gloTitle: "Community space inquiry",
      beforeLabel: "Agreement Before",
      afterLabel: "Agreement After",
      whatItIs: "Survey 25 neighbours and draft a fair RWA time-zone rule.",
      whyAdmissionsLoveIt: "Real-world stakeholder mediation.",
    },
    9: {
      indTitle: "App-privacy checklist test",
      gloTitle: "Digital consent GP report",
      beforeLabel: "Risky Apps Before",
      afterLabel: "Risky Apps After",
      whatItIs: "Test a 1-page privacy checklist with 35 students in 2 groups.",
      whyAdmissionsLoveIt: "Connects tech law with student safety.",
    },
    10: {
      indTitle: "School-gate traffic case study",
      gloTitle: "Transit safety Personal Project",
      beforeLabel: "Gate Wait Before",
      afterLabel: "Wait With 100m Rule",
      whatItIs:
        "Survey 50 commuters on morning drop-offs and pitch a safety policy.",
      whyAdmissionsLoveIt: "Flagship public policy brief.",
    },
  },
  DESIGN: {
    7: {
      indTitle: "School noticeboard redesign",
      gloTitle: "Visual hierarchy mini-journal",
      beforeLabel: "Old Sign Secs",
      afterLabel: "New Sign Secs",
      whatItIs:
        "Redesign 3 confusing notices and time 15 classmates reading them.",
      whyAdmissionsLoveIt: "Proves design improves clarity.",
    },
    8: {
      indTitle: "Classroom glare & desk map",
      gloTitle: "Spatial ergonomics inquiry",
      beforeLabel: "Glare Score Before",
      afterLabel: "Score After Map",
      whatItIs: "Map board glare across 25 desks and test a seating fix.",
      whyAdmissionsLoveIt: "Foundation for Architecture and UX.",
    },
    9: {
      indTitle: "Bilingual clinic sign test",
      gloTitle: "Inclusive wayfinding GP report",
      beforeLabel: "English Sign Secs",
      afterLabel: "Bilingual Icon Secs",
      whatItIs: "Test bilingual icon signs across 35 people in 2 groups.",
      whyAdmissionsLoveIt: "Human-centered design portfolio piece.",
    },
    10: {
      indTitle: "Artisan packaging case study",
      gloTitle: "Packaging UX Personal Project",
      beforeLabel: "Old Pack Price (₹)",
      afterLabel: "New Label Price (₹)",
      whatItIs:
        "Redesign a local maker's label and test price perception with 50 buyers.",
      whyAdmissionsLoveIt: "Combines design with commercial value.",
    },
  },
  PSYCH: {
    7: {
      indTitle: "Screen break vs. memory tally",
      gloTitle: "Sleep & memory mini-journal",
      beforeLabel: "Late Screen Recall",
      afterLabel: "Screen-Free Recall",
      whatItIs:
        "Test 15 classmates on morning word recall after a 30-min screen break.",
      whyAdmissionsLoveIt: "Links sleep habits to memory.",
    },
    8: {
      indTitle: "Reels scroll vs. reading quiz",
      gloTitle: "Attention residue inquiry",
      beforeLabel: "After Reels Score",
      afterLabel: "After Walk Score",
      whatItIs:
        "Compare reading scores across 25 peers after Reels vs. a quiet break.",
      whyAdmissionsLoveIt: "Measures focus using real data.",
    },
    9: {
      indTitle: "Pre-test breathing calculator",
      gloTitle: "Test-calm GP report",
      beforeLabel: "Errors Group B",
      afterLabel: "Errors Group A",
      whatItIs:
        "Test a 3-min breathing + unit check routine across 35 students.",
      whyAdmissionsLoveIt: "Practical performance psychology.",
    },
    10: {
      indTitle: "Athlete sleep vs. accuracy study",
      gloTitle: "Circadian recovery Personal Project",
      beforeLabel: "Accuracy <6.5h",
      afterLabel: "Accuracy 7.5h+",
      whatItIs: "Study sleep and sports accuracy across 50 student athletes.",
      whyAdmissionsLoveIt: "Flagship sports science study.",
    },
  },
};

export const HOBBY_REMIX_OPTIONS = [
  { id: "MUSIC", label: "🎵 Music", tag: "Audio & Media" },
  { id: "CRICKET", label: "🏏 Cricket", tag: "Sports Analytics" },
  { id: "GAMING", label: "🎮 Gaming", tag: "Game Systems" },
  { id: "FOOD", label: "🍕 Food", tag: "Food Science" },
  { id: "ANIMALS", label: "🐶 Animals", tag: "Animal Welfare" },
  { id: "CARS", label: "🏎️ Cars & EVs", tag: "Mobility & Aero" },
];

export const HOBBY_GRADE_PROGRESSION = {
  MUSIC: {
    7: {
      title: "Fast Lyrics vs. Lo-Fi Beats: Homework Speed Tally",
      whatItIs: "Test 15 classmates under 2 audio conditions.",
      beforeLabel: "Fast Lyrics Score",
      afterLabel: "Slow Lo-Fi Score",
    },
    8: {
      title: "Classroom Decibel (dB) Noise-Fatigue Tracker",
      whatItIs: "Map noise across 25 spots and test reading recall.",
      beforeLabel: "High-Noise Recall",
      afterLabel: "Quiet Zone Recall",
    },
    9: {
      title: "3-Sec Hook vs. Slow Intro: Educational Reel Test",
      whatItIs: "Test 35 peers in 2 groups on video retention.",
      beforeLabel: "Plain Intro Score",
      afterLabel: "3-Sec Hook Score",
    },
    10: {
      title: "AI Voice-Cloning & Student Creator Fair-Use Study",
      whatItIs: "Survey 50 students and pitch a school media charter.",
      beforeLabel: "Before Charter",
      afterLabel: "After Charter",
    },
  },
  CRICKET: {
    7: {
      title: "Dot-Ball Pressure vs. Wicket Loss Tally",
      whatItIs: "Log 15 overs to spot risk patterns after dot balls.",
      beforeLabel: "Lofted Shot",
      afterLabel: "Strike Rotation",
    },
    8: {
      title: "Turf Heat & ORS Hydration vs. Bowling Accuracy",
      whatItIs: "Track 25 athletes comparing water vs. ORS.",
      beforeLabel: "Plain Water",
      afterLabel: "ORS Schedule",
    },
    9: {
      title: "Tournament Moneyball Player Value Calculator",
      whatItIs: "Model 35 players using Runs/Wickets per point.",
      beforeLabel: "Star Team ROI",
      afterLabel: "Moneyball ROI",
    },
    10: {
      title: "5-Sec Breathing Routine vs. Wide-Ball Rate Study",
      whatItIs: "Test 50 deliveries under match pressure.",
      beforeLabel: "Before Routine",
      afterLabel: "With 5-Sec Breath",
    },
  },
  GAMING: {
    7: {
      title: "Chaotic Chat vs. 3-Role Callouts in Co-Op Games",
      whatItIs: "Test 15 rounds comparing team callout rules.",
      beforeLabel: "Chaotic Chat",
      afterLabel: "Role Callouts",
    },
    8: {
      title: "In-Game Skin Pricing & Pocket-Money Regret Tracker",
      whatItIs: "Survey 25 gamers and test a Rupee conversion chart.",
      beforeLabel: "Impulse Before",
      afterLabel: "After ₹ Chart",
    },
    9: {
      title: "High-Contrast Game HUD Accessibility Calculator",
      whatItIs: "Time 35 players in 2 groups spotting UI alerts.",
      beforeLabel: "Old Cluttered UI",
      afterLabel: "High-Contrast UI",
    },
    10: {
      title: "Late-Night Gaming Fatigue vs. Reaction Speed Study",
      whatItIs: "Analyze 50 match logs before and after 10-min breaks.",
      beforeLabel: "Tired Play",
      afterLabel: "Rested Play",
    },
  },
  FOOD: {
    7: {
      title: "Blind Taste & Cost Tally: Homemade vs. Store Snack",
      whatItIs: "Test 15 family members on taste and unit cost.",
      beforeLabel: "Store Snack",
      afterLabel: "Homemade Swap",
    },
    8: {
      title: "Fest Food Stall: Solo Price vs. Combo Profit Tracker",
      whatItIs: "Track 25 orders comparing solo vs. combo profit.",
      beforeLabel: "Solo Profit",
      afterLabel: "Combo Profit",
    },
    9: {
      title: "Fermentation Temp vs. Batter Rise Calculator",
      whatItIs: "Test 35 mini-batches across room temperatures.",
      beforeLabel: "Uncontrolled",
      afterLabel: "Optimized Temp",
    },
    10: {
      title: "Zero-Plastic Food Packaging & Price-Lift Study",
      whatItIs: "Test eco-packaging across 50 buyers.",
      beforeLabel: "Old Pack (₹)",
      afterLabel: "New Pack (₹)",
    },
  },
  ANIMALS: {
    7: {
      title: "Summer Shade Water-Bowl Refill Tally",
      whatItIs: "Track 15 water bowls for community birds/dogs.",
      beforeLabel: "Unshaded Bowl",
      afterLabel: "Shaded Zone",
    },
    8: {
      title: "Reflective Night Collars & Street Visibility Tracker",
      whatItIs: "Survey 25 drivers on evening street visibility.",
      beforeLabel: "No Collar",
      afterLabel: "Reflective Collar",
    },
    9: {
      title: "RWA Designated Stray-Feeding Zone Calculator",
      whatItIs: "Survey 35 residents and map safe feeding zones.",
      beforeLabel: "Conflict Before",
      afterLabel: "Harmony After",
    },
    10: {
      title: "Digital Vaccination & Adoption Ledger for 50 Animals",
      whatItIs: "Track health records for 50 community animals.",
      beforeLabel: "Untracked",
      afterLabel: "Verified Ledger",
    },
  },
  CARS: {
    7: {
      title: "School Drop-Off Car Idling Fuel Wastage Tally",
      whatItIs: "Time 15 cars in queue and calculate fuel wasted.",
      beforeLabel: "Idling On (₹)",
      afterLabel: "Engine Off (₹)",
    },
    8: {
      title: "EV Scooter vs. Petrol 2-Wheeler Break-Even Tracker",
      whatItIs: "Survey 25 daily commutes and model break-even km.",
      beforeLabel: "Petrol Cost",
      afterLabel: "EV Cost",
    },
    9: {
      title: "Apartment Overnight EV Charging Slot Calculator",
      whatItIs: "Test a slot schedule across 35 EV owners.",
      beforeLabel: "Peak Queue",
      afterLabel: "Staggered Slot",
    },
    10: {
      title: "Tyre PSI Pressure & Speed vs. Real Mileage Study",
      whatItIs: "Analyze 50 trip logs before and after PSI checks.",
      beforeLabel: "Low PSI Range",
      afterLabel: "Optimal PSI Range",
    },
  },
};

export function getGradeAndBoardProject(
  streamId,
  annualSlotId,
  gradeStr,
  boardCode,
  hobbyId
) {
  const gCfg = GRADE_CONFIG[gradeStr] || GRADE_CONFIG["8"];
  const bCfg = BOARD_CONFIG[boardCode] || BOARD_CONFIG.CBSE;
  const calib = getBoardDifficultyCalibration(boardCode, gradeStr);
  const nSize = gCfg.sampleSizeNum || 25;

  if (annualSlotId === 3 || hobbyId) {
    const hKey = hobbyId || "MUSIC";
    const hObj =
      HOBBY_REMIX_OPTIONS.find((h) => h.id === hKey) || HOBBY_REMIX_OPTIONS[0];
    const hProg =
      (HOBBY_GRADE_PROGRESSION[hKey] &&
        HOBBY_GRADE_PROGRESSION[hKey][gradeStr]) ||
      HOBBY_GRADE_PROGRESSION.MUSIC["8"];
    return {
      archetype: "Slot 3 · Hobby Remix (" + hObj.label + ")",
      title: hProg.title,
      whatItIs: hProg.whatItIs,
      whyAdmissionsLoveIt:
        "Combines personal interest in " + hObj.tag + " with real data.",
      baseOutput: gCfg.deliverablePrefix + calib.formatName,
      calibBadge: calib.badge,
      formatName: calib.formatName,
      langNote: calib.langBadge,
      surveyQuestions: [
        "1. Person / Sample (#1 to #" + nSize + ")",
        "2. Condition tested (" + hObj.tag + ")",
        "3. Before: " + hProg.beforeLabel,
        "4. After: " + hProg.afterLabel,
        "5. Would you use this rule? (Yes / Maybe / No)",
      ],
      sheetColumns: [
        "Col A: Person",
        "Col B: Group",
        "Col C: " + hProg.beforeLabel,
        "Col D: " + hProg.afterLabel,
        "Col E: Change (=D2-C2)",
      ],
      sheetFormula:
        "=AVERAGE(D2:D" + (nSize + 1) + ") - AVERAGE(C2:C" + (nSize + 1) + ")",
      slideOutline: [
        "Slide 1: The question",
        "Slide 2: What I did: " + nSize + " people",
        "Slide 3: My chart and sentence",
        "Slide 4: What I would change next",
      ],
      interviewQ: "Why did you ask " + nSize + " people?",
    };
  }

  const prog =
    (GRADE_PROGRESSION_THEMES[streamId] &&
      GRADE_PROGRESSION_THEMES[streamId][gradeStr]) ||
    GRADE_PROGRESSION_THEMES.COMP["8"];
  const resolvedTitle = bCfg.isIndianTrack ? prog.indTitle : prog.gloTitle;

  const gradeQuestionsMap = {
    7: [
      "1. Homework last night? (Under 1 hr / 1 to 2 / 2 to 3 / Over 3)",
      "2. When do you start? (After school / After snacks / Evening / Night)",
      "3. Where do you work? (Desk / Bed / Dining table / Other)",
      "4. What takes longest? (Maths / Science / Languages / Social)",
      "5. Do you finish on time? (Always / Mostly / Sometimes / Rarely)",
    ],
    8: [
      "1. Which floor do you live on? (Ground to 3 / 4 to 7 / 8 or above)",
      "2. How long do you wait for the lift in the morning? (Under 1 min / 1 to 2 / 2 to 4 / Over 4)",
      "3. And in the evening? (Under 1 min / 1 to 2 / 2 to 4 / Over 4)",
      "4. When is the wait worst? (7 to 9 am / 9 am to 1 pm / 1 to 5 pm / 5 to 9 pm)",
      "5. Do you take the stairs when the lift is slow? (Never / Sometimes / Often)",
    ],
    9: [
      "1. User (#1 to #35) & Group (Group A Calculator vs Group B Control)",
      "2. Arrival time (B1) and trip distance in km (B2)",
      "3. Speed in km/h (B3) and buffer in minutes (B4)",
      "4. Minutes early (+) or late (-) across 5 days BEFORE",
      "5. Minutes early (+) or late (-) across 5 days AFTER",
    ],
    10: [
      "1. Class (10 students from each of 5 classes = 50 total)",
      "2. Waiting minutes at break (on 2 different days)",
      "3. Items bought",
      "4. Happiness from 1 to 5",
      "5. Suggested fix (Token system / Fast lane)",
    ],
  };

  return {
    archetype:
      annualSlotId === 2
        ? "Slot 2 · Backup Stream Trial"
        : "Slot 1 · Primary Stream Project",
    title: resolvedTitle,
    whatItIs: prog.whatItIs,
    whyAdmissionsLoveIt: prog.whyAdmissionsLoveIt,
    baseOutput: gCfg.deliverablePrefix + calib.formatName,
    calibBadge: calib.badge,
    formatName: calib.formatName,
    langNote: calib.langBadge,
    surveyQuestions: gradeQuestionsMap[gradeStr] || gradeQuestionsMap["8"],
    sheetColumns: [
      "Floor / Person",
      prog.beforeLabel,
      prog.afterLabel,
      "Worst time / Group",
      "Stairs / Action",
    ],
    sheetFormula:
      gradeStr === "9"
        ? "=B1-(B2/B3*60+B4)/1440"
        : gradeStr === "10"
        ? '=AVERAGE(B2:B51) | =MEDIAN(B2:B51) | =COUNTIF(B2:B51,">10")/COUNT(B2:B51)'
        : '=AVERAGE(B2:B26) | =COUNTIF(D2:D26,"7-9am")',
    slideOutline:
      !bCfg.isIndianTrack && gradeStr === "8"
        ? [
            "1. My inquiry question",
            "2. My method",
            "3. Table 1",
            "4. My chart and findings",
            "5. My model",
            "6. What I learned and would change",
          ]
        : [
            "Slide 1: The question",
            "Slide 2: What I did: " + nSize + " people, 5 questions",
            "Slide 3: What I found: chart and one sentence",
            "Slide 4: What I would change next",
          ],
    interviewQ: "Why did you ask " + nSize + " people?",
  };
}

export function getFilteredCompetitions(streamId, boardCode, gradeStr) {
  const bCfg = BOARD_CONFIG[boardCode] || BOARD_CONFIG.CBSE;
  return [
    bCfg.boardComp,
    {
      name: "Maths and science / stream olympiad",
      window: "Nov – Jan",
      fit: "Builds problem-solving. Needs weekly practice.",
    },
    {
      name: "National innovation fair (IRIS / Eureka)",
      window: "Aug – Nov",
      fit: "Show your project to judges and other students.",
    },
  ];
}

export const SIX_STREAMS = {
  COMP: {
    id: "COMP",
    title: "Computational, AI and Engineering Systems",
    shortName: "Computing and AI",
    subjectByBoard: {
      CBSE: {
        keepOpen:
          "Take now (Grades 9–10): Standard Mathematics in Grade 10, not Basic + Science + Computing. Keep (Grades 11–12): Mathematics (041), not Applied Mathematics (241) + Physics and Chemistry + Computer Science.",
        closesWarning:
          "A student who takes Basic Mathematics in Grade 10 cannot take Mathematics (041) in Grades 11 and 12. Choose Standard Mathematics in Grade 10 to keep engineering open.",
      },
      ICSE: {
        keepOpen:
          "Take now (Grades 9–10 ICSE): Mathematics, Physics and Chemistry + Computer Applications (Group III). Keep (Grades 11–12 ISC): Mathematics, Physics, Chemistry + Computer Science.",
        closesWarning:
          "Dropping Maths in Grades 11 and 12 closes BITS Pilani, VIT, Shiv Nadar, Christ and Ahmedabad University for Computing.",
      },
      STATE: {
        keepOpen:
          "Take now (Grades 9–10): Mathematics and Science at the highest level. Keep (Grades 11–12): Physics, Chemistry and Mathematics + Computer Science or IT.",
        closesWarning:
          "Subject names and rules differ by state. Maths in Grades 11 and 12 is what the colleges ask for.",
      },
      IB: {
        keepOpen:
          "Take now (Grades 9–10 MYP): Mathematics at the most advanced level + Sciences + Design. Keep (Grades 11–12 Diploma): Mathematics: Analysis and Approaches (AA) at Higher Level + Physics + Computer Science.",
        closesWarning:
          "Southampton Delhi asks for Higher Level Maths: a 6 in AA, or a 7 in AI. Standard Level Maths does not meet this.",
      },
      IGCSE: {
        keepOpen:
          "Take now (Grades 9–10 IGCSE): Mathematics, Physics and Chemistry + Computer Science. Keep (Grades 11–12 A-levels): A-level Mathematics + A-level Physics + Chemistry or Computer Science.",
        closesWarning:
          "Southampton Delhi asks for A*AA at A-level, with an A in Mathematics. Dropping A-level Maths closes it.",
      },
    },
    sevenDayChallenge: {
      title: "7-day home trial",
      step1Title: "DAYS 1 AND 2 · TODAY — Pick one daily delay",
      step1:
        "Choose one thing your child sees every day that makes people wait. For example, the school bus, the lift, or Wi-Fi speed.",
      step2Title: "DAYS 3 TO 5 — Time it 10 times",
      step2:
        "Use a phone stopwatch. Write the time of day, the minutes taken and the main cause.",
      step3Title: "DAYS 6 AND 7 — Find the average, write one rule",
      step3:
        "Work out the average wait, then write one simple rule that would cut it in half.",
    },
  },
  BIO: {
    id: "BIO",
    title: "Bio-sciences, HealthTech and sustainability",
    shortName: "Bio-sciences and HealthTech",
    subjectByBoard: {
      CBSE: {
        keepOpen:
          "Take now: Standard Mathematics + Science. Keep (Grades 11–12): Physics, Chemistry, Biology + Mathematics (041).",
        closesWarning:
          "Taking PCB without Maths in Grade 11 closes Plaksha Bio-Systems, IISER computational tracks, and Bio-Engineering.",
      },
      ICSE: {
        keepOpen:
          "Take now (ICSE): Mathematics, Physics, Chemistry, Biology. Keep (ISC): Physics, Chemistry, Biology + Mathematics.",
        closesWarning:
          "Dropping ISC Mathematics in Grade 11 closes quantitative biotechnology routes.",
      },
      STATE: {
        keepOpen:
          "Take now: Mathematics and Science. Keep (Grades 11–12): Bio-Maths Group (Physics, Chemistry, Biology, Mathematics).",
        closesWarning:
          "Pure Science without Mathematics closes B.Tech Bio-Engineering programs.",
      },
      IB: {
        keepOpen:
          "Take now (MYP): Mathematics + Sciences. Keep (Diploma): Biology HL + Chemistry HL + Mathematics AA SL/HL.",
        closesWarning:
          "Top global life-science programs require two sciences plus IB Mathematics.",
      },
      IGCSE: {
        keepOpen:
          "Take now (IGCSE): Biology, Chemistry, Physics, Mathematics. Keep (A-levels): Biology + Chemistry + Mathematics.",
        closesWarning:
          "Dropping A-level Chemistry or Mathematics closes biomedical engineering routes.",
      },
    },
    sevenDayChallenge: {
      title: "7-day home trial",
      step1Title: "DAYS 1 AND 2 · TODAY — Pick 6 kitchen items",
      step1:
        "Pick 6 packaged drinks or snacks at home that claim to be healthy.",
      step2Title: "DAYS 3 TO 5 — Count the hidden sugar spoons",
      step2:
        "Check 'Added Sugar per 100g' on the back label and divide by 4 for teaspoons.",
      step3Title: "DAYS 6 AND 7 — Find the highest item, write one swap",
      step3:
        "Note which item had the most hidden sugar and write one easy homemade swap.",
    },
  },
  BIZ: {
    id: "BIZ",
    title: "Markets, Finance, Economics and Entrepreneurship",
    shortName: "Business and Economics",
    subjectByBoard: {
      CBSE: {
        keepOpen:
          "Take now: Standard Mathematics (not Basic). Keep (Grades 11–12): Mathematics (041) + Economics + Business Studies and Accountancy.",
        closesWarning:
          "Dropping Mathematics in Grade 11 closes B.A. (Hons) Economics at DU, Ashoka, Krea, LSE and NUS.",
      },
      ICSE: {
        keepOpen:
          "Take now (ICSE): Mathematics + Commercial Studies. Keep (ISC): Mathematics + Economics + Commerce + Accountancy.",
        closesWarning:
          "Commerce without ISC Mathematics closes quantitative Economics and Finance degrees.",
      },
      STATE: {
        keepOpen:
          "Take now: Mathematics + Social Science. Keep (Grades 11–12): Commerce with Business Maths + Economics.",
        closesWarning:
          "Ensure Mathematics is kept in Grades 11 and 12 to keep Honours Economics open.",
      },
      IB: {
        keepOpen:
          "Take now (MYP): Mathematics + Individuals & Societies. Keep (Diploma): Economics HL + Business Management + Maths AA HL/SL.",
        closesWarning:
          "LSE, Warwick, Bocconi, NUS and Ashoka Economics require strong IB Mathematics.",
      },
      IGCSE: {
        keepOpen:
          "Take now (IGCSE): Mathematics + Economics. Keep (A-levels): A-level Mathematics + Economics + Business.",
        closesWarning:
          "Applying for Economics without A-level Mathematics closes top UK and global faculties.",
      },
    },
    sevenDayChallenge: {
      title: "7-day home trial",
      step1Title: "DAYS 1 AND 2 · TODAY — Pick 5 weekly groceries",
      step1: "Pick 5 everyday items your family buys weekly.",
      step2Title: "DAYS 3 TO 5 — Compare app bill vs local kirana",
      step2:
        "Check the final checkout bill on a quick-delivery app vs your local shop.",
      step3Title: "DAYS 6 AND 7 — Work out the convenience markup %",
      step3:
        "Subtract the kirana price from the app total to see the % paid for instant delivery.",
    },
  },
  LAW: {
    id: "LAW",
    title: "Law, Public Policy, International Relations and Debate",
    shortName: "Law and Public Policy",
    subjectByBoard: {
      CBSE: {
        keepOpen:
          "Take now: English, Social Science + Maths. Keep (Grades 11–12): Political Science, History/Legal Studies, Economics + Maths.",
        closesWarning:
          "Keeping Economics and Maths open preserves PPE (Philosophy, Politics & Economics) at Ashoka and Oxford.",
      },
      ICSE: {
        keepOpen:
          "Take now: English, History & Civics, Maths. Keep (ISC): Political Science, History, Economics, English + Maths.",
        closesWarning:
          "Reading comprehension and quantitative data make up over 60% of CLAT and Ashoka AAT.",
      },
      STATE: {
        keepOpen:
          "Take now: English, Social Studies, Maths. Keep (Grades 11–12): Humanities/Commerce with Economics and Maths.",
        closesWarning:
          "Keep Economics and basic Mathematics open for policy and law tracks.",
      },
      IB: {
        keepOpen:
          "Take now (MYP): Language & Literature + Individuals & Societies. Keep (Diploma): Global Politics/History HL + English A HL + Economics HL + Maths.",
        closesWarning:
          "UK Law (LNAT) and PPE require essay-intensive HL subjects paired with Maths.",
      },
      IGCSE: {
        keepOpen:
          "Take now: English, History, Economics. Keep (A-levels): History/Law + Economics + English Literature + Maths.",
        closesWarning:
          "Top UK and Irish law schools look for rigorous essay-based A-levels.",
      },
    },
    sevenDayChallenge: {
      title: "7-day home trial",
      step1Title: "DAYS 1 AND 2 · TODAY — Pick one debated rule",
      step1: "Pick one rule at school or home that people disagree on.",
      step2Title: "DAYS 3 TO 5 — Ask 2 supporters and 2 critics",
      step2:
        "Write down the #1 reason from 2 people who support the rule and 2 who dislike it.",
      step3Title: "DAYS 6 AND 7 — Write one fair compromise rule",
      step3:
        "Draft a 1-sentence middle-ground rule that solves both sides' worries.",
    },
  },
  DESIGN: {
    id: "DESIGN",
    title: "Spatial Design, Architecture and UX",
    shortName: "Design, Architecture and UX",
    subjectByBoard: {
      CBSE: {
        keepOpen:
          "Take now: Standard Mathematics, Science + Art. Keep (Grades 11–12): Core Mathematics (041) + Physics + Fine Arts/Design.",
        closesWarning:
          "Dropping Mathematics and Physics in Grade 11 permanently closes 5-year B.Arch Architecture.",
      },
      ICSE: {
        keepOpen:
          "Take now: Mathematics, Science + Art. Keep (ISC): Mathematics + Physics + Art/Design.",
        closesWarning:
          "Council of Architecture requires Class 12 Mathematics and Physics for all B.Arch degrees.",
      },
      STATE: {
        keepOpen:
          "Take now: Mathematics and Science. Keep (Grades 11–12): Mathematics, Physics, Chemistry + Design Portfolio.",
        closesWarning:
          "Keep Mathematics and Physics in Grade 11 to stay eligible for B.Arch and B.Des.",
      },
      IB: {
        keepOpen:
          "Take now (MYP): Design + Visual Arts + Maths. Keep (Diploma): Visual Arts/Design Tech HL + Maths AA/AI + Physics.",
        closesWarning:
          "TU Delft, UCL Bartlett and IIT UCEED require Maths and Physics alongside a portfolio.",
      },
      IGCSE: {
        keepOpen:
          "Take now: Art & Design + Maths + Physics. Keep (A-levels): Art & Design + A-level Mathematics + Physics.",
        closesWarning:
          "Dropping A-level Maths or Physics closes technical Architecture degrees.",
      },
    },
    sevenDayChallenge: {
      title: "7-day home trial",
      step1Title: "DAYS 1 AND 2 · TODAY — Snap one confusing sign",
      step1: "Take a photo of a cluttered apartment notice or messy timetable.",
      step2Title: "DAYS 3 TO 5 — Sketch a cleaner version",
      step2:
        "Redesign it on paper or Canva using a big heading, 3 icons, and half the words.",
      step3Title: "DAYS 6 AND 7 — Test it on 4 family members",
      step3:
        "Show both versions and time how many seconds it takes to find the main info.",
    },
  },
  PSYCH: {
    id: "PSYCH",
    title: "Behavioural Psychology, Sports Science and Human Performance",
    shortName: "Psychology and Sports Science",
    subjectByBoard: {
      CBSE: {
        keepOpen:
          "Take now: Science + Maths. Keep (Grades 11–12): Psychology + Biology + Core/Applied Mathematics.",
        closesWarning:
          "Modern Cognitive Science and Sports Science degrees require Biology and Mathematics.",
      },
      ICSE: {
        keepOpen:
          "Take now: Biology, Maths, English. Keep (ISC): Psychology + Biology + Mathematics.",
        closesWarning:
          "Keeping Biology and Maths open unlocks B.Sc Cognitive Neuroscience.",
      },
      STATE: {
        keepOpen:
          "Take now: Science and Maths. Keep (Grades 11–12): Biology, Psychology and Statistics/Maths.",
        closesWarning:
          "Biology and Statistics keep clinical psychology and sports science open.",
      },
      IB: {
        keepOpen:
          "Take now (MYP): Sciences + Individuals & Societies. Keep (Diploma): Psychology HL + Biology HL/SL + Maths.",
        closesWarning:
          "UCL, Trinity Dublin, Bath and Ashoka B.Sc Psychology strongly prefer IB Biology and Maths.",
      },
      IGCSE: {
        keepOpen:
          "Take now: Biology + Maths. Keep (A-levels): A-level Psychology + Biology + Mathematics.",
        closesWarning:
          "Dropping A-level Biology or Maths restricts entry to B.Sc Psychology.",
      },
    },
    sevenDayChallenge: {
      title: "7-day home trial",
      step1Title: "DAYS 1 AND 2 · TODAY — Normal screen bedtime test",
      step1:
        "Test 3 family members at breakfast on remembering 10 words after normal screen use.",
      step2Title: "DAYS 3 TO 5 — 30-minute screen-free bedtime",
      step2:
        "Switch off screens 30 minutes before bed, then test 10 new words next morning.",
      step3Title: "DAYS 6 AND 7 — Compare morning memory scores",
      step3:
        "Compare the average words remembered out of 10 across both mornings.",
    },
  },
};

export function computeStudentProfile(
  scores,
  parentStreams,
  styleCounts,
  aptitudeScore,
  weeklyChallengeVerified
) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const top3 = sorted.slice(0, 3).map(([key], idx) => {
    const streamObj = SIX_STREAMS[key] || SIX_STREAMS.COMP;
    return {
      ...streamObj,
      rank: idx + 1,
      confLabel:
        idx === 0 ? "Strong fit" : idx === 1 ? "Good fit" : "Worth a look",
    };
  });
  const sortedStyles = Object.entries(styleCounts).sort((a, b) => b[1] - a[1]);
  return {
    top3,
    topStyle: sortedStyles[0]?.[0] || "Builder",
    secondStyle: sortedStyles[1]?.[0] || "Planner",
    aptitudeScore,
  };
}

// ALL 16 OFFICIAL COLLEGES FROM PDF 03 & PDF 05
export const SIXTEEN_COLLEGES = [
  {
    id: "plaksha",
    route: "INDIA",
    tier: "Hardest to get into",
    name: "Plaksha University",
    course: "B.Tech, Computer Science and AI",
    shortCost: "₹8.4L tuition",
    shortSub: "SAT, ACT, JEE Main or boards",
    howIn: [
      "At least one score is needed for a firm offer: SAT, ACT, JEE Main or Class 12 board scores.",
      "Everyone who is interviewed is considered for merit aid.",
    ],
    asksFor: [
      "Class 12 or equivalent, with Maths. Physics and Biology without Maths is allowed for one major only.",
    ],
    costs: [
      ["Tuition", "₹8.4L a year, 2026 intake"],
      ["Living", "Not published"],
    ],
    moneyHelp: [
      "Merit tuition waivers of 25% to 100%.",
      "Need-based aid of 25% to 100% for families earning under ₹50L a year.",
    ],
    keyDates: "Admissions for 2026 closed. Next round opens Oct/Nov.",
    notChecked: ["Living costs", "Intake size", "Cut-offs for ICSE or CBSE"],
    source: "Checked 22 Oct 2026. Sources: btech-admissions.plaksha.edu.in",
    targetLakhs: 42.4,
    yearsLen: 4,
    yrBreakdown: [10.6, 10.6, 10.6, 10.6],
  },
  {
    id: "iiith",
    route: "INDIA",
    tier: "Hardest to get into",
    name: "IIIT Hyderabad",
    course: "B.Tech and dual degree, Computing",
    shortCost: "₹5L tuition",
    shortSub: "JEE Main or UGEE, and other routes",
    howIn: [
      "JEE Main for single-degree, and UGEE for dual-degree programmes.",
      "Other routes: SPEC, Olympiad, Boards, DASA.",
    ],
    asksFor: [
      "JEE Main applicants must meet NTA JEE Main criteria (Class 12 PCM).",
    ],
    costs: [
      ["Dual degree", "₹5.0L tuition a year, batch of 2026"],
      ["Living", "About ₹6,000 hostel and ₹5,000 mess a month"],
    ],
    moneyHelp: ["Not listed on the pages we checked."],
    keyDates: "JEE Main window: April to May. UGEE exam in May.",
    notChecked: [
      "Single-degree B.Tech fee",
      "Intake size",
      "Boards channel details",
    ],
    source: "Checked 22 Oct 2026. Sources: ugadmissions.iiit.ac.in",
    targetLakhs: 25.0,
    yearsLen: 4,
    yrBreakdown: [6.3, 6.2, 6.2, 6.3],
  },
  {
    id: "bits",
    route: "INDIA",
    tier: "Hardest to get into",
    name: "BITS Pilani",
    course: "B.E., Computer Science",
    shortCost: "₹6.8L a year",
    shortSub: "BITSAT",
    howIn: [
      "BITSAT, a computer-based test, is the route for the B.E. programmes.",
    ],
    asksFor: [
      "Class 12 with Physics, Chemistry and Maths. Maths is compulsory.",
      "75% in PCM together, and at least 60% in each.",
    ],
    costs: [
      ["Tuition", "₹2.9L a semester, about ₹5.8L a year"],
      ["Hostel and mess", "About ₹92,000 a year"],
      ["Trend", "₹3.1L a semester in 2027-28"],
    ],
    moneyHelp: ["Not listed on the pages we checked."],
    keyDates: "Registration for BITSAT closes in June.",
    notChecked: ["Scholarships", "Campus-wise seats"],
    source: "Checked 22 Oct 2026. Sources: bitsadmission.com",
    targetLakhs: 28.5,
    yearsLen: 4,
    yrBreakdown: [6.8, 7.0, 7.2, 7.5],
  },
  {
    id: "ashoka",
    route: "INDIA",
    tier: "Hardest to get into",
    name: "Ashoka University",
    course: "BSc (Hons), Computer Science",
    shortCost: "₹12.3L a year",
    shortSub: "Application and assessment",
    howIn: [
      "Application and admissions assessment at 37 centres. Applications for 2027 intake are open.",
    ],
    asksFor: [
      "Class 12 Maths is required for BSc Computer Science and B.A. (Hons) Economics.",
    ],
    costs: [
      ["Tuition", "₹10.2L a year, August 2025 intake"],
      ["Residence", "₹2.0L a year"],
      ["Total", "₹12.3L a year, before meals"],
      ["One-time", "₹1.35L at joining"],
    ],
    moneyHelp: [
      "500 merit and need-based scholarships for 2026 intake.",
      "Special Merit & Achievers Merit: up to 100% tuition waiver.",
    ],
    keyDates: "Applications open across 4 rounds from Oct to May.",
    notChecked: ["Meal costs", "Programme length"],
    source: "Checked 22 Oct 2026. Sources: ashoka.edu.in fee structure",
    targetLakhs: 50.5,
    yearsLen: 4,
    yrBreakdown: [13.6, 12.3, 12.3, 12.3],
  },
  {
    id: "krea",
    route: "INDIA",
    tier: "In between",
    name: "Krea University",
    course: "BSc (Hons) programmes",
    shortCost: "₹11L a year",
    shortSub: "Krea test, or SAT, ACT, CUET",
    howIn: [
      "The Krea Assessment Test. Waived with SAT 1380+, ACT 29, Ei CREST 85% or CUET UG 90%.",
    ],
    asksFor: ["The pages we checked do not list board or Maths criteria."],
    costs: [
      ["Tuition", "₹8.75L a year, 2027 to 2031 batch"],
      ["Living", "₹2.25L a year"],
      ["Year 1 total", "₹11.9L with one-time fees"],
      ["Length", "4 years"],
    ],
    moneyHelp: ["Financial assistance can change the amounts."],
    keyDates: "Application fee ₹1,500.",
    notChecked: ["Maths requirement for CS", "Board criteria", "Deadlines"],
    source:
      "Checked 22 Oct 2026. Sources: krea.edu.in fee and eligibility pages",
    targetLakhs: 44.9,
    yearsLen: 4,
    yrBreakdown: [11.9, 11.0, 11.0, 11.0],
  },
  {
    id: "snu",
    route: "INDIA",
    tier: "In between",
    name: "Shiv Nadar IoE",
    course: "B.Tech, Computer Science",
    shortCost: "₹7L a year",
    shortSub: "JEE Main, SNUSAT, SAT, CUET",
    howIn: ["JEE Main, SNUSAT with APT, SAT, ACT, or CUET with an interview."],
    asksFor: [
      "10+2 with Physics, Chemistry and Maths. 65% overall for B.Tech.",
    ],
    costs: [
      ["Tuition", "₹5.0L a year"],
      ["Living", "₹2.0L a year"],
      ["One-time", "₹60,000 admission and ₹30,000 deposit"],
    ],
    moneyHelp: [
      "50% tuition waiver for 95%+ in Class 12, full waiver for 98 percentile+ in JEE Main.",
    ],
    keyDates: "SNUSAT runs in three phases from Jan to April.",
    notChecked: ["Current year fee revision", "Intake size"],
    source: "Checked 22 Oct 2026. Sources: snu.edu.in fee structure",
    targetLakhs: 28.9,
    yearsLen: 4,
    yrBreakdown: [7.9, 7.0, 7.0, 7.0],
  },
  {
    id: "ahmedabad",
    route: "INDIA",
    tier: "In between",
    name: "Ahmedabad University",
    course: "B.Tech, Computer Science and Engineering",
    shortCost: "₹4.3L tuition",
    shortSub: "JEE Main or state exams, plus Class 12",
    howIn: [
      "Merit is 70% from JEE Main / GUJCET / MH-CET / KCET and 30% from Class 12.",
    ],
    asksFor: [
      "Class 12 with 45% in Physics, Maths and one approved subject. IGCSE and IB accepted.",
    ],
    costs: [
      ["Tuition", "₹4.25L a year, 2026-27"],
      ["Trend", "Rises 6% to 9% a year"],
      ["Living", "Not published"],
    ],
    moneyHelp: ["Academic and need-based scholarships exist."],
    keyDates: "Applications close in June/July.",
    notChecked: ["Living costs", "Scholarship amounts"],
    source: "Checked 22 Oct 2026. Sources: ahduni.edu.in B.Tech 2026",
    targetLakhs: 19.0,
    yearsLen: 4,
    yrBreakdown: [4.3, 4.6, 4.9, 5.2],
  },
  {
    id: "vit",
    route: "INDIA",
    tier: "Wider access",
    name: "VIT Vellore",
    course: "B.Tech, Computer Science and Engineering",
    shortCost: "₹0 to ₹4.9L tuition",
    shortSub: "VITEEE",
    howIn: [
      "VITEEE: 100 multiple-choice questions in 2 hours, computer-based.",
    ],
    asksFor: [
      "60% in Physics, Chemistry and Maths together, and 50% in Maths.",
    ],
    costs: [
      ["Tuition", "₹0 to ₹4.9L a year, 2026-27"],
      ["Categories", "₹1.95L, ₹3.04L, ₹4.02L, ₹4.45L or ₹4.9L"],
      ["Deposit", "₹5,000, refundable"],
    ],
    moneyHelp: ["Fee depends on VITEEE rank scholarship category."],
    keyDates:
      "VITEEE 2027: apply by 31 March 2027, exam 27 April to 2 May 2027.",
    notChecked: ["Living costs", "How categories are assigned"],
    source: "Checked 22 Oct 2026. Sources: vit.ac.in fee structure",
    targetLakhs: 18.0,
    yearsLen: 4,
    yrBreakdown: [4.5, 4.5, 4.5, 4.5],
  },
  {
    id: "christ",
    route: "INDIA",
    tier: "Wider access",
    name: "Christ University",
    course: "B.Tech, Computer Science, Kengeri campus",
    shortCost: "₹3.2L tuition",
    shortSub: "Class 12 marks, test if applicable",
    howIn: ["Application, then an assessment and interview."],
    asksFor: [
      "Physics, Maths and one approved subject in Class 12. 50% in Maths and 50% overall.",
    ],
    costs: [
      ["Tuition", "₹3.2L a year in years 1–2, ₹3.4L in years 3–4"],
      ["Karnataka", "₹3.0L, then ₹3.2L"],
      ["Length", "4 years"],
    ],
    moneyHelp: ["Not listed on the page we checked."],
    keyDates: "Applications open from October.",
    notChecked: ["Living costs", "Whether an entrance test applies"],
    source: "Checked 22 Oct 2026. Sources: christuniversity.in",
    targetLakhs: 13.2,
    yearsLen: 4,
    yrBreakdown: [3.2, 3.2, 3.4, 3.4],
  },
  {
    id: "southampton",
    route: "FOREIGN_INDIA",
    tier: "Foreign campus",
    name: "University of Southampton Delhi",
    course: "BSc Computer Science, Gurugram",
    shortCost: "₹13.2L a year",
    shortSub: "BSc Computer Science, 3 years",
    howIn: [
      "Apply with school results and a personal statement. No entrance test.",
    ],
    asksFor: [
      "CBSE or CISCE: 82% overall and 85% in Maths. State boards: 87% overall and 85% in Maths.",
      "IB: 38 points, 19 at HL, a 6 in Maths AA or a 7 in Maths AI. A-levels: A*AA with an A in Maths.",
    ],
    costs: [
      ["Tuition", "₹13.2L a year, August 2025 start"],
      ["Length", "3 years"],
      ["Next fee", "Rises about 5% to 8% a year"],
      ["Living", "Not published"],
    ],
    moneyHelp: ["Not listed on the pages we checked."],
    keyDates: "2027 entry dates not announced.",
    notChecked: ["2027 entry criteria", "Scholarships", "Living costs"],
    source: "Checked 22 Oct 2026. Sources: Southampton Delhi admissions pages",
    targetLakhs: 39.6,
    yearsLen: 3,
    yrBreakdown: [13.2, 13.2, 13.2],
  },
  {
    id: "liverpool",
    route: "FOREIGN_INDIA",
    tier: "Foreign campus",
    name: "University of Liverpool Bengaluru",
    course: "BSc (Hons) Computer Science",
    shortCost: "₹11.5L a year",
    shortSub: "BSc Computer Science, 3 years",
    howIn: [
      "Apply with school results and a statement of purpose. No entrance test mentioned.",
    ],
    asksFor: [
      "CBSE, ISC or State: 75% average across four core subjects in Class 12, and 75% in Class 10 Maths.",
      "IB: 32 points, a 5 in HL Maths or CS. A-levels: ABB including Maths or CS.",
    ],
    costs: [
      ["Tuition", "₹11.5L a year for Indian students, 2026 intake"],
      ["Length", "3 years"],
      ["Living", "Not published"],
    ],
    moneyHelp: ["Scholarships and bursaries exist. Details to be published."],
    keyDates: "Deadline not stated on the page we checked.",
    notChecked: ["Scholarship amounts", "Deadline", "2027 fee"],
    source: "Checked 22 Oct 2026. Sources: bengaluru.liverpool.ac.uk",
    targetLakhs: 34.5,
    yearsLen: 3,
    yrBreakdown: [11.5, 11.5, 11.5],
  },
  {
    id: "tum",
    route: "VALUE_ABROAD",
    tier: "Value abroad",
    name: "TU Munich",
    course: "BSc Informatics, Germany",
    shortCost: "₹17L to ₹19L a year",
    shortSub: "BSc Informatics, taught in German",
    howIn: [
      "Aptitude assessment for the Bachelor. Applications run from 15 May to 15 July.",
    ],
    asksFor: [
      "German is the required language of study for this programme. Six semesters, 180 credits.",
    ],
    costs: [
      ["Tuition", "€2,000 or €3,000 a semester (about ₹4.3L to ₹6.4L a year)"],
      ["Living", "Visa proof of funds is €11,904 a year, about ₹12.7L"],
      ["Total", "About ₹17L to ₹19L a year"],
    ],
    moneyHelp: ["Waiver scholarships, based on grades or need."],
    keyDates: "Winter semester applications: 15 May to 15 July.",
    notChecked: [
      "School qualification rules for Indian boards",
      "German level needed",
    ],
    source: "Checked 22 Oct 2026. Sources: tum.de Informatics BSc",
    targetLakhs: 54.0,
    yearsLen: 3,
    yrBreakdown: [18.0, 18.0, 18.0],
  },
  {
    id: "trinity",
    route: "VALUE_ABROAD",
    tier: "Value abroad",
    name: "Trinity College Dublin",
    course: "Computer Science, Ireland",
    shortCost: "₹24.8L tuition",
    shortSub: "Computer Science",
    howIn: [
      "Indian applicants use CBSE, CISCE or HSC Class 12 result. Others use A-levels or IB.",
    ],
    asksFor: [
      "Overall average of 80% to 85% in six subjects in Class 12. Maths required.",
    ],
    costs: [
      [
        "Tuition",
        "€23,250 in year 1 for non-EU students, 2027/28, about ₹24.8L",
      ],
      ["Living", "Not included"],
      ["Length", "4 years assumed"],
    ],
    moneyHelp: ["Undergraduate and international scholarships exist."],
    keyDates: "Deadlines not listed on the page we read.",
    notChecked: [
      "Computer Science specific marks",
      "Living costs",
      "Deadlines",
    ],
    source: "Checked 22 Oct 2026. Sources: tcd.ie study in Ireland",
    targetLakhs: 99.1,
    yearsLen: 4,
    yrBreakdown: [24.8, 24.8, 24.8, 24.7],
  },
  {
    id: "nus",
    route: "TOP_GLOBAL",
    tier: "Top global",
    name: "National University of Singapore",
    course: "Computing, Singapore",
    shortCost: "₹29.5L tuition",
    shortSub: "Computing",
    howIn: [
      "Apply with Class 12 results. CBSE and ISC are listed. SAT and ACT are not required.",
    ],
    asksFor: ["A good pass in five subjects including English."],
    costs: [
      ["Tuition", "S$39,700 a year, Computing, 2026/27, about ₹29.5L"],
      ["Living", "Not included"],
    ],
    moneyHelp: ["Not listed on the page we read."],
    keyDates: "Results for CBSE sitters due in May.",
    notChecked: [
      "Maths requirement for Computing",
      "Tuition grant and scholarships",
      "Living costs",
    ],
    source: "Checked 22 Oct 2026. Sources: nus.edu.sg Indian Standard 12 page",
    targetLakhs: 118.0,
    yearsLen: 4,
    yrBreakdown: [29.5, 29.5, 29.5, 29.5],
  },
  {
    id: "imperial",
    route: "TOP_GLOBAL",
    tier: "Top global",
    name: "Imperial College London",
    course: "MEng Computing, London",
    shortCost: "₹60.5L tuition",
    shortSub: "MEng Computing, 4 years",
    howIn: ["Apply through UCAS by 13 January 2027. Sit the TMUA test."],
    asksFor: [
      "CBSE and ISC Class 12 accepted. A-levels: A*A*A to A*AAA with A* in Maths. IB: 7 in HL Maths.",
    ],
    costs: [
      [
        "Tuition",
        "£47,800 a year for overseas students, 2027 entry, about ₹60.5L",
      ],
      ["Length", "4 years"],
      ["Living", "Not included"],
    ],
    moneyHelp: ["Imperial Inspires Scholarships: £15,000 a year."],
    keyDates: "UCAS deadline 13 January 2027.",
    notChecked: ["Grade needed from CBSE or ISC", "Living costs"],
    source: "Checked 22 Oct 2026. Sources: imperial.ac.uk Computing MEng",
    targetLakhs: 242.0,
    yearsLen: 4,
    yrBreakdown: [60.5, 60.5, 60.5, 60.5],
  },
  {
    id: "stanford",
    route: "TOP_GLOBAL",
    tier: "Top global",
    name: "Stanford University",
    course: "Computer Science, California",
    shortCost: "₹85.6L with room and board",
    shortSub: "Computer Science",
    howIn: ["Apply for fall entry. The SAT or ACT is required."],
    asksFor: ["The school diploma can be completed before enrolling."],
    costs: [
      ["Tuition", "$67,731 a year, 2026-27"],
      ["Room and board", "$22,944 a year"],
      ["Total", "$90,675 a year, about ₹85.6L, before books and travel"],
    ],
    moneyHelp: [
      "Stanford meets full need of admitted students (need-aware for international applicants).",
    ],
    keyDates: "Deadlines not listed on the page we read.",
    notChecked: ["Deadlines", "Typical aid awards for Indian students"],
    source: "Checked 22 Oct 2026. Sources: admission.stanford.edu",
    targetLakhs: 342.4,
    yearsLen: 4,
    yrBreakdown: [85.6, 85.6, 85.6, 85.6],
  },
];

// GRADE 7, 8, 9, 10 TIMED TASKS & 15 QUESTIONS BUILDER
export function buildPDF15Questions(boardCode, gradeStr) {
  const g = String(gradeStr || "8");
  const q10Map = {
    CBSE: [
      {
        id: "A",
        label: "Mathematics or Computer Applications",
        s: "COMP",
        w: 18,
      },
      { id: "B", label: "Science", s: "BIO", w: 18 },
      {
        id: "C",
        label: "English, Hindi or Social Science",
        s: "LAW",
        s2: "PSYCH",
        w: 18,
      },
      { id: "D", label: "Art", s: "DESIGN", w: 18 },
    ],
    ICSE: [
      {
        id: "A",
        label: "Mathematics or Computer Applications",
        s: "COMP",
        w: 18,
      },
      { id: "B", label: "Physics, Chemistry or Biology", s: "BIO", w: 18 },
      {
        id: "C",
        label: "English, History, Civics or Geography",
        s: "LAW",
        s2: "PSYCH",
        w: 18,
      },
      { id: "D", label: "Art", s: "DESIGN", w: 18 },
    ],
    STATE: [
      { id: "A", label: "Maths or Computers", s: "COMP", w: 18 },
      { id: "B", label: "Science", s: "BIO", w: 18 },
      {
        id: "C",
        label: "Languages or Social Studies",
        s: "LAW",
        s2: "PSYCH",
        w: 18,
      },
      { id: "D", label: "Art or Drawing", s: "DESIGN", w: 18 },
    ],
    IB: [
      { id: "A", label: "Mathematics or Design", s: "COMP", w: 18 },
      { id: "B", label: "Sciences", s: "BIO", w: 18 },
      {
        id: "C",
        label: "Language and literature, or Individuals and societies",
        s: "LAW",
        s2: "BIZ",
        w: 18,
      },
      { id: "D", label: "Arts", s: "DESIGN", w: 18 },
    ],
    IGCSE: [
      { id: "A", label: "Mathematics or Computer Science", s: "COMP", w: 18 },
      { id: "B", label: "Physics, Chemistry or Biology", s: "BIO", w: 18 },
      {
        id: "C",
        label: "English, History or Geography",
        s: "LAW",
        s2: "PSYCH",
        w: 18,
      },
      { id: "D", label: "Art and Design", s: "DESIGN", w: 18 },
    ],
  };

  const taskByGrade = {
    7: [
      {
        id: 12,
        type: "task",
        timer: "1:30 left",
        q: "A machine adds 3, then doubles. Start at 2 and run it twice. What comes out?",
        sub: "Write each step on paper. If you are stuck, skip it. That is fine.",
        opts: [
          { id: "A", label: "13", s: "PSYCH", w: 4, isCorrectAptitude: false },
          { id: "B", label: "20", s: "BIZ", w: 4, isCorrectAptitude: false },
          { id: "C", label: "26", s: "COMP", w: 20, isCorrectAptitude: true },
          { id: "D", label: "32", s: "BIO", w: 4, isCorrectAptitude: false },
        ],
      },
      {
        id: 13,
        type: "task",
        timer: "1:30 left",
        q: "A stall buys 10 samosas at ₹8 each and sells 8 at ₹12 each. What is the profit?",
        sub: "Count what goes out as well as what comes in.",
        opts: [
          { id: "A", label: "₹16", s: "BIZ", w: 20, isCorrectAptitude: true },
          { id: "B", label: "₹32", s: "LAW", w: 4, isCorrectAptitude: false },
          {
            id: "C",
            label: "₹80",
            s: "DESIGN",
            w: 4,
            isCorrectAptitude: false,
          },
          { id: "D", label: "₹96", s: "PSYCH", w: 4, isCorrectAptitude: false },
        ],
      },
      {
        id: 14,
        type: "task",
        timer: "1:30 left",
        q: "A school says only students with full attendance can play in sports day. What is the biggest problem?",
        sub: "Think about who the rule is unfair to.",
        opts: [
          {
            id: "A",
            label:
              "A child who was ill for one day cannot play, even if well on sports day",
            s: "LAW",
            w: 20,
            isCorrectAptitude: true,
          },
          {
            id: "B",
            label: "The ground may be wet",
            s: "BIO",
            w: 4,
            isCorrectAptitude: false,
          },
          {
            id: "C",
            label: "Teachers like attendance",
            s: "COMP",
            w: 4,
            isCorrectAptitude: false,
          },
          {
            id: "D",
            label: "Sports day is long",
            s: "DESIGN",
            w: 4,
            isCorrectAptitude: false,
          },
        ],
      },
    ],
    8: [
      {
        id: 12,
        type: "task",
        timer: "0:60 left",
        q: "A machine follows two rules. If the number is even, halve it. If odd, add 1 then halve it. Start at 12 and run it 3 times. What comes out?",
        sub: "Write each step on paper. If you are stuck, skip it.",
        opts: [
          { id: "A", label: "1", s: "PSYCH", w: 4, isCorrectAptitude: false },
          { id: "B", label: "2", s: "COMP", w: 20, isCorrectAptitude: true },
          { id: "C", label: "3", s: "BIO", w: 4, isCorrectAptitude: false },
          { id: "D", label: "6", s: "BIZ", w: 4, isCorrectAptitude: false },
        ],
      },
      {
        id: 13,
        type: "task",
        timer: "0:60 left",
        q: "A juice stall makes 40 juices at ₹15 each. It sells 36 at ₹25 each. Rent is ₹150. What is the profit?",
        sub: "Count the cost of all 40, not only the 36 sold.",
        opts: [
          { id: "A", label: "₹150", s: "BIZ", w: 20, isCorrectAptitude: true },
          { id: "B", label: "₹210", s: "LAW", w: 4, isCorrectAptitude: false },
          {
            id: "C",
            label: "₹250",
            s: "DESIGN",
            w: 4,
            isCorrectAptitude: false,
          },
          {
            id: "D",
            label: "₹360",
            s: "PSYCH",
            w: 4,
            isCorrectAptitude: false,
          },
        ],
      },
      {
        id: 14,
        type: "task",
        timer: "0:60 left",
        q: "A rule says: students who arrive after 8:00 lose their library pass for a week. What is the biggest problem?",
        sub: "Think about who the rule is unfair to.",
        opts: [
          {
            id: "A",
            label:
              "Students whose bus runs late are punished for something they cannot control",
            s: "LAW",
            w: 20,
            isCorrectAptitude: true,
          },
          {
            id: "B",
            label: "Teachers may forget the rule",
            s: "COMP",
            w: 4,
            isCorrectAptitude: false,
          },
          {
            id: "C",
            label: "The library may get too empty",
            s: "DESIGN",
            w: 4,
            isCorrectAptitude: false,
          },
          {
            id: "D",
            label: "The bell is too loud",
            s: "BIO",
            w: 4,
            isCorrectAptitude: false,
          },
        ],
      },
    ],
    9: [
      {
        id: 12,
        type: "task",
        timer: "0:60 left",
        q: "A robot starts at 0. Step 1: move forward 3. Step 2: move back 1. Step 3: double the distance from 0. Run once. Where does it land?",
        sub: "Do the steps in order. If you are stuck, skip it.",
        opts: [
          { id: "A", label: "2", s: "PSYCH", w: 4, isCorrectAptitude: false },
          { id: "B", label: "4", s: "COMP", w: 20, isCorrectAptitude: true },
          { id: "C", label: "5", s: "BIO", w: 4, isCorrectAptitude: false },
          { id: "D", label: "6", s: "BIZ", w: 4, isCorrectAptitude: false },
        ],
      },
      {
        id: 13,
        type: "task",
        timer: "0:60 left",
        q: "A club prints 50 T-shirts at ₹200 each. It sells 40 at ₹300 each, and 10 at ₹150 each. What is the profit?",
        sub: "Work out total money in minus total cost of all 50 shirts.",
        opts: [
          {
            id: "A",
            label: "₹2,000",
            s: "LAW",
            w: 4,
            isCorrectAptitude: false,
          },
          {
            id: "B",
            label: "₹3,500",
            s: "BIZ",
            w: 20,
            isCorrectAptitude: true,
          },
          {
            id: "C",
            label: "₹4,000",
            s: "DESIGN",
            w: 4,
            isCorrectAptitude: false,
          },
          {
            id: "D",
            label: "₹5,000",
            s: "PSYCH",
            w: 4,
            isCorrectAptitude: false,
          },
        ],
      },
      {
        id: 14,
        type: "task",
        timer: "0:60 left",
        q: "A school switches to tablets in June, and July marks rise 15%. The principal says tablets caused the rise. What is the biggest flaw?",
        sub: "Does a rise prove the cause?",
        opts: [
          {
            id: "A",
            label:
              "The study did not check if the July test paper was simply easier",
            s: "LAW",
            w: 20,
            isCorrectAptitude: true,
          },
          {
            id: "B",
            label: "15% is too small",
            s: "COMP",
            w: 4,
            isCorrectAptitude: false,
          },
          {
            id: "C",
            label: "Tablets need charging",
            s: "DESIGN",
            w: 4,
            isCorrectAptitude: false,
          },
          {
            id: "D",
            label: "July has more rain",
            s: "BIO",
            w: 4,
            isCorrectAptitude: false,
          },
        ],
      },
    ],
    10: [
      {
        id: 12,
        type: "task",
        timer: "0:60 left",
        q: "A code scrambles a word. Step 1: swap the first and last letters. Step 2: move the new first letter to the end. Scramble LAMP.",
        sub: "Do the steps in order. If you are stuck, skip it.",
        opts: [
          { id: "A", label: "AMLP", s: "COMP", w: 20, isCorrectAptitude: true },
          {
            id: "B",
            label: "PAML",
            s: "PSYCH",
            w: 4,
            isCorrectAptitude: false,
          },
          { id: "C", label: "LMPA", s: "BIO", w: 4, isCorrectAptitude: false },
          {
            id: "D",
            label: "MALP",
            s: "DESIGN",
            w: 4,
            isCorrectAptitude: false,
          },
        ],
      },
      {
        id: 13,
        type: "task",
        timer: "0:60 left",
        q: "A shop buys a bag for ₹800, marks it up 25%, then gives 10% off the marked price. What is the profit?",
        sub: "Work out the marked price first.",
        opts: [
          { id: "A", label: "₹100", s: "BIZ", w: 20, isCorrectAptitude: true },
          { id: "B", label: "₹150", s: "LAW", w: 4, isCorrectAptitude: false },
          {
            id: "C",
            label: "₹200",
            s: "DESIGN",
            w: 4,
            isCorrectAptitude: false,
          },
          {
            id: "D",
            label: "₹250",
            s: "PSYCH",
            w: 4,
            isCorrectAptitude: false,
          },
        ],
      },
      {
        id: 14,
        type: "task",
        timer: "0:60 left",
        q: "A town lets odd-numbered cars drive on odd dates and even-numbered on even dates. Traffic fell 20% in a month. The mayor says the rule works. What is the biggest flaw?",
        sub: "Does a fall prove the cause?",
        opts: [
          {
            id: "A",
            label:
              "The study did not check what else changed, such as school holidays",
            s: "LAW",
            w: 20,
            isCorrectAptitude: true,
          },
          {
            id: "B",
            label: "20% is too small",
            s: "COMP",
            w: 4,
            isCorrectAptitude: false,
          },
          {
            id: "C",
            label: "The rule is hard to remember",
            s: "DESIGN",
            w: 4,
            isCorrectAptitude: false,
          },
          {
            id: "D",
            label: "Odd plates are more common",
            s: "BIO",
            w: 4,
            isCorrectAptitude: false,
          },
        ],
      },
    ],
  };

  const tList = taskByGrade[g] || taskByGrade["8"];

  return [
    {
      id: 1,
      q: "It is Saturday and there is no homework. What would you pick?",
      sub: "There is no best answer. Pick what feels right.",
      opts: [
        { id: "A", label: "Build or code a small game", s: "COMP", w: 16 },
        {
          id: "B",
          label: "Watch or read about animals or the body",
          s: "BIO",
          w: 16,
        },
        {
          id: "C",
          label: "Plan a stall to sell things to friends",
          s: "BIZ",
          w: 16,
        },
        { id: "D", label: "Draw or design something new", s: "DESIGN", w: 16 },
      ],
    },
    {
      id: 2,
      q: "School bans phones. What do you do first?",
      sub: "There is no best answer. Pick what feels right.",
      opts: [
        { id: "A", label: "Argue your case to the principal", s: "LAW", w: 16 },
        {
          id: "B",
          label: "Ask classmates how it affects them",
          s: "PSYCH",
          w: 16,
        },
        {
          id: "C",
          label: "Make an app that tracks phone-free days",
          s: "COMP",
          w: 16,
        },
        { id: "D", label: "Design a poster campaign", s: "DESIGN", w: 16 },
      ],
    },
    {
      id: 3,
      q: "A cousin is unwell. What do you most want to know?",
      sub: "There is no best answer. Pick what feels right.",
      opts: [
        { id: "A", label: "How the medicine works", s: "BIO", w: 16 },
        {
          id: "B",
          label: "How the hospital could cut waiting time",
          s: "COMP",
          s2: "BIZ",
          w: 16,
        },
        {
          id: "C",
          label: "How to help them feel less scared",
          s: "PSYCH",
          w: 16,
        },
        { id: "D", label: "What rights a patient has", s: "LAW", w: 16 },
      ],
    },
    {
      id: 4,
      q: "Pick a school project.",
      sub: "There is no best answer. Pick what feels right.",
      opts: [
        {
          id: "A",
          label: "Build a working model that solves a problem",
          s: "COMP",
          w: 16,
        },
        {
          id: "B",
          label: "Survey classmates and find a pattern",
          s: "BIO",
          s2: "PSYCH",
          w: 16,
        },
        {
          id: "C",
          label: "Run a small shop and report the profit",
          s: "BIZ",
          w: 16,
        },
        { id: "D", label: "Redesign the school entrance", s: "DESIGN", w: 16 },
      ],
    },
    {
      id: 5,
      q: "In a group project, what do you usually end up doing?",
      sub: "Tap the one that feels most like you.",
      opts: [
        {
          id: "A",
          label: "Making the actual thing",
          s: "COMP",
          w: 14,
          style: "Builder",
        },
        {
          id: "B",
          label: "Deciding the plan",
          s: "BIZ",
          w: 14,
          style: "Planner",
        },
        {
          id: "C",
          label: "Digging up facts and checking them",
          s: "BIO",
          w: 14,
          style: "Researcher",
        },
        {
          id: "D",
          label: "Making it look good",
          s: "DESIGN",
          w: 14,
          style: "Designer",
        },
        {
          id: "E",
          label: "Keeping everyone on track",
          s: "LAW",
          s2: "PSYCH",
          w: 14,
          style: "Organiser",
        },
      ],
    },
    {
      id: 6,
      q: "When you get stuck, what do you do first?",
      sub: "Tap the one that feels most like you.",
      opts: [
        {
          id: "A",
          label: "Try another way",
          s: "COMP",
          w: 12,
          style: "Builder",
        },
        {
          id: "B",
          label: "List the options and compare them",
          s: "BIZ",
          w: 12,
          style: "Planner",
        },
        { id: "C", label: "Look it up", s: "BIO", w: 12, style: "Researcher" },
        {
          id: "D",
          label: "Sketch it out",
          s: "DESIGN",
          w: 12,
          style: "Designer",
        },
        {
          id: "E",
          label: "Ask a friend what they think",
          s: "PSYCH",
          w: 12,
          style: "Organiser",
        },
      ],
    },
    {
      id: 7,
      q: "Which compliment would you like most?",
      sub: "Tap the one that feels most like you.",
      opts: [
        {
          id: "A",
          label: "You make things work",
          s: "COMP",
          w: 12,
          style: "Builder",
        },
        {
          id: "B",
          label: "You always have a plan",
          s: "BIZ",
          w: 12,
          style: "Planner",
        },
        {
          id: "C",
          label: "You find out the truth",
          s: "BIO",
          w: 12,
          style: "Researcher",
        },
        {
          id: "D",
          label: "You make things look great",
          s: "DESIGN",
          w: 12,
          style: "Designer",
        },
        {
          id: "E",
          label: "People like to follow you",
          s: "LAW",
          s2: "PSYCH",
          w: 12,
          style: "Organiser",
        },
      ],
    },
    {
      id: 8,
      q: "Which would you rather do for a week?",
      sub: "Two choices. Pick one.",
      opts: [
        {
          id: "A",
          label: "Build an app that does one job well",
          s: "COMP",
          w: 16,
        },
        {
          id: "B",
          label: "Run a small shop and track the profit",
          s: "BIZ",
          w: 16,
        },
      ],
    },
    {
      id: 9,
      q: "And which of these would you rather do?",
      sub: "Two choices. Pick one.",
      opts: [
        {
          id: "A",
          label: "Argue both sides of a school rule",
          s: "LAW",
          w: 16,
        },
        { id: "B", label: "Redesign a room or a poster", s: "DESIGN", w: 16 },
      ],
    },
    {
      id: 10,
      boardBadge: "Board: " + boardCode,
      q: "Which school subject do you look forward to most?",
      sub: "There is no best answer. Pick what feels right.",
      opts: q10Map[boardCode] || q10Map.CBSE,
    },
    {
      id: 11,
      q: "Which club would you join?",
      sub: "There is no best answer. Pick what feels right.",
      opts: [
        { id: "A", label: "Coding club", s: "COMP", w: 16 },
        { id: "B", label: "Science club", s: "BIO", w: 16 },
        { id: "C", label: "Business and money club", s: "BIZ", w: 16 },
        { id: "D", label: "Debate club", s: "LAW", w: 16 },
        { id: "E", label: "Art club", s: "DESIGN", w: 16 },
      ],
    },
    tList[0],
    tList[1],
    tList[2],
    {
      id: 15,
      type: "reflection",
      q: "Think of one thing you made, fixed, organised or helped with. Which is closest?",
      chips: [
        "Made something",
        "Fixed something",
        "Organised people",
        "Helped someone learn",
        "Figured out a problem",
      ],
    },
  ];
}
