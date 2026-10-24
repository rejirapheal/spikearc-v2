// src/studentApp.jsx
// ============================================================================
// SPIKEARC SCHOLAR • LIGHTWEIGHT MOBILE CARD UI (PDFs 01 TO 09)
// ============================================================================
import React, { useState, useEffect } from "react";
import {
  GRADE_CONFIG,
  SIX_STREAMS,
  HOBBY_REMIX_OPTIONS,
  SIXTEEN_COLLEGES,
  buildPDF15Questions,
  getGradeAndBoardProject,
  getFilteredCompetitions,
  computeStudentProfile,
} from "./studentData";

function BrandMark({ onClick }) {
  return (
    <span
      onClick={onClick}
      className="inline-flex items-baseline font-bold text-[22px] tracking-tight text-[#0B1020] cursor-pointer select-none"
      style={{ fontFamily: '"Sora", system-ui, sans-serif' }}
    >
      Spike
      <svg
        viewBox="0 0 60 72"
        className="w-[0.62em] h-[0.72em] mx-[0.02em] inline-block"
        aria-hidden="true"
      >
        <path
          d="M6 72 A120 120 0 0 1 30 3 A120 120 0 0 1 54 72"
          fill="none"
          stroke="#3F37C9"
          strokeWidth="9"
        />
        <polygon points="30,26 22,47 30,66" fill="#0E6B45" />
        <polygon points="30,26 38,47 30,66" fill="#138A5A" />
      </svg>
      rc
    </span>
  );
}

function calcMonthlySip(targetLakhs, savedLakhs, annualRatePct, years) {
  const months = Math.max(12, years * 12);
  const fv = targetLakhs * 100000;
  const pv = savedLakhs * 100000;
  const r = annualRatePct / 100 / 12;
  const grownPv = pv * Math.pow(1 + r, months);
  const gap = Math.max(0, fv - grownPv);
  if (gap <= 0) return 0;
  return Math.round((gap * r) / (Math.pow(1 + r, months) - 1) / 100) * 100;
}

const TARGET_PRESETS = {
  INDIA: {
    key: "INDIA",
    label: "Indian universities",
    collegeName: "Krea University, 4 years",
    totalLakhs: 44.9,
    yrCosts: [11.9, 11.0, 11.0, 11.0],
    note: "Year 1 is ₹8.75L tuition, ₹2.25L living and ₹0.9L one-time fees. Years 2 to 4 assume no fee rise.",
  },
  FOREIGN_INDIA: {
    key: "FOREIGN_INDIA",
    label: "Foreign campuses in India",
    collegeName: "Southampton Delhi, 3 years, tuition only",
    totalLakhs: 39.6,
    yrCosts: [13.2, 13.2, 13.2],
    note: "Fees shown are for the August 2025 start. Living costs are not included.",
  },
  VALUE_ABROAD: {
    key: "VALUE_ABROAD",
    label: "Value abroad",
    collegeName: "Trinity College Dublin, 4 years assumed, tuition only",
    totalLakhs: 99.1,
    yrCosts: [24.8, 24.8, 24.8, 24.8],
    note: "Year 1 tuition is €23,250. Germany has no tuition at most public universities and needs ~₹12.7L/yr for living.",
  },
  TOP_GLOBAL: {
    key: "TOP_GLOBAL",
    label: "Top global universities",
    collegeName: "Stanford, 4 years assumed",
    totalLakhs: 343.0,
    yrCosts: [85.6, 85.6, 85.6, 85.6],
    note: "Tuition $67,731 plus room and board $22,944 each year. Usually needs scholarships or a different route.",
  },
};

