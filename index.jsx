import { useState, useEffect, useRef, useCallback } from "react";
import {
  Shield, Star, Heart, Users, Award, Activity, Target, Brain,
  CheckCircle, Lock, Globe, Zap, ChevronRight, Sparkles,
  BookOpen, BarChart2, Cpu, Languages
} from "lucide-react";

/* ════════════════════════════════════════════════════════════════
   UAE VISION 2050 — DESIGN PHILOSOPHY & AI LOGIC MANIFEST
   ────────────────────────────────────────────────────────────────
   PRINCIPLE 1 — CONTEXTUAL PRECISION AS NATIONAL DOCTRINE
   Each mission carries its own idealEmp / idealEff configuration
   derived from its real-world nature. A flash flood demands peak
   logistics efficiency with measured empathy; a teacher empowerment
   programme demands the inverse. Players who blindly max both nodes
   score LESS than those who read the scenario and calibrate with
   strategic intelligence — mirroring UAE crisis doctrine.

   PRINCIPLE 2 — ACCURACY-BASED SCORING
   Score = ((empAccuracy + effAccuracy) / 2) × base
   Accuracy = max(0, 100 − |value − ideal| × 1.2)
   This encodes the UAE principle: the right tool at the right
   level outperforms brute force.

   PRINCIPLE 3 — HERO FOCUS DOCTRINE
   Selecting the matched Hero Focus adds +25% bonus, reflecting
   the national doctrine that AI must align to human service
   categories, not deployed as a generic commodity.

   PRINCIPLE 4 — RESILIENCE AS NATIONAL COVENANT
   The National Resilience Index is a governance KPI, not a timer.
   Unaddressed crises erode it continuously. Every deployment
   restores the nation's covenant with its citizens.
   ════════════════════════════════════════════════════════════════ */

/* ─── TRANSLATIONS ───────────────────────────────────────────── */
const TR = {
  en: {
    appTitle:"UAE Vision 2050", appSub:"AI Commander",
    natResilience:"National Resilience", missions:"Missions",
    resolveWarn:"⚠ Resolve missions to restore",
    feedTitle:"Active Crisis Feed", active:"Active",
    feedHint:"Select a mission · then configure your deployment below",
    configHint:"Configure Hero Focus and Neural Nodes to maximise Unity Points",
    consoleTitle:"Neural Deployment Console",
    step1:"Select Hero Focus", step1sub:"Required before deployment",
    step2:"Configure Neural Nodes", step2sub:"Calibrate to mission context — accuracy is rewarded",
    heroMatch:"+25% match bonus",
    empNode:"Empathy Node", effNode:"Efficiency Node",
    accuracy:"accuracy", targetLabel:"Target",
    sweetZone:"✓ Within optimal range",
    raiseHint:"↑ Raise toward target", lowerHint:"↓ Lower toward target",
    projectedPts:"Projected Unity Points", baseLabel:"Base",
    socialImpact:"Social Impact", heroMatchLabel:"Hero Match",
    multiplierLabel:"×2 Nation's Gratitude",
    deployBtn:"Deploy AI Module", selectFirst:"Select Hero Focus First",
    recHero:"Rec. Hero",
    overview:"National Overview",
    natGratitude:"National Gratitude", levelTier:"Level Tier",
    gratEvents:"Gratitude Events", badgesEarned:"Badges Earned",
    levelProg:"Level progress", vision2050Goal:"🇦🇪 Vision 2050 Goal",
    ofGoal:"of goal", legacyBadges:"Legacy Badges",
    designIntent:"Design Intent",
    designP1:"Contextual Precision as National Doctrine.",
    designP1b:" Each scenario carries its own ideal Empathy and Efficiency values. A flash flood demands peak logistical speed with measured compassion; a teacher empowerment programme demands the inverse. The scoring algorithm rewards calibrated judgment — mirroring how UAE crisis leadership requires strategic intelligence, not raw force.",
    designP2:"The National Resilience Index encodes the UAE's constitutional commitment that no crisis shall cause the state to abandon its citizens. The 10,000 ᵁᴾ Vision 2050 milestone represents the compounded return of sustained human–AI collaboration across generations.",
    victoryTitle:"Vision 2050 Achieved", victoryBody:"You have reached 10,000 Unity Points and secured the UAE's hopeful and secure future for generations to come.",
    unitsPts:"Unity Points", missionsBefore:"missions completed", badgesLabel:"legacy badges",
    newCycle:"Begin New Mission Cycle",
    failTitle:"National Resilience Collapsed", failBody:"The Resilience Index reached zero. Unaddressed crises overwhelmed the nation's systems. Recommission and lead with greater precision.",
    missionsBefore2:"missions before collapse", recommission:"Recommission — Try Again",
    gratitudeTitle:"Nation's Gratitude Activated", gratitudeSub:"2× Unity Points for all deployments",
    remaining:"s remaining", missionResolved:"Mission Resolved",
    badgeUnlocked:"Badge Unlocked", gratEvent:"🇦🇪 Nation's Gratitude triggered — 2× active for 30s",
    allResolved:"All crises resolved — national systems stable.", newMissions:"New missions will appear momentarily.",
    urgency:{ critical:"CRITICAL", high:"HIGH", moderate:"MODERATE", low:"LOW" },
    sectors:{ Medical:"Medical", Defense:"Defense", Education:"Education", Community:"Community" },
    heroes:{ Medical:"Medical Corps", ArmedForces:"Armed Forces", Teachers:"Teachers Corps" },
    langBtn:"عربي",
  },
  ar: {
    appTitle:"رؤية الإمارات 2050", appSub:"قائد الذكاء الاصطناعي",
    natResilience:"المرونة الوطنية", missions:"المهام",
    resolveWarn:"⚠ أحل المهام لاستعادة المرونة",
    feedTitle:"خلاصة الأزمات الحية", active:"نشط",
    feedHint:"اختر مهمة من الخلاصة ثم اضبط نشرك أدناه",
    configHint:"اضبط تركيز البطل والعقد العصبية لتعظيم نقاط الوحدة",
    consoleTitle:"وحدة النشر العصبي",
    step1:"اختر تركيز البطل", step1sub:"مطلوب قبل النشر",
    step2:"ضبط العقد العصبية", step2sub:"اضبط وفق سياق المهمة — الدقة تُكافأ",
    heroMatch:"+25% مكافأة التوافق",
    empNode:"عقدة التعاطف", effNode:"عقدة الكفاءة",
    accuracy:"دقة", targetLabel:"الهدف",
    sweetZone:"✓ ضمن النطاق الأمثل",
    raiseHint:"↑ ارفع نحو الهدف", lowerHint:"↓ اخفض نحو الهدف",
    projectedPts:"نقاط الوحدة المتوقعة", baseLabel:"الأساس",
    socialImpact:"الأثر الاجتماعي", heroMatchLabel:"توافق البطل",
    multiplierLabel:"×2 امتنان الوطن",
    deployBtn:"نشر وحدة الذكاء الاصطناعي", selectFirst:"اختر تركيز البطل أولاً",
    recHero:"البطل المقترح",
    overview:"نظرة عامة وطنية",
    natGratitude:"الامتنان الوطني", levelTier:"مستوى الرتبة",
    gratEvents:"أحداث الامتنان", badgesEarned:"الشارات المكتسبة",
    levelProg:"تقدم المستوى", vision2050Goal:"🇦🇪 هدف رؤية 2050",
    ofGoal:"من الهدف", legacyBadges:"شارات الإرث",
    designIntent:"فلسفة التصميم",
    designP1:"الدقة السياقية كعقيدة وطنية.",
    designP1b:" لكل سيناريو قيم مثالية خاصة للتعاطف والكفاءة. فيضانات الفجيرة تستوجب كفاءة لوجستية قصوى مع تعاطف مقنن؛ برامج تمكين المعلمين تستوجب العكس. تكافئ الخوارزمية الحكم المعايَر — مما يعكس كيف تتطلب قيادة الأزمات الإماراتية الذكاء الاستراتيجي لا القوة العمياء.",
    designP2:"يجسّد مؤشر المرونة الوطنية الالتزام الدستوري الإماراتي بألا تتخلى الدولة عن مواطنيها في أي أزمة. يمثل حاجز 10,000 ᵁᴾ العائد المتراكم لتعاون إنسان–ذكاء اصطناعي مستدام عبر الأجيال.",
    victoryTitle:"تحقيق رؤية 2050", victoryBody:"بلغت 10,000 نقطة وحدة وأمّنت مستقبلاً مشرقاً للإمارات عبر الأجيال.",
    unitsPts:"نقطة وحدة", missionsBefore:"مهمة مكتملة", badgesLabel:"شارات إرث",
    newCycle:"بدء دورة مهمة جديدة",
    failTitle:"انهيار المرونة الوطنية", failBody:"وصل المؤشر إلى الصفر. غمرت الأزمات غير المعالجة منظومة الوطن. أعِد التفعيل وقُد بدقة أعلى.",
    missionsBefore2:"مهمة قبل الانهيار", recommission:"إعادة التفعيل — حاول مجدداً",
    gratitudeTitle:"تفعيل امتنان الوطن", gratitudeSub:"×2 نقاط الوحدة لجميع عمليات النشر",
    remaining:"ث متبقية", missionResolved:"تم حل المهمة",
    badgeUnlocked:"شارة مفتوحة", gratEvent:"🇦🇪 تم تفعيل امتنان الوطن — ×2 نشط لمدة 30 ثانية",
    allResolved:"جميع الأزمات محلولة — الأنظمة الوطنية مستقرة.", newMissions:"ستظهر مهام جديدة قريباً.",
    urgency:{ critical:"حرج", high:"عالي", moderate:"معتدل", low:"منخفض" },
    sectors:{ Medical:"طبي", Defense:"دفاع", Education:"تعليم", Community:"مجتمع" },
    heroes:{ Medical:"الفيلق الطبي", ArmedForces:"القوات المسلحة", Teachers:"فيلق المعلمين" },
    langBtn:"English",
  },
};

