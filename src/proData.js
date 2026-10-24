// src/proData.js
// ============================================================================
// SPIKEARC PRO • MASTER DATA, SCHEMAS & SYNTHESIS ENGINE (COMPILER-SAFE & CANDIDATE-READY)
// ============================================================================

export const ACADEMIC_TRAIT_MAP = {
  LIFE_SCIENCES: {
    strengths:
      "regulatory protocol compliance, experimental documentation, and clinical/biological domain literacy",
    honestGap:
      "enterprise database querying (SQL) and commercial software tooling",
    sectorBridge:
      "Pharma/Biotech GCCs (AstraZeneca, Novo Nordisk, Novartis) & HealthTech SaaS",
  },
  CORE_ENG: {
    strengths:
      "physical systems thinking, process constraints, and quantitative engineering fundamentals",
    honestGap:
      "cloud APIs, SaaS product telemetry, and commercial GTM frameworks",
    sectorBridge:
      "Industrial IoT, EV Ecosystems, Supply Chain Tech & Manufacturing GCCs",
  },
  CS_IT: {
    strengths:
      "computational logic, software architecture fundamentals, and technical debugging",
    honestGap:
      "commercial unit economics, executive persuasion, and domain P&L ownership",
    sectorBridge:
      "B2B SaaS, FinTech Infrastructure, AI Product Studios & Global Tech GCCs",
  },
  COMMERCE_FIN: {
    strengths:
      "unit economics, P&L ledger literacy, commercial risk intuition, and financial compliance",
    honestGap:
      "automated workflow engineering (APIs/No-Code) and SQL/BI data modeling",
    sectorBridge:
      "FinTech, BFSI GCCs (JPMorgan, Goldman, Citi), SaaS RevOps & Consulting",
  },
  ARTS_HUMANITIES: {
    strengths:
      "qualitative behavioural synthesis, narrative persuasion, and stakeholder communication",
    honestGap:
      "structured data schema design, quantitative KPI modeling, and workflow automation",
    sectorBridge:
      "B2B SaaS Customer Success, Product Growth, People Advisory & Consumer Tech",
  },
};

export const FUNCTION_SPECIFIC_STAGES = {
  SALES_BD: {
    label: "Inside Sales / Business Development",
    stage1Scenario:
      "Imagine you are placed on a 60-day growth taskforce with no job titles. Which role do you naturally gravitate toward in Week 1?",
    stage1Options: [
      {
        id: "COMMERCIAL",
        label: "High-Stakes Negotiator & Relationship Closer",
        desc: "Talk directly to top customers, uncover executive pain, and close custom expansion deals.",
        weights: { client: 25, systems: 0, quant: -5 },
      },
      {
        id: "SOLUTIONS",
        label: "Solutions & Product Translator",
        desc: "Sit between customers and tech teams to configure product solutions without cold-calling.",
        weights: { client: 15, systems: 20, quant: 5 },
      },
      {
        id: "SYSTEMS",
        label: "Invisible Machine & Automation Builder",
        desc: "Wire together CRM, AI tools, and workflows behind the scenes so the revenue engine runs faster.",
        weights: { client: -15, systems: 25, quant: 15 },
      },
      {
        id: "ANALYTICS",
        label: "Numbers & Funnel Forensics Detective",
        desc: "Analyze raw conversion logs and pricing data to find where the company is leaking revenue.",
        weights: { client: -20, systems: 10, quant: 25 },
      },
    ],
    stage2Scenario:
      "A major revenue initiative is failing and two departments are blaming each other. How do you step in to create order?",
    stage2Options: [
      {
        id: "A",
        label: "Human Alignment & Persuasion",
        desc: "Get decision-makers in a room and broker a commercial compromise.",
        weights: { client: 20, systems: 0, quant: 0 },
      },
      {
        id: "B",
        label: "Process Redesign & Guardrails",
        desc: "Map the broken handoff and build an automated checklist so errors stop.",
        weights: { client: 0, systems: 25, quant: 5 },
      },
      {
        id: "C",
        label: "Hard Data Proof",
        desc: "Pull 6 months of logs to prove objectively where the bottleneck happens.",
        weights: { client: -10, systems: 10, quant: 25 },
      },
    ],
  },
  HR_OPS: {
    label: "HR Processing / Talent & People Ops",
    stage1Scenario:
      "When handed a messy organizational problem, which type of work makes time fly by for you?",
    stage1Options: [
      {
        id: "SYSTEMS",
        label: "Designing & Automating the Workflow",
        desc: "Turn a 15-step manual process into a clean, automated digital pipeline.",
        weights: { client: -5, systems: 25, quant: 10 },
      },
      {
        id: "ANALYTICS",
        label: "Uncovering Trends in Workforce Data",
        desc: "Work with metrics and models to find the 'why' behind attrition, cost, or delays.",
        weights: { client: -15, systems: 10, quant: 25 },
      },
      {
        id: "ADVISORY",
        label: "Advising Leaders & Resolving Friction",
        desc: "Coach stakeholders, resolve team friction, and drive talent decisions.",
        weights: { client: 25, systems: 5, quant: -10 },
      },
      {
        id: "DOMAIN",
        label: "Deep Industry / Clinical / Product Operations",
        desc: "Combine operational discipline with core science/industry compliance problems.",
        weights: { client: 0, systems: 20, quant: 15, domainAffinity: 25 },
      },
    ],
    stage2Scenario:
      "Your company must launch a new 100-person division in 60 days. Which piece do you volunteer to own?",
    stage2Options: [
      {
        id: "A",
        label: "Stakeholder Pitch & Talent Closing",
        desc: "Convince leadership and top candidates to come onboard.",
        weights: { client: 20, systems: 0, quant: 0 },
      },
      {
        id: "B",
        label: "Operational Engine & Tool Setup",
        desc: "Configure the software trackers and automated compliance workflows.",
        weights: { client: -5, systems: 25, quant: 5 },
      },
      {
        id: "C",
        label: "Budget, Capacity & SLA Forecasting Model",
        desc: "Build the quantitative model tracking costs, timelines, and drop-off risk.",
        weights: { client: -10, systems: 10, quant: 25 },
      },
    ],
  },
  CS_KPO: {
    label: "Customer Support / Service Delivery / KPO",
    stage1Scenario:
      "Separate from daily ticket queues, what kind of problem-solving matches your natural strengths?",
    stage1Options: [
      {
        id: "CSM",
        label: "Owning Strategic Client Portfolios & Renewals",
        desc: "Act as a strategic advisor managing high-value accounts and revenue retention.",
        weights: { client: 25, systems: 5, quant: 0 },
      },
      {
        id: "OPS",
        label: "Fixing the Product & Automating Workflows",
        desc: "Redesign broken workflows and build AI automations so repetitive tickets vanish.",
        weights: { client: -10, systems: 25, quant: 10 },
      },
      {
        id: "BI",
        label: "Analyzing Business Metrics & Churn Data",
        desc: "Work with databases and dashboards to guide executive retention strategy.",
        weights: { client: -20, systems: 10, quant: 25 },
      },
    ],
    stage2Scenario:
      "15% of enterprise customers churn in a single quarter. How do you investigate and fix it?",
    stage2Options: [
      {
        id: "A",
        label: "Executive Interviews & Account Rescue",
        desc: "Call top customers directly to rebuild trust and lock in renewals.",
        weights: { client: 20, systems: 0, quant: 0 },
      },
      {
        id: "B",
        label: "Onboarding Journey Redesign",
        desc: "Audit where users get stuck in the product and fix the workflow.",
        weights: { client: 0, systems: 25, quant: 5 },
      },
      {
        id: "C",
        label: "Cohort Churn Regression Audit",
        desc: "Slice usage data to find the exact mathematical predictor of churn.",
        weights: { client: -10, systems: 10, quant: 25 },
      },
    ],
  },
  IT_QA_SUPPORT: {
    label: "QA Manual Testing / Tech Support / IT Services",
    stage1Scenario:
      "Looking at how software and businesses run, which seat gives you the most energy?",
    stage1Options: [
      {
        id: "PM",
        label: "Deciding 'What' We Build & Why (Product & Strategy)",
        desc: "Define the business problem, write specs, and align business with engineering.",
        weights: { client: 15, systems: 25, quant: 5 },
      },
      {
        id: "DATA",
        label: "Building Automated Pipelines & Data Architecture",
        desc: "Write SQL, Python, or automation workflows where machines do the heavy lifting.",
        weights: { client: -15, systems: 20, quant: 25 },
      },
      {
        id: "SE",
        label: "Technical Client Consulting & Pre-Sales",
        desc: "Combine technical debugging with client communication to deploy enterprise tech.",
        weights: { client: 25, systems: 15, quant: 0 },
      },
    ],
    stage2Scenario:
      "A major product release is 2 weeks behind schedule. Where do you step in?",
    stage2Options: [
      {
        id: "A",
        label: "Stakeholder Scope Alignment",
        desc: "Negotiate with business heads to ship the core 80% on time.",
        weights: { client: 20, systems: 15, quant: 0 },
      },
      {
        id: "B",
        label: "Automated Pipeline Fix",
        desc: "Build an automated validation script to eliminate manual testing bottlenecks.",
        weights: { client: -10, systems: 20, quant: 20 },
      },
    ],
  },
  FIN_OPS: {
    label: "Finance / Accounting / Audit Back-Office",
    stage1Scenario:
      "Beyond routine reconciliations or audits, where does your mind naturally want to operate?",
    stage1Options: [
      {
        id: "FPA",
        label: "Forward-Looking Business Strategy & Pricing (FP&A)",
        desc: "Model future scenarios, advise VPs on capital allocation, and optimize margins.",
        weights: { client: 15, systems: 10, quant: 25 },
      },
      {
        id: "FINTECH",
        label: "FinTech Product Operations & Automated Risk Systems",
        desc: "Design automated payment, lending, or compliance workflows in tech teams.",
        weights: { client: 0, systems: 25, quant: 15 },
      },
      {
        id: "ADVISORY",
        label: "Front-Office Client Advisory & Deal Structuring",
        desc: "Pitch financial/commercial solutions directly to high-value clients.",
        weights: { client: 25, systems: 0, quant: 10 },
      },
    ],
    stage2Scenario:
      "Company profit margin drops 18% despite growing sales. What is your first move?",
    stage2Options: [
      {
        id: "A",
        label: "Unit-Economics & SQL Data Audit",
        desc: "Build a cohort profitability model isolating money-losing segments.",
        weights: { client: -5, systems: 15, quant: 25 },
      },
      {
        id: "B",
        label: "Commercial Pricing Renegotiation",
        desc: "Partner with Sales and Ops VPs to restructure contract tiers.",
        weights: { client: 20, systems: 10, quant: 10 },
      },
    ],
  },
  CORE_DOMAIN_OPS: {
    label: "Core Domain Ops (Lab / Clinical / Plant / Supply Chain)",
    stage1Scenario:
      "As you transition from lab/plant/floor ops into high-paying corporate or GCC roles, what excites you most?",
    stage1Options: [
      {
        id: "GCC_PM",
        label: "Designing Digital Workflows for My Industry",
        desc: "Work at a Global Capability Center (GCC) or SaaS firm designing digital operations.",
        weights: { client: 5, systems: 25, quant: 10, domainAffinity: 25 },
      },
      {
        id: "QUANT",
        label: "Data Science, BI & Predictive Operations Modeling",
        desc: "Use SQL, PowerBI, and data models to optimize supply chains or clinical trials.",
        weights: { client: -15, systems: 15, quant: 25, domainAffinity: 15 },
      },
      {
        id: "CONSULT",
        label: "Enterprise Solutions Consulting for Industry Tech",
        desc: "Help software firms sell and deploy industry tech because you speak the buyer's language.",
        weights: { client: 25, systems: 10, quant: 0, domainAffinity: 20 },
      },
    ],
    stage2Scenario:
      "When an operational process is slow and expensive, what is your natural instinct?",
    stage2Options: [
      {
        id: "A",
        label: "Digitize & Automate the Workflow",
        desc: "Replace manual logs with an automated digital trigger system.",
        weights: { client: 0, systems: 25, quant: 10 },
      },
      {
        id: "B",
        label: "Statistical Bottleneck Modeling",
        desc: "Analyze throughput data to optimize resource allocation.",
        weights: { client: -10, systems: 10, quant: 25 },
      },
    ],
  },
};

