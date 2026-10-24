// src/professional.jsx
import React, { useState, useEffect } from "react";
import {
  ACADEMIC_TRAIT_MAP,
  GUIDED_DNA_PRESETS,
  COHORT_WEALTH_PROFILES,
  synthesizeCareerTracks,
  refineUserBottleneck,
  buildDynamicLabs,
  getFull7StageConfig,
  getTrackBridgeDetails,
  getVpStressTest,
} from "./proData";

export default function ProfessionalPivot() {
  const [activeTab, setActiveTab] = useState("quest");
  const [step, setStep] = useState(0); // 0 = Candidate Profile Setup, 1-7 = Diagnostic Quest
  const [selectedTrackIdx, setSelectedTrackIdx] = useState(0);

  const [profile, setProfile] = useState({
    candidateName: "Aravind Swaminathan",
    email: "aravind@gmail.com",
    phone: "+91 98400 12345",
    locationHub: "Chennai, Tamil Nadu",
    noticePeriod: "30 Days",
    academicCluster: "COMMERCE_FIN",
    degreeDetail: "B.Com / BBA",
    currentFunction: "SALES_BD",
    roleDetail: "Inside Sales Executive",
    yoeTier: "1_3_YOE",
    ctcBand: 6.5,
  });

  const [vectors, setVectors] = useState({
    client: 55,
    systems: 55,
    quant: 50,
    domainAffinity: 50,
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const [rationale, setRationale] = useState("");

  // Custom Project DNA State
  const [customDna, setCustomDna] = useState({
    bottleneck: "Post-Discovery Deal Ghosting & Lead Drop-Off After Meeting #2",
    targetCluster:
      "B2B SaaS Leaders (Anchor: Freshworks + 20 Peers: Zoho, Chargebee, Postman, Zenoti)",
    lens: "REVENUE_CRO",
  });
  const [rawDraft, setRawDraft] = useState("");
  const [refineNotice, setRefineNotice] = useState("");

  // Studio & Simulation State
  const [sprintIdx, setSprintIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [studioMode, setStudioMode] = useState("BUILD"); // 'BUILD' | 'STRESS_TEST'
  const [doneSprints, setDoneSprints] = useState({
    0: true,
    1: false,
    2: false,
    3: false,
  });
  const [practiceInput, setPracticeInput] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [mentorOut, setMentorOut] = useState("");

  // Download Lead Capture Modal
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Expert Sign-Off State (₹999 — Exclusively on Sprint 4, Step 4.4)
  const [expertBooked, setExpertBooked] = useState(false);

  // Tab 4 Wealth State
  const [wealth, setWealth] = useState({
    expenses: 28000,
    savings: 65000,
    upskill: 25000,
    sipRate: 45,
    customGoal: "",
  });
  const [selectedGoals, setSelectedGoals] = useState([
    "runway",
    "upskill",
    "global_sip",
  ]);

  const tracks = synthesizeCareerTracks(profile, vectors);
  const activeTrack = tracks[selectedTrackIdx] || tracks[0];
  // Pass selectedTrackIdx so all 5 Dossier boxes update dynamically when clicking Track 1, 2, or 3!
  const bridgeDetails = getTrackBridgeDetails(
    profile,
    activeTrack,
    selectedTrackIdx
  );
  const preset =
    GUIDED_DNA_PRESETS[profile.currentFunction] || GUIDED_DNA_PRESETS.SALES_BD;

  useEffect(() => {
    const p =
      GUIDED_DNA_PRESETS[profile.currentFunction] ||
      GUIDED_DNA_PRESETS.SALES_BD;
    let autoLens = p.defaultLens;
    if (profile.currentFunction === "SALES_BD" && selectedTrackIdx === 0)
      autoLens = "REVENUE_CRO";
    else if (selectedTrackIdx === 1) autoLens = "SPEED_COO";
    else if (selectedTrackIdx === 2) autoLens = "COST_CFO";

    setCustomDna({
      bottleneck:
        p.bottlenecks[selectedTrackIdx % p.bottlenecks.length] ||
        p.bottlenecks[0],
      targetCluster:
        p.clusters[selectedTrackIdx % p.clusters.length] || p.clusters[0],
      lens: autoLens,
    });
    setRefineNotice("");
  }, [profile.currentFunction, selectedTrackIdx]);

  const labBundle = buildDynamicLabs(profile, activeTrack, customDna);
  const currentLab = labBundle.sprints[sprintIdx] || labBundle.sprints[0];
  const currentStep = currentLab.steps[stepIdx] || currentLab.steps[0];
  const vpGrill = getVpStressTest(profile, customDna, sprintIdx);
  const completedCount = Object.values(doneSprints).filter(Boolean).length;
  const readinessScore = 40 + completedCount * 14;
  const NL = String.fromCharCode(10);

  useEffect(() => {
    if (studioMode === "BUILD") {
      setMentorOut(currentStep.out);
    } else if (studioMode === "STRESS_TEST") {
      setMentorOut(
        [
          vpGrill.vpQuestion,
          "",
          "💡 Hint: " + vpGrill.hint,
          "",
          "👇 Type your 1-line response in the box below and click 'Evaluate My Answer'!",
        ].join(NL)
      );
    }
  }, [
    customDna.bottleneck,
    customDna.lens,
    customDna.targetCluster,
    sprintIdx,
    stepIdx,
    studioMode,
    currentStep.out,
    NL,
    vpGrill.vpQuestion,
    vpGrill.hint,
  ]);

  const handleRefine = (inputToUse) => {
    const text = (inputToUse !== undefined ? inputToUse : rawDraft).trim();
    if (!text) return;
    const res = refineUserBottleneck(
      text,
      profile.currentFunction,
      customDna.lens
    );
    setCustomDna({ ...customDna, bottleneck: res.bottleneck, lens: res.lens });
    setRefineNotice(res.notice);
    setRawDraft("");
  };

  const handlePracticeCheck = () => {
    const draft = practiceInput.trim();
    if (studioMode === "STRESS_TEST") {
      if (!draft) {
        setMentorOut(
          ["🔓 RECOMMENDED EXECUTIVE ANSWER:", "", vpGrill.winningAnswer].join(
            NL
          )
        );
        return;
      }
      const hasGuardrail =
        /human|approve|approval|draft|review|dropdown|validation|timestamp|conservative|discount|limit|rule|check/i.test(
          draft
        );
      const score = hasGuardrail ? 88 : 68;
      const critique = hasGuardrail
        ? "✅ STRONG INSTINCT (Score: " +
          score +
          "/100): You rightly focused on system controls and verification rather than trusting blind automation."
        : "⚠️ INTERVIEW COACHING FEEDBACK (Score: " +
          score +
          '/100): Saying "' +
          draft +
          '" is a good start, but senior leaders worry about edge-case failures. Explicitly mention a "Human-in-the-Loop Approval Draft" or "Data Validation Guardrail."';

      setMentorOut(
        [
          "🎯 INTERVIEW SIMULATION SCORE (SPRINT 0" + (sprintIdx + 1) + ")",
          "================================================================",
          '🗣️ YOUR ANSWER: "' + draft + '"',
          "",
          critique,
          "",
          "✨ RECOMMENDED EXECUTIVE ANSWER:",
          vpGrill.winningAnswer,
        ].join(NL)
      );
      return;
    }

    if (!draft) {
      setMentorOut(currentStep.out);
      return;
    }
    setMentorOut(
      [
        '👏 Great start on your draft: "' + draft + '"!',
        "Here is how to structure and polish this step for your portfolio:",
        "",
        currentStep.out,
      ].join(NL)
    );
  };

  const handleAskMentor = () => {
    if (!chatInput.trim()) return;
    setMentorOut(
      [
        '🧑‍🏫 AI MENTOR GUIDANCE FOR: "' + chatInput + '"',
        "================================================================",
        "• Target Role: " + labBundle.effectiveRole,
        '• Your Case Study: "' + customDna.bottleneck + '"',
        "1. Keep your spreadsheet simple—15 to 20 sample rows in Google Sheets is all you need to prove your logic.",
        "2. Because your project is tailored to " +
          customDna.targetCluster +
          ", you can pitch this single asset to 20+ similar employers.",
        "",
        currentStep.out,
      ].join(NL)
    );
    setChatInput("");
  };

  const stageCfg = getFull7StageConfig(step, profile);

  const handleNextStage = (e) => {
    e.preventDefault();
    if (!selectedOption) return;

    const w = selectedOption.weights || {};
    setVectors({
      client: Math.min(98, Math.max(15, vectors.client + (w.client || 0))),
      systems: Math.min(98, Math.max(15, vectors.systems + (w.systems || 0))),
      quant: Math.min(98, Math.max(15, vectors.quant + (w.quant || 0))),
      domainAffinity: Math.min(
        98,
        Math.max(15, vectors.domainAffinity + (w.domainAffinity || 0))
      ),
    });

    if (
      step === 6 &&
      rationale.trim().length > 5 &&
      !/none|same|ok|yes|use selected/i.test(rationale.trim())
    ) {
      handleRefine(rationale.trim());
    } else if (step === 6) {
      setCustomDna({ ...customDna, bottleneck: selectedOption.label });
    }

    if (step === 7) {
      const parsedExp = parseInt(rationale.replace(/[^0-9]/g, ""), 10);
      if (parsedExp >= 5000 && parsedExp <= 500000) {
        setWealth({ ...wealth, expenses: parsedExp });
      }
    }

    setSelectedOption(null);
    setRationale("");

    if (step < 7) setStep(step + 1);
    else setActiveTab("dossier");
  };

  const toggleGoal = (id) => {
    if (selectedGoals.includes(id))
      setSelectedGoals(selectedGoals.filter((g) => g !== id));
    else setSelectedGoals([...selectedGoals, id]);
  };

  // Wealth Math
  const cohort =
    COHORT_WEALTH_PROFILES[profile.yoeTier] ||
    COHORT_WEALTH_PROFILES["1_3_YOE"];
  const targetRunway = wealth.expenses * 6;
  const runwayGap = Math.max(0, targetRunway - wealth.savings);
  const monthsToFill = Math.max(1, Math.ceil(runwayGap / 15000));
  const monthlyLift = Math.max(
    15000,
    Math.round(((activeTrack.targetCtcNumeric - profile.ctcBand) * 100000) / 12)
  );
  const monthlySip = Math.round((monthlyLift * wealth.sipRate) / 100);
  const corpus10Yr = Math.round((monthlySip * 245) / 10000) / 10;

  // ============================================================================
  // UPGRADED: GENERATES A STYLED .HTML REPORT (OPENS IN ANY BROWSER & PRINTS TO PDF!)
  // ============================================================================
  const triggerDossierDownload = () => {
    const htmlReport = [
      "<!DOCTYPE html><html><head><meta charset='utf-8'>",
      "<title>SpikeArc Pro Career & Wealth Dossier - " +
        (profile.candidateName || "Candidate") +
        "</title>",
      "<style>",
      "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 32px; max-width: 860px; margin: 0 auto; line-height: 1.55; }",
      ".card { background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 22px; margin-bottom: 20px; }",
      "h1 { color: #c084fc; margin-top: 0; font-size: 24px; }",
      "h2 { color: #34d399; font-size: 16px; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0; }",
      ".badge { display: inline-block; background: #3b0764; color: #e9d5ff; padding: 4px 12px; border-radius: 99px; font-size: 12px; font-weight: bold; }",
      "pre { background: #090d16; color: #e2e8f0; padding: 14px; border-radius: 10px; white-space: pre-wrap; font-size: 12px; border: 1px solid #334155; }",
      "ul { padding-left: 20px; }",
      "li { margin-bottom: 6px; }",
      ".print-btn { background: #9333ea; color: white; border: none; padding: 10px 20px; border-radius: 10px; font-weight: bold; cursor: pointer; margin-bottom: 20px; }",
      "@media print { body { background: white; color: black; } .card { background: white; border: 1px solid #ccc; } pre { background: #f1f5f9; color: black; } .print-btn { display: none; } }",
      "</style></head><body>",
      "<button class='print-btn' onclick='window.print()'>🖨️ Print or Save as PDF</button>",
      "<div class='card'>",
      "<span class='badge'>SPIKEARC PRO × DIVRSIFY.IN • PERSONALIZED DOSSIER</span>",
      "<h1>" +
        (profile.candidateName || "Candidate") +
        " — Career & Wealth Blueprint</h1>",
      "<p><strong>Email:</strong> " +
        (profile.email || "N/A") +
        " | <strong>Phone:</strong> " +
        (profile.phone || "N/A") +
        " | <strong>Location:</strong> " +
        (profile.locationHub || "India") +
        " (Notice: " +
        profile.noticePeriod +
        ")</p>",
      "<p><strong>Current Role:</strong> " +
        profile.degreeDetail +
        " + " +
        profile.roleDetail +
        " (₹" +
        profile.ctcBand +
        "L PA) &rarr; <strong>Target Role:</strong> " +
        labBundle.effectiveRole +
        " (" +
        activeTrack.targetCtc +
        ")</p>",
      "<p><strong>Role Readiness Score:</strong> " + readinessScore + "%</p>",
      "</div>",
      "<div class='card'>",
      "<h2>1. Your Skill-Bridge & Market Positioning</h2>",
      "<p>" + activeTrack.whyFit + "</p>",
      "<p><strong>✅ Your Transferable Strengths:</strong></p><ul>" +
        bridgeDetails.transferableAssets
          .map((a) => "<li>" + a + "</li>")
          .join("") +
        "</ul>",
      "<p><strong>⚠️ Skill Gaps to Close:</strong></p><ul>" +
        bridgeDetails.missingGaps.map((g) => "<li>" + g + "</li>").join("") +
        "</ul>",
      "<p><strong>🛠️ Your 8-Week Proof-of-Work Plan:</strong></p><ul>" +
        activeTrack.skills
          .slice(0, 3)
          .map((s) => "<li>" + s + "</li>")
          .join("") +
        "</ul>",
      "</div>",
      "<div class='card'>",
      "<h2>2. Your Proof-of-Work Portfolio Blueprint</h2>",
      "<p><strong>Case Study Problem Solved:</strong> " +
        customDna.bottleneck +
        "</p>",
      "<p><strong>Target 20-Company Cluster:</strong> " +
        customDna.targetCluster +
        "</p>",
      "<p><strong>Sprint 1 • 7-Column Tracker Schema & Formula:</strong></p>",
      "<pre>Columns: " +
        labBundle.sprints[0].headers.join(" | ") +
        "\nFormula: " +
        labBundle.sprints[0].formula +
        "\n\n" +
        labBundle.sprints[0].steps[2].out +
        "</pre>",
      "<p><strong>Sprint 2 • AI Automation & Resume Bullet:</strong></p>",
      "<pre>" + labBundle.sprints[1].steps[2].out + "</pre>",
      "<p><strong>Sprint 4 • 90-Second Video CV & Cold Pitch:</strong></p>",
      "<pre>" +
        labBundle.sprints[3].steps[1].out +
        "\n\n" +
        labBundle.sprints[3].steps[2].out +
        "</pre>",
      "</div>",
      "<div class='card'>",
      "<h2>3. Your Divrsify.in Freedom Runway & Wealth Plan</h2>",
      "<ul>",
      "<li><strong>Phase 1 (6-Month Freedom Runway Target):</strong> ₹" +
        targetRunway.toLocaleString("en-IN") +
        " (Current Gap: ₹" +
        runwayGap.toLocaleString("en-IN") +
        ")</li>",
      "<li><strong>Phase 2 (Zero-Debt Upskill & Notice Shield Wallet):</strong> ₹" +
        wealth.upskill.toLocaleString("en-IN") +
        "</li>",
      "<li><strong>Phase 3 (Post-Hike Step-Up SIP @ " +
        wealth.sipRate +
        "%):</strong> ₹" +
        monthlySip.toLocaleString("en-IN") +
        "/month &rarr; <strong>Projected 10-Yr Corpus: ~₹" +
        corpus10Yr +
        " Lakhs</strong></li>",
      "</ul></div></body></html>",
    ].join("");

    try {
      const blob = new Blob([htmlReport], { type: "text/html;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const safeName = (profile.candidateName || "Candidate").replace(
        /[^a-z0-9]/gi,
        "_"
      );
      a.download = "SpikeArc_Dossier_" + safeName + ".html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16 antialiased">
      {/* CANDIDATE-CENTRIC HEADER */}
      <header className="border-b border-slate-800 bg-slate-900/95 sticky top-0 z-30 px-3 py-3 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center font-extrabold text-xs shadow-lg shadow-purple-600/30">
                SP
              </div>
              <div>
                <span className="font-extrabold text-sm tracking-tight block">
                  SpikeArc Pro
                </span>
                <span className="text-[10px] font-mono text-emerald-400 block">
                  Your Role Readiness: {readinessScore}% ({completedCount}/4
                  Sprints Completed)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 w-full sm:w-auto overflow-x-auto">
            {[
              [
                "quest",
                `1. Your Diagnostic (${step === 0 ? "Profile" : `${step}/7`})`,
              ],
              ["dossier", "2. Your Skill Dossier"],
              ["studio", "🛠️ 3. Proof-of-Work Studio"],
              ["wealth", "📈 4. Your Wealth Plan"],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`flex-1 sm:flex-initial px-3 py-2 rounded-xl font-bold text-xs whitespace-nowrap cursor-pointer transition ${
                  activeTab === id
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6">
        {/* PERSONALIZED CANDIDATE SUMMARY BAR */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 mb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs shadow-xl">
          <div className="space-y-0.5">
            <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider block">
              Your Career Profile
            </span>
            <div>
              <strong className="text-white text-sm">
                {profile.candidateName || "Welcome"}
              </strong>
              <span className="text-slate-400 ml-1.5">
                ({profile.locationHub || "India"} • Notice:{" "}
                {profile.noticePeriod}) •{" "}
              </span>
              <strong className="text-purple-300">
                {profile.degreeDetail}
              </strong>{" "}
              +{" "}
              <strong className="text-emerald-300">
                {profile.roleDetail} (₹{profile.ctcBand}L PA)
              </strong>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-[10px] text-slate-500">Quick Sample:</span>
            <button
              type="button"
              onClick={() =>
                setProfile({
                  ...profile,
                  candidateName: "Aravind Swaminathan",
                  locationHub: "Chennai, Tamil Nadu",
                  academicCluster: "COMMERCE_FIN",
                  degreeDetail: "B.Com / BBA",
                  currentFunction: "SALES_BD",
                  roleDetail: "Inside Sales Executive",
                  yoeTier: "1_3_YOE",
                  ctcBand: 6.5,
                })
              }
              className="text-[11px] bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 px-2.5 py-1 rounded-lg cursor-pointer transition"
            >
              Sales Example
            </button>
            <button
              type="button"
              onClick={() =>
                setProfile({
                  ...profile,
                  candidateName: "Priya Nair",
                  locationHub: "Bengaluru, Karnataka",
                  academicCluster: "LIFE_SCIENCES",
                  degreeDetail: "M.Sc. Biotechnology",
                  currentFunction: "HR_OPS",
                  roleDetail: "HR Operations Executive",
                  yoeTier: "1_3_YOE",
                  ctcBand: 5.5,
                })
              }
              className="text-[11px] bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 px-2.5 py-1 rounded-lg cursor-pointer transition"
            >
              Biotech+HR Example
            </button>
          </div>
        </div>

        {/* =================================================================
            TAB 1: CANDIDATE ONBOARDING & 7-STAGE DIAGNOSTIC
           ================================================================= */}
        {activeTab === "quest" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6">
            {step === 0 ? (
              <>
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-purple-400 uppercase font-bold">
                    STEP 1 • YOUR PROFESSIONAL PROFILE
                  </span>
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    Map Your High-Paying Career Pivot
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Tell us about your education, current role, and location so
                    we can map your highest-paying career tracks and build your
                    custom Proof-of-Work portfolio.
                  </p>
                </div>

                {/* ROW 1: PERSONAL & LOCATION DETAILS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:border-purple-500 focus:outline-none"
                      value={profile.candidateName}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          candidateName: e.target.value,
                        })
                      }
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:border-purple-500 focus:outline-none"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Current City / Location *
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:border-purple-500 focus:outline-none"
                      value={profile.locationHub}
                      onChange={(e) =>
                        setProfile({ ...profile, locationHub: e.target.value })
                      }
                      placeholder="e.g., Chennai, Bengaluru, Mumbai"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Notice Period
                    </label>
                    <select
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:border-purple-500 focus:outline-none"
                      value={profile.noticePeriod}
                      onChange={(e) =>
                        setProfile({ ...profile, noticePeriod: e.target.value })
                      }
                    >
                      <option value="Immediate">
                        Immediate / Serving Notice
                      </option>
                      <option value="15 Days">15 Days</option>
                      <option value="30 Days">30 Days</option>
                      <option value="60 Days">60 Days</option>
                      <option value="90 Days">90 Days</option>
                    </select>
                  </div>
                </div>

                {/* ROW 2: CLUSTERS & EXPERIENCE */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your College Degree Area
                    </label>
                    <select
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:border-purple-500 focus:outline-none"
                      value={profile.academicCluster}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          academicCluster: e.target.value,
                        })
                      }
                    >
                      <option value="LIFE_SCIENCES">
                        Biotech / Life Sciences / Pharma
                      </option>
                      <option value="CORE_ENG">
                        Core Engineering (Mech / Civil / EEE)
                      </option>
                      <option value="CS_IT">Computer Science / IT / BCA</option>
                      <option value="COMMERCE_FIN">
                        Commerce / Finance / BBA
                      </option>
                      <option value="ARTS_HUMANITIES">
                        Arts / Humanities / Psychology
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Current Work Function
                    </label>
                    <select
                      className="w-full bg-slate-950 border border-purple-500/50 rounded-xl p-3 text-xs sm:text-sm text-white focus:border-purple-500 focus:outline-none"
                      value={profile.currentFunction}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          currentFunction: e.target.value,
                        })
                      }
                    >
                      <option value="SALES_BD">
                        Inside Sales / Business Development
                      </option>
                      <option value="HR_OPS">
                        HR Processing / Talent & People Ops
                      </option>
                      <option value="CS_KPO">
                        Customer Support / Service Delivery / KPO
                      </option>
                      <option value="IT_QA_SUPPORT">
                        Manual QA Testing / Tech Support
                      </option>
                      <option value="FIN_OPS">
                        Finance / Accounting / Audit Ops
                      </option>
                      <option value="CORE_DOMAIN_OPS">
                        Core Lab / Clinical / Plant / Supply Chain
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Years of Experience
                    </label>
                    <select
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:border-purple-500 focus:outline-none"
                      value={profile.yoeTier}
                      onChange={(e) =>
                        setProfile({ ...profile, yoeTier: e.target.value })
                      }
                    >
                      <option value="0_1_YOE">0–1 Years (Early Career)</option>
                      <option value="1_3_YOE">
                        1–3 Years (Growth & Pivot Window)
                      </option>
                      <option value="4_PLUS_YOE">
                        4+ Years (Mid-Career Acceleration)
                      </option>
                    </select>
                  </div>
                </div>

                {/* ROW 3: EXACT TITLES & CTC */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Exact Degree Title
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:border-purple-500 focus:outline-none"
                      value={profile.degreeDetail}
                      onChange={(e) =>
                        setProfile({ ...profile, degreeDetail: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Current Job Title
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:border-purple-500 focus:outline-none"
                      value={profile.roleDetail}
                      onChange={(e) =>
                        setProfile({ ...profile, roleDetail: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Current Annual Salary (₹ Lakhs)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:border-purple-500 focus:outline-none"
                      value={profile.ctcBand}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          ctcBand: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                {/* CANDIDATE-FRIENDLY STRENGTHS SUMMARY */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1.5">
                  <div>
                    <strong className="text-purple-400">
                      Your Core Degree Strengths:
                    </strong>{" "}
                    {ACADEMIC_TRAIT_MAP[profile.academicCluster].strengths}.
                  </div>
                  <div>
                    <strong className="text-emerald-400">
                      High-Value Skills You Will Build in Section 3:
                    </strong>{" "}
                    {ACADEMIC_TRAIT_MAP[profile.academicCluster].honestGap}.
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (!profile.candidateName.trim()) {
                        alert("Please enter your Full Name before starting.");
                        return;
                      }
                      setStep(1);
                    }}
                    className="flex-1 py-4 bg-purple-600 hover:bg-purple-500 rounded-2xl font-extrabold text-sm text-white cursor-pointer transition shadow-xl shadow-purple-600/30"
                  >
                    Start Your 7-Step Career Diagnostic →
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("dossier")}
                    className="px-5 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl font-bold text-xs text-emerald-300 cursor-pointer transition"
                  >
                    Skip to Your Skill Dossier →
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleNextStage} className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-purple-400 font-bold">
                    QUESTION 0{step} OF 07
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                      <div
                        key={n}
                        className={`h-1.5 w-5 sm:w-6 rounded-full ${
                          n <= step ? "bg-purple-500" : "bg-slate-800"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h2 className="text-lg sm:text-xl font-extrabold">
                  {stageCfg.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 bg-slate-950 p-4 rounded-2xl border border-slate-800 leading-relaxed">
                  {stageCfg.scenario.replace(
                    /^BLIND COGNITIVE AUDIT:\s*|^STRESS TEST:\s*/i,
                    ""
                  )}
                </p>

                <div className="space-y-2.5">
                  {stageCfg.options.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedOption(opt)}
                      className={`p-4 rounded-2xl border cursor-pointer transition ${
                        selectedOption?.id === opt.id
                          ? "bg-purple-950/40 border-purple-500 shadow-md"
                          : "bg-slate-950 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm text-white mb-1">
                        {opt.label}
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-400">
                        {opt.desc}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {stageCfg.prompt}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Type a short 1-line answer..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:border-purple-500 focus:outline-none"
                    value={rationale}
                    onChange={(e) => setRationale(e.target.value)}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="w-1/4 py-3.5 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-xs text-slate-300 cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={!selectedOption}
                    className={`w-3/4 py-3.5 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition ${
                      selectedOption
                        ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    {step === 7
                      ? "View Your Personalized Skill Dossier →"
                      : `Save & Next Question →`}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* =================================================================
            TAB 2: DYNAMIC SKILL-BRIDGE DOSSIER (CHANGES FOR TRACK 1, 2 & 3!)
           ================================================================= */}
        {activeTab === "dossier" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-5 shadow-2xl">
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase block mb-1">
                  CAREER ROADMAP FOR{" "}
                  {(profile.candidateName || "YOU").toUpperCase()}
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                  Your 3 Recommended Career Tracks (Click Any Card to Explore)
                </h2>
              </div>
              <div className="bg-slate-950 border border-slate-800 px-3.5 py-2 rounded-2xl text-right w-full sm:w-auto">
                <div className="text-[10px] font-mono text-slate-400">
                  YOUR ROLE READINESS
                </div>
                <div className="text-sm font-extrabold text-emerald-400">
                  {readinessScore}% Ready ({completedCount}/4 Sprints Completed)
                </div>
              </div>
            </div>

            {/* 3 TRACK CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {tracks.map((t, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedTrackIdx(i)}
                  className={`p-4 rounded-2xl border cursor-pointer flex flex-col justify-between transition ${
                    selectedTrackIdx === i
                      ? "bg-purple-950/40 border-purple-500 shadow-xl shadow-purple-500/10"
                      : "bg-slate-950 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div>
                    <div className="text-[10px] font-mono text-purple-400 mb-1">
                      {t.type}
                    </div>
                    <div className="font-bold text-sm text-white mb-2">
                      {t.role}
                    </div>
                  </div>
                  <div className="text-xs text-emerald-400 font-bold pt-2.5 border-t border-slate-800/80">
                    {t.targetCtc} • {t.matchScore}
                  </div>
                </div>
              ))}
            </div>

            {/* SELECTED TRACK DEEP-DIVE + DYNAMIC 3-COLUMN SKILL BRIDGE MATRIX */}
            <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-5">
              <div className="flex flex-wrap justify-between items-center gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase">
                    TRACK 0{selectedTrackIdx + 1} SKILL-BRIDGE ANALYSIS
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-white">
                    {activeTrack.role}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Target Employers: {activeTrack.sector} • Preferred Location:{" "}
                    {profile.locationHub || "India"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("studio")}
                  className="w-full sm:w-auto px-5 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-extrabold text-white cursor-pointer shadow-lg shadow-purple-600/30 transition"
                >
                  Build Your Portfolio for This Role →
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {activeTrack.whyFit}
              </p>

              {/* 3-COLUMN SIDE-BY-SIDE SKILL MATRIX (UPDATES PER TRACK!) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-slate-900/90 border border-emerald-500/30 p-4 rounded-2xl">
                  <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase mb-2">
                    1. Your Transferable Strengths
                  </div>
                  <ul className="space-y-2 text-xs text-slate-200">
                    {bridgeDetails.transferableAssets.map((item, idx) => (
                      <li key={idx}>✅ {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900/90 border border-amber-500/30 p-4 rounded-2xl">
                  <div className="text-[10px] font-mono text-amber-400 font-bold uppercase mb-2">
                    2. Skills You Need to Add
                  </div>
                  <ul className="space-y-2 text-xs text-slate-200">
                    {bridgeDetails.missingGaps.map((item, idx) => (
                      <li key={idx}>⚠️ {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900/90 border border-purple-500/40 p-4 rounded-2xl">
                  <div className="text-[10px] font-mono text-purple-300 font-bold uppercase mb-2">
                    3. What You Will Build in Section 3
                  </div>
                  <ul className="space-y-2 text-xs text-slate-200">
                    {activeTrack.skills.slice(0, 3).map((sk, idx) => (
                      <li key={idx}>🛠️ {sk}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* DAY-IN-THE-LIFE SPLIT + RESUME REJECT WARNING */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                  <div className="text-[10px] font-mono text-sky-400 font-bold uppercase mb-2">
                    ⏱️ A TYPICAL WEEK IN THIS ROLE:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {bridgeDetails.dayInLifeSplit.map((d, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-slate-200"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-rose-950/20 border border-rose-500/30 p-4 rounded-2xl">
                  <div className="text-[10px] font-mono text-rose-400 font-bold uppercase mb-1.5">
                    🚨 WHY TRADITIONAL RESUMES GET REJECTED HERE:
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {bridgeDetails.resumeRejectTrap}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 3: CANDIDATE PROOF-OF-WORK STUDIO (UNIFORM 4-STEP LAYOUT)
           ================================================================= */}
        {activeTab === "studio" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-5 shadow-2xl">
            <div className="flex flex-wrap justify-between items-center gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[11px] font-mono text-emerald-400 uppercase block">
                  TARGET ROLE: {labBundle.effectiveRole}
                </span>
                <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
                  Your Portfolio Project: Solving "{customDna.bottleneck}"
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setDownloadModalOpen(true)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold cursor-pointer shadow-lg shadow-purple-600/30 transition"
                >
                  📥 Download Your Dossier (HTML / PDF)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("wealth")}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer transition"
                >
                  Next: Your Wealth Plan →
                </button>
              </div>
            </div>

            {/* LEAD-CAPTURE DOWNLOAD MODAL (DOWNLOADS BROWSER-READY HTML & OPENS PRINT-TO-PDF) */}
            {downloadModalOpen && (
              <div className="bg-purple-950/50 border border-purple-500/60 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-purple-300 font-bold uppercase">
                    📥 SAVE & DOWNLOAD YOUR COMPLETE CAREER & WEALTH DOSSIER
                  </span>
                  <button
                    type="button"
                    onClick={() => setDownloadModalOpen(false)}
                    className="text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    ✕ Close
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Confirm your details below to download your complete Dossier
                  file (opens directly in any browser on Mac, PC, or mobile so
                  you can view or save it as a PDF).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none"
                    value={profile.candidateName}
                    onChange={(e) =>
                      setProfile({ ...profile, candidateName: e.target.value })
                    }
                    placeholder="Your Full Name *"
                  />
                  <input
                    type="email"
                    className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    placeholder="Your Email Address *"
                  />
                  <input
                    type="text"
                    className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    placeholder="WhatsApp / Mobile Number *"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        !profile.candidateName.trim() ||
                        !profile.email.trim()
                      ) {
                        alert(
                          "Please enter your Name and Email to download your dossier."
                        );
                        return;
                      }
                      triggerDossierDownload();
                      setDownloadSuccess(true);
                      setTimeout(() => {
                        setDownloadModalOpen(false);
                        setDownloadSuccess(false);
                      }, 2200);
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    {downloadSuccess
                      ? "✓ Dossier Downloaded (.html)!"
                      : "Download Dossier (Opens in Any Browser / PDF) →"}
                  </button>
                  {downloadSuccess && (
                    <span className="text-xs font-mono text-emerald-400">
                      ✓ Downloaded! Double-click the .html file in your
                      Downloads folder to view or print to PDF.
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* CUSTOMIZE YOUR PROJECT */}
            <div className="bg-slate-950 border border-purple-500/40 rounded-2xl p-4 sm:p-5 space-y-3.5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
                    1. Choose the Business Problem You Want to Solve
                  </label>
                  <select
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                    value={customDna.bottleneck}
                    onChange={(e) =>
                      setCustomDna({ ...customDna, bottleneck: e.target.value })
                    }
                  >
                    {preset.bottlenecks.map((b, i) => (
                      <option key={i} value={b}>
                        {b}
                      </option>
                    ))}
                    {!preset.bottlenecks.includes(customDna.bottleneck) && (
                      <option value={customDna.bottleneck}>
                        ✨ {customDna.bottleneck}
                      </option>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
                    2. Choose Your Target Employer Cluster (20+ Companies)
                  </label>
                  <select
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                    value={customDna.targetCluster}
                    onChange={(e) =>
                      setCustomDna({
                        ...customDna,
                        targetCluster: e.target.value,
                      })
                    }
                  >
                    {preset.clusters.map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
                    3. Business Impact Angle
                  </label>
                  <select
                    className="w-full bg-slate-900 border border-emerald-500/50 rounded-xl p-2.5 text-xs text-emerald-300 font-bold focus:outline-none"
                    value={customDna.lens}
                    onChange={(e) =>
                      setCustomDna({ ...customDna, lens: e.target.value })
                    }
                  >
                    <option value="REVENUE_CRO">
                      📈 Revenue & Pipeline Growth
                    </option>
                    <option value="ADOPTION_CPO">
                      🚀 Customer Adoption & Retention
                    </option>
                    <option value="SPEED_COO">⏱️ Turnaround Speed & SLA</option>
                    <option value="COST_CFO">💰 Cost Savings & Margin</option>
                    <option value="RISK_COMPLIANCE">
                      🛡️ Audit & Zero-Defect Compliance
                    </option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Or describe a specific challenge from your own job (e.g. 'leads ghosting after demo')..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                  value={rawDraft}
                  onChange={(e) => setRawDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleRefine()}
                />
                <button
                  type="button"
                  onClick={() => handleRefine()}
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl cursor-pointer transition shadow-md"
                >
                  ✨ Customize My Project
                </button>
              </div>
              {refineNotice && (
                <div className="text-[11px] font-mono text-emerald-300 bg-emerald-950/30 border border-emerald-500/30 p-2.5 rounded-xl">
                  {refineNotice}
                </div>
              )}
            </div>

            {/* 4 SPRINT SELECTOR CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              {labBundle.sprintTitles.map((title, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSprintIdx(i);
                    setStepIdx(0);
                    setStudioMode("BUILD");
                  }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                    sprintIdx === i
                      ? "bg-purple-950/50 border-purple-500 shadow-md"
                      : "bg-slate-950 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-mono text-purple-300 font-bold">
                      SPRINT 0{i + 1}
                    </span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setDoneSprints({
                          ...doneSprints,
                          [i]: !doneSprints[i],
                        });
                      }}
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-lg ${
                        doneSprints[i]
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {doneSprints[i] ? "✓ COMPLETED" : "MARK DONE"}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-100 leading-snug">
                    {title}
                  </div>
                </div>
              ))}
            </div>

            {/* PROJECT PREVIEW TABLE */}
            <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-4 sm:p-5">
              <div className="text-xs font-mono text-emerald-400 font-bold mb-1">
                📖 WHAT YOU ARE BUILDING IN SPRINT 0{sprintIdx + 1} •{" "}
                {currentLab.jargonTerm} ({currentLab.tool})
              </div>
              <p className="text-xs text-slate-300 mb-3">
                {currentLab.plainEnglish}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse bg-slate-900 text-[11px] font-mono">
                  <thead>
                    <tr className="bg-slate-800 text-purple-300">
                      {currentLab.headers.map((h, i) => (
                        <th key={i} className="p-2 border border-slate-700">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentLab.rows.map((r, ri) => (
                      <tr key={ri} className="border-b border-slate-800">
                        {r.map((c, ci) => (
                          <td key={ci} className="p-2 border border-slate-800">
                            {c}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* UNIFORM STEP CARDS ON LEFT + AI BLACKBOARD ON RIGHT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-5 space-y-2.5">
                {currentLab.steps.map((st, i) => {
                  const isExpertStep = sprintIdx === 3 && i === 3;
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        setStudioMode("BUILD");
                        setStepIdx(i);
                      }}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                        studioMode === "BUILD" && stepIdx === i
                          ? isExpertStep
                            ? "bg-amber-950/40 border-amber-500 shadow-md"
                            : "bg-purple-950/40 border-purple-500 shadow-md"
                          : isExpertStep
                          ? "bg-slate-950 border-amber-500/40"
                          : "bg-slate-950 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div
                        className={`text-xs font-bold mb-1 ${
                          isExpertStep ? "text-amber-300" : "text-white"
                        }`}
                      >
                        {st.title}
                      </div>
                      <p className="text-[11px] text-slate-400 mb-2.5">
                        {st.desc}
                      </p>
                      <button
                        type="button"
                        className={`w-full py-2 rounded-xl text-[11px] font-bold cursor-pointer transition ${
                          isExpertStep
                            ? "bg-amber-500 text-slate-950 font-extrabold"
                            : "bg-purple-600 text-white"
                        }`}
                      >
                        ⚡ {st.btn} →
                      </button>
                    </div>
                  );
                })}

                {/* INTERVIEW SIMULATOR CARD */}
                <div
                  onClick={() => setStudioMode("STRESS_TEST")}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                    studioMode === "STRESS_TEST"
                      ? "bg-amber-950/40 border-amber-500 shadow-md"
                      : "bg-slate-950 border-amber-500/30"
                  }`}
                >
                  <div className="text-xs font-bold text-amber-300 mb-1">
                    🔥 Practice Interview Question (Sprint 0{sprintIdx + 1})
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Test how you will defend this sprint when a Hiring VP
                    questions your work.
                  </p>
                </div>
              </div>

              {/* AI MENTOR WORKBENCH */}
              <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex flex-wrap justify-between items-center pb-2 mb-3 border-b border-slate-800 text-xs font-mono text-emerald-400 font-bold gap-2">
                    <span>
                      {studioMode === "BUILD" &&
                        `🧑‍🏫 YOUR STEP-BY-STEP GUIDE (${currentStep.title})`}
                      {studioMode === "STRESS_TEST" &&
                        `🔥 MOCK INTERVIEW CHALLENGE (SPRINT 0${
                          sprintIdx + 1
                        })`}
                    </span>
                    <div className="flex gap-1 text-[10px]">
                      <button
                        type="button"
                        onClick={() => setStudioMode("BUILD")}
                        className={`px-2.5 py-1 rounded-lg cursor-pointer ${
                          studioMode === "BUILD"
                            ? "bg-purple-600 text-white font-bold"
                            : "bg-slate-900 text-slate-400"
                        }`}
                      >
                        Step Guide
                      </button>
                      <button
                        type="button"
                        onClick={() => setStudioMode("STRESS_TEST")}
                        className={`px-2.5 py-1 rounded-lg cursor-pointer ${
                          studioMode === "STRESS_TEST"
                            ? "bg-amber-500 text-slate-950 font-bold"
                            : "bg-slate-900 text-amber-300"
                        }`}
                      >
                        🔥 Mock Interview
                      </button>
                    </div>
                  </div>

                  <pre className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-100 whitespace-pre-wrap h-56 overflow-y-auto leading-relaxed mb-3">
                    {mentorOut}
                  </pre>

                  {/* EXCLUSIVE TO SPRINT 4, STEP 4.4: ₹999 EXPERT SIGN-OFF BOOKING CTA */}
                  {studioMode === "BUILD" &&
                  sprintIdx === 3 &&
                  stepIdx === 3 ? (
                    <div className="bg-amber-950/30 border border-amber-500/50 rounded-2xl p-4 space-y-3">
                      <div className="text-xs font-bold text-amber-300">
                        👨‍💼 Book Your Optional 15-Minute Expert Sign-Off Call
                        (₹999)
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        Want a practicing manager from{" "}
                        <strong>{customDna.targetCluster.split("(")[0]}</strong>{" "}
                        to verify your Google Sheet, Make.com automation, and
                        90-second Video CV before you send it to VPs?
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setExpertBooked(true);
                          setDoneSprints({ ...doneSprints, 3: true });
                        }}
                        className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl cursor-pointer shadow-lg shadow-amber-500/20 transition"
                      >
                        {expertBooked
                          ? "✓ ₹999 Expert Review Call Reserved!"
                          : "Book 15-Min Expert Sign-Off Call (₹999) →"}
                      </button>
                    </div>
                  ) : (
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 space-y-2">
                      <label className="block text-[11px] font-semibold text-purple-300">
                        {studioMode === "STRESS_TEST"
                          ? "🛡️ Type your 1-line interview answer (or click Evaluate to see the model answer):"
                          : "✍️ Practice Box (Type your draft note & let AI polish it):"}
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          placeholder={
                            studioMode === "STRESS_TEST"
                              ? "e.g., I use dropdown validation and human approval before sending..."
                              : "e.g., Rows #102 and #103 are stalling because no ROI case was sent..."
                          }
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                          value={practiceInput}
                          onChange={(e) => setPracticeInput(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handlePracticeCheck()
                          }
                        />
                        <button
                          type="button"
                          onClick={handlePracticeCheck}
                          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl cursor-pointer whitespace-nowrap transition"
                        >
                          {studioMode === "STRESS_TEST"
                            ? "Evaluate My Answer"
                            : "Polish My Draft"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Ask Mentor Bar */}
                <div className="flex gap-2 pt-2 border-t border-slate-800">
                  <input
                    type="text"
                    placeholder="Have a question about this step? Ask your AI Mentor in plain English..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAskMentor()}
                  />
                  <button
                    type="button"
                    onClick={handleAskMentor}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-purple-300 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Ask Mentor
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 4: CANDIDATE WEALTH RUNWAY & DIVRSIFY.IN HANDOFF
           ================================================================= */}
        {activeTab === "wealth" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-6 shadow-2xl">
            <div className="flex flex-wrap justify-between items-start gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase block mb-1">
                  POWERED BY DIVRSIFY.IN • PERSONAL WEALTH ARCHITECT
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  Your 6-Month Freedom Runway & Salary-Hike Wealth Plan
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Prepared for{" "}
                  <strong className="text-white">
                    {profile.candidateName || "You"}
                  </strong>{" "}
                  ({profile.locationHub || "India"}) • Target Role:{" "}
                  <strong className="text-slate-200">
                    {labBundle.effectiveRole} ({activeTrack.targetCtc})
                  </strong>
                </p>
              </div>
              <div className="bg-slate-950 border border-emerald-500/40 px-4 py-3 rounded-2xl text-right w-full sm:w-auto">
                <div className="text-[10px] font-mono text-slate-400">
                  YOUR PROJECTED 10-YR WEALTH CORPUS
                </div>
                <div className="text-base sm:text-lg font-extrabold text-emerald-400">
                  ~₹{corpus10Yr} Lakhs
                </div>
              </div>
            </div>

            {/* DEBT TRAP vs SELF-FUNDED COMPARATOR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-4">
                <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block">
                  ❌ THE ₹2.5L BOOTCAMP LOAN TRAP
                </span>
                <h4 className="text-sm font-bold text-slate-100 mt-1">
                  High-Interest EMIs + Generic Certificates
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Borrowing ₹2.5 Lakhs at 14% interest locks you into a
                  ₹11,500/month EMI for 2 years while handing you the same
                  generic capstone project as thousands of other applicants.
                </p>
              </div>
              <div className="bg-emerald-950/20 border border-emerald-500/40 rounded-2xl p-4">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                  ✅ YOUR ZERO-DEBT SPIKEARC + DIVRSIFY PLAN
                </span>
                <h4 className="text-sm font-bold text-slate-100 mt-1">
                  ₹0 AI Studio + ₹{wealth.upskill.toLocaleString("en-IN")}{" "}
                  Self-Funded Transition Buffer
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  You build your Proof-of-Work portfolio debt-free, keep{" "}
                  <strong>₹2.25 Lakhs</strong> in your own net worth, and
                  channel your upcoming salary hike straight into your Freedom
                  Runway and Global/India SIPs.
                </p>
              </div>
            </div>

            {/* COHORT REALITY CHECK & INTERACTIVE GOAL CHIPS */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                  📊 FINANCIAL PRIORITIES FOR YOUR STAGE ({cohort.ageGroup})
                </span>
                <span className="text-[11px] text-slate-400">
                  Select the goals that matter most to you:
                </span>
              </div>
              <p className="text-xs text-slate-300">{cohort.peerReality}</p>
              <div className="flex flex-wrap gap-2">
                {cohort.commonGoals.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => toggleGoal(g.id)}
                    className={`text-xs px-3 py-1.5 rounded-xl border font-semibold cursor-pointer transition ${
                      selectedGoals.includes(g.id)
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                        : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}
                  >
                    {selectedGoals.includes(g.id) ? "✓ " : "+ "} {g.label}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add any personal financial goal for the next 2–3 years (e.g., Pay off education loan, wedding, parents' health cover)..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none"
                value={wealth.customGoal}
                onChange={(e) =>
                  setWealth({ ...wealth, customGoal: e.target.value })
                }
              />
            </div>

            {/* 4 INTERACTIVE WEALTH CALIBRATORS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  1. Your Monthly Expenses (₹)
                </label>
                <input
                  type="number"
                  step="2500"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs font-bold text-white focus:outline-none"
                  value={wealth.expenses}
                  onChange={(e) =>
                    setWealth({ ...wealth, expenses: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  2. Current Emergency Savings (₹)
                </label>
                <input
                  type="number"
                  step="10000"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs font-bold text-white focus:outline-none"
                  value={wealth.savings}
                  onChange={(e) =>
                    setWealth({ ...wealth, savings: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  3. Self-Funded Upskill Budget (₹)
                </label>
                <input
                  type="number"
                  step="5000"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs font-bold text-purple-300 focus:outline-none"
                  value={wealth.upskill}
                  onChange={(e) =>
                    setWealth({ ...wealth, upskill: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  4. % of Salary Hike to Invest ({wealth.sipRate}%)
                </label>
                <input
                  type="range"
                  min="20"
                  max="70"
                  step="5"
                  className="w-full accent-emerald-500 mt-2.5 cursor-pointer"
                  value={wealth.sipRate}
                  onChange={(e) =>
                    setWealth({ ...wealth, sipRate: Number(e.target.value) })
                  }
                />
                <span className="text-[10px] text-emerald-400 block mt-1">
                  ₹{monthlySip.toLocaleString("en-IN")}/mo Step-Up SIP
                </span>
              </div>
            </div>

            {/* 3-BUCKET WEALTH ARCHITECTURE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/30 space-y-2">
                <div className="text-[10px] font-mono text-amber-400 font-bold">
                  BUCKET 1 • YOUR 6-MONTH FREEDOM RUNWAY
                </div>
                <div className="text-xl font-extrabold text-white">
                  ₹{(targetRunway / 100000).toFixed(2)} Lakhs
                </div>
                <div className="text-xs text-slate-400">
                  Gap to Fill: ₹{runwayGap.toLocaleString("en-IN")} (~
                  {monthsToFill} mos)
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed pt-1 border-t border-slate-800">
                  Park 6 months of essential expenses in Liquid / Arbitrage
                  funds so you can negotiate high-paying offers with confidence.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-purple-500/30 space-y-2">
                <div className="text-[10px] font-mono text-purple-400 font-bold">
                  BUCKET 2 • NOTICE PERIOD & UPSKILL SHIELD
                </div>
                <div className="text-xl font-extrabold text-purple-300">
                  ₹{wealth.upskill.toLocaleString("en-IN")} Buffer
                </div>
                <div className="text-xs text-slate-400">
                  Covers tools, ₹999 Sign-Off & personal health cover
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed pt-1 border-t border-slate-800">
                  Protects your cashflow and medical coverage while serving your{" "}
                  {profile.noticePeriod} notice period.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/40 space-y-2">
                <div className="text-[10px] font-mono text-emerald-400 font-bold">
                  BUCKET 3 • YOUR SALARY-HIKE STEP-UP SIP
                </div>
                <div className="text-xl font-extrabold text-emerald-400">
                  ₹{monthlySip.toLocaleString("en-IN")} / month
                </div>
                <div className="text-xs text-slate-300">
                  10-Yr Projected Corpus: ~₹{corpus10Yr} Lakhs
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed pt-1 border-t border-slate-800">
                  Automatically invests {wealth.sipRate}% of your new salary
                  hike into 70% India Core + 30% Global ETFs from Day 1.
                </p>
              </div>
            </div>

            {/* DIVRSIFY.IN SEAMLESS HANDOFF BANNER */}
            <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-purple-950/70 border border-emerald-500/40 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold tracking-wider">
                  NEXT STEP • ACTIVATE YOUR WEALTH BLUEPRINT ON DIVRSIFY.IN
                </span>
                <h3 className="text-lg font-extrabold text-white">
                  Turn Your Salary Hike Into Long-Term Wealth
                </h3>
                <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                  {profile.candidateName || "Candidate"}, as you transition
                  toward {activeTrack.targetCtc}, carry your ₹
                  {targetRunway.toLocaleString("en-IN")} Freedom Runway target
                  and ₹{monthlySip.toLocaleString("en-IN")}/month Step-Up SIP
                  plan directly into Divrsify.in.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setDownloadModalOpen(true)}
                  className="px-4 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-purple-300 font-bold text-xs cursor-pointer transition text-center"
                >
                  📥 Download Full Dossier
                </button>
                <button
                  type="button"
                  onClick={() =>
                    alert(
                      `Launching Divrsify.in Wealth Architecture for ${
                        profile.candidateName || "Candidate"
                      } (${
                        profile.locationHub || "India"
                      })\n\n• 6-Month Freedom Runway Target: ₹${targetRunway.toLocaleString(
                        "en-IN"
                      )}\n• Salary-Hike Step-Up SIP: ₹${monthlySip.toLocaleString(
                        "en-IN"
                      )}/mo\n• Projected 10-Yr Corpus: ~₹${corpus10Yr} Lakhs`
                    )
                  }
                  className="px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs cursor-pointer shadow-xl shadow-emerald-600/30 transition text-center"
                >
                  Continue to Divrsify.in →
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