/* ─── CONSTANTS ──────────────────────────────────────────────── */
const GOLD  = "#C9A84C";
const AZURE = "#1A5FA8";

/*
  Each mission has idealEmp + idealEff: the "correct" calibration
  derived from the real-world context of the crisis.

  Scoring penalises deviation from ideal at 1.2× per point distance,
  so maxing both sliders is never the right answer.

  Rationale fields explain WHY to the player in the UI.
*/
const MISSION_POOL = [
  {
    id:"floods_fuj",
    title:"Flash Floods in Fujairah",           titleAr:"فيضانات مفاجئة في الفجيرة",
    sector:"Community", urgency:"critical", base:220, heroMatch:"Medical",
    desc:"AI-coordinated evacuation and emergency resource deployment across coastal Fujairah communities.",
    descAr:"إخلاء منسق بالذكاء الاصطناعي ونشر موارد الطوارئ عبر المجتمعات الساحلية في الفجيرة.",
    idealEmp:62, idealEff:91,
    empRationale:"Evacuees need calm, clear communication — but over-empathising slows critical routing decisions that save the most lives.",
    effRationale:"Supply-chain speed and evacuation routing are the decisive variables. Every minute of delay has direct human cost.",
    empRationaleAr:"المخلَّون بحاجة إلى تواصل هادئ وواضح، لكن الإفراط في التعاطف يُبطئ قرارات التوجيه الحرجة التي تنقذ أكبر عدد من الأرواح.",
    effRationaleAr:"سرعة سلسلة الإمداد وتوجيه الإخلاء هي المتغيرات الحاسمة. كل دقيقة تأخير لها ثمن بشري مباشر.",
  },
  {
    id:"knowledge_s",
    title:"Global Knowledge Summit Logistics",  titleAr:"لوجستيات قمة المعرفة العالمية",
    sector:"Education", urgency:"moderate", base:140, heroMatch:"Teachers",
    desc:"Orchestrate AI coordination systems for 5,000 international delegates at Abu Dhabi World Forum.",
    descAr:"تنسيق أنظمة الذكاء الاصطناعي لـ5,000 مندوب دولي في منتدى أبوظبي العالمي.",
    idealEmp:63, idealEff:60,
    empRationale:"Delegates expect a welcoming, human-centred environment — balanced empathy maintains professional warmth.",
    effRationale:"Balanced coordination suffices; this is not a crisis requiring peak operational speed.",
    empRationaleAr:"يتوقع المندوبون بيئة ترحيبية تتمحور حول الإنسان — يحافظ التعاطف المتوازن على الدفء المهني.",
    effRationaleAr:"يكفي التنسيق المتوازن؛ هذه ليست أزمة تستوجب سرعة تشغيلية قصوى.",
  },
  {
    id:"med_surge",
    title:"Medical Surge: Sheikh Shakhbout",    titleAr:"موجة طبية: مدينة الشيخ شخبوط",
    sector:"Medical", urgency:"critical", base:200, heroMatch:"Medical",
    desc:"AI triage and resource allocation for emergency patient overflow across seven hospital wards.",
    descAr:"فرز بالذكاء الاصطناعي وتخصيص موارد لتدفق المرضى عبر سبع أجنحة طوارئ.",
    idealEmp:84, idealEff:74,
    empRationale:"Patient dignity, family communication and fear management are clinically critical — high empathy is non-negotiable.",
    effRationale:"Fast triage and resource routing are essential, but 100% efficiency strips care of humanity and degrades outcomes.",
    empRationaleAr:"كرامة المريض والتواصل مع الأسرة وإدارة الخوف أمور بالغة الأهمية سريريًا — التعاطف العالي غير قابل للتفاوض.",
    effRationaleAr:"الفرز السريع وتوجيه الموارد ضروريان، لكن كفاءة 100% تجرّد الرعاية من إنسانيتها وتؤثر سلبًا على النتائج.",
  },
  {
    id:"cyber_border",
    title:"Cyber Threat: Digital Infrastructure", titleAr:"تهديد إلكتروني: البنية التحتية الرقمية",
    sector:"Defense", urgency:"high", base:185, heroMatch:"ArmedForces",
    desc:"Deploy neural defense AI to neutralise coordinated attacks on national digital infrastructure.",
    descAr:"نشر الذكاء الاصطناعي الدفاعي لتحييد الهجمات المنسقة على البنية التحتية الرقمية الوطنية.",
    idealEmp:20, idealEff:94,
    empRationale:"Minimal empathy allocation is appropriate — this is a pure technical counter-operation with no direct civilian interaction.",
    effRationale:"Maximum processing speed and algorithmic precision are the only variables that determine mission success.",
    empRationaleAr:"الحد الأدنى من التعاطف مناسب — هذه عملية تقنية بحتة لا تشمل تفاعلاً مباشرًا مع المدنيين.",
    effRationaleAr:"السرعة القصوى في المعالجة والدقة الخوارزمية هما المتغيران الوحيدان اللذان يحددان نجاح المهمة.",
  },
  {
    id:"desert_school",
    title:"Remote Desert School Network",        titleAr:"شبكة مدارس الصحراء النائية",
    sector:"Education", urgency:"moderate", base:130, heroMatch:"Teachers",
    desc:"AI-powered personalised education for 2,000 students in remote Liwa communities.",
    descAr:"تعليم مخصص بالذكاء الاصطناعي لـ2,000 طالب في مجتمعات ليوا النائية.",
    idealEmp:83, idealEff:53,
    empRationale:"Trust and emotional connection are the primary drivers of learning outcomes in isolated communities.",
    effRationale:"Over-optimising delivery speed undermines the relationship-first pedagogy these students require.",
    empRationaleAr:"الثقة والتواصل العاطفي هما المحركان الأساسيان للنتائج التعليمية في المجتمعات المعزولة.",
    effRationaleAr:"الإفراط في تحسين سرعة التسليم يقوّض بيداغوجيا العلاقة أولاً التي يحتاجها هؤلاء الطلاب.",
  },
  {
    id:"tactical_ai",
    title:"Armed Forces Tactical AI Support",    titleAr:"دعم الذكاء الاصطناعي التكتيكي للقوات المسلحة",
    sector:"Defense", urgency:"high", base:190, heroMatch:"ArmedForces",
    desc:"Real-time battlefield intelligence and logistics optimisation for strategic operations.",
    descAr:"ذكاء ميداني في الوقت الفعلي وتحسين لوجستيات العمليات الاستراتيجية.",
    idealEmp:38, idealEff:91,
    empRationale:"Personnel welfare matters, but empathy must not compromise the operational precision demanded by strategic missions.",
    effRationale:"Precise routing, threat assessment speed, and logistics throughput are the primary mission parameters.",
    empRationaleAr:"رفاهية الأفراد مهمة، لكن التعاطف يجب ألا يُضعف الدقة التشغيلية التي تتطلبها المهام الاستراتيجية.",
    effRationaleAr:"التوجيه الدقيق وسرعة تقييم التهديدات وإنتاجية اللوجستيات هي المعلمات الأساسية للمهمة.",
  },
  {
    id:"cancer_ai",
    title:"National Cancer AI Research Pipeline", titleAr:"خط أنابيب أبحاث السرطان بالذكاء الاصطناعي",
    sector:"Medical", urgency:"moderate", base:160, heroMatch:"Medical",
    desc:"Accelerate genomic analysis using distributed national AI processing clusters.",
    descAr:"تسريع تحليل الجينوم باستخدام مجموعات المعالجة الوطنية الموزعة.",
    idealEmp:70, idealEff:84,
    empRationale:"Researcher wellbeing and patient data dignity require sustained empathy — this is not purely computational work.",
    effRationale:"Data throughput and processing speed are the primary bottlenecks in genomic pipeline performance.",
    empRationaleAr:"رفاهية الباحثين وكرامة بيانات المرضى تتطلب تعاطفًا مستدامًا — هذا ليس عملاً حسابيًا بحتاً.",
    effRationaleAr:"إنتاجية البيانات وسرعة المعالجة هما الاختناقات الرئيسية في أداء خط أنابيب الجينوم.",
  },
  {
    id:"teachers_ai",
    title:"UAE Teacher AI Empowerment Program",  titleAr:"برنامج تمكين المعلمين بالذكاء الاصطناعي",
    sector:"Education", urgency:"low", base:120, heroMatch:"Teachers",
    desc:"Adaptive AI learning deployed for 10,000 educators across all seven emirates.",
    descAr:"تعلم تكيفي بالذكاء الاصطناعي لـ10,000 معلم عبر الإمارات السبع.",
    idealEmp:89, idealEff:50,
    empRationale:"Professional trust with educators is the entire foundation — rushing this deployment destroys adoption.",
    effRationale:"Speed is actively counterproductive; high-efficiency AI can feel impersonal and erodes educator buy-in.",
    empRationaleAr:"الثقة المهنية مع المعلمين هي الأساس كله — التسرع في هذا النشر يُدمّر التبني.",
    effRationaleAr:"السرعة مضرة فعلياً؛ الذكاء الاصطناعي عالي الكفاءة قد يبدو جامدًا ويُضعف قبول المعلمين.",
  },
  {
    id:"sandstorm",
    title:"Sandstorm Emergency Coordination",    titleAr:"تنسيق طوارئ عاصفة رملية",
    sector:"Community", urgency:"critical", base:215, heroMatch:"ArmedForces",
    desc:"Multi-agency AI coordination for a category-5 visibility emergency crossing three emirates.",
    descAr:"تنسيق متعدد الوكالات لطارئ رؤية من الفئة 5 يمتد عبر ثلاث إمارات.",
    idealEmp:58, idealEff:93,
    empRationale:"Community reassurance communications require some empathy, but logistical speed overwhelmingly drives outcomes in visibility emergencies.",
    effRationale:"Multi-agency routing, road closures, and shelter coordination demand maximum processing throughput.",
    empRationaleAr:"تواصل طمأنة المجتمع يتطلب قدرًا من التعاطف، لكن سرعة اللوجستيات تُهيمن على النتائج في حالات طوارئ الرؤية.",
    effRationaleAr:"توجيه متعدد الوكالات وإغلاق الطرق وتنسيق المآوي يتطلب إنتاجية معالجة قصوى.",
  },
  {
    id:"smart_hosp",
    title:"Smart Hospital Network Expansion",    titleAr:"توسع شبكة المستشفيات الذكية",
    sector:"Medical", urgency:"moderate", base:155, heroMatch:"Medical",
    desc:"Predictive AI diagnostics integrated across 15 national healthcare facilities.",
    descAr:"تشخيصات ذكاء اصطناعي تنبؤية مدمجة عبر 15 منشأة صحية وطنية.",
    idealEmp:77, idealEff:80,
    empRationale:"Patient-facing AI must maintain high compassion scores to drive trust and adoption across hospital networks.",
    effRationale:"Diagnostic accuracy and processing speed are equally critical — this is a genuine dual-imperative deployment.",
    empRationaleAr:"يجب أن يحافظ الذكاء الاصطناعي الموجَّه للمرضى على درجات تعاطف عالية لتعزيز الثقة والتبني.",
    effRationaleAr:"دقة التشخيص وسرعة المعالجة بالغتا الأهمية على قدم المساواة — هذا نشر ثنائي الإلزام حقيقي.",
  },
  {
    id:"infra_grid",
    title:"National Infrastructure AI Grid",     titleAr:"شبكة الذكاء الاصطناعي للبنية التحتية الوطنية",
    sector:"Community", urgency:"high", base:175, heroMatch:"ArmedForces",
    desc:"Predictive maintenance AI deployed across highways, bridges, and utility networks.",
    descAr:"ذكاء اصطناعي للصيانة التنبؤية عبر الطرق السريعة والجسور وشبكات المرافق.",
    idealEmp:30, idealEff:92,
    empRationale:"Minimal direct human interaction makes high empathy allocation an inefficient use of AI resources for this deployment.",
    effRationale:"Engineering precision, anomaly detection speed, and maintenance routing are the sole performance variables.",
    empRationaleAr:"الحد الأدنى من التفاعل البشري المباشر يجعل تخصيص التعاطف العالي استخدامًا غير فعّال لموارد الذكاء الاصطناعي.",
    effRationaleAr:"الدقة الهندسية وسرعة اكتشاف الشذوذات وتوجيه الصيانة هي المتغيرات الوحيدة للأداء.",
  },
  {
    id:"stem_champ",
    title:"National STEM Innovation Challenge",  titleAr:"تحدي الابتكار الوطني للعلوم والتقنية",
    sector:"Education", urgency:"low", base:115, heroMatch:"Teachers",
    desc:"AI coordination platform for 50,000 students across the national STEM ecosystem.",
    descAr:"منصة تنسيق ذكاء اصطناعي لـ50,000 طالب عبر المنظومة الوطنية للعلوم والتقنية.",
    idealEmp:77, idealEff:61,
    empRationale:"Student inspiration and curiosity are driven by emotional connection — empathy comfortably leads efficiency here.",
    effRationale:"Moderate delivery efficiency supports the programme without overwhelming students with a machine-paced experience.",
    empRationaleAr:"إلهام الطلاب وفضولهم مدفوعان بالتواصل العاطفي — التعاطف يتقدم على الكفاءة بشكل مريح هنا.",
    effRationaleAr:"الكفاءة المعتدلة في التسليم تدعم البرنامج دون إرهاق الطلاب بتجربة يحدد وتيرتها الجهاز.",
  },
];