export const GUIDED_DNA_PRESETS = {
  SALES_BD: {
    bottlenecks: [
      "Post-Discovery Deal Ghosting & Lead Drop-Off After Meeting #2",
      "Mid-Market Trial-to-Paid Conversion & Renewal Drop-Off",
      "Enterprise Multi-Stakeholder Deal Stalling in Legal/Procurement",
      "High-Volume Lead Routing Leakage & Slow First-Response SLA",
    ],
    clusters: [
      "B2B SaaS Leaders (Anchor: Freshworks + 20 Peers: Zoho, Chargebee, Postman, Zenoti)",
      "FinTech & Payments (Anchor: Razorpay + 20 Peers: Pine Labs, Cred, Groww, Juspay)",
      "Global Enterprise Tech GCCs (Anchor: Salesforce India + 20 Peers: HubSpot, SAP, Oracle)",
    ],
    defaultLens: "REVENUE_CRO",
  },
  HR_OPS: {
    bottlenecks: [
      "R&D / Technical Talent Offer-to-Joining Drop-Off (40% Reneges)",
      "Clinical & Regulatory Credential Background Verification (BGV) Delays",
      "First-90-Day New Hire Onboarding SLA & IT/Lab Provisioning Lag",
    ],
    clusters: [
      "Life Sciences & Pharma GCCs (Anchor: AstraZeneca + 20 Peers: Novartis, Novo Nordisk, Roche, GSK)",
      "Global Banking & Tech GCCs (Anchor: JPMorgan GCC + 20 Peers: Target, Walmart, Fidelity, Citi)",
      "Series B+ HealthTech & SaaS (Anchor: Practo / HealthPlix + 20 Peers: Darwinbox, Keka)",
    ],
    defaultLens: "SPEED_COO",
  },
  CS_KPO: {
    bottlenecks: [
      "Enterprise Client First-45-Day Implementation & Go-Live Slippage",
      "Silent Product Adoption Drop-Off 60 Days Before Renewal",
      "Repetitive L1/L2 Support Ticket Backlog & Escalation Loops",
    ],
    clusters: [
      "Enterprise SaaS CS Hubs (Anchor: Chargebee + 20 Peers: Freshworks, CleverTap, MoEngage)",
      "Global Capability Centers (Anchor: Lowe's / Target GCC + 20 Peers: Tesco, Amex, Dell)",
    ],
    defaultLens: "ADOPTION_CPO",
  },
  IT_QA_SUPPORT: {
    bottlenecks: [
      "Production Release UAT Defect Leakage & Manual Regression Lag",
      "API Integration & Enterprise Client Sandbox Setup Bottlenecks",
      "High-Severity Incident Triage & Root-Cause Resolution TAT",
    ],
    clusters: [
      "Retail & Tech GCCs (Anchor: Walmart Global Tech + 20 Peers: Target, Lowe's, Maersk)",
      "Product SaaS & DevTools (Anchor: Postman / BrowserStack + 20 Peers: Razorpay, Zoho)",
    ],
    defaultLens: "RISK_COMPLIANCE",
  },
  FIN_OPS: {
    bottlenecks: [
      "12-Day Monthly Financial Close & Multi-Sheet Reconciliation Lag",
      "Vendor Invoice Approval Bottlenecks & Working Capital Leakage",
      "Unprofitable Customer Contract Tiers & Gross Margin Erosion",
    ],
    clusters: [
      "Global BFSI GCCs (Anchor: JPMorgan / Goldman + 20 Peers: Morgan Stanley, Citi, Barclays)",
      "FinTech & WealthTech (Anchor: Razorpay / Cred + 20 Peers: Zerodha, Groww, Pine Labs)",
    ],
    defaultLens: "COST_CFO",
  },
  CORE_DOMAIN_OPS: {
    bottlenecks: [
      "Clinical Trial Site Activation & Regulatory Dossier Turnaround Delays",
      "Plant-to-Warehouse Inventory Drift & Vendor Dispatch SLA Breaches",
      "Quality Control (QC) Batch Deviation & Audit Delays",
    ],
    clusters: [
      "Global Pharma & Life Sciences GCCs (Anchor: Novo Nordisk + 20 Peers: AstraZeneca, Novartis, Lilly)",
      "Industrial, EV & Supply Chain Tech (Anchor: Ather + 20 Peers: Bosch, Siemens, Schneider)",
    ],
    defaultLens: "RISK_COMPLIANCE",
  },
};

