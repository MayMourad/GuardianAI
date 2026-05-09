import { useState } from "react";
import {
  Shield, Star, Zap, Heart, Users, Award, Cpu, Activity,
  Target, Brain, CheckCircle, Lock, TrendingUp, Globe,
  ChevronRight, Sparkles
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   UAE DESIGN PHILOSOPHY — GUARDIAN AI: UNITY IN SERVICE
   ───────────────────────────────────────────────────────────────────
   This simulation reinforces the UAE's "ambition for a hopeful and
   secure future" through four interlocking design principles:

   1. UNITY AS CURRENCY — "Unity Points" (ᵁᴾ) encode the UAE's
      conviction that collective service IS national wealth. Every
      frontline hero supported multiplies societal capital.

   2. BALANCED PROGRESS — The Empathy × Efficiency scoring algorithm
      operationalises UAE Vision 2031: technology must advance human
      compassion, not replace it. A deployment scoring 100% efficiency
      but 0% empathy earns LESS than one balancing both — by design.

   3. LEGACY CULTURE — Badge mechanics mirror the UAE's tradition of
      honouring service permanently. "Guardian of the Frontline" and
      "National Visionary" evoke national ethos of recognition for
      those who protect and uplift the nation.

   4. RESILIENCE AS METRIC — "Community Resilience" measures a
      system's capacity to endure future shocks, reflecting the UAE's
      ambition to build a nation that thrives across generations —
      not just for today's citizens, but as a living legacy of hope.
   ═══════════════════════════════════════════════════════════════════ */

const TASKS = [
  {
    id: 1,
    title: "AI Logistics for a Field Hospital",
    description:
      "Deploy intelligent supply-chain AI to ensure medical teams at a remote field hospital receive critical resources without delay. Coordinate drone delivery, predictive restocking, and triage priority queues.",
    sector: "Medical",
    basePoints: 150,
    challenge:
      "Remote terrain disrupts conventional supply chains. Speed must not come at the cost of patient dignity.",
  },
  {
    id: 2,
    title: "Digital Learning Platform for Remote Schools",
    description:
      "Assign AI tutoring modules to 500 students in underserved communities. Personalise each curriculum based on individual learning patterns while maintaining network efficiency.",
    sector: "Education",
    basePoints: 120,
    challenge:
      "Limited bandwidth and diverse learning needs demand both technical precision and deep human understanding.",
  },
  {
    id: 3,
    title: "Smart Defense Patrol Network",
    description:
      "Coordinate autonomous surveillance AI across strategic zones to support armed forces with real-time threat detection and rapid-response routing algorithms.",
    sector: "Defense",
    basePoints: 180,
    challenge:
      "Mission-critical precision demands maximum efficiency, but rules of engagement require nuanced human judgment.",
  },
  {
    id: 4,
    title: "Emergency Medical AI Dispatch",
    description:
      "Route ambulances and medical drones using predictive AI across a dense urban grid during a mass-emergency event requiring simultaneous multi-site coordination.",
    sector: "Medical",
    basePoints: 200,
    challenge:
      "Every second saved is a life protected. Empathy for patient dignity must complement algorithmic speed.",
  },
  {
    id: 5,
    title: "Community Resilience Monitoring Grid",
    description:
      "Deploy a distributed sensor and AI network to identify vulnerable populations during extreme weather events and coordinate community-wide emergency response.",
    sector: "Community",
    basePoints: 160,
    challenge:
      "Serving the most vulnerable requires deep social understanding alongside flawless technical deployment.",
  },
];

const BADGE_DEFS = [
  {
    id: "guardian_frontline",
    name: "Guardian of the Frontline",
    description: "Complete 3 medical AI deployments",
    emoji: "🏥",
    condition: (s) => s.medicalCompleted >= 3,
  },
  {
    id: "national_visionary",
    name: "National Visionary",
    description: "Accumulate 1,000 Unity Points",
    emoji: "🌟",
    condition: (s) => s.unityPoints >= 1000,
  },
  {
    id: "empathy_champion",
    name: "Empathy Champion",
    description: "Earn 5 Social Impact bonuses",
    emoji: "💚",
    condition: (s) => s.socialImpactCount >= 5,
  },
  {
    id: "efficiency_master",
    name: "Efficiency Master",
    description: "Complete 5 high-efficiency tasks (>80)",
    emoji: "⚡",
    condition: (s) => s.highEfficiencyCount >= 5,
  },
  {
    id: "unity_builder",
    name: "Unity Builder",
    description: "Reach Community Resilience of 80+",
    emoji: "🤝",
    condition: (s) => s.communityResilience >= 80,
  },
];

const SECTOR_CONFIG = {
  Medical:   { border: "border-emerald-700/60", text: "text-emerald-400", bg: "bg-emerald-950/60", icon: <Heart className="w-5 h-5 text-emerald-400" /> },
  Education: { border: "border-cyan-700/60",    text: "text-cyan-400",    bg: "bg-cyan-950/60",    icon: <Brain className="w-5 h-5 text-cyan-400" /> },
  Defense:   { border: "border-amber-700/60",   text: "text-amber-400",   bg: "bg-amber-950/60",   icon: <Shield className="w-5 h-5 text-amber-400" /> },
  Community: { border: "border-violet-700/60",  text: "text-violet-400",  bg: "bg-violet-950/60",  icon: <Users className="w-5 h-5 text-violet-400" /> },
};

function score(empathy, efficiency, base) {
  const raw = Math.round(((empathy * 0.5 + efficiency * 0.5) / 100) * base);
  const social = empathy > 75 ? Math.round(raw * 0.2) : 0;
  return { raw, social, total: raw + social, hasSocial: empathy > 75 };
}

function ParticleField() {
  const pts = Array.from({ length: 16 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    d: 1.5 + Math.random() * 3,
    delay: i * 0.18,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pts.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-amber-400/30"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.d, height: p.d,
            animation: `floatParticle 4s ${p.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

function CelebrationOverlay({ reward, onClose }) {
  if (!reward) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(2,6,23,0.92)", animation: "fadeIn 0.3s ease-out" }}
    >
      <div
        className="relative bg-slate-900 border border-amber-500/40 rounded-3xl p-8 max-w-sm w-full text-center overflow-hidden"
        style={{ animation: "scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        <ParticleField />
        <div style={{ animation: "spin 6s linear infinite", display:"inline-block" }} className="text-5xl mb-1">🇦🇪</div>
        <h2 className="guardian-font text-2xl font-bold text-amber-400 mb-0.5">بالتوفيق</h2>
        <p className="text-slate-300 text-base font-semibold mb-5 tracking-widest uppercase text-xs">
          Gratitude & Appreciation
        </p>

        <div className="bg-slate-800/80 border border-amber-800/40 rounded-2xl p-5 mb-4">
          <div
            className="text-5xl font-black text-amber-400 mb-1"
            style={{ animation: "countUp 0.6s cubic-bezier(0.34,1.56,0.64,1)" }}
          >
            +{reward.total}
          </div>
          <div className="text-amber-600 text-sm tracking-widest uppercase font-bold">Unity Points Earned</div>

          {reward.hasSocial && (
            <div
              className="mt-3 bg-emerald-950/70 border border-emerald-700 rounded-xl px-3 py-2"
              style={{ animation: "slideUp 0.5s 0.3s both" }}
            >
              <div className="text-emerald-400 font-bold text-sm">
                💚 Social Impact Bonus +{reward.social} ᵁᴾ
              </div>
              <div className="text-emerald-400/60 text-xs mt-0.5">
                High-empathy deployment recognised
              </div>
            </div>
          )}
        </div>

        {reward.newBadges?.length > 0 && reward.newBadges.map((bid) => {
          const b = BADGE_DEFS.find((d) => d.id === bid);
          return b ? (
            <div
              key={bid}
              className="bg-amber-950/60 border border-amber-500/60 rounded-xl px-4 py-3 mb-3"
              style={{ animation: "slideUp 0.5s 0.5s both" }}
            >
              <div className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-0.5">
                🏅 Legacy Badge Unlocked
              </div>
              <div className="text-white font-bold">{b.name}</div>
            </div>
          ) : null;
        })}

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl font-black guardian-font tracking-widest text-sm uppercase text-slate-950 transition-all hover:brightness-110 active:scale-95"
          style={{ background: "linear-gradient(135deg,#b45309,#d97706,#b45309)" }}
        >
          Continue Mission
        </button>
      </div>
    </div>
  );
}

export default function GuardianAI() {
  const [gs, setGs] = useState({
    unityPoints: 0,
    level: 1,
    communityResilience: 15,
    nationalGratitude: 0,
    badges: [],
    taskIndex: 0,
    completedTasks: 0,
    medicalCompleted: 0,
    socialImpactCount: 0,
    highEfficiencyCount: 0,
  });

  const [empathy, setEmpathy] = useState(50);
  const [efficiency, setEfficiency] = useState(50);
  const [reward, setReward] = useState(null);

  const task = TASKS[gs.taskIndex];
  const cfg = SECTOR_CONFIG[task.sector] || SECTOR_CONFIG.Medical;
  const preview = score(empathy, efficiency, task.basePoints);

  const handleDeploy = () => {
    const result = score(empathy, efficiency, task.basePoints);
    setGs((prev) => {
      const newPoints = prev.unityPoints + result.total;
      const newMed = task.sector === "Medical" ? prev.medicalCompleted + 1 : prev.medicalCompleted;
      const newSocial = result.hasSocial ? prev.socialImpactCount + 1 : prev.socialImpactCount;
      const newHighEff = efficiency > 80 ? prev.highEfficiencyCount + 1 : prev.highEfficiencyCount;
      const newResilience = Math.min(100, Math.round(prev.communityResilience + result.total / 25));
      const draft = {
        ...prev,
        unityPoints: newPoints,
        level: Math.floor(newPoints / 500) + 1,
        communityResilience: newResilience,
        nationalGratitude: prev.nationalGratitude + result.total,
        completedTasks: prev.completedTasks + 1,
        medicalCompleted: newMed,
        socialImpactCount: newSocial,
        highEfficiencyCount: newHighEff,
        taskIndex: (prev.taskIndex + 1) % TASKS.length,
      };
      const newBadges = BADGE_DEFS.filter(
        (b) => !prev.badges.includes(b.id) && b.condition(draft)
      ).map((b) => b.id);
      draft.badges = [...prev.badges, ...newBadges];
      setReward({ ...result, newBadges });
      return draft;
    });
    setEmpathy(50);
    setEfficiency(50);
  };

  const resBar =
    gs.communityResilience < 40
      ? "bg-rose-500"
      : gs.communityResilience < 70
      ? "bg-amber-500"
      : "bg-emerald-500";

  const levelPct = ((gs.unityPoints % 500) / 500) * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');
        .guardian-font { font-family: 'Cinzel', Georgia, serif; }
        .body-font     { font-family: 'Rajdhani', 'Segoe UI', sans-serif; }
        @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes scaleIn  { from{transform:scale(0.82);opacity:0} to{transform:scale(1);opacity:1} }
        @keyframes slideUp  { from{transform:translateY(16px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes countUp  { from{transform:scale(0.6);opacity:0} to{transform:scale(1);opacity:1} }
        @keyframes spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes floatParticle { from{transform:translateY(0) scale(1)} to{transform:translateY(-30px) scale(1.4)} }
        @keyframes goldShimmer { 0%,100%{opacity:1} 50%{opacity:0.6} }
        @keyframes pulse2   { 0%,100%{box-shadow:0 0 0 0 rgba(217,119,6,0.4)} 50%{box-shadow:0 0 0 8px rgba(217,119,6,0)} }
        .deploy-btn:hover   { transform:translateY(-2px); box-shadow:0 8px 28px rgba(217,119,6,0.35); }
        .deploy-btn:active  { transform:translateY(0); }
        .deploy-btn         { transition:all 0.2s ease; }
        .bar-fill           { transition:width 0.9s cubic-bezier(0.4,0,0.2,1); }
        .badge-row          { transition:all 0.3s ease; }
        input[type=range]            { -webkit-appearance:none; width:100%; height:6px; border-radius:3px; outline:none; cursor:pointer; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:20px; height:20px; border-radius:50%; cursor:pointer; transition:transform 0.15s; }
        input[type=range]::-webkit-slider-thumb:hover { transform:scale(1.25); }
        .emp-range { background:linear-gradient(to right,#064e3b,#10b981); }
        .emp-range::-webkit-slider-thumb { background:#10b981; border:2px solid #064e3b; }
        .eff-range { background:linear-gradient(to right,#0c4a6e,#38bdf8); }
        .eff-range::-webkit-slider-thumb { background:#38bdf8; border:2px solid #0c4a6e; }
        .card-glow { box-shadow:inset 0 0 40px rgba(0,0,0,0.4); }
        .up-counter { animation:goldShimmer 3s ease-in-out infinite; }
      `}</style>

      <div className="body-font min-h-screen bg-slate-950 text-white" style={{ letterSpacing: "0.01em" }}>
        <CelebrationOverlay reward={reward} onClose={() => setReward(null)} />

        {/* ── HEADER ── */}
        <header className="sticky top-0 z-40 bg-slate-950/90 border-b border-slate-800 backdrop-blur-md px-6 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-amber-600/50"
                style={{ background: "linear-gradient(135deg,#78350f,#d97706)" }}
              >
                <Shield className="w-4 h-4 text-amber-100" />
              </div>
              <div>
                <div className="guardian-font font-bold text-base text-amber-400 leading-none">Guardian AI</div>
                <div className="text-slate-500 text-xs tracking-widest uppercase mt-0.5">Unity in Service</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-400 text-xs">Missions:</span>
                <span className="text-white font-bold text-sm">{gs.completedTasks}</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl px-3 py-1.5 border border-amber-800/60" style={{ background: "linear-gradient(135deg,#1c0a00,#3b1500)" }}>
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <span className="up-counter text-amber-400 font-black text-lg tabular-nums">
                  {gs.unityPoints.toLocaleString()}
                </span>
                <span className="text-amber-600 text-xs font-mono">ᵁᴾ</span>
              </div>
              <div className="rounded-xl px-3 py-1.5 border border-violet-800/60 text-center" style={{ background: "#1a0f2e" }}>
                <div className="text-violet-400/70 text-xs leading-none">LVL</div>
                <div className="text-violet-300 font-black text-base leading-tight">{gs.level}</div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* ── LEFT PANEL ── */}
          <div className="lg:col-span-2 space-y-4">
            {/* National Dashboard */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 card-glow">
              <h2 className="guardian-font text-xs font-semibold text-amber-500 uppercase tracking-widest mb-4">
                National Dashboard
              </h2>

              {/* Community Resilience Bar */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-400" /> Community Resilience
                  </span>
                  <span className="text-xs font-black text-white">{gs.communityResilience}%</span>
                </div>
                <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${resBar} bar-fill rounded-full`}
                    style={{ width: `${gs.communityResilience}%` }}
                  />
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  {gs.communityResilience < 40
                    ? "⚠ Vulnerable — deploy more modules"
                    : gs.communityResilience < 70
                    ? "● Developing — maintain momentum"
                    : "✓ Resilient — national systems secured"}
                </p>
              </div>

              {/* Level Progress */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-violet-400" /> Level {gs.level} Progress
                  </span>
                  <span className="text-xs font-black text-violet-300">{gs.unityPoints % 500}/500 ᵁᴾ</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-500 bar-fill rounded-full"
                    style={{ width: `${levelPct}%` }}
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: "National Gratitude", value: gs.nationalGratitude.toLocaleString(), icon: <Globe className="w-3 h-3" />, color: "text-amber-400" },
                  { label: "Badges Earned",      value: `${gs.badges.length}/${BADGE_DEFS.length}`, icon: <Award className="w-3 h-3" />, color: "text-amber-400" },
                  { label: "Social Impacts",     value: gs.socialImpactCount, icon: <Heart className="w-3 h-3 text-rose-400" />, color: "text-rose-400" },
                  { label: "High-Eff Deploys",   value: gs.highEfficiencyCount, icon: <Cpu className="w-3 h-3 text-cyan-400" />, color: "text-cyan-400" },
                ].map((s) => (
                  <div key={s.label} className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
                    <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">{s.icon}{s.label}</div>
                    <div className={`text-xl font-black ${s.color} tabular-nums`}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legacy Badges */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 card-glow">
              <h2 className="guardian-font text-xs font-semibold text-amber-500 uppercase tracking-widest mb-4">
                Legacy Badges
              </h2>
              <div className="space-y-2">
                {BADGE_DEFS.map((badge) => {
                  const unlocked = gs.badges.includes(badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`badge-row rounded-xl p-3 border flex items-center gap-3 ${
                        unlocked
                          ? "bg-amber-950/40 border-amber-700/50"
                          : "bg-slate-800/20 border-slate-800 opacity-45"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${
                          unlocked ? "bg-amber-900/60 border border-amber-700/40" : "bg-slate-800"
                        }`}
                      >
                        {unlocked ? badge.emoji : <Lock className="w-4 h-4 text-slate-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-bold truncate ${unlocked ? "text-amber-300" : "text-slate-500"}`}>
                          {badge.name}
                        </div>
                        <div className="text-xs text-slate-600 truncate">{badge.description}</div>
                      </div>
                      {unlocked && <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="lg:col-span-3 space-y-4">
            {/* Current Task Card */}
            <div className={`bg-slate-900 border ${cfg.border} rounded-2xl p-6 card-glow`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className={`w-11 h-11 ${cfg.bg} border ${cfg.border} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    {cfg.icon}
                  </div>
                  <div>
                    <div className={`text-xs font-bold uppercase tracking-widest ${cfg.text} mb-0.5`}>
                      {task.sector} Deployment
                    </div>
                    <h3 className="text-white font-bold text-base leading-snug">{task.title}</h3>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-3">
                  <div className="text-xs text-slate-500 mb-0.5">Base Reward</div>
                  <div className="text-amber-400 font-black text-xl tabular-nums">{task.basePoints}<span className="text-sm ml-0.5">ᵁᴾ</span></div>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-3">{task.description}</p>

              <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-xs text-slate-400">
                <span className="text-amber-500 font-bold">⚡ Challenge: </span>
                {task.challenge}
              </div>
            </div>

            {/* Resource Allocation Panel */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 card-glow">
              <h3 className="guardian-font text-xs font-semibold text-amber-500 uppercase tracking-widest mb-1">
                Allocate AI Resources
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Score = (Empathy × 0.5 + Efficiency × 0.5) / 100 × Base Points.
                Empathy &gt;75 adds a +20% Social Impact Bonus.
              </p>

              {/* Empathy */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-emerald-300">Empathy Allocation</span>
                    {empathy > 75 && (
                      <span
                        className="text-xs bg-emerald-950 border border-emerald-700 text-emerald-300 px-2 py-0.5 rounded-full"
                        style={{ animation: "goldShimmer 1.5s ease-in-out infinite" }}
                      >
                        SOCIAL IMPACT
                      </span>
                    )}
                  </div>
                  <span className="text-2xl font-black text-emerald-400 tabular-nums w-10 text-right">{empathy}</span>
                </div>
                <input
                  type="range" min="0" max="100" step="1"
                  value={empathy}
                  onChange={(e) => setEmpathy(+e.target.value)}
                  className="emp-range"
                />
                <div className="flex justify-between text-xs text-slate-700 mt-1 px-0.5">
                  <span>Clinical</span><span>Balanced</span><span>Compassionate</span>
                </div>
              </div>

              {/* Efficiency */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-semibold text-cyan-300">Efficiency Allocation</span>
                    {efficiency > 80 && (
                      <span className="text-xs bg-cyan-950 border border-cyan-700 text-cyan-300 px-2 py-0.5 rounded-full">
                        HIGH-PERF
                      </span>
                    )}
                  </div>
                  <span className="text-2xl font-black text-cyan-400 tabular-nums w-10 text-right">{efficiency}</span>
                </div>
                <input
                  type="range" min="0" max="100" step="1"
                  value={efficiency}
                  onChange={(e) => setEfficiency(+e.target.value)}
                  className="eff-range"
                />
                <div className="flex justify-between text-xs text-slate-700 mt-1 px-0.5">
                  <span>Cautious</span><span>Balanced</span><span>Optimised</span>
                </div>
              </div>

              {/* Score Preview */}
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 mb-5 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-500 mb-0.5">Projected Reward</div>
                  <div className="text-4xl font-black text-white tabular-nums">
                    {preview.total}
                    <span className="text-amber-400 text-xl ml-1">ᵁᴾ</span>
                  </div>
                </div>
                <div className="text-right space-y-1 text-sm">
                  <div className="text-slate-500">
                    Base score: <span className="text-white font-bold">{preview.raw}</span>
                  </div>
                  {preview.hasSocial ? (
                    <div className="text-emerald-400 font-bold">+ {preview.social} Social Impact</div>
                  ) : (
                    <div className="text-slate-700 text-xs">No bonus (Empathy &lt;75)</div>
                  )}
                  <div className="text-xs text-slate-700">
                    ({empathy}×0.5 + {efficiency}×0.5)/100 × {task.basePoints}
                  </div>
                </div>
              </div>

              {/* Deploy */}
              <button
                onClick={handleDeploy}
                className="deploy-btn w-full py-4 rounded-2xl guardian-font font-bold tracking-widest text-sm uppercase text-slate-950 flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg,#92400e,#d97706,#f59e0b)", animation: "pulse2 2.5s ease-in-out infinite" }}
              >
                <Target className="w-4 h-4" />
                Deploy AI Module
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Design Philosophy Footer */}
            <div className="bg-slate-900/50 border border-amber-900/30 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-700 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900/80 font-mono leading-relaxed">
                  <span className="text-amber-700 font-bold">// DESIGN INTENT: </span>
                  {`"This system reinforces the UAE's ambition for a hopeful and secure future — Unity Points encode collective service as national currency, the Empathy/Efficiency algorithm operationalises Vision 2031's human-technology balance, and Legacy Badges permanently honour service, reflecting the UAE's culture of recognition for those who protect and uplift the nation."`}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