const BADGE_DEFS = [
  { id:"frontline",   nameEn:"Guardian of the Frontline", nameAr:"حارس الخط الأول",    descEn:"Complete 3 medical deployments",      descAr:"أكمل 3 عمليات نشر طبية",        emoji:"🏥", cond:s=>s.medCompleted>=3 },
  { id:"visionary",   nameEn:"National Visionary",         nameAr:"الرؤيوي الوطني",     descEn:"Earn 1,000 Unity Points",             descAr:"اكسب 1,000 نقطة وحدة",         emoji:"🌟", cond:s=>s.unityPoints>=1000 },
  { id:"empathy_ch",  nameEn:"Empathy Champion",           nameAr:"بطل التعاطف",        descEn:"Trigger 5 Nation's Gratitude events", descAr:"فعّل 5 أحداث امتنان وطن",       emoji:"💚", cond:s=>s.gratitudeCount>=5 },
  { id:"unity_build", nameEn:"Unity Builder",              nameAr:"باني الوحدة",        descEn:"Complete 15 missions total",          descAr:"أكمل 15 مهمة إجمالاً",          emoji:"🤝", cond:s=>s.completedCount>=15 },
  { id:"vision_2050", nameEn:"UAE Vision 2050",            nameAr:"رؤية الإمارات 2050", descEn:"Reach 10,000 Unity Points",           descAr:"ابلغ 10,000 نقطة وحدة",         emoji:"🇦🇪", cond:s=>s.unityPoints>=10000 },
];