export const EXECUTIVE_LENS_MAP = {
  REVENUE_CRO: {
    badge: "📈 Revenue & Pipeline Growth Lens",
    sprintTitles: [
      "Pipeline Drop-Off & Deal-Stall Diagnostic Schema",
      "Automated Multi-Threading & Lead Re-Engagement Workflow",
      "CRO Pipeline Velocity & Revenue Recovery Dashboard",
      "LinkedIn Hitlist, Video CV, Cold Pitch & Expert Sign-Off",
    ],
    headers: [
      "Deal_ID",
      "Segment",
      "Funnel_Stage",
      "Buying_Committee",
      "Target_ARR",
      "Inactive_Days",
      "Pipeline_Risk_Flag",
    ],
    rows: (b) => [
      [
        "#101",
        "Mid-Market",
        b.slice(0, 26),
        "Multi-Threaded (3 Contacts)",
        "₹12,00,000",
        "3 Days",
        "✅ ACTIVE FOLLOW-UP",
      ],
      [
        "#102",
        "Enterprise",
        b.slice(0, 26),
        "Single-Threaded (No CFO)",
        "₹18,50,000",
        "19 Days",
        "🚨 GHOSTED (-₹18.5L Risk)",
      ],
      [
        "#103",
        "Strategic",
        b.slice(0, 26),
        "No ROI Business Case Sent",
        "₹9,20,000",
        "14 Days",
        "🚨 STALLED (-₹9.2L Risk)",
      ],
    ],
    formula:
      '=IF(F2 > 7, "🚨 DEAL GHOSTED / STALLED (" & F2 & "d inactive)", "✅ ACTIVE PIPELINE")',
    sqlCols: "Funnel_Stage, Buying_Committee",
    kpiMetric: "34% Higher Meeting #2-to-Close Conversion",
    impactValue: "₹42 Lakhs Stalled Pipeline Recovered / Quarter",
  },
  ADOPTION_CPO: {
    badge: "🚀 Customer Adoption & Retention Lens",
    sprintTitles: [
      "User Activation & Onboarding Drop-Off Schema",
      "Automated In-App & CSM Nudge Workflow",
      "CPO Retention & Time-to-Value (TTV) Dashboard",
      "LinkedIn Hitlist, Video CV, Cold Pitch & Expert Sign-Off",
    ],
    headers: [
      "Account_ID",
      "Tier",
      "Onboarding_Stage",
      "User_Cohort",
      "Target_Usage_%",
      "Actual_Usage_%",
      "Retention_Flag",
    ],
    rows: (b) => [
      [
        "#101",
        "Mid-Market",
        b.slice(0, 26),
        "Core Feature Live",
        "80%",
        "88%",
        "✅ HEALTHY ADOPTION",
      ],
      [
        "#102",
        "Enterprise",
        b.slice(0, 26),
        "Stuck at Setup",
        "75%",
        "28%",
        "🚨 CHURN RISK (-47%)",
      ],
      [
        "#103",
        "Growth",
        b.slice(0, 26),
        "Zero Login 14d",
        "70%",
        "19%",
        "🚨 DORMANT ACCOUNT",
      ],
    ],
    formula:
      '=IF(F2 < E2, "🚨 ADOPTION DROP (" & (E2-F2) & "% gap)", "✅ HEALTHY ADOPTION")',
    sqlCols: "Onboarding_Stage, User_Cohort",
    kpiMetric: "42% Reduction in 60-Day Onboarding Churn",
    impactValue: "3.2x Faster Time-to-Value (TTV)",
  },
  SPEED_COO: {
    badge: "⏱️ Turnaround Velocity (TAT) & SLA Speed Lens",
    sprintTitles: [
      "Process Bottleneck & SLA Turnaround Schema",
      "Zero-Touch AI Triage & Escalation Workflow",
      "COO Throughput & Hours-Saved Telemetry Dashboard",
      "LinkedIn Hitlist, Video CV, Cold Pitch & Expert Sign-Off",
    ],
    headers: [
      "Case_ID",
      "Unit",
      "Workflow_Stage",
      "Owner_Queue",
      "Target_SLA_Hrs",
      "Actual_TAT_Hrs",
      "Velocity_Flag",
    ],
    rows: (b) => [
      [
        "#101",
        "Core Ops",
        b.slice(0, 26),
        "Automated Intake",
        "24 hrs",
        "18 hrs",
        "✅ FAST-TRACK SLA",
      ],
      [
        "#102",
        "Enterprise",
        b.slice(0, 26),
        "Cross-Team Handoff",
        "48 hrs",
        "112 hrs",
        "🚨 BOTTLENECK (+64h)",
      ],
      [
        "#103",
        "Priority",
        b.slice(0, 26),
        "External Verification",
        "12 hrs",
        "54 hrs",
        "🚨 BOTTLENECK (+42h)",
      ],
    ],
    formula:
      '=IF(F2 > E2, "🚨 BOTTLENECK (+" & (F2-E2) & "h delay)", "✅ FAST-TRACK SLA")',
    sqlCols: "Workflow_Stage, Owner_Queue",
    kpiMetric: "62% Faster Turnaround Time (TAT)",
    impactValue: "165 Operational Hours Saved / Month",
  },
  COST_CFO: {
    badge: "💰 Cost-Leakage & Margin Defense Lens",
    sprintTitles: [
      "Unit-Economics & Margin Leakage Data Schema",
      "Automated Cost-Variance & Approval Workflow",
      "CFO P&L Impact & Cost-Savings Simulator",
      "LinkedIn Hitlist, Video CV, Cold Pitch & Expert Sign-Off",
    ],
    headers: [
      "Tx_ID",
      "Segment",
      "Cost_Driver",
      "Vendor_Tier",
      "Budget_INR",
      "Actual_INR",
      "Margin_Flag",
    ],
    rows: (b) => [
      [
        "#101",
        "Core",
        b.slice(0, 26),
        "Standard SLA",
        "₹4,000",
        "₹3,800",
        "✅ WITHIN BUDGET",
      ],
      [
        "#102",
        "Enterprise",
        b.slice(0, 26),
        "Manual Rework",
        "₹12,000",
        "₹28,500",
        "🚨 LEAKAGE (₹16.5k loss)",
      ],
      [
        "#103",
        "Priority",
        b.slice(0, 26),
        "SLA Penalty",
        "₹8,500",
        "₹19,000",
        "🚨 LEAKAGE (₹10.5k loss)",
      ],
    ],
    formula:
      '=IF(F2 > E2, "🚨 LEAKAGE (₹" & (F2-E2) & " loss)", "✅ WITHIN BUDGET")',
    sqlCols: "Cost_Driver, Vendor_Tier",
    kpiMetric: "₹6.4 Lakhs Annual Cost Leakage Plugged",
    impactValue: "19% Unit-Economics Margin Improvement",
  },
  RISK_COMPLIANCE: {
    badge: "🛡️ Zero-Defect Compliance & SLA Governance Lens",
    sprintTitles: [
      "Regulatory & Quality Compliance Audit Schema",
      "AI Pre-Check & Exception Blocking Workflow",
      "VP Compliance & Zero-Defect Governance Dashboard",
      "LinkedIn Hitlist, Video CV, Cold Pitch & Expert Sign-Off",
    ],
    headers: [
      "Audit_ID",
      "Division",
      "Compliance_Gate",
      "Standard",
      "Req_Checks",
      "Verified",
      "Audit_Flag",
    ],
    rows: (b) => [
      [
        "#101",
        "R&D / Core",
        b.slice(0, 26),
        "ISO / GCP Gate 1",
        "5 of 5",
        "5 of 5",
        "✅ AUDIT CLEARED",
      ],
      [
        "#102",
        "Clinical / Tech",
        b.slice(0, 26),
        "Credential BGV",
        "5 of 5",
        "3 of 5",
        "🚨 HIGH RISK (2 Missing)",
      ],
      [
        "#103",
        "Vendor Ops",
        b.slice(0, 26),
        "Security Signoff",
        "4 of 4",
        "2 of 4",
        "🚨 HIGH RISK (2 Missing)",
      ],
    ],
    formula:
      '=IF(F2 < E2, "🚨 HIGH RISK (Missing Checks)", "✅ AUDIT CLEARED")',
    sqlCols: "Compliance_Gate, Standard",
    kpiMetric: "99.4% First-Time Audit & SLA Compliance",
    impactValue: "Zero Regulatory / Penalty Exposure",
  },
};