export default function StudentScholarApp({ onBackToLanding }) {
  const [screen, setScreen] = useState("SIGNUP");
  const [viewMode, setViewMode] = useState("CHILD");

  const [signupStep, setSignupStep] = useState(1);
  const [profile, setProfile] = useState({
    parentName: "",
    parentMobile: "",
    parentEmail: "",
    childName: "",
    grade: "8",
    board: "ICSE",
  });
  const [consentAgreed, setConsentAgreed] = useState(false);
  const [marketingAgreed, setMarketingAgreed] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["4", "8", "2", "", "", ""]);
  const [homeCardIdx, setHomeCardIdx] = useState(0);
  const [homeCheckAnswers, setHomeCheckAnswers] = useState([0, 0, 0]);
  const [formErr, setFormErr] = useState("");

  const [qIdx, setQIdx] = useState(0);
  const [scores, setScores] = useState({
    COMP: 32,
    BIZ: 28,
    DESIGN: 26,
    BIO: 25,
    LAW: 24,
    PSYCH: 24,
  });
  const [styleCounts, setStyleCounts] = useState({ Builder: 2, Planner: 1 });
  const [taskResults, setTaskResults] = useState({
    12: true,
    13: true,
    14: false,
  });
  const [selectedChip, setSelectedChip] = useState("Made something");
  const [reflectionLine, setReflectionLine] = useState("");
  const [parentConfirmFit, setParentConfirmFit] = useState("Yes");
  const [homeTrialDay, setHomeTrialDay] = useState(2);

  const [activeRouteKey, setActiveRouteKey] = useState("INDIA");
  const [selectedCollegeId, setSelectedCollegeId] = useState("krea");

  const [studentTab, setStudentTab] = useState("HOME");
  const [activeSlot, setActiveSlot] = useState(1);
  const [activeHobby, setActiveHobby] = useState("MUSIC");
  const [activeWeek, setActiveWeek] = useState(1);
  const [openWeekTaskView, setOpenWeekTaskView] = useState(false);
  const [openSundayLogView, setOpenSundayLogView] = useState(false);

  const [coachReplyInput, setCoachReplyInput] = useState("");
  const [coachMessages, setCoachMessages] = useState([
    { role: "coach", text: "What could make your survey answers unfair?" },
    { role: "student", text: "I only asked people on my own floor." },
    { role: "coach", text: "Good catch. Who else could you ask?" },
  ]);
  const [sundayLog, setSundayLog] = useState({
    did: "Asked 14 neighbours. Two answered in Hindi.",
    stuck: "Some people skipped the evening question.",
    next: "Ask the other 11 on Saturday morning.",
  });

  const [parentTab, setParentTab] = useState("PROGRESS");
  const [targetRouteKey, setTargetRouteKey] = useState("INDIA");
  const [customCollegeTarget, setCustomCollegeTarget] = useState(null);
  const [alreadySavedLakhs, setAlreadySavedLakhs] = useState(2);
  const [feeRiseRate, setFeeRiseRate] = useState(0);
  const [adviserSlot, setAdviserSlot] = useState("Sat 11:30");
  const [copiedBanner, setCopiedBanner] = useState("");

  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {}
  }, [
    screen,
    signupStep,
    qIdx,
    studentTab,
    parentTab,
    openWeekTaskView,
    openSundayLogView,
  ]);

  const childName = profile.childName.trim() || "Aarav";
  const gradeStr = profile.grade || "8";
  const boardCode = profile.board || "CBSE";
  const yearsToCollege = Math.max(1, 13 - (parseInt(gradeStr, 10) || 8));

  const questions = buildPDF15Questions(boardCode, gradeStr);
  const computed = computeStudentProfile(
    scores,
    ["COMP", "BIZ", "DESIGN"],
    styleCounts,
    Object.values(taskResults).filter(Boolean).length,
    homeTrialDay >= 7
  );

  const primaryStream = computed.top3[0] || SIX_STREAMS.COMP;
  const backupStream = computed.top3[1] || SIX_STREAMS.BIZ;
  const activeStreamForLab = activeSlot === 2 ? backupStream : primaryStream;
  const boardRules =
    (primaryStream.subjectByBoard && primaryStream.subjectByBoard[boardCode]) ||
    SIX_STREAMS.COMP.subjectByBoard.CBSE;

  const labProject = getGradeAndBoardProject(
    activeStreamForLab.id,
    activeSlot,
    gradeStr,
    boardCode,
    activeSlot === 3 ? activeHobby : ""
  );

  const activeMoneyPreset =
    customCollegeTarget ||
    TARGET_PRESETS[targetRouteKey] ||
    TARGET_PRESETS.INDIA;
  const infMultiplier = Math.pow(1 + feeRiseRate / 100, yearsToCollege);
  const adjustedTotalLakhs =
    Math.round(activeMoneyPreset.totalLakhs * infMultiplier * 10) / 10;

  const sipCon = calcMonthlySip(
    adjustedTotalLakhs,
    alreadySavedLakhs,
    8.0,
    yearsToCollege
  );
  const sipBase = calcMonthlySip(
    adjustedTotalLakhs,
    alreadySavedLakhs,
    10.5,
    yearsToCollege
  );
  const sipGrow = calcMonthlySip(
    adjustedTotalLakhs,
    alreadySavedLakhs,
    12.5,
    yearsToCollege
  );
  const sipOneYearLater = calcMonthlySip(
    adjustedTotalLakhs,
    alreadySavedLakhs,
    10.5,
    Math.max(1, yearsToCollege - 1)
  );
  const waitingPenalty = Math.max(0, sipOneYearLater - sipBase);

  const copyTextHelper = (txt, label) => {
    try {
      navigator.clipboard.writeText(txt);
    } catch (e) {}
    setCopiedBanner(label || "Copied!");
    setTimeout(() => setCopiedBanner(""), 2500);
  };

  const selectedCollegeObj =
    SIXTEEN_COLLEGES.find((c) => c.id === selectedCollegeId) ||
    SIXTEEN_COLLEGES[0];

  return (
    <div
      className="min-h-screen bg-[#F7F7FC] text-[#0B1020] pb-24 antialiased"
      style={{
        fontFamily: '"Hanken Grotesk", system-ui, -apple-system, sans-serif',
        fontSize: "17px",
        lineHeight: 1.55,
      }}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap"
      />
      <style>{`
        .sa-display { font-family: "Sora", system-ui, sans-serif; letter-spacing: -0.02em; line-height: 1.15; }
        .sa-card { background: #FFFFFF; border: 1.5px solid #DCDDEB; border-radius: 16px; }
        .sa-btn { background: #3F37C9; color: #FFFFFF; font-weight: 600; border-radius: 12px; padding: 14px 20px; width: 100%; text-align: center; cursor: pointer; border: 0; font-size: 17px; }
        .sa-btn-ghost { background: #FFFFFF; color: #0B1020; font-weight: 600; border-radius: 12px; padding: 13px 20px; width: 100%; text-align: center; cursor: pointer; border: 1.5px solid #DCDDEB; font-size: 16px; }
      `}</style>

      {copiedBanner && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0E6B45] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
          ✓ {copiedBanner}
        </div>
      )}

      {/* TOP MOBILE HEADER */}
      <header className="sticky top-0 z-30 bg-[#F7F7FC]/95 backdrop-blur-md border-b border-[#DCDDEB] px-4 py-3">
        <div className="max-w-[520px] mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            {screen !== "SIGNUP" && (
              <button
                type="button"
                onClick={() => {
                  if (openWeekTaskView) return setOpenWeekTaskView(false);
                  if (openSundayLogView) return setOpenSundayLogView(false);
                  if (screen === "COLLEGE_DETAIL")
                    return setScreen("SHORTLIST");
                  if (screen === "SHORTLIST") return setScreen("ROUTES");
                  if (screen === "ROUTES") return setScreen("SUBJECTS");
                  if (screen === "PICK_TARGET") return setScreen("SHORTLIST");
                  setScreen("STUDENT_APP");
                }}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#0B1020] hover:bg-[#ECEBFD] font-bold text-lg cursor-pointer"
              >
                ‹
              </button>
            )}
            <BrandMark onClick={onBackToLanding} />
          </div>

          <div className="flex items-center gap-2">
            {screen !== "SIGNUP" && (
              <button
                type="button"
                onClick={() => {
                  const nextMode = viewMode === "CHILD" ? "PARENT" : "CHILD";
                  setViewMode(nextMode);
                  if (screen === "STUDENT_APP" && nextMode === "PARENT")
                    setScreen("PARENT_APP");
                  else if (screen === "PARENT_APP" && nextMode === "CHILD")
                    setScreen("STUDENT_APP");
                }}
                className="px-3 py-1 rounded-full bg-[#ECEBFD] text-[#3F37C9] text-xs font-bold cursor-pointer"
              >
                {viewMode === "CHILD"
                  ? "Parent view"
                  : `${childName} · Gr ${gradeStr}`}
              </button>
            )}
            {screen === "SIGNUP" && onBackToLanding && (
              <button
                type="button"
                onClick={onBackToLanding}
                className="text-sm font-medium text-[#4A5068] cursor-pointer"
              >
                Back to site
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-[520px] mx-auto px-4 pt-5 space-y-5">
        {/* PDF 01: SIGNUP */}
        {screen === "SIGNUP" && (
          <div className="space-y-5">
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className={
                    "h-1.5 rounded-full " +
                    (signupStep > n || signupStep === 5
                      ? "bg-[#0E6B45]"
                      : Math.floor(signupStep) === n
                      ? "bg-[#3F37C9]"
                      : "bg-[#DCDDEB]")
                  }
                />
              ))}
            </div>

            {signupStep === 1 && (
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase text-[#3F37C9]">
                    Sign up · 1 of 4 · You
                  </p>
                  <h1 className="sa-display text-2xl sm:text-3xl font-bold mt-1">
                    Start with you, the parent.
                  </h1>
                  <p className="text-[#4A5068] text-base mt-2">
                    Your child answers nothing until you approve. This takes
                    about two minutes.
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold text-sm mb-1.5">
                      Your name
                    </label>
                    <input
                      type="text"
                      value={profile.parentName}
                      onChange={(e) =>
                        setProfile({ ...profile, parentName: e.target.value })
                      }
                      className="w-full bg-white border-[1.5px] border-[#DCDDEB] rounded-xl p-3.5 text-base"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-sm mb-1.5">
                      Mobile number
                    </label>
                    <div className="grid grid-cols-[auto_1fr] gap-2">
                      <span className="flex items-center px-3.5 bg-[#ECEBFD] text-[#3F37C9] font-bold rounded-xl border border-[#DCDDEB]">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={profile.parentMobile}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            parentMobile: e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 10),
                          })
                        }
                        className="w-full bg-white border-[1.5px] border-[#DCDDEB] rounded-xl p-3.5 text-base"
                      />
                    </div>
                    <p className="text-xs text-[#4A5068] mt-1.5">
                      We send a code here, and a Sunday update on WhatsApp.
                    </p>
                  </div>
                  <div>
                    <label className="block font-semibold text-sm mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profile.parentEmail}
                      onChange={(e) =>
                        setProfile({ ...profile, parentEmail: e.target.value })
                      }
                      className="w-full bg-white border-[1.5px] border-[#DCDDEB] rounded-xl p-3.5 text-base"
                    />
                  </div>
                </div>
                {formErr && <p className="text-sm text-[#B3261E]">{formErr}</p>}
                <button
                  type="button"
                  onClick={() => {
                    if (!profile.parentName.trim())
                      return setFormErr("Enter your name.");
                    setFormErr("");
                    setSignupStep(2);
                  }}
                  className="sa-btn"
                >
                  Continue
                </button>
                <div className="pt-2 border-t border-[#DCDDEB] flex justify-between text-xs font-semibold text-[#3F37C9]">
                  <span
                    onClick={() => setSignupStep(5)}
                    className="cursor-pointer"
                  >
                    Skip to child quest ›
                  </span>
                  <span
                    onClick={() => {
                      setProfile({
                        ...profile,
                        childName: "Aarav",
                        grade: "8",
                        board: "CBSE",
                      });
                      setScreen("RESULT");
                    }}
                    className="cursor-pointer"
                  >
                    See sample result ›
                  </span>
                </div>
              </div>
            )}

            {signupStep === 2 && (
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase text-[#3F37C9]">
                    Sign up · 2 of 4 · Your child
                  </p>
                  <h1 className="sa-display text-2xl sm:text-3xl font-bold mt-1">
                    Tell us about your child.
                  </h1>
                </div>
                <div>
                  <label className="block font-semibold text-sm mb-1.5">
                    First name or nickname
                  </label>
                  <input
                    type="text"
                    placeholder="For example, Raj or Aarav"
                    value={profile.childName}
                    onChange={(e) =>
                      setProfile({ ...profile, childName: e.target.value })
                    }
                    className="w-full bg-white border-[1.5px] border-[#DCDDEB] rounded-xl p-3.5 text-base"
                  />
                  <p className="text-xs text-[#4A5068] mt-1">
                    First name only. We never ask for a surname, school or
                    photo.
                  </p>
                </div>
                <div>
                  <label className="block font-semibold text-sm mb-2">
                    Grade now
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {["7", "8", "9", "10"].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setProfile({ ...profile, grade: g })}
                        className={
                          "py-3 rounded-xl font-bold border-[1.5px] cursor-pointer " +
                          (profile.grade === g
                            ? "bg-[#3F37C9] text-white border-[#3F37C9]"
                            : "bg-white border-[#DCDDEB]")
                        }
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-sm mb-2">
                    Board
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      ["CBSE", "CBSE"],
                      ["ICSE", "ICSE"],
                      ["STATE", "State board"],
                      ["IB", "IB"],
                      ["IGCSE", "IGCSE"],
                    ].map(([c, l]) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setProfile({ ...profile, board: c })}
                        className={
                          "px-4 py-2.5 rounded-xl font-bold text-sm border-[1.5px] cursor-pointer " +
                          (profile.board === c
                            ? "bg-[#3F37C9] text-white border-[#3F37C9]"
                            : "bg-white border-[#DCDDEB]")
                        }
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSignupStep(1)}
                    className="sa-btn-ghost w-1/3"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setSignupStep(3)}
                    className="sa-btn flex-1"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {signupStep === 3 && (
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase text-[#3F37C9]">
                    Sign up · 3 of 4 · Consent
                  </p>
                  <h1 className="sa-display text-2xl font-bold mt-1">
                    Your consent, in plain words.
                  </h1>
                </div>
                <div className="sa-card p-5 space-y-2.5 text-sm text-[#4A5068]">
                  <div className="font-bold text-[#0B1020]">
                    What you are agreeing to
                  </div>
                  <p>
                    • {childName} answers 15 questions about what they enjoy and
                    how they like to work.
                  </p>
                  <p>
                    • We use the answers to build your family&apos;s report,
                    subject plan and college map.
                  </p>
                  <p>
                    • No ads to {childName}, no tracking for marketing, and we
                    never sell data.
                  </p>
                </div>
                <label className="sa-card p-4 flex items-start gap-3 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={consentAgreed}
                    onChange={(e) => setConsentAgreed(e.target.checked)}
                    className="w-5 h-5 mt-0.5 accent-[#3F37C9]"
                  />
                  <span>
                    I am {childName}&apos;s parent or legal guardian, and I
                    agree to this.
                  </span>
                </label>
                <label className="sa-card p-4 flex items-start gap-3 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={marketingAgreed}
                    onChange={(e) => setMarketingAgreed(e.target.checked)}
                    className="w-5 h-5 mt-0.5 accent-[#3F37C9]"
                  />
                  <span>
                    Send me occasional updates about new features (Optional).
                  </span>
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSignupStep(2)}
                    className="sa-btn-ghost w-1/3"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setSignupStep(3.5)}
                    className="sa-btn flex-1"
                  >
                    Send my code
                  </button>
                </div>
              </div>
            )}

            {signupStep === 3.5 && (
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase text-[#3F37C9]">
                    Sign up · 3 of 4 · Verify
                  </p>
                  <h1 className="sa-display text-2xl font-bold mt-1">
                    Enter the 6-digit code.
                  </h1>
                  <p className="text-sm text-[#4A5068] mt-1">
                    Sent to +91 {profile.parentMobile || "98••• ••210"}.
                    Confirms you are {childName}&apos;s parent.
                  </p>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {otpDigits.map((d, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={d}
                      onChange={(e) => {
                        const next = [...otpDigits];
                        next[i] = e.target.value;
                        setOtpDigits(next);
                      }}
                      className="w-full h-14 text-center sa-display text-xl font-bold bg-white border-2 border-[#DCDDEB] rounded-xl"
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setSignupStep(4)}
                  className="sa-btn"
                >
                  Verify and continue
                </button>
              </div>
            )}

            {signupStep === 4 && (
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase text-[#3F37C9]">
                    Sign up · 4 of 4 · Home check
                  </p>
                  <h1 className="sa-display text-2xl font-bold mt-1">
                    Three quick questions about {childName} at home.
                  </h1>
                </div>
                {(() => {
                  const cards = [
                    {
                      tag: "CARD 1 OF 3 · FREE TIME",
                      q: `What does ${childName} do with free time?`,
                      opts: [
                        "Builds or fixes things",
                        "Draws, designs or makes things look good",
                        "Reads, writes or tells stories",
                        "Plays games or competes",
                        "Talks to people and helps them",
                      ],
                    },
                    {
                      tag: "CARD 2 OF 3 · STUDY HABITS",
                      q: `Biggest worry about ${childName}'s study habits?`,
                      opts: [
                        "Gets bored by rote memorising",
                        "Worries about tough Maths later",
                        "Starts things but struggles to finish",
                        "Too much screen time",
                      ],
                    },
                    {
                      tag: "CARD 3 OF 3 · GRADE 12 REGRET",
                      q: "What would you most regret by Grade 12?",
                      opts: [
                        "Dropping a subject that closes colleges",
                        "Being unprepared for college fees",
                        "Good marks, but zero projects",
                        "Wrong stream choice",
                      ],
                    },
                  ];
                  const c = cards[homeCardIdx];
                  return (
                    <div className="sa-card p-5 space-y-3">
                      <p className="text-xs font-bold text-[#4A5068]">
                        {c.tag}
                      </p>
                      <h2 className="sa-display text-lg font-bold">{c.q}</h2>
                      <div className="space-y-2">
                        {c.opts.map((o, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              const next = [...homeCheckAnswers];
                              next[homeCardIdx] = idx;
                              setHomeCheckAnswers(next);
                            }}
                            className={
                              "w-full p-3.5 rounded-xl border text-left text-sm font-semibold cursor-pointer " +
                              (homeCheckAnswers[homeCardIdx] === idx
                                ? "bg-[#ECEBFD] border-[#3F37C9]"
                                : "bg-white border-[#DCDDEB]")
                            }
                          >
                            {o}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })()}
                <button
                  type="button"
                  onClick={() =>
                    homeCardIdx < 2
                      ? setHomeCardIdx(homeCardIdx + 1)
                      : setSignupStep(5)
                  }
                  className="sa-btn"
                >
                  {homeCardIdx < 2 ? "Next card" : "Continue"}
                </button>
              </div>
            )}

            {signupStep === 5 && (
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase text-[#0E6B45]">
                    Sign up done
                  </p>
                  <h1 className="sa-display text-2xl sm:text-3xl font-bold mt-1">
                    Ready for {childName}?
                  </h1>
                  <p className="text-sm text-[#4A5068] mt-1">
                    15 short questions and a 1-minute logic task. About 3
                    minutes. No marks.
                  </p>
                </div>
                <div className="sa-card p-5 space-y-2">
                  <div className="font-bold text-sm">
                    Not with {childName} right now?
                  </div>
                  <p className="text-xs text-[#4A5068]">
                    Send them a link on WhatsApp.
                  </p>
                  <div className="flex justify-between items-center bg-[#F7F7FC] p-3 rounded-xl border border-[#DCDDEB] text-xs">
                    <span>spikearc.com/start/{childName.toLowerCase()}</span>
                    <button
                      type="button"
                      onClick={() =>
                        copyTextHelper(window.location.href, "Link copied!")
                      }
                      className="text-[#3F37C9] font-bold cursor-pointer"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setScreen("QUEST_WELCOME")}
                  className="sa-btn"
                >
                  Hand the phone to {childName}
                </button>
              </div>
            )}
          </div>
        )}

        {/* PDF 02: QUEST WELCOME */}
        {screen === "QUEST_WELCOME" && (
          <div className="space-y-5 text-center pt-2">
            <div className="w-44 h-36 mx-auto">
              <svg viewBox="0 0 240 200" className="w-full h-full">
                <path
                  d="M15 195 A160 160 0 0 1 120 15 A160 160 0 0 1 225 195"
                  fill="none"
                  stroke="#3F37C9"
                  strokeWidth="8"
                />
                <path
                  d="M48 195 A115 115 0 0 1 120 55 A115 115 0 0 1 192 195"
                  fill="none"
                  stroke="#7B75E8"
                  strokeWidth="7"
                />
                <path
                  d="M82 195 A75 75 0 0 1 120 100 A75 75 0 0 1 158 195"
                  fill="none"
                  stroke="#0E6B45"
                  strokeWidth="7"
                />
              </svg>
            </div>
            <div className="text-left space-y-1">
              <h1 className="sa-display text-2xl sm:text-3xl font-bold">
                Hi {childName}. Let&apos;s find what fits you.
              </h1>
              <p className="text-sm text-[#4A5068]">
                This is not a test. Pick the answer that feels most like you.
              </p>
            </div>
            <div className="sa-card p-5 text-left space-y-3 text-sm">
              <div>
                <strong>15 short questions</strong> · Tap to answer. No typing.
              </div>
              <div>
                <strong>About 5 minutes</strong> · You can stop and come back.
              </div>
              <div>
                <strong>No marks</strong> · There are no right answers.
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setQIdx(0);
                setScreen("QUEST");
              }}
              className="sa-btn"
            >
              Start
            </button>
          </div>
        )}

        {/* PDF 02 & 03: 15 QUESTIONS */}
        {screen === "QUEST" && (
          <div className="space-y-5">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-[#0E6B45]">
                <span>Question {qIdx + 1} of 15</span>
                <span
                  onClick={() => setScreen("RESULT")}
                  className="text-[#4A5068] cursor-pointer"
                >
                  Pause
                </span>
              </div>
              <div className="w-full h-2 bg-[#DCDDEB] rounded-full overflow-hidden">
                <div
                  style={{ width: `${((qIdx + 1) / 15) * 100}%` }}
                  className="h-full bg-[#0E6B45]"
                />
              </div>
            </div>

            {questions[qIdx].type === "task" && (
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                ⏱ Quick task · {questions[qIdx].timer}
              </span>
            )}

            <h1 className="sa-display text-2xl font-bold">
              {questions[qIdx].q}
            </h1>

            {questions[qIdx].type === "reflection" ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {questions[qIdx].chips.map((ch) => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => setSelectedChip(ch)}
                      className={
                        "px-4 py-2 rounded-full text-sm font-semibold border cursor-pointer " +
                        (selectedChip === ch
                          ? "bg-[#3F37C9] text-white border-[#3F37C9]"
                          : "bg-white border-[#DCDDEB]")
                      }
                    >
                      {ch}
                    </button>
                  ))}
                </div>
                <textarea
                  rows={3}
                  maxLength={140}
                  placeholder="I built a small game for my cousin."
                  value={reflectionLine}
                  onChange={(e) => setReflectionLine(e.target.value)}
                  className="w-full bg-white border-[1.5px] border-[#DCDDEB] rounded-xl p-3.5 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setScreen("RESULT")}
                  className="sa-btn"
                >
                  See my results
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {questions[qIdx].opts.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setScores((p) => ({
                        ...p,
                        [opt.s]: (p[opt.s] || 25) + (opt.w || 15),
                      }));
                      if (opt.style)
                        setStyleCounts((p) => ({
                          ...p,
                          [opt.style]: (p[opt.style] || 0) + 1,
                        }));
                      if (typeof opt.isCorrectAptitude === "boolean")
                        setTaskResults((p) => ({
                          ...p,
                          [questions[qIdx].id]: opt.isCorrectAptitude,
                        }));
                      if (qIdx < 14) setQIdx(qIdx + 1);
                      else setScreen("RESULT");
                    }}
                    className="w-full p-4 bg-white hover:bg-[#ECEBFD]/50 border-[1.5px] border-[#DCDDEB] rounded-xl text-left font-semibold text-base cursor-pointer"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            <div className="flex justify-between text-xs text-[#4A5068] pt-2">
              <span
                onClick={() =>
                  qIdx < 14 ? setQIdx(qIdx + 1) : setScreen("RESULT")
                }
                className="underline cursor-pointer"
              >
                Skip this one
              </span>
              <span>{14 - qIdx} to go</span>
            </div>
          </div>
        )}

        {/* RESULT SCREEN */}
        {screen === "RESULT" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 bg-[#ECEBFD] p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setViewMode("CHILD")}
                className={
                  "py-2 rounded-lg text-sm font-bold cursor-pointer " +
                  (viewMode === "CHILD"
                    ? "bg-white shadow-sm"
                    : "text-[#4A5068]")
                }
              >
                Child view
              </button>
              <button
                type="button"
                onClick={() => setViewMode("PARENT")}
                className={
                  "py-2 rounded-lg text-sm font-bold cursor-pointer " +
                  (viewMode === "PARENT"
                    ? "bg-white shadow-sm"
                    : "text-[#4A5068]")
                }
              >
                Parent view
              </button>
            </div>

            <h1 className="sa-display text-2xl font-bold">
              {viewMode === "CHILD"
                ? `Hi ${childName}, here is what fits you`
                : `What this means for ${childName}`}
            </h1>

            <div className="sa-card border-2 border-[#3F37C9] p-5 space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#3F37C9]">BEST FIT</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E3F5EC] text-[#0E6B45]">
                  Strong fit
                </span>
              </div>
              <div className="sa-display text-lg font-bold">
                {primaryStream.title}
              </div>
              <p className="text-sm text-[#4A5068]">
                {viewMode === "CHILD"
                  ? "You like building things and solving puzzles that follow rules."
                  : boardRules.keepOpen}
              </p>
            </div>

            <div className="sa-card p-5 space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#3F37C9]">BACKUP</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ECEBFD] text-[#3F37C9]">
                  Good fit
                </span>
              </div>
              <div className="sa-display text-base font-bold">
                {backupStream.title}
              </div>
            </div>

            {viewMode === "PARENT" && (
              <div className="sa-card p-5 space-y-2 text-sm">
                <div className="text-xs font-bold text-[#3F37C9]">
                  APTITUDE, IN WORDS
                </div>
                <div className="flex justify-between">
                  <span>Systems logic</span>
                  <strong>{taskResults[12] ? "Comfortable" : "Growing"}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Money maths</span>
                  <strong>{taskResults[13] ? "Comfortable" : "Growing"}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Spot the flaw</span>
                  <strong>{taskResults[14] ? "Comfortable" : "Growing"}</strong>
                </div>
                <div className="pt-2 border-t border-[#DCDDEB]">
                  <span className="font-bold block mb-1.5">
                    Does the top fit sound like {childName}?
                  </span>
                  <div className="flex gap-2">
                    {["Yes", "Somewhat", "No"].map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => setParentConfirmFit(a)}
                        className={
                          "px-3.5 py-1.5 rounded-full text-xs font-bold border cursor-pointer " +
                          (parentConfirmFit === a
                            ? "bg-[#3F37C9] text-white"
                            : "bg-white")
                        }
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-[#ECEBFD] rounded-2xl p-4 flex justify-between items-center">
              <div>
                <div className="font-bold text-sm">
                  Optional: 7-day home trial
                </div>
                <div className="text-xs text-[#4A5068]">
                  3-step activity to confirm {primaryStream.shortName}.
                </div>
              </div>
              <button
                type="button"
                onClick={() => setScreen("HOME_TRIAL")}
                className="px-3.5 py-2 bg-white text-[#3F37C9] font-bold text-xs rounded-xl cursor-pointer"
              >
                Open
              </button>
            </div>

            <button
              type="button"
              onClick={() => setScreen("SUBJECTS")}
              className="sa-btn"
            >
              Choose subjects and colleges
            </button>
          </div>
        )}

        {/* 7-DAY HOME TRIAL */}
        {screen === "HOME_TRIAL" && (
          <div className="space-y-4">
            <h1 className="sa-display text-2xl font-bold">7-day home trial</h1>
            <div className="sa-card p-4 space-y-1">
              <div className="text-xs font-bold text-[#3F37C9]">
                {primaryStream.sevenDayChallenge.step1Title}
              </div>
              <p className="text-sm">{primaryStream.sevenDayChallenge.step1}</p>
            </div>
            <div className="sa-card p-4 space-y-1">
              <div className="text-xs font-bold text-[#3F37C9]">
                {primaryStream.sevenDayChallenge.step2Title}
              </div>
              <p className="text-sm">{primaryStream.sevenDayChallenge.step2}</p>
            </div>
            <div className="sa-card p-4 space-y-1">
              <div className="text-xs font-bold text-[#3F37C9]">
                {primaryStream.sevenDayChallenge.step3Title}
              </div>
              <p className="text-sm">{primaryStream.sevenDayChallenge.step3}</p>
            </div>
            <button
              type="button"
              onClick={() => setScreen("SUBJECTS")}
              className="sa-btn"
            >
              Continue to subjects & colleges
            </button>
          </div>
        )}

        {/* PDF 04: SUBJECTS */}
        {screen === "SUBJECTS" && (
          <div className="space-y-4">
            <p className="text-xs font-bold text-[#3F37C9]">
              SUBJECTS · STEP 1 OF 3 · GRADE {gradeStr}
            </p>
            <h1 className="sa-display text-2xl font-bold">
              Subjects to keep for {primaryStream.shortName}
            </h1>
            <div className="flex flex-wrap gap-1.5">
              {["CBSE", "ICSE", "STATE", "IB", "IGCSE"].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setProfile({ ...profile, board: b })}
                  className={
                    "px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer " +
                    (boardCode === b ? "bg-[#3F37C9] text-white" : "bg-white")
                  }
                >
                  {b}
                </button>
              ))}
            </div>
            <div className="sa-card p-5 space-y-2 text-sm">
              <div className="font-bold">Recommended {boardCode} Plan</div>
              <p>{boardRules.keepOpen}</p>
            </div>
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-sm text-amber-950">
              <strong className="block text-xs uppercase mb-1">HEADS-UP</strong>
              {boardRules.closesWarning}
            </div>
            <button
              type="button"
              onClick={() => setScreen("ROUTES")}
              className="sa-btn"
            >
              Pick a college route
            </button>
          </div>
        )}

        {/* PDF 04: COLLEGE ROUTES */}
        {screen === "ROUTES" && (
          <div className="space-y-4">
            <p className="text-xs font-bold text-[#3F37C9]">
              COLLEGES · STEP 2 OF 3
            </p>
            <h1 className="sa-display text-2xl font-bold">
              Which kind of college do you want to explore first?
            </h1>
            {[
              [
                "INDIA",
                "Indian universities",
                "Christ, VIT, Ahmedabad, BITS, Krea, Ashoka, Plaksha, IIIT-H",
                "₹3.2L to ₹12.3L a year",
                "15%",
              ],
              [
                "FOREIGN_INDIA",
                "Foreign campuses in India",
                "Southampton Delhi, Liverpool Bengaluru",
                "₹11.5L to ₹13.2L a year, tuition only",
                "20%",
              ],
              [
                "VALUE_ABROAD",
                "Value abroad",
                "TU Munich, Trinity College Dublin",
                "₹17L to ₹24.8L a year",
                "32%",
              ],
              [
                "TOP_GLOBAL",
                "Top global universities",
                "NUS, Imperial, Stanford",
                "₹29.5L to ₹85.6L a year",
                "92%",
              ],
            ].map(([rKey, title, sub, cost, wPct]) => (
              <div
                key={rKey}
                onClick={() => {
                  setActiveRouteKey(rKey);
                  setTargetRouteKey(rKey);
                  setScreen("SHORTLIST");
                }}
                className={
                  "sa-card p-4 space-y-2 cursor-pointer " +
                  (activeRouteKey === rKey ? "border-2 border-[#3F37C9]" : "")
                }
              >
                <div className="sa-display text-base font-bold">{title}</div>
                <div className="text-xs text-[#4A5068]">{sub}</div>
                <div className="text-sm font-bold text-[#3F37C9]">{cost}</div>
                <div className="w-full h-2 bg-[#ECEBFD] rounded-full overflow-hidden">
                  <div
                    style={{ width: wPct }}
                    className="h-full bg-[#3F37C9]"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SHORTLIST */}
        {screen === "SHORTLIST" && (
          <div className="space-y-4">
            <h1 className="sa-display text-2xl font-bold">
              Colleges in this route
            </h1>
            <div className="flex flex-wrap gap-1.5">
              {[
                ["INDIA", "Indian (9)"],
                ["FOREIGN_INDIA", "Foreign in India (2)"],
                ["VALUE_ABROAD", "Value abroad (2)"],
                ["TOP_GLOBAL", "Top global (3)"],
              ].map(([k, l]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setActiveRouteKey(k)}
                  className={
                    "px-3 py-1 rounded-full text-xs font-bold border cursor-pointer " +
                    (activeRouteKey === k
                      ? "bg-[#3F37C9] text-white"
                      : "bg-white")
                  }
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="space-y-2.5">
              {SIXTEEN_COLLEGES.filter((c) => c.route === activeRouteKey).map(
                (col) => (
                  <div
                    key={col.id}
                    onClick={() => {
                      setSelectedCollegeId(col.id);
                      setScreen("COLLEGE_DETAIL");
                    }}
                    className="sa-card p-4 flex justify-between items-center cursor-pointer hover:border-[#3F37C9]"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-[#3F37C9] uppercase">
                        {col.tier}
                      </span>
                      <div className="sa-display text-base font-bold">
                        {col.name}
                      </div>
                      <div className="text-xs text-[#4A5068]">
                        {col.shortSub}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm">{col.shortCost}</div>
                      <span className="text-xs text-[#3F37C9] font-bold">
                        Open ›
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
            <button
              type="button"
              onClick={() => setScreen("PICK_TARGET")}
              className="sa-btn"
            >
              Choose my savings target
            </button>
          </div>
        )}

        {/* COLLEGE DETAIL */}
        {screen === "COLLEGE_DETAIL" && (
          <div className="space-y-4">
            <div>
              <h1 className="sa-display text-2xl font-bold">
                {selectedCollegeObj.name}
              </h1>
              <p className="text-sm text-[#4A5068]">
                {selectedCollegeObj.course}
              </p>
            </div>
            <div className="sa-card p-4 space-y-1.5 text-sm">
              <div className="font-bold">How you get in</div>
              {selectedCollegeObj.howIn.map((x, i) => (
                <p key={i}>• {x}</p>
              ))}
            </div>
            <div className="sa-card p-4 space-y-1.5 text-sm">
              <div className="font-bold">What it asks for</div>
              {selectedCollegeObj.asksFor.map((x, i) => (
                <p key={i}>• {x}</p>
              ))}
            </div>
            <div className="sa-card p-4 space-y-1.5 text-sm">
              <div className="font-bold">What it costs</div>
              {selectedCollegeObj.costs.map(([k, v], i) => (
                <div
                  key={i}
                  className="flex justify-between py-1 border-b border-[#DCDDEB] last:border-0"
                >
                  <span className="text-[#4A5068]">{k}</span>
                  <strong>{v}</strong>
                </div>
              ))}
            </div>
            <div className="sa-card p-4 space-y-1.5 text-sm">
              <div className="font-bold">Money help & Key dates</div>
              {selectedCollegeObj.moneyHelp.map((x, i) => (
                <p key={i}>• {x}</p>
              ))}
              <p className="text-xs text-[#4A5068] pt-1">
                {selectedCollegeObj.keyDates}
              </p>
            </div>
            <div className="bg-[#ECEBFD] rounded-2xl p-4 text-xs space-y-1">
              <strong className="uppercase block">NOT YET CHECKED</strong>
              {selectedCollegeObj.notChecked.map((x, i) => (
                <div key={i}>• {x}</div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setCustomCollegeTarget({
                  key: selectedCollegeObj.route,
                  label: selectedCollegeObj.name,
                  collegeName: `${selectedCollegeObj.name}, ${selectedCollegeObj.yearsLen} years`,
                  totalLakhs: selectedCollegeObj.targetLakhs,
                  yrCosts: selectedCollegeObj.yrBreakdown,
                  note: selectedCollegeObj.source,
                });
                setViewMode("PARENT");
                setParentTab("MONEY");
                setScreen("PARENT_APP");
              }}
              className="sa-btn"
            >
              Plan the savings for this route
            </button>
          </div>
        )}

        {/* PICK TARGET */}
        {screen === "PICK_TARGET" && (
          <div className="space-y-4">
            <p className="text-xs font-bold text-[#3F37C9]">
              TARGET · STEP 3 OF 3
            </p>
            <h1 className="sa-display text-2xl font-bold">
              Pick your savings target
            </h1>
            {Object.values(TARGET_PRESETS).map((tp) => {
              const mo = calcMonthlySip(
                tp.totalLakhs,
                alreadySavedLakhs,
                10.5,
                yearsToCollege
              );
              return (
                <div
                  key={tp.key}
                  onClick={() => {
                    setTargetRouteKey(tp.key);
                    setCustomCollegeTarget(null);
                  }}
                  className={
                    "sa-card p-4 flex justify-between items-center cursor-pointer " +
                    (targetRouteKey === tp.key
                      ? "border-2 border-[#3F37C9]"
                      : "")
                  }
                >
                  <div>
                    <div className="font-bold text-base">{tp.label}</div>
                    <div className="text-xs text-[#4A5068]">
                      {tp.collegeName}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="sa-display font-bold text-[#3F37C9]">
                      ₹{tp.totalLakhs}L
                    </div>
                    <div className="text-xs text-[#4A5068]">
                      ₹{mo.toLocaleString("en-IN")}/mo
                    </div>
                  </div>
                </div>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setStudentTab("HOME");
                setScreen("STUDENT_APP");
              }}
              className="sa-btn"
            >
              Use this target
            </button>
          </div>
        )}

        {/* STUDENT APP (4 BOTTOM TABS) */}
        {screen === "STUDENT_APP" && (
          <div className="space-y-4">
            {studentTab === "HOME" && (
              <div className="space-y-4">
                <div>
                  <h1 className="sa-display text-3xl font-bold">
                    Hi {childName}
                  </h1>
                  <span className="text-xs font-bold text-[#4A5068]">
                    Grade {gradeStr} · {boardCode}
                  </span>
                </div>
                <div className="sa-card border-2 border-[#3F37C9] p-5 space-y-2">
                  <span className="text-xs font-bold text-[#3F37C9]">
                    THIS WEEK · SPRINT {activeWeek} OF 12
                  </span>
                  <div className="sa-display text-lg font-bold">
                    {labProject.title}
                  </div>
                  <p className="text-xs text-[#4A5068]">
                    {labProject.whatItIs}
                  </p>
                </div>
                <div
                  onClick={() => {
                    setStudentTab("SPRINT");
                    setOpenSundayLogView(true);
                  }}
                  className="bg-[#E3F5EC] border border-[#0E6B45]/40 rounded-2xl p-4 cursor-pointer"
                >
                  <span className="text-xs font-bold text-[#0E6B45]">
                    SUNDAY LOG · 3 SUNDAYS IN A ROW
                  </span>
                  <div className="font-bold text-sm mt-0.5">
                    Three short boxes. Your parent gets a summary on WhatsApp.
                  </div>
                </div>
                <div
                  onClick={() => setScreen("SUBJECTS")}
                  className="sa-card p-4 flex justify-between cursor-pointer"
                >
                  <div>
                    <div className="font-bold text-sm">Subjects to keep</div>
                    <div className="text-xs text-[#4A5068]">
                      {boardCode} subject plan
                    </div>
                  </div>
                  <span className="font-bold text-[#3F37C9]">›</span>
                </div>
                <div
                  onClick={() => setScreen("ROUTES")}
                  className="sa-card p-4 flex justify-between cursor-pointer"
                >
                  <div>
                    <div className="font-bold text-sm">Colleges that fit</div>
                    <div className="text-xs text-[#4A5068]">
                      16 official college profiles
                    </div>
                  </div>
                  <span className="font-bold text-[#3F37C9]">›</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStudentTab("SPRINT");
                    setOpenWeekTaskView(true);
                  }}
                  className="sa-btn"
                >
                  Continue sprint
                </button>
              </div>
            )}

            {studentTab === "PROJECT" && (
              <div className="space-y-4">
                <p className="text-xs font-bold text-[#3F37C9]">
                  SLOT {activeSlot} OF 3 · GRADE {gradeStr} · {boardCode}
                </p>
                <h1 className="sa-display text-2xl font-bold">
                  {labProject.title}
                </h1>
                <p className="text-sm text-[#4A5068]">{labProject.whatItIs}</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    [1, "Slot 1: Best Fit"],
                    [2, "Slot 2: Backup"],
                    [3, "Slot 3: Hobby"],
                  ].map(([sNum, sLab]) => (
                    <button
                      key={sNum}
                      type="button"
                      onClick={() => setActiveSlot(sNum)}
                      className={
                        "py-2 rounded-xl text-xs font-bold border cursor-pointer " +
                        (activeSlot === sNum
                          ? "bg-[#3F37C9] text-white"
                          : "bg-white")
                      }
                    >
                      {sLab}
                    </button>
                  ))}
                </div>
                {activeSlot === 3 && (
                  <div className="flex flex-wrap gap-1.5">
                    {HOBBY_REMIX_OPTIONS.map((h) => (
                      <button
                        key={h.id}
                        type="button"
                        onClick={() => setActiveHobby(h.id)}
                        className={
                          "px-3 py-1 rounded-full text-xs font-bold border cursor-pointer " +
                          (activeHobby === h.id
                            ? "bg-[#0E6B45] text-white"
                            : "bg-white")
                        }
                      >
                        {h.label}
                      </button>
                    ))}
                  </div>
                )}
                <div className="sa-card p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Who</span>
                    <strong>{GRADE_CONFIG[gradeStr]?.sampleTarget}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Time</span>
                    <strong>4 weeks · 20 min a weekend</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Format</span>
                    <strong>{labProject.formatName}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStudentTab("SPRINT");
                    setOpenWeekTaskView(true);
                  }}
                  className="sa-btn"
                >
                  Start week {activeWeek}
                </button>
              </div>
            )}

            {studentTab === "SPRINT" &&
              !openWeekTaskView &&
              !openSundayLogView && (
                <div className="space-y-4">
                  <h1 className="sa-display text-2xl font-bold">
                    4 weeks, one clear goal
                  </h1>
                  {[1, 2, 3, 4].map((w) => (
                    <div
                      key={w}
                      onClick={() => {
                        setActiveWeek(w);
                        setOpenWeekTaskView(true);
                      }}
                      className="sa-card p-4 flex justify-between items-center cursor-pointer"
                    >
                      <span className="font-bold text-sm">
                        Week {w} ·{" "}
                        {w === 1
                          ? "Ask 5 questions"
                          : w === 2
                          ? "Build the sheet"
                          : w === 3
                          ? "Chart and model"
                          : "Show and defend"}
                      </span>
                      <span className="text-xs font-bold text-[#3F37C9]">
                        Open ›
                      </span>
                    </div>
                  ))}
                  <div className="sa-card p-4 space-y-2.5">
                    <div className="font-bold text-sm">Your Socratic coach</div>
                    {coachMessages.map((m, i) => (
                      <div
                        key={i}
                        className={
                          "p-2.5 rounded-xl text-xs " +
                          (m.role === "coach"
                            ? "bg-[#ECEBFD]"
                            : "bg-[#F7F7FC] ml-4")
                        }
                      >
                        <strong>
                          {m.role === "coach" ? "Coach: " : "You: "}
                        </strong>
                        {m.text}
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type your reply..."
                        value={coachReplyInput}
                        onChange={(e) => setCoachReplyInput(e.target.value)}
                        className="flex-1 bg-[#F7F7FC] border border-[#DCDDEB] rounded-xl px-3 py-2 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!coachReplyInput.trim()) return;
                          setCoachMessages([
                            ...coachMessages,
                            { role: "student", text: coachReplyInput },
                            {
                              role: "coach",
                              text: "Good catch. How will you check that in your sheet numbers?",
                            },
                          ]);
                          setCoachReplyInput("");
                        }}
                        className="px-3 py-2 bg-[#3F37C9] text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenSundayLogView(true)}
                    className="sa-btn"
                  >
                    Write this Sunday log
                  </button>
                </div>
              )}

            {studentTab === "SPRINT" && openSundayLogView && (
              <div className="space-y-4">
                <h1 className="sa-display text-2xl font-bold">Sunday log</h1>
                <div>
                  <label className="block font-bold text-xs mb-1">
                    1. What I did
                  </label>
                  <input
                    type="text"
                    value={sundayLog.did}
                    onChange={(e) =>
                      setSundayLog({ ...sundayLog, did: e.target.value })
                    }
                    className="w-full bg-white border border-[#DCDDEB] rounded-xl p-3 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-xs mb-1">
                    2. What got stuck
                  </label>
                  <input
                    type="text"
                    value={sundayLog.stuck}
                    onChange={(e) =>
                      setSundayLog({ ...sundayLog, stuck: e.target.value })
                    }
                    className="w-full bg-white border border-[#DCDDEB] rounded-xl p-3 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-xs mb-1">
                    3. What I will try next
                  </label>
                  <input
                    type="text"
                    value={sundayLog.next}
                    onChange={(e) =>
                      setSundayLog({ ...sundayLog, next: e.target.value })
                    }
                    className="w-full bg-white border border-[#DCDDEB] rounded-xl p-3 text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const text = `${childName}'s SpikeArc Sunday Log: ${sundayLog.did} | Stuck: ${sundayLog.stuck} | Next: ${sundayLog.next}`;
                    window.open(
                      `https://wa.me/?text=${encodeURIComponent(text)}`,
                      "_blank"
                    );
                  }}
                  className="sa-btn"
                >
                  Save and send on WhatsApp
                </button>
              </div>
            )}

            {studentTab === "SPRINT" && openWeekTaskView && (
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setActiveWeek(w)}
                      className={
                        "py-1.5 rounded-lg text-xs font-bold cursor-pointer " +
                        (activeWeek === w
                          ? "bg-[#0E6B45] text-white"
                          : "bg-[#DCDDEB]")
                      }
                    >
                      Week {w}
                    </button>
                  ))}
                </div>
                <h1 className="sa-display text-xl font-bold">
                  Week {activeWeek} of 4 · {labProject.title}
                </h1>
                {activeWeek === 1 && (
                  <div className="sa-card p-4 space-y-2.5 text-xs font-mono">
                    {labProject.surveyQuestions.map((q, i) => (
                      <div key={i}>{q}</div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        copyTextHelper(
                          labProject.surveyQuestions.join("\n"),
                          "5 questions copied!"
                        )
                      }
                      className="sa-btn-ghost py-2 text-xs mt-2"
                    >
                      Copy all 5 questions
                    </button>
                  </div>
                )}
                {activeWeek === 2 && (
                  <div className="sa-card p-4 space-y-2.5 text-xs font-mono">
                    <div className="font-bold">
                      Columns: {labProject.sheetColumns.join(" · ")}
                    </div>
                    <div className="bg-[#F7F7FC] p-3 rounded-xl border">
                      {labProject.sheetFormula}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        copyTextHelper(
                          labProject.sheetFormula,
                          "Formula copied!"
                        )
                      }
                      className="sa-btn-ghost py-2 text-xs"
                    >
                      Copy formulas
                    </button>
                  </div>
                )}
                {activeWeek === 3 && (
                  <div className="sa-card p-4 space-y-2 text-sm">
                    <div className="font-bold">Chart and one-screen model</div>
                    <p className="text-xs text-[#4A5068]">
                      Select your averages in Google Sheets → Insert → Chart.
                      Build a 1-screen helper poster or calculator.
                    </p>
                  </div>
                )}
                {activeWeek === 4 && (
                  <div className="sa-card p-4 space-y-2 text-sm">
                    <div className="font-bold">Slides & out-loud defense</div>
                    {labProject.slideOutline.map((s, i) => (
                      <div key={i} className="text-xs">
                        • {s}
                      </div>
                    ))}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() =>
                    activeWeek < 4
                      ? setActiveWeek(activeWeek + 1)
                      : setOpenWeekTaskView(false)
                  }
                  className="sa-btn"
                >
                  {activeWeek < 4
                    ? `Mark week ${activeWeek} done & open week ${
                        activeWeek + 1
                      }`
                    : "Finish sprint"}
                </button>
              </div>
            )}

            {studentTab === "CONTESTS" && (
              <div className="space-y-4">
                <h1 className="sa-display text-2xl font-bold">
                  Contests & Exam-Boost
                </h1>
                {getFilteredCompetitions(
                  primaryStream.id,
                  boardCode,
                  gradeStr
                ).map((c, i) => (
                  <div key={i} className="sa-card p-4 space-y-1">
                    <span className="text-xs font-bold text-[#3F37C9]">
                      {c.window}
                    </span>
                    <div className="font-bold text-base">{c.name}</div>
                    <p className="text-xs text-[#4A5068]">{c.fit}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PARENT APP (3 BOTTOM TABS: PROGRESS | MONEY | INVEST) */}
        {screen === "PARENT_APP" && (
          <div className="space-y-4">
            {parentTab === "PROGRESS" && (
              <div className="space-y-4">
                <p className="text-xs text-[#4A5068]">
                  Parent hub · Locked with your PIN
                </p>
                <h1 className="sa-display text-2xl font-bold">
                  {childName} is on track
                </h1>
                <div className="sa-card border-2 border-[#3F37C9] p-4 space-y-2">
                  <span className="text-xs font-bold text-[#3F37C9]">
                    SPRINT {activeWeek} OF 12
                  </span>
                  <p className="text-sm">{sundayLog.did}</p>
                </div>
                <div className="sa-card p-4 space-y-2 text-sm">
                  <div className="font-bold">Scholarship readiness</div>
                  <div className="flex justify-between">
                    <span>Academics ({boardCode})</span>
                    <span className="text-[#0E6B45] font-bold">On track</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Project work</span>
                    <span className="text-[#3F37C9] font-bold">Building</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setParentTab("MONEY")}
                  className="sa-btn"
                >
                  Plan the money
                </button>
              </div>
            )}

            {parentTab === "MONEY" && (
              <div className="space-y-4">
                <h1 className="sa-display text-2xl font-bold">
                  Saving for college
                </h1>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(TARGET_PRESETS).map((tp) => (
                    <button
                      key={tp.key}
                      type="button"
                      onClick={() => {
                        setTargetRouteKey(tp.key);
                        setCustomCollegeTarget(null);
                      }}
                      className={
                        "p-3 rounded-xl border text-left cursor-pointer " +
                        (!customCollegeTarget && targetRouteKey === tp.key
                          ? "bg-[#ECEBFD] border-[#3F37C9] font-bold"
                          : "bg-white border-[#DCDDEB]")
                      }
                    >
                      <div className="text-xs text-[#4A5068] truncate">
                        {tp.label}
                      </div>
                      <div className="text-sm font-bold text-[#3F37C9]">
                        ₹{tp.totalLakhs}L
                      </div>
                    </button>
                  ))}
                </div>
                <div className="sa-card p-4 space-y-2 text-sm">
                  <div className="font-bold">
                    {activeMoneyPreset.collegeName} (Target: ₹
                    {adjustedTotalLakhs}L)
                  </div>
                  <div className="flex justify-between">
                    <span>Conservative (8%)</span>
                    <strong>₹{sipCon.toLocaleString("en-IN")}/mo</strong>
                  </div>
                  <div className="flex justify-between text-[#3F37C9]">
                    <span>
                      <strong>Base (10.5%)</strong>
                    </span>
                    <strong>₹{sipBase.toLocaleString("en-IN")}/mo</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Growth (12.5%)</span>
                    <strong>₹{sipGrow.toLocaleString("en-IN")}/mo</strong>
                  </div>
                </div>
                <div className="bg-[#E3F5EC] border border-[#0E6B45]/40 rounded-2xl p-4 text-sm">
                  <strong className="text-xs text-[#0E6B45] block">
                    COST OF WAITING
                  </strong>
                  Start one year later, and the Base plan needs{" "}
                  <strong>₹{sipOneYearLater.toLocaleString("en-IN")}/mo</strong>{" "}
                  (+₹{waitingPenalty.toLocaleString("en-IN")} more).
                </div>
                <button
                  type="button"
                  onClick={() => setParentTab("INVEST")}
                  className="sa-btn"
                >
                  See how to invest it
                </button>
              </div>
            )}

            {parentTab === "INVEST" && (
              <div className="space-y-4">
                <h1 className="sa-display text-2xl font-bold">
                  Investing for the goal
                </h1>
                <div className="sa-card p-4 space-y-1 text-sm">
                  <div className="font-bold">
                    Match the currency & LRS rules
                  </div>
                  <p className="text-xs text-[#4A5068]">
                    Indian college: plan in rupees. Study abroad: structure LRS
                    and currency matching early.
                  </p>
                </div>
                <div className="sa-card p-4 space-y-3">
                  <div className="font-bold text-sm">
                    Talk to an adviser on Divrsify.in (15 mins, free)
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {["Sat 11:00", "Sat 11:30", "Sun 18:00"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setAdviserSlot(s)}
                        className={
                          "py-2 rounded-full text-xs font-bold border cursor-pointer " +
                          (adviserSlot === s
                            ? "bg-[#ECEBFD] border-[#3F37C9] text-[#3F37C9]"
                            : "bg-white")
                        }
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    copyTextHelper(
                      `Divrsify.in slot ${adviserSlot} booked!`,
                      `Booked ${adviserSlot} with Divrsify.in!`
                    )
                  }
                  className="sa-btn"
                >
                  Book the 15-minute call
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* BOTTOM NAVIGATION BARS */}
      {screen === "STUDENT_APP" && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#DCDDEB] py-2 px-4">
          <div className="max-w-[520px] mx-auto grid grid-cols-4 gap-1 text-center">
            {[
              ["HOME", "🏠", "Home"],
              ["PROJECT", "📄", "Project"],
              ["SPRINT", "⚡", "Sprint"],
              ["CONTESTS", "🏆", "Contests"],
            ].map(([k, ic, lb]) => (
              <button
                key={k}
                type="button"
                onClick={() => {
                  setOpenWeekTaskView(false);
                  setOpenSundayLogView(false);
                  setStudentTab(k);
                }}
                className={
                  "py-1 rounded-xl flex flex-col items-center cursor-pointer " +
                  (studentTab === k
                    ? "text-[#3F37C9] font-bold"
                    : "text-[#4A5068]")
                }
              >
                <span>{ic}</span>
                <span className="text-xs">{lb}</span>
              </button>
            ))}
          </div>
        </nav>
      )}

      {screen === "PARENT_APP" && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#DCDDEB] py-2 px-4">
          <div className="max-w-[520px] mx-auto grid grid-cols-3 gap-1 text-center">
            {[
              ["PROGRESS", "📊", "Progress"],
              ["MONEY", "🏦", "Money"],
              ["INVEST", "📈", "Invest"],
            ].map(([k, ic, lb]) => (
              <button
                key={k}
                type="button"
                onClick={() => setParentTab(k)}
                className={
                  "py-1 rounded-xl flex flex-col items-center cursor-pointer " +
                  (parentTab === k
                    ? "text-[#3F37C9] font-bold"
                    : "text-[#4A5068]")
                }
              >
                <span>{ic}</span>
                <span className="text-xs">{lb}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