const URGENCY_CFG = {
  critical:{ textCls:"text-red-700",    bgCls:"bg-red-50",     borderCls:"border-red-200",    dot:"bg-red-500",    decay:3.2 },
  high:    { textCls:"text-orange-700", bgCls:"bg-orange-50",  borderCls:"border-orange-200", dot:"bg-orange-500", decay:1.8 },
  moderate:{ textCls:"text-amber-700",  bgCls:"bg-amber-50",   borderCls:"border-amber-200",  dot:"bg-amber-500",  decay:0.8 },
  low:     { textCls:"text-blue-700",   bgCls:"bg-blue-50",    borderCls:"border-blue-200",   dot:"bg-blue-400",   decay:0.2 },
};

const SECTOR_CFG = {
  Medical:  { bgCls:"bg-rose-50",    borderCls:"border-rose-200",   textCls:"text-rose-700",    Icon:Heart },
  Defense:  { bgCls:"bg-blue-50",    borderCls:"border-blue-200",   textCls:"text-blue-700",    Icon:Shield },
  Education:{ bgCls:"bg-violet-50",  borderCls:"border-violet-200", textCls:"text-violet-700",  Icon:BookOpen },
  Community:{ bgCls:"bg-emerald-50", borderCls:"border-emerald-200",textCls:"text-emerald-700", Icon:Users },
};

const HERO_CFG = {
  Medical:    { Icon:Heart,    clr:"text-rose-600",   bg:"bg-rose-50",   border:"border-rose-300",   empBonus:20, effBonus:0  },
  ArmedForces:{ Icon:Shield,   clr:"text-blue-700",   bg:"bg-blue-50",   border:"border-blue-300",   empBonus:0,  effBonus:20 },
  Teachers:   { Icon:BookOpen, clr:"text-violet-700", bg:"bg-violet-50", border:"border-violet-300", empBonus:10, effBonus:10 },
};

/* ─── SCORING ALGORITHM ──────────────────────────────────────────
   accuracy(node) = max(0, 100 − |value − ideal| × 1.2)
   raw = ((empAcc + effAcc) / 2 / 100) × base
   Social bonus (+20%): mission is empathy-valued (idealEmp≥65)
     AND player lands within 12 pts of idealEmp
   Hero match: +25% on (raw + social)
   Gratitude multiplier: ×2 on full subtotal
   ─────────────────────────────────────────────────────────────── */
function calcScore(emp, eff, mission, hero, multiplierOn) {
  const hc   = hero ? HERO_CFG[hero] : null;
  const aEmp = Math.min(100, emp + (hc?.empBonus || 0));
  const aEff = Math.min(100, eff + (hc?.effBonus || 0));

  const empAcc = Math.max(0, 100 - Math.abs(aEmp - mission.idealEmp) * 1.2);
  const effAcc = Math.max(0, 100 - Math.abs(aEff - mission.idealEff) * 1.2);
  const raw    = Math.round(((empAcc + effAcc) / 2 / 100) * mission.base);

  const hasSocial  = mission.idealEmp >= 65 && Math.abs(aEmp - mission.idealEmp) <= 12;
  const socialBonus = hasSocial ? Math.round(raw * 0.2) : 0;

  const heroMatch  = hero === mission.heroMatch;
  const matchBonus = heroMatch ? Math.round((raw + socialBonus) * 0.25) : 0;

  const subtotal = raw + socialBonus + matchBonus;
  const total    = Math.round(multiplierOn ? subtotal * 2 : subtotal);

  return { raw, socialBonus, matchBonus, hasSocial, heroMatch, multiplierOn, total, empAcc, effAcc };
}

let uid = 0;
function spawnMission() {
  const t = MISSION_POOL[Math.floor(Math.random() * MISSION_POOL.length)];
  return { ...t, uid:`${t.id}_${++uid}` };
}
const initState = () => ({
  unityPoints:0, resilience:95, level:1,
  completedCount:0, medCompleted:0, gratitudeCount:0, badges:[],
});