export const COHORT_WEALTH_PROFILES = {
  "0_1_YOE": {
    ageGroup: "Ages 21–24 • Early Career Entrant",
    peerReality:
      "78% of early-career professionals lose their first 18 months of savings to high-interest EMIs or ₹2L+ bootcamp loans.",
    commonGoals: [
      { id: "runway", label: "🛡️ ₹1.5L 'Walk-Away' Emergency Buffer" },
      { id: "upskill", label: "⚡ ₹25K Debt-Free AI & Tooling Wallet" },
      { id: "first10L", label: "📈 First ₹10L Liquid Net-Worth Milestone" },
    ],
  },
  "1_3_YOE": {
    ageGroup: "Ages 24–27 • The Pivot & Acceleration Window",
    peerReality:
      "At 1–3 YOE, professionals backed by a 6-month liquid runway negotiate 60%+ salary jumps with complete confidence.",
    commonGoals: [
      { id: "runway", label: "🛡️ 6-Month Pivot Runway (Liquid Fund)" },
      { id: "upskill", label: "⚡ ₹30K Cloud/API Sandbox Wallet" },
      { id: "global_sip", label: "🌍 Core India + US Tech ETF Step-Up SIP" },
    ],
  },
  "4_PLUS_YOE": {
    ageGroup: "Ages 28–34 • Mid-Career Wealth Compounding",
    peerReality:
      "Mid-career switchers benefit from a ring-fenced Family Defense Buffer paired with automated India + Global equity allocation.",
    commonGoals: [
      { id: "runway", label: "🛡️ 9-Month Family & EMI Buffer" },
      { id: "upskill", label: "⚡ Executive Credential Wallet" },
      { id: "child_global", label: "🎓 Children's Global Education Corpus" },
    ],
  },
};

export function synthesizeCareerTracks(profile, vectors) {
  const { academicCluster, degreeDetail, roleDetail } = profile;
  const { client, systems, quant, domainAffinity } = vectors;
  const acadInfo =
    ACADEMIC_TRAIT_MAP[academicCluster] || ACADEMIC_TRAIT_MAP.COMMERCE_FIN;

  let dominantTrait = "Systems & Workflow Architect";
  if (client >= systems && client >= quant)
    dominantTrait = "Commercial & Stakeholder Strategist";
  if (quant > client && quant >= systems)
    dominantTrait = "Quantitative & Analytical Problem-Solver";

  return [
    {
      type:
        "TRACK 01 • FASTEST SALARY MULTIPLIER (" +
        dominantTrait.toUpperCase() +
        ")",
      role:
        client >= systems && client >= quant
          ? "Enterprise Account Manager (AM) / Solutions Consultant / Strategic CSM"
          : quant >= systems
          ? "Business Intelligence (BI), RevOps & Decision Science Analyst"
          : "AI-Augmented Product Operations & Business Systems Manager",
      sector:
        "High-Growth B2B SaaS, FinTech & Global Capability Centers (GCCs)",
      targetCtc: "₹13L – ₹22L PA",
      targetCtcNumeric: 17,
      matchScore:
        Math.min(97, 52 + Math.round(Math.max(client, systems, quant) * 0.44)) +
        "% Fit",
      whyFit:
        "Your diagnostic responses highlight a strong '" +
        dominantTrait +
        "' profile. This track directly monetizes your " +
        roleDetail +
        " experience while stepping you up into high-margin roles across Corporate Strategy, Founder's Office, RevOps, and Implementation Consulting.",
      skills: [
        "Consultative Deal & Account Expansion Architecture / RevOps",
        "SQL Database Querying & Executive BI Dashboards",
        "AI Workflow & Process Automation (Make, n8n, Clay)",
        "Adjacent Roles Unlocked: Enterprise AM/CSM, Pre-Sales SE, Product Ops, RevOps",
      ],
    },
    {
      type: "TRACK 02 • DEGREE + WORK EXPERIENCE FUSION (HIGH-MOAT NICHE)",
      role:
        academicCluster === "LIFE_SCIENCES"
          ? "HealthTech Product Manager / Clinical & R&D Operations Lead (GCC)"
          : academicCluster === "CORE_ENG"
          ? "Supply Chain Digital Twin / Industrial Tech Product & Ops Manager"
          : academicCluster === "COMMERCE_FIN"
          ? "FinTech Product Operations / Strategic FP&A & Revenue Risk Lead"
          : "Enterprise Domain Consultant & Vertical SaaS Product Specialist",
      sector: acadInfo.sectorBridge,
      targetCtc: "₹12L – ₹20L PA",
      targetCtcNumeric: 16,
      matchScore:
        Math.min(96, 49 + Math.round((systems + domainAffinity) * 0.42)) +
        "% Fit",
      whyFit:
        "Your " +
        degreeDetail +
        " degree gave you " +
        acadInfo.strengths +
        ", while your work as a " +
        roleDetail +
        " gave you real corporate execution. Global GCCs and vertical SaaS leaders pay a major premium for professionals who combine domain literacy with digital workflows.",
      skills: [
        "Domain Workflow Digitization (" +
          academicCluster.replace(/_/g, " ") +
          ")",
        "8-Week Technical Bridge: " + acadInfo.honestGap,
        "Product Requirements (PRD) & Executive KPI Governance",
        "Adjacent Roles Unlocked: Vertical SaaS PM, GCC Functional Consultant, Domain BA",
      ],
    },
    {
      type: "TRACK 03 • SECTOR-AGNOSTIC TECH & ANALYTICS PIVOT",
      role:
        quant >= client
          ? "Product Analytics, Growth BI & AI Data Operations Specialist"
          : "B2B Growth Marketing, Pipeline Strategy & Founder's Office Associate",
      sector:
        "Consumer Tech, Series B+ Startups, E-Commerce & Management Consulting",
      targetCtc: "₹11L – ₹19L PA",
      targetCtcNumeric: 15,
      matchScore:
        Math.min(94, 46 + Math.round((quant + client + systems) * 0.28)) +
        "% Fit",
      whyFit:
        "Based on your problem-solving profile, building an 8-week Proof-of-Work portfolio unlocks horizontal mobility across high-growth SaaS, FinTech, and Consulting teams—regardless of your college major.",
      skills: [
        "Funnel Cohort Analysis & A/B Experimentation",
        "AI Agentic Workflows (Prompt Engineering, Make/n8n, APIs)",
        "Product Tear-Downs & Unit-Economics Modeling",
        "Adjacent Roles Unlocked: Growth Analyst, Founder's Office, Associate PM",
      ],
    },
  ];
}

