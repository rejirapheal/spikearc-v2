// src/App.js
// ============================================================================
// SPIKEARC.COM • PUBLIC STOREFRONT + HELLO@SPIKEARC.COM CONTACT INTEGRATION
// ============================================================================
import React, { useState, useEffect } from "react";
import StudentScholarApp from "./studentApp";

function calcSipMath(fv, pv, yearly, months) {
  if (months <= 0) return Infinity;
  const r = Math.pow(1 + yearly / 100, 1 / 12) - 1;
  const grown = pv * Math.pow(1 + r, months);
  const need = fv - grown;
  if (need <= 0) return 0;
  if (r === 0) return need / months;
  return (need * r) / (Math.pow(1 + r, months) - 1);
}

const fmtInt = (n) => Math.round(n).toLocaleString("en-IN");
const inr = (n) => "₹" + fmtInt(Math.round(n / 100) * 100);
const lakh = (n) => "₹" + (Math.round(n * 10) / 10).toString() + " lakh";

export default function App() {
  // 'landing' = Public Storefront (Default) | 'student' = Secret Founder Test Mode
  const [view, setView] = useState("landing");
  const [showTestingNotice, setShowTestingNotice] = useState(false);
  const [footerClicks, setFooterClicks] = useState(0);

  // Interactive SIP Calculator State
  const [grade, setGrade] = useState(8);
  const [targetLakhs, setTargetLakhs] = useState(50);
  const [savedLakhs, setSavedLakhs] = useState(2);
  const [retPct, setRetPct] = useState(10);

  // Secret URL Bypass for Founder Testing: spikearc.com/?test=1
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("test") === "1" || params.get("student") === "1") {
        setView("student");
      }
    } catch (e) {}
  }, []);

  if (view === "student") {
    return <StudentScholarApp onBackToLanding={() => setView("landing")} />;
  }

  // Handler for Public CTA Buttons (Prevents opening Signup/Questions during testing)
  const handleLockedCtaClick = (e) => {
    if (e) e.preventDefault();
    setShowTestingNotice(true);
    const el = document.getElementById("start");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Secret Founder Unlock: Triple-click "© 2026 SpikeArc" in the footer to enter the app
  const handleSecretFooterClick = () => {
    const next = footerClicks + 1;
    if (next >= 3) {
      setFooterClicks(0);
      setView("student");
    } else {
      setFooterClicks(next);
    }
  };

  // Live Calculator Math
  const targetRupees = targetLakhs * 100000;
  const savedRupees = savedLakhs * 100000;
  const years = 13 - grade; // Grade 10 -> 3 years, Grade 7 -> 6 years
  const months = years * 12;

  const m = calcSipMath(targetRupees, savedRupees, retPct, months);
  const later = calcSipMath(targetRupees, savedRupees, retPct, months - 12);

  const contributed = m * months;
  const growth = Math.max(targetRupees - savedRupees - contributed, 0);
  const total = savedRupees + contributed + growth;
  const putWidthPct =
    m === 0
      ? "0%"
      : (((savedRupees + contributed) / total) * 100).toFixed(1) + "%";
  const growWidthPct =
    m === 0 ? "100%" : ((growth / total) * 100).toFixed(1) + "%";

  return (
    <div className="spikearc-editorial-root">
      {/* GOOGLE FONTS: SORA & HANKEN GROTESK */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600&family=Sora:wght@600;700&display=swap"
      />

      <style>{`
        html {
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
          scroll-behavior: smooth;
        }
        .spikearc-editorial-root {
          --bg: #F7F7FC;
          --surface: #FFFFFF;
          --ink: #0B1020;
          --muted: #4A5068;
          --line: #DCDDEB;
          --accent: #3F37C9;
          --accent-soft: #ECEBFD;
          --btn: #3F37C9;
          --btn-ink: #FFFFFF;
          --green: #0E6B45;
          --green-soft: #E3F5EC;
          --mark-arch: #3F37C9;
          --mark-spike-d: #0E6B45;
          --mark-spike-l: #138A5A;
          --font-display: "Sora", system-ui, sans-serif;
          --font-body: "Hanken Grotesk", system-ui, -apple-system, "Segoe UI", sans-serif;
          background: var(--bg);
          color: var(--ink);
          font-family: var(--font-body);
          font-size: 18px;
          line-height: 1.65;
          min-height: 100vh;
          padding-left: max(16px, env(safe-area-inset-left, 0px));
          padding-right: max(16px, env(safe-area-inset-right, 0px));
        }
        .spikearc-editorial-root * { box-sizing: border-box; }
        .spikearc-editorial-root h1,
        .spikearc-editorial-root h2,
        .spikearc-editorial-root h3 {
          font-family: var(--font-display);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0;
          text-wrap: balance;
        }
        .spikearc-editorial-root p { margin: 0; }
        .spikearc-editorial-root a { color: inherit; }
        .spikearc-editorial-root .wrap { max-width: 1120px; margin: 0 auto; }
        .spikearc-editorial-root .eyebrow {
          font-size: 14px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--accent);
        }

        /* Header */
        .spikearc-editorial-root .site-header {
          position: sticky; top: 0; z-index: 30;
          margin: 0 calc(-1 * max(16px, env(safe-area-inset-left, 0px)));
          padding: 0 max(16px, env(safe-area-inset-right, 0px)) 0 max(16px, env(safe-area-inset-left, 0px));
          background: var(--bg); border-bottom: 1px solid var(--line);
        }
        .spikearc-editorial-root .site-header .wrap {
          display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 68px;
        }
        .spikearc-editorial-root .brand {
          font-family: var(--font-display); font-weight: 700; font-size: 27px;
          letter-spacing: -0.02em; line-height: 1; text-decoration: none;
          display: inline-flex; align-items: baseline;
        }
        .spikearc-editorial-root .brand svg {
          width: 0.62em; height: 0.72em; display: block; margin: 0 0.02em;
        }
        .spikearc-editorial-root nav {
          display: flex; align-items: center; gap: 22px; font-size: 16px; font-weight: 500;
        }
        .spikearc-editorial-root nav a.link {
          text-decoration: none; color: var(--muted);
        }
        .spikearc-editorial-root nav a.link:hover { color: var(--ink); }
        .spikearc-editorial-root .btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          background: var(--btn); color: var(--btn-ink); text-decoration: none;
          font-weight: 600; font-size: 17px; padding: 14px 24px; border-radius: 10px;
          border: 0; cursor: pointer; font-family: var(--font-body);
        }
        .spikearc-editorial-root .btn:hover { filter: brightness(1.08); }
        .spikearc-editorial-root .btn.small { padding: 10px 18px; font-size: 15px; }
        .spikearc-editorial-root .btn.ghost {
          background: transparent; color: var(--ink); border: 1.5px solid var(--line);
        }
        .spikearc-editorial-root .btn.ghost:hover { border-color: var(--accent); filter: none; }
        .spikearc-editorial-root .status-pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--accent-soft); color: var(--accent);
          font-weight: 600; font-size: 14px; padding: 8px 14px; border-radius: 999px;
        }

        /* Hero */
        .spikearc-editorial-root .hero { padding-block: 56px 72px; }
        .spikearc-editorial-root .hero .wrap {
          display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: 56px; align-items: center;
        }
        .spikearc-editorial-root .hero h1 { font-size: clamp(2.2rem, 5vw, 3.5rem); margin-top: 16px; }
        .spikearc-editorial-root .hero h1 em { font-style: normal; color: var(--accent); }
        .spikearc-editorial-root .hero .lede { margin-top: 22px; font-size: 19px; color: var(--muted); max-width: 54ch; }
        .spikearc-editorial-root .hero .actions { margin-top: 30px; display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
        .spikearc-editorial-root .hero .fine { margin-top: 16px; font-size: 15px; color: var(--muted); }
        .spikearc-editorial-root .boards {
          margin-top: 28px; display: flex; flex-wrap: wrap; gap: 8px; padding: 0; list-style: none;
        }
        .spikearc-editorial-root .boards li {
          font-size: 14px; font-weight: 600; padding: 6px 14px; border-radius: 999px;
          background: var(--accent-soft); color: var(--accent);
        }

        .spikearc-editorial-root .arch-stage {
          position: relative; width: 100%; max-width: 460px; margin-inline: auto;
          padding-top: 150px; padding-bottom: 28px;
        }
        .spikearc-editorial-root .arch-stage > svg {
          position: absolute; inset: 0; width: 100%; height: 100%;
        }
        .spikearc-editorial-root .report {
          position: relative; margin: 0 auto; width: 86%;
          background: var(--surface); border: 1px solid var(--line); border-radius: 14px; padding: 22px;
          box-shadow: 0 18px 40px -22px rgba(11, 16, 32, 0.35);
        }
        .spikearc-editorial-root .report .tag {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 13px; font-weight: 600; letter-spacing: 0.06em;
          text-transform: uppercase; color: var(--muted);
        }
        .spikearc-editorial-root .report .tag b {
          color: var(--green); background: var(--green-soft); padding: 3px 9px;
          border-radius: 999px; letter-spacing: 0.04em;
        }
        .spikearc-editorial-root .report h3 { font-size: 19px; margin-top: 14px; }
        .spikearc-editorial-root .meter { margin-top: 12px; display: grid; gap: 10px; }
        .spikearc-editorial-root .meter div {
          display: grid; grid-template-columns: 1fr auto; gap: 2px 10px; font-size: 15px;
        }
        .spikearc-editorial-root .meter .bar {
          grid-column: 1 / -1; height: 8px; border-radius: 999px;
          background: var(--accent-soft); overflow: hidden;
        }
        .spikearc-editorial-root .meter .bar i {
          display: block; height: 100%; background: var(--accent); border-radius: 999px;
        }
        .spikearc-editorial-root .meter div:nth-child(3) .bar i { background: var(--green); }
        .spikearc-editorial-root .report .next {
          margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--line);
          font-size: 15px; color: var(--muted);
        }
        .spikearc-editorial-root .report .next strong {
          color: var(--ink); display: block; margin-bottom: 2px; font-size: 16px;
        }

        /* Sections */
        .spikearc-editorial-root section { padding-block: 72px; }
        .spikearc-editorial-root .section-head { max-width: 680px; }
        .spikearc-editorial-root .section-head h2 { font-size: clamp(1.8rem, 3.6vw, 2.5rem); margin-top: 12px; }
        .spikearc-editorial-root .section-head p { margin-top: 16px; color: var(--muted); font-size: 18px; }

        .spikearc-editorial-root .band {
          background: var(--surface);
          margin: 0 calc(-1 * max(16px, env(safe-area-inset-left, 0px)));
          padding-inline: max(16px, env(safe-area-inset-left, 0px)) max(16px, env(safe-area-inset-right, 0px));
          border-block: 1px solid var(--line);
        }

        .spikearc-editorial-root .three {
          margin-top: 40px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 40px;
        }
        .spikearc-editorial-root .three > div { border-top: 2px solid var(--ink); padding-top: 18px; }
        .spikearc-editorial-root .three h3 { font-size: 21px; }
        .spikearc-editorial-root .three p { margin-top: 10px; color: var(--muted); font-size: 17px; }

        .spikearc-editorial-root .steps {
          margin: 40px 0 0; padding: 0; list-style: none;
          display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px;
        }
        .spikearc-editorial-root .steps li {
          position: relative; padding-top: 22px; border-top: 1px solid var(--line);
        }
        .spikearc-editorial-root .steps li::before {
          content: ""; position: absolute; top: -5px; left: 0;
          width: 9px; height: 9px; border-radius: 50%; background: var(--accent);
        }
        .spikearc-editorial-root .steps .when {
          font-size: 14px; font-weight: 600; letter-spacing: 0.06em;
          text-transform: uppercase; color: var(--accent);
        }
        .spikearc-editorial-root .steps h3 { font-size: 22px; margin-top: 6px; }
        .spikearc-editorial-root .steps p { margin-top: 10px; color: var(--muted); font-size: 17px; }
        .spikearc-editorial-root .steps .out {
          margin-top: 14px; font-size: 15px; color: var(--ink);
          padding: 12px 14px; background: var(--accent-soft); border-radius: 8px;
        }
        .spikearc-editorial-root .steps .out b {
          display: block; font-size: 13px; letter-spacing: 0.06em;
          text-transform: uppercase; color: var(--accent); margin-bottom: 2px;
        }

        /* Calculator */
        .spikearc-editorial-root .calc {
          margin-top: 40px; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 0; border: 1px solid var(--line); border-radius: 18px; overflow: hidden; background: var(--surface);
        }
        .spikearc-editorial-root .calc .calc-form {
          padding: 32px; display: grid; gap: 22px; align-content: start;
        }
        .spikearc-editorial-root .field label,
        .spikearc-editorial-root .field .lab {
          display: flex; justify-content: space-between; align-items: baseline;
          font-weight: 600; font-size: 16px; margin-bottom: 8px;
        }
        .spikearc-editorial-root .field output {
          font-family: var(--font-display); font-weight: 600; color: var(--accent);
        }
        .spikearc-editorial-root input[type="range"] { width: 100%; accent-color: var(--accent); cursor: pointer; }
        .spikearc-editorial-root .grades { display: flex; gap: 8px; flex-wrap: wrap; }
        .spikearc-editorial-root .grades button {
          display: inline-flex; padding: 10px 20px; border-radius: 10px;
          border: 1.5px solid var(--line); font-weight: 600; cursor: pointer;
          background: var(--bg); color: var(--ink); font-family: var(--font-body); font-size: 16px;
        }
        .spikearc-editorial-root .grades button.active {
          background: var(--btn); border-color: var(--btn); color: var(--btn-ink);
        }
        .spikearc-editorial-root .result {
          padding: 32px; background: var(--accent-soft);
          display: flex; flex-direction: column; justify-content: center; gap: 18px;
        }
        .spikearc-editorial-root .result .big {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(2.2rem, 5vw, 3.2rem); letter-spacing: -0.03em;
          line-height: 1; font-variant-numeric: tabular-nums;
        }
        .spikearc-editorial-root .result .big small {
          font-size: 0.42em; font-weight: 600; color: var(--muted); letter-spacing: 0;
        }
        .spikearc-editorial-root .result .label { font-size: 15px; color: var(--muted); }
        .spikearc-editorial-root .split {
          height: 12px; border-radius: 999px; overflow: hidden; display: flex; background: var(--surface);
        }
        .spikearc-editorial-root .split i { display: block; height: 100%; }
        .spikearc-editorial-root .split .put { background: var(--accent); }
        .spikearc-editorial-root .split .grow { background: var(--green); }
        .spikearc-editorial-root .legend {
          display: flex; flex-wrap: wrap; gap: 6px 20px; font-size: 15px;
          color: var(--muted); font-variant-numeric: tabular-nums;
        }
        .spikearc-editorial-root .legend b { color: var(--ink); }
        .spikearc-editorial-root .dot {
          display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 6px;
        }
        .spikearc-editorial-root .delay {
          font-size: 16px; padding: 12px 14px; border-left: 3px solid var(--green);
          background: var(--surface); border-radius: 0 8px 8px 0; font-variant-numeric: tabular-nums;
        }
        .spikearc-editorial-root .disclaimer { margin-top: 14px; font-size: 14px; color: var(--muted); max-width: 80ch; }

        /* Trust */
        .spikearc-editorial-root .trust {
          margin-top: 40px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 40px;
        }
        .spikearc-editorial-root .trust h3 { font-size: 20px; }
        .spikearc-editorial-root .trust p { margin-top: 8px; color: var(--muted); font-size: 17px; }
        .spikearc-editorial-root .trust .tick { display: inline-block; width: 22px; height: 22px; margin-bottom: 12px; }

        /* Offer */
        .spikearc-editorial-root .offer {
          display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: 48px; align-items: center;
        }
        .spikearc-editorial-root .offer h2 { font-size: clamp(1.8rem, 3.6vw, 2.5rem); margin-top: 12px; }
        .spikearc-editorial-root .offer p.sub { margin-top: 16px; color: var(--muted); font-size: 18px; max-width: 52ch; }
        .spikearc-editorial-root .offer ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 12px; font-size: 17px; }
        .spikearc-editorial-root .offer li {
          display: grid; grid-template-columns: 22px 1fr; gap: 12px; align-items: start;
          padding-bottom: 12px; border-bottom: 1px solid var(--line);
        }
        .spikearc-editorial-root .offer li:last-child { border-bottom: 0; }
        .spikearc-editorial-root .offer li svg { width: 22px; height: 22px; margin-top: 2px; }
        .spikearc-editorial-root .price-line {
          margin-top: 26px; display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 14px;
        }
        .spikearc-editorial-root .price-line b { font-family: var(--font-display); font-size: 1.75rem; }
        .spikearc-editorial-root .price-line span { color: var(--muted); font-size: 16px; }
        .spikearc-editorial-root .offer .actions { margin-top: 26px; display: flex; flex-wrap: wrap; gap: 12px; }
        .spikearc-editorial-root .testing-banner {
          margin-top: 20px; padding: 16px 18px; border-radius: 12px;
          background: var(--green-soft); border: 1.5px solid var(--green);
          color: var(--ink); font-size: 16px; font-weight: 500;
        }

        /* FAQ */
        .spikearc-editorial-root .faq { margin-top: 32px; max-width: 800px; }
        .spikearc-editorial-root .faq details { border-bottom: 1px solid var(--line); }
        .spikearc-editorial-root .faq summary {
          cursor: pointer; list-style: none; padding: 20px 36px 20px 0;
          font-weight: 600; font-size: 19px; position: relative;
        }
        .spikearc-editorial-root .faq summary::-webkit-details-marker { display: none; }
        .spikearc-editorial-root .faq summary::after {
          content: "+"; position: absolute; right: 4px; top: 50%;
          transform: translateY(-50%); font-size: 24px; color: var(--accent);
        }
        .spikearc-editorial-root .faq details[open] summary::after { content: "\\2212"; }
        .spikearc-editorial-root .faq details p { padding: 0 0 22px; color: var(--muted); max-width: 68ch; font-size: 17px; }

        /* Footer */
        .spikearc-editorial-root footer {
          border-top: 1px solid var(--line); padding-block: 40px 56px; font-size: 15px; color: var(--muted);
        }
        .spikearc-editorial-root footer .wrap { display: grid; gap: 18px; }
        .spikearc-editorial-root footer .top {
          display: flex; flex-wrap: wrap; gap: 16px 32px; align-items: center; justify-content: space-between;
        }
        .spikearc-editorial-root footer .brand { font-size: 23px; color: var(--ink); }
        .spikearc-editorial-root footer .small { max-width: 90ch; }
        .spikearc-editorial-root .mail-link {
          color: var(--accent); font-weight: 600; text-decoration: underline; text-underline-offset: 3px;
        }

        @media (max-width: 900px) {
          .spikearc-editorial-root .hero .wrap,
          .spikearc-editorial-root .offer { grid-template-columns: minmax(0, 1fr); gap: 40px; }
          .spikearc-editorial-root .three,
          .spikearc-editorial-root .trust { grid-template-columns: minmax(0, 1fr); gap: 28px; }
          .spikearc-editorial-root .steps { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .spikearc-editorial-root .calc { grid-template-columns: minmax(0, 1fr); }
        }
        @media (max-width: 640px) {
          .spikearc-editorial-root { font-size: 18px; line-height: 1.65; }
          .spikearc-editorial-root .eyebrow,
          .spikearc-editorial-root .boards li,
          .spikearc-editorial-root .steps .when,
          .spikearc-editorial-root .report .tag { font-size: 14px; }
          .spikearc-editorial-root .hero .lede,
          .spikearc-editorial-root .section-head p,
          .spikearc-editorial-root .three p,
          .spikearc-editorial-root .steps p,
          .spikearc-editorial-root .trust p { font-size: 17px; }
          .spikearc-editorial-root nav a.link { display: none; }
          .spikearc-editorial-root .hero { padding-block: 36px 48px; }
          .spikearc-editorial-root section { padding-block: 52px; }
          .spikearc-editorial-root .steps { grid-template-columns: minmax(0, 1fr); }
          .spikearc-editorial-root .calc .calc-form,
          .spikearc-editorial-root .result { padding: 22px; }
          .spikearc-editorial-root .hero .actions .btn,
          .spikearc-editorial-root .offer .actions .btn { width: 100%; font-size: 17px; padding: 15px 22px; }
        }
      `}</style>

      {/* SVG DEFINITIONS FOR ARCH MARK & TICK */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <symbol id="mark" viewBox="0 0 60 72">
            <path
              d="M6 72 A120 120 0 0 1 30 3 A120 120 0 0 1 54 72"
              fill="none"
              stroke="var(--mark-arch)"
              strokeWidth="9"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
            />
            <polygon points="30,26 22,47 30,66" fill="var(--mark-spike-d)" />
            <polygon points="30,26 38,47 30,66" fill="var(--mark-spike-l)" />
          </symbol>
          <symbol id="tick" viewBox="0 0 22 22">
            <path
              d="M3 11.5 L9 17 L19 5"
              fill="none"
              stroke="var(--green)"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </symbol>
        </defs>
      </svg>

      {/* SITE HEADER */}
      <header className="site-header" id="top">
        <div className="wrap">
          <a className="brand" href="#top" aria-label="SpikeArc home">
            Spike
            <svg viewBox="0 0 60 72" aria-hidden="true">
              <use href="#mark" />
            </svg>
            rc
          </a>
          <nav aria-label="Main">
            <a className="link" href="#how">
              How it works
            </a>
            <a className="link" href="#plan">
              Savings planner
            </a>
            <a className="link" href="#parents">
              For parents
            </a>
            <a className="link" href="#faq">
              Questions
            </a>
            <a className="link" href="mailto:hello@spikearc.com">
              hello@spikearc.com
            </a>
            <span className="status-pill">Launch Cohort Opening Soon</span>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO SECTION WITH POINTED ARCH STAGE */}
        <section className="hero" aria-labelledby="h1">
          <div className="wrap">
            <div>
              <p className="eyebrow">For parents of Grade 7 to 10</p>
              <h1 id="h1">
                Choose the stream, the college and the savings plan{" "}
                <em>before Grade 11 chooses for you.</em>
              </h1>
              <p className="lede">
                A 3-minute, 15-question discovery turns into a subject plan, a
                college map across India and abroad, three projects a year, and
                a monthly savings target. Built for Indian families.
              </p>
              <div className="actions">
                <a className="btn" href="#how">
                  See how SpikeArc works
                </a>
                <a className="btn ghost" href="#plan">
                  Try the savings planner
                </a>
              </div>
              <p className="fine">
                First 100 Families Cohort · Finalizing private testing before
                public onboarding opens. Questions? Write to{" "}
                <a className="mail-link" href="mailto:hello@spikearc.com">
                  hello@spikearc.com
                </a>
              </p>
              <ul className="boards" aria-label="Boards covered">
                <li>CBSE</li>
                <li>ICSE</li>
                <li>State boards</li>
                <li>IB</li>
                <li>IGCSE</li>
              </ul>
            </div>

            <div className="arch-stage">
              <svg
                viewBox="0 0 400 560"
                preserveAspectRatio="xMidYMin meet"
                aria-hidden="true"
              >
                <path
                  d="M20 560 A400 400 0 0 1 200 40 A400 400 0 0 1 380 560"
                  fill="none"
                  stroke="var(--mark-arch)"
                  strokeWidth="5"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                />
                <path
                  d="M56 560 A330 330 0 0 1 200 108 A330 330 0 0 1 344 560"
                  fill="none"
                  stroke="var(--mark-spike-l)"
                  strokeWidth="5"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                />
              </svg>
              <article className="report" aria-label="Sample discovery report">
                <p className="tag">
                  Sample profile, Grade 8 <b>Example</b>
                </p>
                <h3>Leans toward building and science</h3>
                <div className="meter">
                  <div>
                    <span>Building and making</span>
                    <span>82</span>
                    <span className="bar">
                      <i style={{ width: "82%" }} />
                    </span>
                  </div>
                  <div>
                    <span>Science and inquiry</span>
                    <span>74</span>
                    <span className="bar">
                      <i style={{ width: "74%" }} />
                    </span>
                  </div>
                  <div>
                    <span>Writing and ideas</span>
                    <span>51</span>
                    <span className="bar">
                      <i style={{ width: "51%" }} />
                    </span>
                  </div>
                </div>
                <p className="next">
                  <strong>First project: a 20-minute weekend sprint</strong>
                  Sketch and test a sensor that tracks a plant&apos;s water
                  level.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* WHY START EARLY BAND */}
        <section className="band" aria-labelledby="why">
          <div className="wrap" style={{ paddingBlock: 0 }}>
            <div className="section-head" style={{ paddingTop: 0 }}>
              <p className="eyebrow">Why start early</p>
              <h2 id="why">
                Three decisions arrive earlier than most families expect.
              </h2>
            </div>
            <div className="three">
              <div>
                <h3>Subjects, from Grade 9</h3>
                <p>
                  Subject and stream choices in Grades 9 to 11 decide which
                  courses stay open later. Most children make them with a
                  friend&apos;s advice and a school brochure.
                </p>
              </div>
              <div>
                <h3>A college route that fits</h3>
                <p>
                  Indian universities, new-age ones such as Ashoka and Krea,
                  India campuses of foreign universities, or abroad. Each looks
                  for a different kind of profile.
                </p>
              </div>
              <div>
                <h3>Money, on a timeline</h3>
                <p>
                  A college plan without a savings plan is a wish. Starting a
                  year later raises the monthly amount you need, and the planner
                  below shows by how much.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS: 4 STEPS */}
        <section id="how" aria-labelledby="how-h">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">How it works</p>
              <h2 id="how-h">Four steps, in this order.</h2>
              <p>
                Each step uses the one before it, so the college map is built on
                your child&apos;s actual profile and the savings target on that
                map.
              </p>
            </div>
            <ol className="steps">
              <li>
                <p className="when">Day 1, 3 minutes</p>
                <h3>Discover</h3>
                <p>
                  Fifteen short questions on interests, working style and
                  aptitude. Designed for a phone and a child&apos;s attention
                  span.
                </p>
                <p className="out">
                  <b>You get</b>An interest and working-style profile
                </p>
              </li>
              <li>
                <p className="when">Same week</p>
                <h3>Map</h3>
                <p>
                  The profile is matched against subject combinations and
                  college requirements that our team verifies, not guessed.
                </p>
                <p className="out">
                  <b>You get</b>A subject plan and a shortlist in India and
                  abroad, with entry requirements
                </p>
              </li>
              <li>
                <p className="when">Through the year</p>
                <h3>Build</h3>
                <p>
                  Three college-ready projects a year, in 20-minute weekend
                  sprints, with AI guidance and low-touch mentor check-ins.
                </p>
                <p className="out">
                  <b>You get</b>A portfolio that grows every year
                </p>
              </li>
              <li>
                <p className="when">Any time</p>
                <h3>Plan</h3>
                <p>
                  College and living costs for each route, and a monthly savings
                  target for Indian and global investing.
                </p>
                <p className="out">
                  <b>You get</b>A corpus plan and a monthly SIP
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* INTERACTIVE SAVINGS PLANNER */}
        <section className="band" id="plan" aria-labelledby="plan-h">
          <div className="wrap" style={{ paddingBlock: 0 }}>
            <div className="section-head">
              <p className="eyebrow">Savings planner</p>
              <h2 id="plan-h">
                See what a monthly SIP can do, and what waiting costs.
              </h2>
              <p>
                Set a target and a return you are comfortable assuming. In the
                full product the target comes from the college route you pick.
              </p>
            </div>

            <div className="calc">
              <div className="calc-form" aria-label="Savings planner">
                <div className="field">
                  <div className="lab" id="grade-lab">
                    Child&apos;s grade now
                  </div>
                  <div
                    className="grades"
                    role="radiogroup"
                    aria-labelledby="grade-lab"
                  >
                    {[7, 8, 9, 10].map((g) => (
                      <button
                        key={g}
                        type="button"
                        className={grade === g ? "active" : ""}
                        onClick={() => setGrade(g)}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="target">
                    Target corpus at college start{" "}
                    <output>{lakh(targetLakhs)}</output>
                  </label>
                  <input
                    type="range"
                    id="target"
                    min="10"
                    max="200"
                    step="5"
                    value={targetLakhs}
                    onChange={(e) => setTargetLakhs(parseFloat(e.target.value))}
                  />
                </div>
                <div className="field">
                  <label htmlFor="saved">
                    Already saved <output>{lakh(savedLakhs)}</output>
                  </label>
                  <input
                    type="range"
                    id="saved"
                    min="0"
                    max="30"
                    step="0.5"
                    value={savedLakhs}
                    onChange={(e) => setSavedLakhs(parseFloat(e.target.value))}
                  />
                </div>
                <div className="field">
                  <label htmlFor="ret">
                    Assumed yearly return <output>{retPct.toFixed(1)}%</output>
                  </label>
                  <input
                    type="range"
                    id="ret"
                    min="6"
                    max="14"
                    step="0.5"
                    value={retPct}
                    onChange={(e) => setRetPct(parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div className="result" aria-live="polite">
                <p className="label">
                  Monthly SIP needed over {years}{" "}
                  {years === 1 ? "year" : "years"}
                </p>
                <p className="big">
                  {m === 0 ? "₹0" : inr(m)} <small>a month</small>
                </p>
                <div className="split" aria-hidden="true">
                  <i className="put" style={{ width: putWidthPct }} />
                  <i className="grow" style={{ width: growWidthPct }} />
                </div>
                <p className="legend">
                  <span>
                    <span
                      className="dot"
                      style={{ background: "var(--accent)" }}
                    />
                    You put in{" "}
                    <b>
                      {m === 0
                        ? "₹0"
                        : lakh((savedRupees + contributed) / 100000)}
                    </b>
                  </span>
                  <span>
                    <span
                      className="dot"
                      style={{ background: "var(--green)" }}
                    />
                    Growth{" "}
                    <b>
                      {m === 0
                        ? lakh((targetRupees - savedRupees) / 100000)
                        : lakh(growth / 100000)}
                    </b>
                  </span>
                </p>
                <p className="delay">
                  {m === 0
                    ? "Your current savings already reach this target at the assumed return."
                    : isFinite(later)
                    ? `Starting one year later raises it to ${inr(
                        later
                      )} a month, ${inr(later - m)} more.`
                    : "With one year less, a monthly SIP can no longer reach this target."}
                </p>
              </div>
            </div>
            <p className="disclaimer">
              Illustrative arithmetic, not investment advice. Real returns vary
              and can be negative. Years to college assume the child starts in
              the year after Grade 12. Amounts are in lakh rupees; 100 lakh is 1
              crore.
            </p>
          </div>
        </section>

        {/* FOR PARENTS TRUST BAND */}
        <section id="parents" aria-labelledby="par-h">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">For parents</p>
              <h2 id="par-h">
                You stay in charge of your child&apos;s data and decisions.
              </h2>
            </div>
            <div className="trust">
              <div>
                <svg className="tick" aria-hidden="true">
                  <use href="#tick" />
                </svg>
                <h3>Consent comes first</h3>
                <p>
                  A parent verifies consent before the child answers a single
                  question, in line with India&apos;s DPDP Act.
                </p>
              </div>
              <div>
                <svg className="tick" aria-hidden="true">
                  <use href="#tick" />
                </svg>
                <h3>No ads, no tracking of children</h3>
                <p>
                  We do not run ads to students or profile them for marketing.
                  Schools do not get a cut of what you pay.
                </p>
              </div>
              <div>
                <svg className="tick" aria-hidden="true">
                  <use href="#tick" />
                </svg>
                <h3>Guidance, not guarantees</h3>
                <p>
                  We show what colleges ask for and how to prepare. We do not
                  promise admission or scholarships, and neither should anyone
                  else.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LAUNCH OFFER BAND (WITH HELLO@SPIKEARC.COM EARLY ACCESS BUTTON) */}
        <section className="band" id="start" aria-labelledby="off-h">
          <div className="wrap offer" style={{ paddingBlock: 0 }}>
            <div>
              <p className="eyebrow">Launch offer</p>
              <h2 id="off-h">
                The first 100 families get the first year free.
              </h2>
              <p className="sub">
                Full access to discovery, the subject and college map, project
                sprints and the savings planner. Mentor check-ins are optional
                and priced separately.
              </p>
              <p className="price-line">
                <b>Free for year one</b>
                <span>then ₹2,499 a year, cancel any time</span>
              </p>
              <div className="actions">
                <button
                  type="button"
                  className="btn"
                  onClick={handleLockedCtaClick}
                >
                  First 100 Families Cohort — Opening Soon
                </button>
                <a
                  className="btn ghost"
                  href="mailto:hello@spikearc.com?subject=Early%20Access%20Request%20%E2%80%94%20SpikeArc%20First%20100%20Families"
                >
                  Email hello@spikearc.com
                </a>
              </div>
              {showTestingNotice && (
                <div className="testing-banner">
                  <strong>Private Testing in Progress:</strong> We are
                  finalizing the Grade 7–10 board & college modules for our
                  First 100 Families launch cohort. To reserve an early-access
                  invite for your child, write to us at{" "}
                  <a
                    className="mail-link"
                    href="mailto:hello@spikearc.com?subject=Early%20Access%20Request%20%E2%80%94%20SpikeArc%20First%20100%20Families"
                  >
                    hello@spikearc.com
                  </a>
                  .
                </div>
              )}
            </div>
            <ul>
              <li>
                <svg aria-hidden="true">
                  <use href="#tick" />
                </svg>
                <span>15-question discovery with a parent-readable report</span>
              </li>
              <li>
                <svg aria-hidden="true">
                  <use href="#tick" />
                </svg>
                <span>Subject plan for your child&apos;s board</span>
              </li>
              <li>
                <svg aria-hidden="true">
                  <use href="#tick" />
                </svg>
                <span>
                  College map: India, India campuses of foreign universities,
                  abroad
                </span>
              </li>
              <li>
                <svg aria-hidden="true">
                  <use href="#tick" />
                </svg>
                <span>Three projects a year with AI guidance</span>
              </li>
              <li>
                <svg aria-hidden="true">
                  <use href="#tick" />
                </svg>
                <span>Cost and monthly SIP planner</span>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" aria-labelledby="faq-h">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Questions parents ask</p>
              <h2 id="faq-h">Plain answers.</h2>
            </div>
            <div className="faq">
              <details>
                <summary>Which boards and grades do you cover?</summary>
                <p>
                  Grades 7 to 10 on CBSE, ICSE, State boards, IB and IGCSE.
                  Subject advice follows your child&apos;s own board, so a Grade
                  9 CBSE plan and a Grade 9 IGCSE plan differ.
                </p>
              </details>
              <details>
                <summary>Is this a test my child can fail?</summary>
                <p>
                  No. The questions are about what your child enjoys and how
                  they like to work. There are no marks and no right answers.
                  The report describes tendencies and suggests options to try.
                </p>
              </details>
              <details>
                <summary>How do you use my child&apos;s data?</summary>
                <p>
                  To build the report and the plan for your family, and for
                  nothing else. A parent gives verified consent first, and you
                  can ask us to delete your family&apos;s data at any time by
                  writing to{" "}
                  <a className="mail-link" href="mailto:hello@spikearc.com">
                    hello@spikearc.com
                  </a>
                  .
                </p>
              </details>
              <details>
                <summary>Do you guarantee admission or scholarships?</summary>
                <p>
                  No. Admissions depend on many things we do not control. We
                  show you what each college asks for and help your child build
                  a stronger profile over three to four years.
                </p>
              </details>
              <details>
                <summary>
                  What do the mentors do, and what do they cost?
                </summary>
                <p>
                  Mentors check in on project progress and give feedback on a
                  light schedule. They are optional and priced separately, well
                  below typical admission-agency fees.
                </p>
              </details>
              <details>
                <summary>Is the savings planner investment advice?</summary>
                <p>
                  The planner is educational arithmetic. Any personalised
                  investment advice is offered separately, by a SEBI-registered
                  entity, with its own terms and disclosures.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER (TRIPLE-CLICK "© 2026 SpikeArc" FOR SECRET FOUNDER TEST ACCESS) */}
      <footer>
        <div className="wrap">
          <div className="top">
            <a className="brand" href="#top" aria-label="SpikeArc">
              Spike
              <svg viewBox="0 0 60 72" aria-hidden="true">
                <use href="#mark" />
              </svg>
              rc
            </a>
            <span>
              Pre-college architect for Grades 7 to 10 · Contact:{" "}
              <a className="mail-link" href="mailto:hello@spikearc.com">
                hello@spikearc.com
              </a>
            </span>
          </div>
          <p className="small">
            SpikeArc provides educational guidance and planning tools. It does
            not guarantee admission, scholarships or investment returns.
            Investments are subject to market risk. SEBI registration details:
            add registration number and disclosures before launch.
          </p>
          <p
            className="small"
            onClick={handleSecretFooterClick}
            style={{ cursor: "pointer", userSelect: "none" }}
            title="Founder access"
          >
            © 2026 SpikeArc · hello@spikearc.com
          </p>
        </div>
      </footer>
    </div>
  );
}