/* ─── NODE SLIDER ─────────────────────────────────────────────── */
function NodeSlider({ label, icon, value, onChange, idealVal, rationale, t }) {
  const accuracy = Math.max(0, 100 - Math.abs(value - idealVal) * 1.2);
  const delta    = value - idealVal;
  const inZone   = Math.abs(delta) <= 12;

  const trackColor = accuracy >= 78 ? "#059669" : accuracy >= 48 ? "#D97706" : "#DC2626";
  const accBgCls   = accuracy >= 78
    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
    : accuracy >= 48
    ? "bg-amber-50 border-amber-200 text-amber-700"
    : "bg-red-50 border-red-200 text-red-700";

  const hint = inZone ? t.sweetZone : delta > 0 ? t.lowerHint : t.raiseHint;
  const zoneL = Math.max(0, idealVal - 12);
  const zoneW = Math.min(100, idealVal + 12) - zoneL;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col gap-3">
      {/* Label row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">{icon}<span className="text-sm font-bold text-slate-700">{label}</span></div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${accBgCls}`}>{Math.round(accuracy)}% {t.accuracy}</span>
          <span className="text-2xl font-black tabular-nums" style={{ color:trackColor }}>{value}</span>
        </div>
      </div>

      {/* Visual track */}
      <div className="relative h-7 flex items-center">
        {/* Background rail */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-slate-100 overflow-hidden">
          {/* Sweet-zone highlight */}
          <div className="absolute top-0 h-full opacity-30 rounded-full" style={{ left:`${zoneL}%`, width:`${zoneW}%`, background:"#059669" }} />
          {/* Fill up to current value */}
          <div className="absolute top-0 left-0 h-full rounded-full transition-all duration-150" style={{ width:`${value}%`, background:trackColor, opacity:0.75 }} />
        </div>
        {/* Ideal gold marker */}
        <div className="absolute flex flex-col items-center pointer-events-none z-10" style={{ left:`${idealVal}%`, transform:"translateX(-50%)" }}>
          <div className="w-[3px] h-5 rounded-full" style={{ background:GOLD }} />
          <div className="w-1.5 h-1.5 rounded-full mt-0.5" style={{ background:GOLD }} />
        </div>
        {/* Invisible range thumb */}
        <input
          type="range" min="0" max="100" step="1" value={value}
          onChange={e => onChange(+e.target.value)}
          className="absolute inset-0 w-full opacity-0 cursor-pointer z-20"
        />
      </div>

      {/* Axis labels */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-300">0</span>
        <span className="flex items-center gap-1 font-bold text-xs" style={{ color:GOLD }}>
          <span className="inline-block w-2 h-2 rounded-sm" style={{ background:GOLD }} />
          {t.targetLabel}: {idealVal}
        </span>
        <span className="text-slate-300">100</span>
      </div>

      {/* Status hint */}
      <div className={`text-xs font-semibold ${inZone ? "text-emerald-600" : "text-amber-600"}`}>{hint}</div>

      {/* Scenario rationale */}
      <div className="text-xs text-slate-400 italic leading-relaxed border-t border-slate-100 pt-2">{rationale}</div>
    </div>
  );
}

/* ─── MINOR UI COMPONENTS ────────────────────────────────────── */
function UrgencyPill({ level, t }) {
  const u = URGENCY_CFG[level] || URGENCY_CFG.moderate;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full border ${u.bgCls} ${u.textCls} ${u.borderCls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${u.dot} ${level==="critical"?"animate-pulse":""}`} />
      {t.urgency[level]}
    </span>
  );
}

function MissionCard({ mission, isSelected, onSelect, lang, t }) {
  const sc = SECTOR_CFG[mission.sector] || SECTOR_CFG.Community;
  const { Icon:SIcon } = sc;
  const title = lang==="ar" && mission.titleAr ? mission.titleAr : mission.title;
  const desc  = lang==="ar" && mission.descAr  ? mission.descAr  : mission.desc;
  return (
    <div
      onClick={() => onSelect(mission)}
      className={`cursor-pointer rounded-2xl border p-4 mission-card transition-all duration-200
        ${isSelected ? "border-blue-400 shadow-lg bg-blue-50" : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md"}`}
      style={{ animation:"mSlide 0.45s cubic-bezier(0.34,1.56,0.64,1)" }}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${sc.bgCls} ${sc.borderCls}`}>
          <SIcon size={16} className={sc.textCls} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
            <span className="font-bold text-slate-800 text-sm leading-tight">{title}</span>
            <UrgencyPill level={mission.urgency} t={t} />
          </div>
          <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{desc}</p>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className={`text-xs font-semibold ${sc.textCls}`}>{t.sectors[mission.sector]}</span>
            <span className="text-xs font-bold text-amber-600">Base: {mission.base} ᵁᴾ</span>
            <span className="text-xs text-slate-400 font-mono">E{mission.idealEmp} / F{mission.idealEff}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Particle({ p }) {
  return (
    <div className="pointer-events-none absolute z-20 font-black text-amber-600 select-none"
      style={{ left:`${p.x}%`, top:`${p.y}%`, fontSize:p.big?15:12,
        animation:`pFly ${p.dur}s ${p.delay}s ease-out forwards`, opacity:0 }}>
      +{p.val}ᵁᴾ
    </div>
  );
}

function GratitudeBanner({ active, timeLeft, t }) {
  if (!active) return null;
  const pct = (timeLeft / 30) * 100;
  return (
    <div className="fixed top-[72px] left-1/2 z-50" style={{ transform:"translateX(-50%)", animation:"bDrop 0.55s cubic-bezier(0.34,1.56,0.64,1)" }}>
      <div className="relative flex items-center gap-4 px-6 py-3.5 rounded-2xl bg-white shadow-2xl border-2" style={{ borderColor:GOLD }}>
        <div className="absolute bottom-0 left-0 h-1 rounded-bl-2xl rounded-br-2xl" style={{ width:`${pct}%`, background:`linear-gradient(90deg,${GOLD},#F59E0B)`, transition:"width 1s linear" }} />
        <span className="text-3xl select-none">🇦🇪</span>
        <div>
          <div className="font-black text-sm tracking-widest uppercase" style={{ color:GOLD }}>{t.gratitudeTitle}</div>
          <div className="text-slate-500 text-xs">{t.gratitudeSub} · {timeLeft}{t.remaining}</div>
        </div>
        <div className="w-11 h-11 rounded-full border-4 flex items-center justify-center font-black text-xl flex-shrink-0" style={{ borderColor:GOLD, color:GOLD }}>{timeLeft}</div>
      </div>
    </div>
  );
}

function ToastReward({ toast, t, lang }) {
  if (!toast) return null;
  return (
    <div className="rounded-2xl border p-4 bg-white" style={{ borderColor:GOLD, animation:"rToast 0.45s cubic-bezier(0.34,1.56,0.64,1)" }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{t.missionResolved}</span>
        <CheckCircle size={16} className="text-emerald-500" />
      </div>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-4xl font-black tabular-nums" style={{ color:GOLD }}>+{toast.total}</span>
        <span className="text-base text-amber-600 font-mono">ᵁᴾ</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <span className="text-xs bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-mono">
          E {Math.round(toast.empAcc)}% · F {Math.round(toast.effAcc)}% {t.accuracy}
        </span>
        {toast.socialBonus > 0 && <span className="text-xs bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded-full font-bold">+{toast.socialBonus} {t.socialImpact}</span>}
        {toast.matchBonus  > 0 && <span className="text-xs bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded-full font-bold">+{toast.matchBonus} {t.heroMatchLabel}</span>}
        {toast.multiplierOn   && <span className="text-xs px-2 py-0.5 rounded-full font-bold text-white" style={{ background:GOLD }}>{t.multiplierLabel}</span>}
      </div>
      {toast.newBadges?.length > 0 && toast.newBadges.map(id => {
        const b = BADGE_DEFS.find(d => d.id === id);
        return b ? (
          <div key={id} className="mt-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
            <span className="text-amber-700 font-black text-xs">🏅 {t.badgeUnlocked}: {lang==="ar"?b.nameAr:b.nameEn}</span>
          </div>
        ) : null;
      })}
      {toast.triggerGratitude && (
        <div className="mt-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2">
          <span className="text-blue-700 font-bold text-xs">{t.gratEvent}</span>
        </div>
      )}
    </div>
  );
}

function ResilienceRing({ value }) {
  const r=22, circ=2*Math.PI*r, offset=circ-(value/100)*circ;
  const color = value>=90?"#059669":value>=60?"#D97706":"#DC2626";
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" className="flex-shrink-0">
      <circle cx="30" cy="30" r={r} fill="none" stroke="#E5E7EB" strokeWidth="5" />
      <circle cx="30" cy="30" r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transform:"rotate(-90deg)", transformOrigin:"50% 50%", transition:"stroke-dashoffset 0.8s ease, stroke 0.4s" }} />
      <text x="30" y="35" textAnchor="middle" fontSize="11" fontWeight="900" fill={color}>{Math.round(value)}</text>
    </svg>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export default function UAEVision2050() {
  const [lang, setLang]             = useState("en");
  const t = TR[lang];
  const isAr = lang === "ar";

  const [gs, setGs]                 = useState(initState);
  const [missions, setMissions]     = useState(() => [spawnMission(), spawnMission(), spawnMission()]);
  const [selected, setSelected]     = useState(null);
  const [heroFocus, setHeroFocus]   = useState(null);
  const [empathy, setEmpathy]       = useState(50);
  const [efficiency, setEfficiency] = useState(50);
  const [multiplierOn, setMulti]    = useState(false);
  const [multiplierTime, setMultiT] = useState(0);
  const [particles, setParticles]   = useState([]);
  const [toast, setToast]           = useState(null);
  const [phase, setPhase]           = useState("playing");

  const phaseRef = useRef("playing");
  phaseRef.current = phase;
  const multRef  = useRef(null);
  const toastRef = useRef(null);

  /* resilience decay */
  useEffect(() => {
    if (phase !== "playing") return;
    const id = setInterval(() => {
      setMissions(prev => {
        const decay = prev.reduce((s,m) => s + (URGENCY_CFG[m.urgency]?.decay||1), 0);
        setGs(g => {
          const nr = Math.max(0, g.resilience - decay * 0.35);
          if (nr <= 0 && phaseRef.current === "playing") setTimeout(() => setPhase("failed"), 0);
          return { ...g, resilience:nr };
        });
        return prev;
      });
    }, 2200);
    return () => clearInterval(id);
  }, [phase]);

  /* mission spawner */
  useEffect(() => {
    if (phase !== "playing") return;
    const id = setInterval(() => {
      setMissions(prev => prev.length >= 7 ? prev : [...prev, spawnMission()]);
    }, 10000);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => () => { clearInterval(multRef.current); clearTimeout(toastRef.current); }, []);

  const activateMultiplier = useCallback(() => {
    setMulti(true); setMultiT(30);
    clearInterval(multRef.current);
    multRef.current = setInterval(() => {
      setMultiT(prev => {
        if (prev <= 1) { clearInterval(multRef.current); setMulti(false); return 0; }
        return prev - 1;
      });
    }, 1000);
  }, []);

  /* Pre-seed sliders to mission ideal values when mission is selected */
  const handleSelectMission = (m) => {
    setSelected(m);
    setHeroFocus(null);
    setEmpathy(m.idealEmp);
    setEfficiency(m.idealEff);
  };

  const handleDeploy = () => {
    if (!selected || !heroFocus) return;
    const result = calcScore(empathy, efficiency, selected, heroFocus, multiplierOn);
    const triggerGratitude = result.hasSocial && (selected.sector==="Medical" || selected.heroMatch==="Medical");

    const pts = Array.from({ length:14 }, (_,i) => ({
      id:Date.now()+i, x:15+Math.random()*70, y:30+Math.random()*40,
      val:Math.max(1, Math.round(result.total/7)),
      delay:i*0.07, dur:1.1+Math.random()*0.4, big:i<3,
    }));
    setParticles(pts);
    setTimeout(() => setParticles([]), 2200);

    setGs(prev => {
      const nPoints = prev.unityPoints + result.total;
      const nRes    = Math.min(100, prev.resilience + result.total / 28);
      const nMed    = selected.sector==="Medical" ? prev.medCompleted+1 : prev.medCompleted;
      const nGrat   = triggerGratitude ? prev.gratitudeCount+1 : prev.gratitudeCount;
      const draft   = { ...prev, unityPoints:nPoints, resilience:nRes,
        level:Math.floor(nPoints/500)+1, completedCount:prev.completedCount+1,
        medCompleted:nMed, gratitudeCount:nGrat };
      const newBadges = BADGE_DEFS.filter(b => !prev.badges.includes(b.id) && b.cond(draft)).map(b=>b.id);
      draft.badges = [...prev.badges, ...newBadges];
      clearTimeout(toastRef.current);
      setToast({ ...result, newBadges, triggerGratitude });
      toastRef.current = setTimeout(() => setToast(null), 5500);
      if (nPoints >= 10000 && phaseRef.current==="playing") setTimeout(()=>setPhase("victory"), 600);
      return draft;
    });

    if (triggerGratitude) activateMultiplier();
    setMissions(prev => prev.filter(m => m.uid !== selected.uid));
    setSelected(null); setHeroFocus(null);
    setEmpathy(50); setEfficiency(50);
  };

  const resetGame = () => {
    clearInterval(multRef.current); clearTimeout(toastRef.current);
    setGs(initState());
    setMissions([spawnMission(), spawnMission(), spawnMission()]);
    setSelected(null); setHeroFocus(null);
    setEmpathy(50); setEfficiency(50);
    setMulti(false); setMultiT(0);
    setParticles([]); setToast(null); setPhase("playing");
  };

  const preview   = selected && heroFocus ? calcScore(empathy, efficiency, selected, heroFocus, multiplierOn) : null;
  const canDeploy = !!selected && !!heroFocus;
  const resColor  = gs.resilience>=90?"text-emerald-600":gs.resilience>=60?"text-amber-600":"text-red-600";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&family=Tajawal:wght@400;500;700;800&display=swap');
        *, body { box-sizing:border-box; }
        .pf      { font-family:'Playfair Display',Georgia,serif; }
        .en-body { font-family:'DM Sans',system-ui,sans-serif; }
        .ar-body { font-family:'Tajawal',system-ui,sans-serif; }
        .marble  {
          background:
            radial-gradient(ellipse 55% 45% at 4% 96%, rgba(201,168,76,0.08) 0%, transparent 65%),
            radial-gradient(ellipse 50% 55% at 96% 4%,  rgba(26,95,168,0.07) 0%, transparent 65%),
            radial-gradient(ellipse 30% 30% at 50% 50%, rgba(240,245,255,0.6) 0%, transparent 80%),
            #F5F3EF;
        }
        .card       { background:white; border:1px solid #E2E8F0; border-radius:1.25rem; }
        .azure-card { background:linear-gradient(135deg,#EBF4FF,#F0F7FF); border:1px solid #BFDBFE; border-radius:1.25rem; }

        @keyframes mSlide { from{transform:translateX(-18px);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes pFly   { 0%{transform:translateY(0) scale(1);opacity:1} 100%{transform:translateY(-90px) scale(0.5);opacity:0} }
        @keyframes bDrop  { from{transform:translateX(-50%) translateY(-16px);opacity:0} to{transform:translateX(-50%) translateY(0);opacity:1} }
        @keyframes rToast { from{transform:scale(0.92) translateY(8px);opacity:0} to{transform:scale(1) translateY(0);opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes gPulse { 0%,100%{box-shadow:0 0 0 0 rgba(201,168,76,0.45)} 50%{box-shadow:0 0 0 10px rgba(201,168,76,0)} }
        @keyframes dotBlink{ 0%,100%{opacity:1} 50%{opacity:0.3} }

        .deploy-btn { transition:all 0.2s ease; }
        .deploy-btn:not(:disabled):hover  { transform:translateY(-2px); box-shadow:0 10px 28px rgba(201,168,76,0.3); }
        .deploy-btn:not(:disabled):active { transform:translateY(0); }
        .gold-pulse { animation:gPulse 2.5s ease-in-out infinite; }
        .bar-fill   { transition:width 0.9s cubic-bezier(0.4,0,0.2,1); }
        .mission-card { transition:border-color 0.2s, box-shadow 0.2s; }
        .live-dot   { animation:dotBlink 1.2s ease-in-out infinite; }
        .lang-btn   { transition:all 0.18s ease; }
        .lang-btn:hover { transform:scale(1.05); filter:brightness(1.06); }
      `}</style>

      <div className={`marble min-h-screen ${isAr ? "ar-body" : "en-body"}`} dir={isAr ? "rtl" : "ltr"}>
        <GratitudeBanner active={multiplierOn} timeLeft={multiplierTime} t={t} />

        {/* ══ END SCREENS ═══════════════════════════════════════ */}
        {phase !== "playing" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md p-4">
            <div className="card p-10 max-w-md w-full text-center shadow-2xl"
              style={{ border:`2px solid ${phase==="victory"?GOLD:"#EF4444"}`, animation:"fadeUp 0.55s ease-out" }}>
              {phase === "victory" ? (
                <>
                  <div className="text-6xl mb-4 select-none" style={{ animation:"gFloat 2.5s ease-in-out infinite" }}>🇦🇪</div>
                  <h2 className={`text-3xl font-black text-slate-900 mb-2 ${isAr?"":"pf"}`}>{t.victoryTitle}</h2>
                  <p className="text-slate-500 text-sm mb-5 leading-relaxed">{t.victoryBody}</p>
                  <div className="text-5xl font-black mb-1 tabular-nums" style={{ color:GOLD }}>{gs.unityPoints.toLocaleString()}</div>
                  <div className="text-amber-600 font-mono mb-1">{t.unitsPts}</div>
                  <div className="text-slate-400 text-sm mb-7">{gs.completedCount} {t.missionsBefore} · {gs.badges.length} {t.badgesLabel} · L{gs.level}</div>
                  <button onClick={resetGame} className="deploy-btn w-full py-3.5 rounded-xl font-black text-white text-sm tracking-widest uppercase" style={{ background:`linear-gradient(135deg,${GOLD},#A8892A)` }}>
                    {t.newCycle}
                  </button>
                </>
              ) : (
                <>
                  <div className="text-5xl mb-4 select-none">⚠️</div>
                  <h2 className={`text-2xl font-black text-slate-900 mb-2 ${isAr?"":"pf"}`}>{t.failTitle}</h2>
                  <p className="text-slate-500 text-sm mb-5 leading-relaxed">{t.failBody}</p>
                  <div className="text-4xl font-black mb-1 tabular-nums" style={{ color:AZURE }}>{gs.unityPoints.toLocaleString()}</div>
                  <div className="text-blue-500 font-mono mb-7">{gs.completedCount} {t.missionsBefore2}</div>
                  <button onClick={resetGame} className="deploy-btn w-full py-3.5 rounded-xl font-black text-white text-sm bg-blue-600">
                    {t.recommission}
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* ══ HEADER ════════════════════════════════════════════ */}
        <header className="sticky top-0 z-40 bg-white/92 border-b border-slate-200 backdrop-blur-md shadow-sm">
          <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between gap-3 flex-wrap">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:`linear-gradient(135deg,${GOLD},#A8892A)` }}>
                <Shield size={16} className="text-white" />
              </div>
              <div>
                <div className={`font-bold text-slate-900 text-sm leading-tight ${isAr?"":"pf"}`}>{t.appTitle}</div>
                <div className="text-slate-400 text-xs tracking-widest uppercase">{t.appSub}</div>
              </div>
            </div>

            {/* Resilience — centre */}
            <div className="flex items-center gap-3">
              <ResilienceRing value={gs.resilience} />
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">{t.natResilience}</div>
                <div className={`font-black text-xl tabular-nums ${resColor}`}>{Math.round(gs.resilience)}%</div>
                {gs.resilience < 90 && <div className="text-xs text-red-500 font-semibold animate-pulse">{t.resolveWarn}</div>}
              </div>
            </div>

            {/* Right cluster */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* ── LANGUAGE TOGGLE ── */}
              <button
                onClick={() => setLang(l => l==="en"?"ar":"en")}
                className="lang-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 text-xs font-black"
                style={{ borderColor:GOLD, color:GOLD, background:"rgba(201,168,76,0.07)" }}
                title="Toggle language / تغيير اللغة"
              >
                <Languages size={13} />
                {t.langBtn}
              </button>

              {multiplierOn && (
                <div className="px-3 py-1.5 rounded-xl border-2 text-xs font-black flex items-center gap-1.5 gold-pulse"
                  style={{ borderColor:GOLD, color:GOLD, background:"rgba(201,168,76,0.07)" }}>
                  <Star size={12} /> 2× · {multiplierTime}s
                </div>
              )}
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
                <Activity size={13} className="text-blue-500" />
                <span className="text-slate-400 text-xs">{t.missions}:</span>
                <span className="text-slate-800 font-bold text-sm">{gs.completedCount}</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl px-3 py-1.5 border-2" style={{ borderColor:GOLD, background:"rgba(201,168,76,0.07)" }}>
                <Star size={13} style={{ color:GOLD }} />
                <span className="font-black text-lg tabular-nums" style={{ color:GOLD }}>{gs.unityPoints.toLocaleString()}</span>
                <span className="text-amber-600 text-xs font-mono">ᵁᴾ</span>
              </div>
              <div className="rounded-xl px-3 py-1.5 border border-blue-100 bg-blue-50 text-center min-w-[46px]">
                <div className="text-blue-400 text-xs leading-none">LVL</div>
                <div className="font-black text-base leading-tight" style={{ color:AZURE }}>{gs.level}</div>
              </div>
            </div>
          </div>
        </header>

        {/* ══ MAIN ══════════════════════════════════════════════ */}
        <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* ── LEFT: FEED + CONSOLE ──────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Feed header */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 live-dot flex-shrink-0" />
                <span className="font-bold text-slate-700 text-sm uppercase tracking-wide">{t.feedTitle}</span>
                <span className="text-xs bg-red-50 border border-red-200 text-red-700 px-2.5 py-0.5 rounded-full font-bold">{missions.length} {t.active}</span>
              </div>
              <span className="text-xs text-slate-400">{t.feedHint}</span>
            </div>

            {/* Mission cards */}
            <div className="relative space-y-2.5" style={{ minHeight:110 }}>
              {particles.map(p => <Particle key={p.id} p={p} />)}
              {missions.length === 0 ? (
                <div className="card p-8 text-center" style={{ animation:"fadeUp 0.4s ease-out" }}>
                  <CheckCircle size={28} className="text-emerald-400 mx-auto mb-2" />
                  <div className="text-slate-500 text-sm font-medium">{t.allResolved}</div>
                  <div className="text-slate-400 text-xs mt-1">{t.newMissions}</div>
                </div>
              ) : missions.map(m => (
                <MissionCard key={m.uid} mission={m} isSelected={selected?.uid===m.uid}
                  onSelect={handleSelectMission} lang={lang} t={t} />
              ))}
            </div>

            {/* ── DEPLOYMENT CONSOLE ── */}
            {selected ? (
              <div key={selected.uid} className="azure-card p-6" style={{ animation:"fadeUp 0.35s ease-out" }}>
                <div className="flex items-center gap-2 mb-5">
                  <Cpu size={15} className="text-blue-600" />
                  <h3 className="font-bold text-blue-800 text-sm uppercase tracking-widest">{t.consoleTitle}</h3>
                </div>

                {/* Mission summary strip */}
                <div className="bg-white border border-blue-100 rounded-xl p-3.5 mb-5">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-blue-500 font-bold uppercase tracking-wide mb-0.5">
                        {t.sectors[selected.sector]} · {t.recHero}: {t.heroes[selected.heroMatch]}
                      </div>
                      <div className="font-bold text-slate-800 text-sm leading-snug">
                        {isAr && selected.titleAr ? selected.titleAr : selected.title}
                      </div>
                    </div>
                    <UrgencyPill level={selected.urgency} t={t} />
                  </div>
                </div>

                {/* STEP 1 — Hero Focus */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0" style={{ background:AZURE }}>1</span>
                    <span className="font-bold text-slate-700 text-sm">{t.step1}</span>
                    <span className="text-xs text-slate-400 italic">{t.step1sub}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {Object.entries(HERO_CFG).map(([key, cfg]) => {
                      const { Icon } = cfg;
                      const isActive = heroFocus === key;
                      const isMatch  = selected.heroMatch === key;
                      return (
                        <button key={key} onClick={() => setHeroFocus(key)}
                          className={`relative rounded-xl border-2 p-3.5 text-left transition-all duration-200 ${isActive ? `${cfg.bg} ${cfg.border}` : "bg-white border-slate-200 hover:border-slate-300"}`}>
                          {isMatch && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-white text-xs font-black flex items-center justify-center" style={{ background:GOLD }}>★</div>
                          )}
                          <Icon size={16} className={isActive ? cfg.clr : "text-slate-400"} />
                          <div className={`text-xs font-bold mt-2 leading-tight ${isActive ? cfg.clr : "text-slate-600"}`}>{t.heroes[key]}</div>
                          <div className="text-xs mt-1">
                            {isMatch
                              ? <span className="text-amber-600 font-bold">{t.heroMatch}</span>
                              : <span className={isActive ? "text-slate-500" : "text-slate-400"}>
                                  {cfg.empBonus > 0 ? `+${cfg.empBonus} Emp` : `+${cfg.effBonus} Eff`}
                                </span>
                            }
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 2 — Neural Nodes */}
                <div className={`mb-5 transition-all duration-300 ${heroFocus ? "opacity-100" : "opacity-20 pointer-events-none"}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0" style={{ background:AZURE }}>2</span>
                    <span className="font-bold text-slate-700 text-sm">{t.step2}</span>
                    <span className="text-xs text-slate-400 italic">{t.step2sub}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <NodeSlider
                      label={t.empNode}
                      icon={<Heart size={14} className="text-emerald-600" />}
                      value={empathy}
                      onChange={setEmpathy}
                      idealVal={selected.idealEmp}
                      rationale={isAr
                        ? `${t.targetLabel}: ${selected.idealEmp} — ${selected.empRationaleAr || selected.empRationale}`
                        : `${t.targetLabel}: ${selected.idealEmp} — ${selected.empRationale}`}
                      t={t}
                    />
                    <NodeSlider
                      label={t.effNode}
                      icon={<Zap size={14} className="text-blue-600" />}
                      value={efficiency}
                      onChange={setEfficiency}
                      idealVal={selected.idealEff}
                      rationale={isAr
                        ? `${t.targetLabel}: ${selected.idealEff} — ${selected.effRationaleAr || selected.effRationale}`
                        : `${t.targetLabel}: ${selected.idealEff} — ${selected.effRationale}`}
                      t={t}
                    />
                  </div>
                </div>

                {/* Score preview */}
                {preview && (
                  <div className="bg-white border border-slate-100 rounded-xl p-4 mb-4" style={{ animation:"rToast 0.3s ease-out" }}>
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <div className="text-xs text-slate-400 mb-0.5">{t.projectedPts}</div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-4xl font-black tabular-nums" style={{ color:GOLD }}>{preview.total.toLocaleString()}</span>
                          <span className="text-base text-amber-600 font-mono">ᵁᴾ</span>
                        </div>
                      </div>
                      <div className="text-right text-xs space-y-0.5">
                        <div className="text-slate-500">{t.baseLabel}: <b className="text-slate-700">{preview.raw}</b></div>
                        <div className="text-slate-400 font-mono">E {Math.round(preview.empAcc)}% · F {Math.round(preview.effAcc)}%</div>
                        {preview.socialBonus > 0 && <div className="text-emerald-600 font-bold">+{preview.socialBonus} {t.socialImpact}</div>}
                        {preview.matchBonus  > 0 && <div className="text-amber-600 font-bold">+{preview.matchBonus} {t.heroMatchLabel}</div>}
                        {preview.multiplierOn    && <div className="font-black" style={{ color:GOLD }}>{t.multiplierLabel}</div>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Deploy button */}
                <button
                  onClick={handleDeploy}
                  disabled={!canDeploy}
                  className="deploy-btn gold-pulse w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase flex items-center justify-center gap-2 text-white disabled:opacity-25 disabled:cursor-not-allowed disabled:shadow-none"
                  style={canDeploy ? { background:`linear-gradient(135deg,${GOLD},#A8892A)` } : { background:"#CBD5E1" }}
                >
                  <Target size={16} />
                  {!heroFocus ? t.selectFirst : t.deployBtn}
                  <ChevronRight size={15} className={isAr?"rotate-180":""} />
                </button>
              </div>
            ) : toast ? (
              <ToastReward toast={toast} t={t} lang={lang} />
            ) : (
              <div className="azure-card p-6 text-center" style={{ animation:"fadeUp 0.35s ease-out" }}>
                <Brain size={28} className="text-blue-300 mx-auto mb-2" />
                <div className="font-semibold text-blue-700 text-sm">{t.feedHint}</div>
                <div className="text-blue-400 text-xs mt-1">{t.configHint}</div>
              </div>
            )}
          </div>

          {/* ── RIGHT: DASHBOARD + BADGES + DESIGN INTENT ─────── */}
          <div className="lg:col-span-1 space-y-4">

            {/* National Overview */}
            <div className="card p-5">
              <h2 className={`text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 ${isAr?"":"pf"}`}>{t.overview}</h2>
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                {[
                  { lbl:t.natGratitude, val:gs.unityPoints.toLocaleString(), icon:<Globe size={12}/>,      clr:"text-amber-600" },
                  { lbl:t.levelTier,    val:`L${gs.level}`,                  icon:<BarChart2 size={12}/>,  clr:"text-blue-700" },
                  { lbl:t.gratEvents,   val:gs.gratitudeCount,               icon:<Heart size={12} className="text-rose-500"/>, clr:"text-rose-600" },
                  { lbl:t.badgesEarned, val:`${gs.badges.length}/${BADGE_DEFS.length}`, icon:<Award size={12}/>, clr:"text-amber-600" },
                ].map(s => (
                  <div key={s.lbl} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                    <div className="text-xs text-slate-400 flex items-center gap-1 mb-1">{s.icon}{s.lbl}</div>
                    <div className={`text-xl font-black tabular-nums ${s.clr}`}>{s.val}</div>
                  </div>
                ))}
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>{t.levelProg}</span>
                  <span className="tabular-nums">{gs.unityPoints%500}/500 ᵁᴾ</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bar-fill rounded-full" style={{ width:`${((gs.unityPoints%500)/500)*100}%`, background:GOLD }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400 font-semibold">{t.vision2050Goal}</span>
                  <span className="text-amber-600 font-bold tabular-nums">{gs.unityPoints.toLocaleString()}/10,000</span>
                </div>
                <div className="h-2.5 bg-amber-50 border border-amber-100 rounded-full overflow-hidden">
                  <div className="h-full bar-fill rounded-full"
                    style={{ width:`${Math.min(100,(gs.unityPoints/10000)*100)}%`, background:`linear-gradient(90deg,${GOLD},#F59E0B)` }} />
                </div>
                <div className="text-xs text-slate-400 mt-1 text-right">{Math.round((gs.unityPoints/10000)*100)}% {t.ofGoal}</div>
              </div>
            </div>

            {/* Legacy Badges */}
            <div className="card p-5">
              <h2 className={`text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 ${isAr?"":"pf"}`}>{t.legacyBadges}</h2>
              <div className="space-y-2">
                {BADGE_DEFS.map(badge => {
                  const unlocked = gs.badges.includes(badge.id);
                  return (
                    <div key={badge.id}
                      className={`rounded-xl border p-3 flex items-center gap-3 transition-all ${unlocked?"bg-amber-50 border-amber-200":"bg-slate-50 border-slate-100 opacity-40"}`}>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${unlocked?"bg-amber-100":"bg-slate-100"}`}>
                        {unlocked ? badge.emoji : <Lock size={13} className="text-slate-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-bold truncate ${unlocked?"text-amber-700":"text-slate-500"}`}>
                          {isAr ? badge.nameAr : badge.nameEn}
                        </div>
                        <div className="text-xs text-slate-400">{isAr ? badge.descAr : badge.descEn}</div>
                      </div>
                      {unlocked && <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Design Intent */}
            <div className="rounded-2xl p-5 border" style={{
              borderLeft: isAr ? undefined : `4px solid ${GOLD}`,
              borderRight: isAr ? `4px solid ${GOLD}` : undefined,
              borderTop:`1px solid rgba(201,168,76,0.25)`,
              borderBottom:`1px solid rgba(201,168,76,0.25)`,
              background:"rgba(201,168,76,0.04)",
            }}>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={13} style={{ color:GOLD }} />
                <span className="text-xs font-black uppercase tracking-widest" style={{ color:GOLD }}>{t.designIntent}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-2">
                <b className="text-slate-800">{t.designP1}</b>{t.designP1b}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">{t.designP2}</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