export function refineUserBottleneck(rawInput, currentFunction, currentLens) {
  const raw = rawInput.trim();
  let refinedTitle = raw;
  let detectedLens = currentLens;
  let lensReason = "";

  if (
    /lead|meeting|demo|ghost|reply|respond|prospect|pitch|follow|quota|deal|pipeline|sales|renewal|upsell/i.test(
      raw
    )
  ) {
    detectedLens = "REVENUE_CRO";
    lensReason = "Aligned to 📈 Revenue & Pipeline Growth Angle";
    refinedTitle = /meeting|respond|reply|ghost|follow/i.test(raw)
      ? 'Post-Discovery Deal Ghosting & Follow-Up Leakage ("' + raw + '")'
      : 'Mid-Funnel Pipeline Conversion & Revenue Leakage ("' + raw + '")';
  } else if (
    /churn|adoption|ticket|onboarding|user|activation|drop/i.test(raw)
  ) {
    detectedLens = "ADOPTION_CPO";
    lensReason = "Aligned to 🚀 Customer Adoption & Retention Angle";
    refinedTitle = 'Client Onboarding & Retention Drop-Off ("' + raw + '")';
  } else if (
    /cost|margin|invoice|budget|expense|price|leakage|reconcil/i.test(raw)
  ) {
    detectedLens = "COST_CFO";
    lensReason = "Aligned to 💰 Cost Savings & Margin Angle";
    refinedTitle = 'Unit-Economics & Margin Leakage ("' + raw + '")';
  } else if (/audit|compliance|bgv|certificate|defect|bug|qa|risk/i.test(raw)) {
    detectedLens = "RISK_COMPLIANCE";
    lensReason = "Aligned to 🛡️ Audit & Zero-Defect Compliance Angle";
    refinedTitle = 'Compliance & Quality Gate Bottleneck ("' + raw + '")';
  } else {
    detectedLens = "SPEED_COO";
    lensReason = "Aligned to ⏱️ Turnaround Speed & SLA Angle";
    refinedTitle = 'Operational Workflow & SLA Bottleneck ("' + raw + '")';
  }

  return {
    bottleneck: refinedTitle,
    lens: detectedLens,
    notice:
      "✨ Project Customized: [" +
      refinedTitle +
      "] • " +
      lensReason +
      ". All 4 Sprints updated below!",
  };
}

export function buildDynamicLabs(profile, activeBlueprint, customDna) {
  const { bottleneck, targetCluster, lens } = customDna;
  const anchorCompany =
    targetCluster.split("(")[1]?.split("+")[0]?.replace("Anchor:", "").trim() ||
    "TargetCo";
  const cleanSlug =
    bottleneck
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "")
      .slice(0, 22) || "tracker";
  const L = EXECUTIVE_LENS_MAP[lens] || EXECUTIVE_LENS_MAP.REVENUE_CRO;

  const effectiveRole =
    lens === "REVENUE_CRO" &&
    /FP&A|Compliance|Clinical/i.test(activeBlueprint.role)
      ? "Enterprise Account Manager / RevOps & Pipeline Strategist"
      : activeBlueprint.role;

  const candName = profile.candidateName || "[Your Name]";
  const NL = String.fromCharCode(10);

  return {
    effectiveRole,
    sprintTitles: L.sprintTitles,
    sprints: [
      {
        jargonTerm: L.sprintTitles[0],
        plainEnglish:
          'To prove you can solve "' +
          bottleneck +
          '", you will build a clean 7-column Google Sheet tracker tailored for ' +
          anchorCompany +
          " (" +
          L.badge +
          ").",
        tool: "Google Sheets or Excel (Free)",
        headers: L.headers,
        rows: L.rows(bottleneck),
        formula: L.formula,
        steps: [
          {
            title: "Step 1.1: Copy Your 7-Column Tracker Formula",
            desc:
              'Automatically flags every stalled or at-risk record in "' +
              bottleneck +
              '".',
            btn: "View Your Google Sheet Formula",
            out: [
              "✅ PASTE THIS FORMULA INTO COLUMN G (Row 2) OF YOUR GOOGLE SHEET:",
              "",
              L.formula,
              "",
              "• Why This Works for " +
                effectiveRole +
                ": It shows hiring managers at " +
                anchorCompany +
                " that you proactively track " +
                L.badge +
                ".",
            ].join(NL),
          },
          {
            title: "Step 1.2: Your Root-Cause Interview Talking Point",
            desc:
              'Look at Rows #102 & #103 in the table above. Here is how to explain why "' +
              bottleneck +
              '" happens.',
            btn: "View Your Interview Talking Point",
            out: [
              "🎯 WHAT TO SAY IN YOUR INTERVIEW WITH " +
                anchorCompany.toUpperCase() +
                ":",
              "",
              "\"To solve '" +
                bottleneck +
                "', I audited 50 sample records in my tracker and found that 78% of delays happen in rows #102 and #103 due to missing multi-stakeholder sign-off. Fixing this single handoff unlocks " +
                L.kpiMetric +
                '."',
            ].join(NL),
          },
          {
            title: "Step 1.3: Translate Your Sheet into a 5-Line SQL Query",
            desc: "Even if you have never coded, include this 5-line SQL query in your portfolio to stand out.",
            btn: "View Your Custom SQL Query",
            out: [
              "💡 YOUR 5-LINE SQL QUERY (ADD THIS TO YOUR PORTFOLIO):",
              "",
              "SELECT " + L.sqlCols + ", COUNT(*) AS Breach_Count",
              "FROM " + cleanSlug + "_table",
              "WHERE " + L.headers[6] + " LIKE '🚨%'",
              "GROUP BY " + L.sqlCols,
              "ORDER BY Breach_Count DESC;",
            ].join(NL),
          },
        ],
      },
      {
        jargonTerm: L.sprintTitles[1],
        plainEnglish:
          'Connect 3 visual blocks in Make.com so whenever Column G flags 🚨 in "' +
          bottleneck +
          '", an AI assistant drafts the recovery action automatically.',
        tool: "Make.com Free Tier + Google Sheets + Gmail",
        headers: [
          "Block 1 (Trigger)",
          "Block 2 (AI Rule Engine)",
          "Block 3 (Automated Action)",
        ],
        rows: [
          [
            "Row Flagged 🚨 in " + cleanSlug,
            "AI Checks " + L.headers[3],
            "Auto-Draft Recovery Sequence for " + anchorCompany,
          ],
        ],
        formula: L.formula,
        steps: [
          {
            title: "Step 2.1: 15-Minute No-Code Workflow Setup",
            desc: "Connect Google Sheets -> Filter -> AI Email Draft in Make.com.",
            btn: "View 3-Block Setup Guide",
            out: [
              '🧱 15-MINUTE BUILD FOR "' + bottleneck.toUpperCase() + '":',
              "1. In Make.com, select 'Google Sheets: Watch Rows' on your " +
                cleanSlug +
                " sheet.",
              "2. Add a Filter: Column G (" + L.headers[6] + ") contains '🚨'.",
              "3. Connect OpenAI/Gmail: Create a pre-written draft email for 1-click human approval.",
            ].join(NL),
          },
          {
            title: "Step 2.2: Your Role-Specific AI Prompt",
            desc:
              "Copy and paste this prompt so the AI writes like a senior " +
              effectiveRole +
              ".",
            btn: "View Your AI Prompt",
            out: [
              "🤖 COPY-PASTE THIS AI PROMPT:",
              '"Act as a Senior ' +
                effectiveRole +
                " at " +
                anchorCompany +
                ". A record is flagged under '" +
                bottleneck +
                "' ({{" +
                L.headers[3] +
                "}}). Write a concise 3-line executive follow-up to resolve the bottleneck and achieve " +
                L.kpiMetric +
                '."',
            ].join(NL),
          },
          {
            title: "Step 2.3: Your Proof-of-Work Resume Bullet",
            desc: "Place this impact bullet right at the top of your CV and LinkedIn profile.",
            btn: "View Your Resume Bullet",
            out: [
              "📄 ADD THIS BULLET TO THE TOP OF YOUR RESUME:",
              "• \"Designed and deployed an AI-automated tracking & recovery workflow solving '" +
                bottleneck +
                "' (Google Sheets + SQL + Make.com), modeling " +
                L.kpiMetric +
                " and " +
                L.impactValue +
                '."',
            ].join(NL),
          },
        ],
      },
      {
        jargonTerm: L.sprintTitles[2],
        plainEnglish:
          "Turn your Google Sheet into a 1-page executive dashboard showing hiring leaders across " +
          targetCluster +
          ' the Rupee/Dollar impact of fixing "' +
          bottleneck +
          '".',
        tool: "Google Looker Studio (Free)",
        headers: [
          "Target Role",
          "Problem Solved",
          "Primary KPI Win",
          "Annual Business Impact",
        ],
        rows: [
          [
            effectiveRole.slice(0, 26),
            bottleneck.slice(0, 26),
            L.kpiMetric,
            L.impactValue,
          ],
        ],
        formula: L.formula,
        steps: [
          {
            title: "Step 3.1: Your 3 Executive Headline Cards",
            desc: "Place these 3 headline numbers at the very top of your dashboard.",
            btn: "View Dashboard Headline Metrics",
            out: [
              "📊 TOP 3 SCORECARD METRICS FOR YOUR DASHBOARD:",
              "• Target Role: " + effectiveRole,
              "• Bottleneck Solved: " + bottleneck,
              "• Modeled ROI: " + L.kpiMetric + " (" + L.impactValue + ")",
            ].join(NL),
          },
          {
            title: "Step 3.2: 2-Chart Visual Layout",
            desc: "Connect your Google Sheet to Looker Studio in 2 clicks using these chart titles.",
            btn: "View Recommended Chart Titles",
            out: [
              "📈 RECOMMENDED CHART TITLES:",
              '1. Bar Chart: "' +
                anchorCompany +
                " Cluster — '" +
                bottleneck +
                "' Breakdown by " +
                L.headers[3] +
                '"',
              '2. KPI Scorecard: "' + L.impactValue + ' Unlocked"',
            ].join(NL),
          },
          {
            title: "Step 3.3: How to Defend Your ROI Numbers",
            desc: "Use this conservative math explanation when a VP asks how you calculated your impact.",
            btn: "View ROI Defense Script",
            out: [
              "🎯 HOW TO DEFEND YOUR NUMBERS IN THE INTERVIEW:",
              '"I used conservative baseline assumptions. Even if we discount team adoption by 50% across ' +
                anchorCompany +
                ", recovering just 2 stalled records per month still delivers " +
                L.kpiMetric +
                " (" +
                L.impactValue +
                ') on a zero-cost software stack."',
            ].join(NL),
          },
        ],
      },
      {
        jargonTerm: L.sprintTitles[3],
        plainEnglish:
          'Pitch your "' +
          bottleneck +
          '" prototype directly to decision-makers across ' +
          anchorCompany +
          " and 20+ peer companies: Find contacts on LinkedIn (4.1), record your 90-sec Video CV (4.2), send your Cold Pitch (4.3), and optionally book a 15-min Expert Sign-Off Call (4.4).",
        tool: "LinkedIn + Loom + Optional 15-Min Expert Sign-Off (₹999)",
        headers: [
          "Step #",
          "Outbound Action",
          "Channel / Tool",
          "Expected Outcome",
        ],
        rows: [
          [
            "Step 4.1",
            "Find Decision-Makers",
            "LinkedIn Boolean Search (" + anchorCompany + " + 20 Peers)",
            "20 Verified Hiring Managers",
          ],
          [
            "Step 4.2",
            "Record 90-Sec Video CV",
            "Loom Screen Recording",
            "3x Higher Executive Trust",
          ],
          [
            "Step 4.3",
            "Send No-Resume Pitch",
            "LinkedIn DM / Email",
            "35%–45% Reply Rate",
          ],
          [
            "Step 4.4",
            "Expert Sign-Off Call",
            "15-Min 1-on-1 Review (₹999)",
            "Verified & Endorsed Portfolio",
          ],
        ],
        formula: L.formula,
        steps: [
          {
            title:
              "Step 4.1: LinkedIn Decision-Maker Search & Profile Headline",
            desc: "Find VPs/Directors across your 20-company cluster and update your LinkedIn headline.",
            btn: "View LinkedIn Search & Headline",
            out: [
              "🔍 1. PASTE THIS SEARCH STRING INTO LINKEDIN SEARCH BAR:",
              '("' +
                effectiveRole.split("/")[0].trim() +
                '" OR "VP" OR "Director" OR "Head") AND (' +
                anchorCompany +
                " OR " +
                (targetCluster.split(":")[2]?.replace(")", "") || "SaaS") +
                ")",
              "",
              "✨ 2. UPDATE YOUR LINKEDIN HEADLINE TO:",
              '"' +
                effectiveRole.split("/")[0].trim() +
                " | Built AI & SQL Workflows Solving " +
                bottleneck.slice(0, 35) +
                " | " +
                profile.degreeDetail +
                '"',
            ].join(NL),
          },
          {
            title: "Step 4.2: Your 90-Second Video CV Script (Loom)",
            desc: "Record one 90-sec screen share walking through your Sheet, Make.com & Dashboard.",
            btn: "View 90-Sec Video CV Script",
            out: [
              "🎙️ YOUR 90-SECOND LOOM VIDEO CV SCRIPT:",
              "",
              "• 0:00–0:20 (The Hook): \"Hi, I'm " +
                candName +
                ". In my work as a " +
                profile.roleDetail +
                ", I saw how much value leaks from '" +
                bottleneck +
                "'." +
                '"',
              '• 0:20–0:45 (Sprint 1 Tracker): "Instead of sending a generic PDF resume, I built this 7-column diagnostic schema tracking ' +
                L.headers.slice(2, 6).join(", ") +
                '."',
              '• 0:45–1:10 (Sprint 2 AI Automation): "Here is the 3-block Make.com workflow with Human-in-the-Loop guardrails that flags breaches automatically."',
              '• 1:10–1:30 (Sprint 3 Impact): "And here is the Looker Studio dashboard modeling ' +
                L.kpiMetric +
                " (" +
                L.impactValue +
                "). I'd love 10 minutes to share how I can deploy this for your team.\"",
            ].join(NL),
          },
          {
            title: "Step 4.3: Your 'No-Resume' Cold Pitch Message",
            desc: "Send your Loom Video CV & live prototype directly to hiring managers on LinkedIn or email.",
            btn: "View Cold Pitch Template",
            out: [
              "✉️ COPY-PASTE LINKEDIN DM / COLD EMAIL:",
              "",
              'Subject: Built a live prototype solving "' +
                bottleneck +
                '" for ' +
                anchorCompany +
                " (" +
                L.kpiMetric +
                ")",
              "",
              "Hi [First Name],",
              "",
              "Noticed your team scales " +
                effectiveRole.split("/")[0].trim() +
                ' operations. Instead of sending a standard resume, I built a working diagnostic tracker & AI workflow tackling "' +
                bottleneck +
                '".',
              "",
              "• 90-Sec Loom Video CV: [Paste Your Loom Link]",
              "• Modeled Impact: " + L.kpiMetric + " (" + L.impactValue + ")",
              "• My Notice Period: " +
                profile.noticePeriod +
                " (" +
                (profile.locationHub || "India") +
                ")",
              "",
              "Open to a quick 10-minute chat this week?",
              "",
              "Best,",
              candName,
            ].join(NL),
          },
          {
            title: "Step 4.4: Optional 15-Minute Expert Sign-Off Call (₹999)",
            desc: "Get a 1-on-1 portfolio verification with a practicing manager before you send your outreach.",
            btn: "View Expert Sign-Off Details (₹999)",
            out: [
              "👨‍💼 15-MINUTE 1-ON-1 EXPERT SIGN-OFF CALL (₹999)",
              "================================================================",
              "Candidate: " +
                candName +
                " (" +
                (profile.locationHub || "India") +
                ")",
              "Target Employer Cluster: " + targetCluster,
              "",
              "• What Your Mentor Reviews in 15 Minutes:",
              "  1. Audits your 7-column Google Sheet & SQL logic from Sprint 1.",
              "  2. Stress-tests your Make.com guardrail & 90-sec Loom Video CV.",
              "  3. Endorses your resume bullet and gives you greenlight to pitch VPs.",
              "",
              "👇 Click the amber booking button below to reserve your 15-minute slot!",
            ].join(NL),
          },
        ],
      },
    ],
  };
}

// ============================================================================
// DYNAMIC SKILL-BRIDGE GENERATOR (UPDATES ALL 5 BOXES FOR TRACK 1, 2 & 3!)
// ============================================================================
export function getTrackBridgeDetails(profile, activeTrack, trackIdx = 0) {
  const acad =
    ACADEMIC_TRAIT_MAP[profile.academicCluster] ||
    ACADEMIC_TRAIT_MAP.COMMERCE_FIN;

  if (trackIdx === 0) {
    // TRACK 01: Fastest Economic Bridge (Monetizing Current Corporate Function)
    return {
      transferableAssets: [
        "Frontline Execution: " +
          profile.roleDetail +
          " stakeholder & SLA ownership",
        "Process Intuition: First-hand visibility into where daily workflows break",
        "Corporate Readiness: Established communication & CRM/ticket hygiene",
      ],
      missingGaps: [
        "Architecture Gap: Moving from 'running the process' to 'designing the system'",
        "Commercial Gap: Translating daily tasks into Rupee/Dollar P&L unit economics",
        "Portfolio Gap: Zero live automation or BI dashboard links on your current CV",
      ],
      dayInLifeSplit: [
        "40% Strategic Account / Stakeholder Reviews",
        "35% Pipeline Telemetry & Workflow Automation",
        "25% Cross-Functional Deal / Process Structuring",
      ],
      resumeRejectTrap:
        "88% of " +
        profile.roleDetail +
        " applicants get rejected in 6 seconds for Track 01 roles because their CV lists routine daily duties instead of proving they built a system to fix a revenue or SLA bottleneck.",
    };
  }

  if (trackIdx === 1) {
    // TRACK 02: High-Moat Domain Arbitrage (Fusing College Degree + Work Experience)
    return {
      transferableAssets: [
        "Academic Moat: " +
          profile.degreeDetail +
          " (" +
          acad.strengths.split(",")[0] +
          ")",
        "Operational Discipline: " +
          profile.roleDetail +
          " execution under strict SLAs",
        "Rare Hybrid Profile: Speaks both core domain terminology and corporate ops",
      ],
      missingGaps: [
        "Technical Bridge: " + acad.honestGap,
        "Product Translation: Writing formal Product Requirements (PRDs) & data schemas",
        "GCC Readiness: Mapping domain compliance rules into digital cloud workflows",
      ],
      dayInLifeSplit: [
        "45% Domain Workflow Digitization & PRDs",
        "30% Regulatory / Quality Data Modeling (SQL/BI)",
        "25% Global GCC & R&D Stakeholder Alignment",
      ],
      resumeRejectTrap:
        "Generic tech applicants fail here because they don't know " +
        profile.degreeDetail +
        " domain rules—and pure domain graduates fail because they lack digital systems proof. Your 8-week project bridges both.",
    };
  }

  // TRACK 03: Wider Horizon Pivot (Sector-Agnostic High-Growth Analytics & Growth Roles)
  return {
    transferableAssets: [
      "Analytical Baseline: Structured problem-solving from " +
        profile.degreeDetail,
      "Execution Grit: High-volume output and deadline ownership as a " +
        profile.roleDetail,
      "Cross-Sector Agility: Core metrics and funnel logic that apply to any industry",
    ],
    missingGaps: [
      "Data Stack Gap: Multi-table SQL querying & cohort retention regression",
      "Agentic AI Gap: Wiring no-code AI agents (Make.com / APIs) to automate ops",
      "Growth Modeling: Building unit-economics & A/B experimentation scorecards",
    ],
    dayInLifeSplit: [
      "50% Funnel Forensics, SQL & BI Dashboards",
      "30% AI Agentic Workflow & Experimentation Setup",
      "20% Founder's Office / VP Strategy Briefings",
    ],
    resumeRejectTrap:
      "When pivoting into a sector-agnostic role like " +
      activeTrack.role +
      ", hiring managers ignore traditional resumes. Only a live, working prototype solving their exact business problem gets you shortlisted.",
  };
}

export function getVpStressTest(profile, customDna, sprintIdx) {
  const { bottleneck, targetCluster } = customDna;
  const anchor =
    targetCluster.split("(")[1]?.split("+")[0]?.replace("Anchor:", "").trim() ||
    "TargetCo";
  const NL = String.fromCharCode(10);

  const curveballs = [
    {
      vpQuestion:
        "🔥 HIRING VP QUESTION (SPRINT 1): \"Anyone can build a 7-column Google Sheet for '" +
        bottleneck +
        "'. When you deploy this at " +
        anchor +
        ', team members often enter messy or incomplete data. How does your tracker prevent bad data from ruining your metrics?"',
      hint: "Mention input rules (dropdown validation) and pulling system timestamps automatically...",
      winningAnswer: [
        "🏆 RECOMMENDED EXECUTIVE ANSWER:",
        '"Great question. I never rely on manual free-text entry. In my Google Sheet schema, Columns C and D use strict Data Validation dropdowns, and Column F (Turnaround/Inactivity) is calculated automatically from system timestamps rather than human self-reporting—eliminating manual errors."',
      ].join(NL),
    },
    {
      vpQuestion:
        "🔥 HIRING MANAGER QUESTION (SPRINT 2): \"Your 3-block Make.com AI automation for '" +
        bottleneck +
        "' looks great on paper. But what if the AI hallucinates or sends an awkward automated email to an enterprise client at " +
        anchor +
        '?"',
      hint: "Mention 'Human-in-the-Loop' draft approval vs blind auto-sending...",
      winningAnswer: [
        "🏆 RECOMMENDED EXECUTIVE ANSWER:",
        '"For high-stakes accounts at ' +
          anchor +
          ", I designed the workflow with a 'Human-in-the-Loop' guardrail. Block 3 doesn't blindly email the client—it creates a pre-written Draft in Gmail/Slack and pings the account owner for 1-click approval. We get 80% speed without 1% brand risk.\"",
      ].join(NL),
    },
    {
      vpQuestion:
        "🔥 CFO / VP QUESTION (SPRINT 3): \"You claim fixing '" +
        bottleneck +
        "' unlocks massive ROI on your dashboard. Walk me through your conservative math—what if our team only adopts your system 50% of the time?\"",
      hint: "Show that even at 50% adoption, recovering just 2 records pays for itself...",
      winningAnswer: [
        "🏆 RECOMMENDED EXECUTIVE ANSWER:",
        '"I built my dashboard using conservative baseline assumptions. Even if we discount adoption by 50% across the ' +
          anchor +
          ' team, recovering just 2 stalled mid-market deals (or saving 15 hours a week) still yields a 4x return since the stack runs on zero-cost tooling."',
      ].join(NL),
    },
    {
      vpQuestion:
        '🔥 FINAL INTERVIEW QUESTION (SPRINT 4): "You come from a ' +
        profile.degreeDetail +
        " + " +
        profile.roleDetail +
        ' background, whereas other applicants have 3 years of direct title experience. Why should I hire you over them?"',
      hint: "Combine your frontline experience with the fact that you already built a working prototype...",
      winningAnswer: [
        "🏆 RECOMMENDED EXECUTIVE ANSWER:",
        '"Applicants with traditional titles often rely on old playbooks and wait 60 days to be trained. Because I have lived the frontline reality of ' +
          profile.roleDetail +
          " and built this working prototype solving '" +
          bottleneck +
          "' before Day 1, I have already proven I can diagnose, automate, and deliver results independently.\"",
      ].join(NL),
    },
  ];

  return curveballs[sprintIdx] || curveballs[0];
}

export function getFull7StageConfig(stageNum, profile) {
  const fnBlock =
    FUNCTION_SPECIFIC_STAGES[profile.currentFunction] ||
    FUNCTION_SPECIFIC_STAGES.SALES_BD;
  const acadInfo =
    ACADEMIC_TRAIT_MAP[profile.academicCluster] ||
    ACADEMIC_TRAIT_MAP.COMMERCE_FIN;
  const preset =
    GUIDED_DNA_PRESETS[profile.currentFunction] || GUIDED_DNA_PRESETS.SALES_BD;

  const allStages = {
    1: {
      code: "QUESTION 01/07 • YOUR NATURAL PROBLEM-SOLVING STYLE",
      title: "Discover Your Natural Problem-Solving Seat",
      scenario: fnBlock.stage1Scenario,
      options: fnBlock.stage1Options,
      prompt:
        "What specific part of your current job feels easiest to you, and what drains your energy?",
    },
    2: {
      code: "QUESTION 02/07 • HOW YOU HANDLE WORKPLACE PRESSURE",
      title: "How You Create Order Out of Chaos",
      scenario: fnBlock.stage2Scenario,
      options: fnBlock.stage2Options,
      prompt:
        "Why does that specific first move feel most natural to how you work?",
    },
    3: {
      code: "QUESTION 03/07 • LEVERAGING YOUR COLLEGE DEGREE",
      title: "How Should We Use Your " + profile.degreeDetail + " Foundation?",
      scenario:
        "Your " +
        profile.degreeDetail +
        " built strengths in " +
        acadInfo.strengths +
        ". Do you want your next role to combine that domain with corporate execution, or pivot into sector-agnostic business/tech roles?",
      options: [
        {
          id: "HIGH_DOMAIN",
          label: "Combine My Degree + Work Experience (High-Moat Niche)",
          desc:
            "Target specialized hubs (" +
            acadInfo.sectorBridge +
            ") where my degree + " +
            profile.roleDetail +
            " is a rare combination.",
          weights: { domainAffinity: 25, systems: 10 },
        },
        {
          id: "SCALE_CURRENT",
          label:
            "Scale Up in My Current Corporate Function (Leave Degree Behind)",
          desc: "Focus 100% on moving up the value chain in my current corporate track toward ₹15L–₹24L PA roles.",
          weights: { domainAffinity: -20, client: 15 },
        },
        {
          id: "PURE_TECH",
          label: "Pivot into Sector-Agnostic Systems & Analytics Roles",
          desc:
            "Bridge my gap in " +
            acadInfo.honestGap +
            " so I can work in any high-growth SaaS, FinTech, or GCC firm.",
          weights: { domainAffinity: -10, systems: 20, quant: 20 },
        },
      ],
      prompt:
        "Which type of employer (e.g., Global MNC/GCC, Series B+ Startup, Consulting) excites you most?",
    },
    4: {
      code: "QUESTION 04/07 • DESIGNING YOUR IDEAL WORKWEEK",
      title: "Design Your Ideal Weekly Workload Split",
      scenario:
        "Fast-forward 12 months into your new role paying 70%+ more. Which weekly workload split keeps you energized without burning out?",
      options: [
        {
          id: "A",
          label:
            "70% Client Strategy, Account Expansion & Stakeholder Advisory",
          desc: "Owning key accounts, leading executive reviews, negotiating commercial outcomes, or advising leadership.",
          weights: { client: 25, quant: -10 },
        },
        {
          id: "B",
          label: "70% Workflow Design, No-Code Automation & Cross-Team Ops",
          desc: "Fixing broken processes, coordinating product/ops launches, and using simple tools to eliminate manual work.",
          weights: { systems: 25, quant: 10 },
        },
        {
          id: "C",
          label: "70% Data Analysis, Dashboards & Decision Modeling",
          desc: "Working with spreadsheets/databases, building visual dashboards, and uncovering P&L insights.",
          weights: { client: -15, systems: 10, quant: 25 },
        },
      ],
      prompt:
        "On a scale of 1–10, how much do you enjoy live stakeholder negotiation?",
    },
    5: {
      code: "QUESTION 05/07 • YOUR 8-WEEK UPSKILLING FOCUS",
      title: "Choose Your 8-Week Proof-of-Work Skill Bridge",
      scenario:
        "Instead of spending ₹2 Lakhs on a generic 1-year certificate, which guided 8-week skill bridge are you ready to build in Section 3?",
      options: [
        {
          id: "A",
          label: "Commercial & Enterprise Account Architecture (Zero Coding)",
          desc: "Customer ROI calculators, Net Revenue Retention (NRR) playbooks, and executive QBR pitching.",
          weights: { client: 20 },
        },
        {
          id: "B",
          label: "Visual No-Code AI & Workflow Automation (Drag-and-Drop)",
          desc: "Connecting Google Sheets, forms, and AI blocks visually in Make.com without writing code.",
          weights: { systems: 20, quant: 5 },
        },
        {
          id: "C",
          label:
            "Guided Google Sheets → Beginner SQL → Executive BI Dashboards",
          desc: "Starting with clean spreadsheet tables and translating them into SQL and Looker Studio charts.",
          weights: { quant: 25, systems: 5 },
        },
      ],
      prompt:
        "How many hours per week can you realistically commit over the next 8 weeks?",
    },
    6: {
      code: "QUESTION 06/07 • YOUR PORTFOLIO CASE STUDY TOPIC",
      title: "Select the Business Problem You Will Solve in Section 3",
      scenario:
        "To make sure your portfolio stands out to hiring managers, pick a real operational bottleneck from your field (or type your own below):",
      options: preset.bottlenecks.slice(0, 3).map((b, idx) => ({
        id: "B_" + idx,
        label: b,
        desc: "High-impact business problem valued by hiring managers across 20+ peer companies.",
        weights: { systems: 10 },
      })),
      prompt:
        "Optional: Describe a specific bottleneck from your own job (or type 'use selected'):",
    },
    7: {
      code: "QUESTION 07/07 • YOUR FINANCIAL RUNWAY & WEALTH PLAN",
      title: "Calibrate Your 6-Month Freedom Runway & Salary-Hike SIP",
      scenario:
        "You are currently at ₹" +
        profile.ctcBand +
        "L PA. As you transition toward a ₹13L–₹22L PA role over the next 12–18 months, what is your #1 financial priority?",
      options: [
        {
          id: "RUNWAY_FIRST",
          label:
            "Priority #1: Build My 6-Month Freedom Runway & ₹25K Upskill Buffer",
          desc: "Ring-fence my survival buffer in Liquid Funds first so I never negotiate job offers from desperation.",
          weights: { systems: 5 },
        },
        {
          id: "SIP_READY",
          label:
            "Priority #2: Lock 45% of My Upcoming Salary Hike into India + Global SIPs",
          desc: "My basic buffer is set; I want to channel my post-pivot hike into Core India + US Tech ETFs on Day 1.",
          weights: { quant: 5 },
        },
      ],
      prompt:
        "What is your approximate monthly essential living expense in ₹ (e.g., 28000)?",
    },
  };

  return allStages[stageNum] || allStages[1];
}
