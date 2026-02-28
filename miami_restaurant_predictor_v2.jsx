const { useState, useEffect, useMemo, useRef } = React;

const MIAMI_CONTEXT = `
You are an expert restaurant market analyst specialising in Miami-Dade County. You have access to the following proprietary market data from a comprehensive 2022–2024 analysis:

MIAMI TOURISM (2024):
- 28.23M total visitors, $22B visitor spend
- Top visitor origins: NYC (1.86M), Colombia (434K), Brazil (382K), Argentina, Venezuela
- Hotel occupancy: 86.8% (Q1), 70.9% (Q3 — weakest quarter)
- Q1 (Jan–Mar) is peak season at ~32% of annual volume; Q3 (Jul–Sep) is weakest at ~20%

RESTAURANT MARKET (2024 benchmarks):
- Total F&B market: ~$8.4B annually
- Fine dining avg spend/head: $93–102
- Casual dining avg spend/head: $50–56
- QSR avg spend/head: $19–21
- Restaurant closures: ~102 in Q1 2024 alone

CATEGORY GROWTH/DECLINE (2022–2024):
GROWING: Private Members Dining +58%, Omakase +41%, Mediterranean/Israeli +47%, Latin Fusion +34%, Pop-Up/Experiential +155%, Chef-Owned Independent +28%, Cocktail-Led Bars +22%
DECLINING: Legacy Italian -31%, Traditional American Diner -23%, Traditional Chinese -18%, Mid-Range Steakhouses -8%

SUBMARKET RENTS & VACANCY (Q4 2024, $/SF/yr NNN):
- Lincoln Road: $110, 5.8% vacancy | Design District: $95, 4.2% | Brickell: $74, 3.1%
- Wynwood: $62, 7.4% | Coconut Grove: $64, 1.5% | Coral Gables: $52, 1.1%
- Downtown Miami: $41, 16.2% (structural weakness) | Hialeah: $36, 1.8%
- Doral: ~$42, 2.1% | Little Havana: ~$28, 2.3% | Miami Beach: ~$85, 4.5%
- Overall Miami-Dade avg: $47.80/SF, 2.6% vacancy

OPERATOR UNIT ECONOMICS (annual, 2024):
- Fine Dining (Brickell, 3,500 sqft, 70 seats): Revenue $2.86M, Rent 9.0%, EBITDA ~12%
- Upscale Casual (Wynwood, 2,800 sqft, 90 seats): Revenue $3.34M, Rent 5.2%, EBITDA ~14%
- Sports Bar (Midtown, 4,500 sqft, 140 seats): Revenue $4.54M, Rent 4.5%, EBITDA ~13%
- Fast Casual (Coral Gables, 1,800 sqft, 55 seats): Revenue $1.62M, Rent 5.8%, EBITDA ~21%

MALL VS STREET LOCATION DATA (critical — apply carefully):

MALL RESTAURANT ADVANTAGES:
- Mall restaurants fail 12% less than standalone street locations (WifiTalents / NRA data)
- Malls with integrated dining see 35% more total visits than those without (GitnuX 2023)
- Guaranteed captive footfall: average US adult visits a mall 5.2 times/month; avg spend per visit $120
- Zero outdoor marketing burden — mall drives footfall at operator's expense
- Free parking removes a major Miami friction point (street parking expensive/scarce in Brickell, Wynwood, Beach)
- Indoor climate control = no Miami summer heat deterrent
- Anchor tenant halo effect (cinemas increase evening restaurant traffic by 20%)
- Mall food halls increase overall mall foot traffic by 15%
- Indoor malls: foot traffic up 9.7% YoY March 2024

MALL RESTAURANT DISADVANTAGES:
- Rent structure: mall rents typically include base rent PLUS 6–10% revenue share (percentage rent) — effective rent burden 15–25% of revenue vs 5–9% for street
- Operating hours dictated by mall: typically 10am–9/10pm — limits late-night bar/events revenue
- Brand identity diluted: customers associate with the mall, not the destination restaurant
- Match-day atmosphere compromised: football viewing events harder to programme in mall environment (noise restrictions, shared spaces, no street-facing presence)
- Outlet malls (e.g. Dolphin Mall) show 10.2% 6-year footfall decline (H1 2025 vs 2019)
- Food court adjacency cheapens brand perception for premium concepts
- Mall operator approval required for all events, activations, décor changes
- Dependency risk: if anchor tenant closes or mall declines, restaurant traffic collapses

MIAMI-SPECIFIC MALL DATA:
- Dolphin Mall (outlet, Doral area): 1.4M sqft, 7,800 parking spaces, Latin American focused, Simon Property Group. Outlet format — lower spend per visit than traditional malls, but very high footfall from value-oriented shoppers. Proximity to large Venezuelan/Colombian community in Doral is positive for football-themed concepts.
- Aventura Mall (super-regional): highest-quality mall in Miami-Dade, strong luxury/aspirational positioning, 2.7M sqft. Foot traffic strong but rents among highest in Florida.
- Dadeland Mall (Kendall): established family/suburban market, steady middle-class footfall.
- Lincoln Road (Miami Beach): open-air, high tourist footfall, very high rent ($110/SF), better brand visibility than enclosed malls.

SURVIVAL RATE ADJUSTMENT — MALL VS STREET:
- Full-service casual/upscale casual in mall: +8% at 1yr vs street (captive footfall benefit)
- Fine dining in mall: NEUTRAL to -5% (brand dilution, percentage rent, atmosphere issues)
- Sports bar / football-themed in mall: -10% vs street (match-day atmosphere severely compromised, noise/event restrictions, no street presence for walk-in game-day traffic)
- Fast casual / QSR in mall: +15% vs street (highest beneficiary of captive traffic, lowest brand-identity dependency)
- Outlet mall specifically (Dolphin): additional -5% vs traditional mall (declining format, lower spend/visit)

KEY SURVIVAL FACTORS (positive, street locations):
- Owner-operated: +8–12% | Outdoor seating: +15% | Latin/Hispanic cuisine: strong match
- Official sports team licensing: +10–15% | Michelin pedigree: +12%
- Members/loyalty programme: +18% at 5yr | Financial reserves 6+ months: +20% at 2yr
- Marketing >$5K/month: +10% | 2026 FIFA World Cup: Miami host city, major uplift

KEY SURVIVAL FACTORS (negative):
- Downtown Miami: -12% | Rent >15% revenue: -25% | Rent >20% revenue: -40%
- No outdoor seating (street): -10% | No marketing: -12% | <3 months reserves: -22%
- Mid-range steakhouse / legacy Italian / diner: -15 to -31%

NATIONAL BASELINE SURVIVAL RATES (Miami-adjusted +8%):
- 1 year: ~68% | 2 years: ~52% | 5 years: ~32%

FOOTBALL / SOCCER VIEWERSHIP (2024):
- Total Americans watching international soccer: 50.3M (+60% since 2018)
- La Liga US viewership: 13.7M (+40%) | El Clasico ratings: +77% YoY in 2023/24
- Miami ranked #1 soccer market in US | 70%+ Hispanic population; 73% of US Latinos are soccer fans
- Official Real Madrid licensing: +15% survival vs unlicensed sports bar
- 2026 World Cup Miami host city: est. 20–35% F&B uplift during group stage
- IMPORTANT: Mall location severely limits match-day atmosphere and event programming — a football-themed restaurant is significantly better placed on a street/standalone site

Always respond ONLY with a valid JSON object in this exact format:
{
  "survival_1yr": <number 0-100>,
  "survival_2yr": <number 0-100>,
  "survival_5yr": <number 0-100>,
  "market_fit_score": <number 0-10>,
  "overall_rating": "<Excellent|Strong|Moderate|Risky|Critical>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "risks": ["<risk 1>", "<risk 2>", "<risk 3>"],
  "killer_insight": "<single most important insight>",
  "recommendations": ["<rec 1>", "<rec 2>", "<rec 3>"],
  "comparable_concept": "<name of a comparable Miami concept that succeeded or failed and why>",
  "rent_risk": "<Low|Moderate|High|Critical>",
  "seasonality_risk": "<Low|Moderate|High>",
  "category_trend": "<Strong Tailwind|Tailwind|Neutral|Headwind|Strong Headwind>",
  "mall_verdict": "<single sentence specifically on whether the mall or street location is the right call for THIS concept>"
}
`;

const MALL_DATA = {
  "Indoor Mall (e.g. Aventura, Dadeland)": {
    icon: "🏬",
    footfall: "15,000–25,000 daily visitors",
    parking: "Free, 3,000–5,000+ spaces",
    survival_adj: { "Sports Bar": -10, "Football-Themed (licensed)": -10, "Football-Themed (unlicensed)": -10, "Fine Dining": -5, "Fast Casual / Health": 15, "QSR / Fast Food": 15, "default": 8 },
    pros: ["Guaranteed captive footfall", "Free parking removes Miami friction", "Climate-controlled — summer heat irrelevant", "Cinema anchor drives evening trade +20%"],
    cons: ["Revenue share rent adds 6–10% on top of base", "Mall hours cap late-night bar revenue", "Match-day events restricted by mall rules", "Brand identity tied to mall, not destination"],
    rent_note: "Expect base rent + 6–10% revenue share. Total rent burden often 15–22% of revenue.",
    stat: "Mall restaurants fail 12% less than street on average — but sports/themed concepts are the exception.",
  },
  "Outlet Mall (e.g. Dolphin Mall)": {
    icon: "🏷️",
    footfall: "10,000–18,000 daily visitors",
    parking: "Free, 7,800 spaces (Dolphin)",
    survival_adj: { "Sports Bar": -15, "Football-Themed (licensed)": -15, "Football-Themed (unlicensed)": -15, "Fine Dining": -10, "Fast Casual / Health": 10, "QSR / Fast Food": 12, "default": 3 },
    pros: ["Huge free parking (Dolphin: 7,800 spaces)", "Large Latin American community nearby (Doral)", "Very high footfall volume", "Lower rents than indoor/luxury malls"],
    cons: ["Outlet format: -10.2% footfall decline over 6 years (H1 2025 vs 2019)", "Value-oriented shopper = lower avg spend per visit", "Poor fit for premium or themed dining", "Match-day atmosphere nearly impossible to create"],
    rent_note: "Lower base rent than premium malls but still includes percentage rent clause.",
    stat: "Outlet malls saw the largest 6-year footfall decline of any mall format (Capital One Shopping 2025).",
  },
  "Open-Air / Lifestyle Centre (e.g. Lincoln Road)": {
    icon: "🌴",
    footfall: "20,000–40,000 daily visitors (Lincoln Road peak)",
    parking: "Paid / street — Miami Beach friction point",
    survival_adj: { "Sports Bar": 5, "Football-Themed (licensed)": 8, "Football-Themed (unlicensed)": 5, "Fine Dining": 5, "Fast Casual / Health": 12, "QSR / Fast Food": 10, "default": 8 },
    pros: ["Open-air centres exceeded 2019 visitor levels in Q1 2024 — first mall format to do so", "Better brand visibility than enclosed malls", "Outdoor dining possible", "More atmosphere for match-day street presence"],
    cons: ["Lincoln Road: $110/SF — among highest rents in Florida", "Parking friction (Miami Beach)", "Tourist-heavy — less loyal repeat local custom", "Heat and weather exposure"],
    rent_note: "Lincoln Road rents: ~$110/SF NNN. Open-air lifestyle centres outside Miami Beach: $55–75/SF.",
    stat: "Open-air centres: +10.1% foot traffic YoY March 2024 — strongest recovery of any retail format.",
  },
  "Street / Standalone Location": {
    icon: "🏙️",
    footfall: "Varies hugely by neighbourhood",
    parking: "Neighbourhood-dependent",
    survival_adj: { "default": 0 },
    pros: ["Full control over hours, events, atmosphere", "Match-day programming unrestricted", "Brand identity 100% your own", "No percentage rent clause", "Street presence for game-day walk-in traffic"],
    cons: ["No guaranteed captive footfall", "Parking depends on neighbourhood", "All marketing burden on operator", "Miami summer heat impacts outdoor dining"],
    rent_note: "Miami-Dade avg: $47.80/SF NNN. Wynwood: $62, Brickell: $74, Doral: $42, Little Havana: $28.",
    stat: "Street locations: higher upside for destination concepts; higher risk without strong marketing.",
  },
};

const STEPS = [
  {
    id: "location", title: "Location & Space", icon: "📍",
    fields: [
      { id: "location_type", label: "Location Type", type: "select", options: Object.keys(MALL_DATA) },
      { id: "neighbourhood", label: "Neighbourhood / Area", type: "select", options: ["Wynwood","Brickell","Design District","Coconut Grove","Coral Gables","Miami Beach (South Beach)","Lincoln Road","Midtown","Little Havana","Downtown Miami","Doral / Dolphin Mall area","Hialeah","Aventura","Kendall / Dadeland","Edgewater","Other"] },
      { id: "sqft", label: "Square Footage", type: "number", placeholder: "e.g. 2500", unit: "sq ft" },
      { id: "seats", label: "Seating Capacity", type: "number", placeholder: "e.g. 80", unit: "seats" },
      { id: "outdoor", label: "Outdoor / Terrace Seating?", type: "select", options: ["Yes — substantial patio","Yes — small terrace","No — indoor only","N/A (mall interior)"] },
      { id: "rent_monthly", label: "Monthly Rent", type: "number", placeholder: "e.g. 12000", unit: "USD/month" },
    ],
  },
  {
    id: "concept", title: "Concept & Cuisine", icon: "🍽️",
    fields: [
      { id: "cuisine_type", label: "Cuisine / Concept Type", type: "select", options: ["Latin Fusion","Spanish / Mediterranean","Italian","Japanese / Omakase","American (Casual)","American Diner","Steakhouse (Fine)","Steakhouse (Mid-Range)","Fast Casual / Health","QSR / Fast Food","Sports Bar","Football-Themed (licensed)","Football-Themed (unlicensed)","Cocktail Bar / Gastropub","Seafood","Chinese / Pan-Asian","Private Members Club","Pop-Up / Experiential","Other"] },
      { id: "dining_style", label: "Dining Style", type: "select", options: ["Fine Dining (tasting menus / high ceremony)","Upscale Casual (approachable but polished)","Casual Dining (relaxed, family-friendly)","Fast Casual (counter service, quality focus)","QSR / Counter Service","Bar-led (food secondary)","Event / Experiential venue"] },
      { id: "target_demo", label: "Primary Target Demographic", type: "select", options: ["Local Miami residents (Hispanic/Latino)","Local residents (general)","International tourists","Domestic US tourists","Business diners / corporate","Young professionals (25–40)","Families","Sports fans","Affluent / wealth segment","Mixed / broad"] },
      { id: "unique_differentiator", label: "Unique Differentiator", type: "textarea", placeholder: "What makes this concept unmissable? Official licensing, celebrity chef, one-of-a-kind experience..." },
    ],
  },
  {
    id: "pricing", title: "Pricing & Revenue", icon: "💰",
    fields: [
      { id: "avg_spend", label: "Average Spend per Head", type: "number", placeholder: "e.g. 65", unit: "USD" },
      { id: "revenue_model", label: "Primary Revenue Model", type: "select", options: ["À la carte restaurant only","Restaurant + bar (50/50)","Restaurant + events / private hire","Members + restaurant","Merchandise + restaurant + bar","Delivery / takeaway focused","Mixed / multiple streams"] },
      { id: "days_open", label: "Days Open per Week", type: "select", options: ["7 days","6 days","5 days","Weekend only / events"] },
      { id: "projected_monthly_revenue", label: "Projected Monthly Revenue (optional)", type: "number", placeholder: "e.g. 180000", unit: "USD/month" },
    ],
  },
  {
    id: "operations", title: "Operations & Team", icon: "⚙️",
    fields: [
      { id: "employees", label: "Number of Employees (FTE)", type: "number", placeholder: "e.g. 22", unit: "staff" },
      { id: "ownership", label: "Ownership / Operating Model", type: "select", options: ["Owner-operated (founder in restaurant daily)","Owner-operated (hands-off investor)","Small independent group (2–5 sites)","Franchise / licensed brand","Large restaurant group (6+ sites)","Corporate / institutional"] },
      { id: "operator_experience", label: "Operator Experience", type: "select", options: ["First restaurant — no prior F&B experience","First restaurant — prior F&B experience (FOH/BOH)","1–2 prior restaurants","3–5 prior restaurants (at least 1 still open)","5+ prior restaurants, established operator","Michelin-starred / celebrity chef background"] },
      { id: "financial_reserves", label: "Financial Reserves (runway)", type: "select", options: ["Less than 1 month","1–3 months","3–6 months","6–12 months","12+ months","Not disclosed"] },
    ],
  },
  {
    id: "market", title: "Marketing & Context", icon: "📣",
    fields: [
      { id: "marketing_budget", label: "Monthly Marketing Budget", type: "select", options: ["None / word of mouth only","Under $1,000","$1,000–$5,000","$5,000–$15,000","$15,000+","PR agency retained"] },
      { id: "social_media", label: "Social Media Strategy", type: "select", options: ["None planned","Basic presence (occasional posts)","Active (3–5 posts/week)","Professional content creator / influencer partnerships","Viral-ready concept (highly Instagrammable)"] },
      { id: "time_in_business", label: "Stage of Business", type: "select", options: ["Pre-opening (planning stage)","Opening within 3 months","Open less than 6 months","Open 6–12 months","Open 1–2 years","Open 2–5 years","Open 5+ years"] },
      { id: "football_licensing", label: "Football / Sports Licensing", type: "select", options: ["N/A — not a sports concept","Official Real Madrid licensing secured","Official licensing (other club)","Unofficial / themed without licence","General sports bar (no specific team affiliation)"] },
      { id: "additional_context", label: "Anything else we should know?", type: "textarea", placeholder: "Chef background, planned events, 2026 World Cup strategy, membership model..." },
    ],
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function Gauge({ value, label, sublabel }) {
  const [displayed, setDisplayed] = useState(0);
  const radius = 54, stroke = 9, circ = Math.PI * radius;
  const offset = circ - (displayed / 100) * circ;
  useEffect(() => {
    let cur = 0;
    const step = value / 60;
    const t = setInterval(() => { cur += step; if (cur >= value) { setDisplayed(value); clearInterval(t); } else setDisplayed(Math.round(cur)); }, 16);
    return () => clearInterval(t);
  }, [value]);
  const c = value >= 70 ? "#00d4c8" : value >= 50 ? "#ffd700" : value >= 30 ? "#ff9f43" : "#ff6b6b";
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
      <svg width={140} height={80} viewBox="0 0 140 80">
        <path d={`M 10 75 A ${radius} ${radius} 0 0 1 130 75`} fill="none" stroke="#1e2530" strokeWidth={stroke} strokeLinecap="round"/>
        <path d={`M 10 75 A ${radius} ${radius} 0 0 1 130 75`} fill="none" stroke={c} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset} style={{ transition:"stroke-dashoffset 0.05s linear", filter:`drop-shadow(0 0 6px ${c})` }}/>
        <text x="70" y="68" textAnchor="middle" fill={c} style={{ fontSize:26, fontWeight:900, fontFamily:"monospace" }}>{displayed}%</text>
      </svg>
      <div style={{ textAlign:"center" }}>
        <div style={{ color:"#e6edf3", fontSize:13, fontWeight:700 }}>{label}</div>
        {sublabel && <div style={{ color:"#8b949e", fontSize:11, marginTop:2 }}>{sublabel}</div>}
      </div>
    </div>
  );
}

function RatingBadge({ rating }) {
  const cfg = { "Excellent":{bg:"rgba(0,212,200,0.15)",b:"#00d4c8",c:"#00d4c8",i:"🏆"}, "Strong":{bg:"rgba(255,215,0,0.15)",b:"#ffd700",c:"#ffd700",i:"⭐"}, "Moderate":{bg:"rgba(255,159,67,0.15)",b:"#ff9f43",c:"#ff9f43",i:"⚠️"}, "Risky":{bg:"rgba(255,107,107,0.15)",b:"#ff6b6b",c:"#ff6b6b",i:"🚨"}, "Critical":{bg:"rgba(180,30,30,0.2)",b:"#cc2222",c:"#ff4444",i:"💀"} };
  const x = cfg[rating] || cfg["Moderate"];
  return <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"10px 20px", borderRadius:8, background:x.bg, border:`1.5px solid ${x.b}`, color:x.c, fontSize:16, fontWeight:800, letterSpacing:"0.08em" }}>{x.i} {rating.toUpperCase()}</div>;
}

function Pill({ label, value }) {
  const colors = { "Low":"#00d4c8","Moderate":"#ffd700","High":"#ff9f43","Critical":"#ff4444","Strong Tailwind":"#00d4c8","Tailwind":"#adff2f","Neutral":"#8b949e","Headwind":"#ff9f43","Strong Headwind":"#ff4444" };
  const c = colors[value] || "#8b949e";
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
      <div style={{ color:"#8b949e", fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em" }}>{label}</div>
      <div style={{ padding:"4px 12px", borderRadius:20, background:`${c}22`, border:`1px solid ${c}`, color:c, fontSize:12, fontWeight:700 }}>{value}</div>
    </div>
  );
}

function ScoreBar({ score }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW((score/10)*100), 100); return () => clearTimeout(t); }, [score]);
  const c = score >= 7 ? "#00d4c8" : score >= 5 ? "#ffd700" : "#ff6b6b";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
      <div style={{ flex:1, height:10, background:"#1e2530", borderRadius:5, overflow:"hidden" }}>
        <div style={{ width:`${w}%`, height:"100%", background:`linear-gradient(90deg,${c}88,${c})`, borderRadius:5, transition:"width 1.2s cubic-bezier(0.16,1,0.3,1)", boxShadow:`0 0 12px ${c}66` }}/>
      </div>
      <div style={{ color:c, fontWeight:900, fontSize:20, minWidth:40, textAlign:"right" }}>{score}<span style={{ color:"#8b949e", fontSize:13 }}>/10</span></div>
    </div>
  );
}

// Mall info card shown on step 1 after selection
function MallInfoCard({ locationType }) {
  const data = MALL_DATA[locationType];
  if (!data) return null;
  const isMall = locationType !== "Street / Standalone Location";
  const accentColor = isMall ? "#ffd700" : "#00d4c8";
  return (
    <div style={{ background:`${accentColor}0d`, border:`1px solid ${accentColor}33`, borderRadius:12, padding:"16px 18px", marginBottom:20 }}>
      <div style={{ color:accentColor, fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", fontWeight:700, marginBottom:10 }}>
        {data.icon} {locationType} — Market Data
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:12 }}>
        <div>
          <div style={{ color:"#8b949e", fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>Daily Footfall</div>
          <div style={{ color:"#e6edf3", fontSize:13, fontWeight:700 }}>{data.footfall}</div>
        </div>
        <div>
          <div style={{ color:"#8b949e", fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>Parking</div>
          <div style={{ color:"#e6edf3", fontSize:13, fontWeight:700 }}>{data.parking}</div>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
        <div>
          <div style={{ color:"#00d4c8", fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6, fontWeight:700 }}>✅ Advantages</div>
          {data.pros.map((p,i) => <div key={i} style={{ color:"#c9d1d9", fontSize:11, marginBottom:4, display:"flex", gap:6 }}><span style={{ color:"#00d4c8", flexShrink:0 }}>+</span>{p}</div>)}
        </div>
        <div>
          <div style={{ color:"#ff6b6b", fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6, fontWeight:700 }}>⚠️ Risks</div>
          {data.cons.map((c,i) => <div key={i} style={{ color:"#c9d1d9", fontSize:11, marginBottom:4, display:"flex", gap:6 }}><span style={{ color:"#ff6b6b", flexShrink:0 }}>−</span>{c}</div>)}
        </div>
      </div>
      <div style={{ background:"#0d1117", borderRadius:8, padding:"8px 12px", marginBottom:8 }}>
        <div style={{ color:"#8b949e", fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:3 }}>Rent Note</div>
        <div style={{ color:"#e6edf3", fontSize:12 }}>{data.rent_note}</div>
      </div>
      <div style={{ color:accentColor, fontSize:11, fontStyle:"italic" }}>📊 {data.stat}</div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
function MiamiRestaurantPredictorV2() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const topRef = useRef(null);
  const cur = STEPS[step];

  const upd = (id, v) => { setFormData(p => ({...p,[id]:v})); setFieldErrors(p => ({...p,[id]:false})); };

  const validate = () => {
    const errs = {};
    cur.fields.forEach(f => { if (!f.optional && !formData[f.id] && f.type !== "textarea") errs[f.id] = true; });
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    if (step < STEPS.length - 1) { setStep(s => s+1); topRef.current?.scrollIntoView({behavior:"smooth"}); }
    else submit();
  };

  const submit = async () => {
    setLoading(true); setError(null);
    const mallData = MALL_DATA[formData.location_type] || {};
    const mallAdj = mallData.survival_adj ? (mallData.survival_adj[formData.cuisine_type] ?? mallData.survival_adj["default"] ?? 0) : 0;

    const prompt = `Assess this Miami restaurant concept and return ONLY JSON:

LOCATION TYPE: ${formData.location_type}
- Neighbourhood: ${formData.neighbourhood}
- Location survival adjustment for this concept type: ${mallAdj > 0 ? '+' : ''}${mallAdj}% vs street baseline (apply this to your survival calculations)
- Mall/location specific pros: ${mallData.pros?.join('; ') || 'N/A'}
- Mall/location specific risks: ${mallData.cons?.join('; ') || 'N/A'}
- Rent structure note: ${mallData.rent_note || 'Standard street rent'}

RESTAURANT DETAILS:
- Sq ft: ${formData.sqft} | Seats: ${formData.seats} | Outdoor: ${formData.outdoor}
- Monthly rent: $${formData.rent_monthly}
- Cuisine: ${formData.cuisine_type} | Dining style: ${formData.dining_style}
- Target demo: ${formData.target_demo}
- Differentiator: ${formData.unique_differentiator || "None stated"}
- Avg spend/head: $${formData.avg_spend} | Revenue model: ${formData.revenue_model}
- Days open: ${formData.days_open}
- Projected monthly revenue: $${formData.projected_monthly_revenue || "Not stated"}
- Employees: ${formData.employees} | Ownership: ${formData.ownership}
- Operator experience: ${formData.operator_experience}
- Financial reserves: ${formData.financial_reserves}
- Marketing budget: ${formData.marketing_budget} | Social media: ${formData.social_media}
- Stage: ${formData.time_in_business} | Football licensing: ${formData.football_licensing}
- Additional context: ${formData.additional_context || "None"}

Apply the mall vs street survival adjustment carefully. For football/sports concepts in a mall, the match-day atmosphere restriction is a major negative. Return JSON only including the mall_verdict field.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1200, system:MIAMI_CONTEXT, messages:[{role:"user",content:prompt}] })
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text||"").join("") || "";
      const m = text.match(/\{[\s\S]*\}/);
      if (!m) throw new Error("No JSON in response");
      setResult(JSON.parse(m[0]));
      topRef.current?.scrollIntoView({behavior:"smooth"});
    } catch(e) { setError("Analysis failed — please try again. " + e.message); }
    finally { setLoading(false); }
  };

  const reset = () => { setStep(0); setFormData({}); setResult(null); setError(null); setFieldErrors({}); topRef.current?.scrollIntoView({behavior:"smooth"}); };

  const S = {
    app:{ minHeight:"100vh", background:"#080c12", backgroundImage:"radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,180,170,0.12) 0%, transparent 70%)", fontFamily:"'Segoe UI',sans-serif", color:"#e6edf3", padding:"24px 16px 60px" },
    card:{ maxWidth:700, margin:"0 auto", background:"rgba(22,27,34,0.95)", border:"1px solid #21262d", borderRadius:16, padding:"36px 32px", boxShadow:"0 24px 80px rgba(0,0,0,0.5)" },
    title:{ fontSize:26, fontWeight:900, letterSpacing:"-0.02em", background:"linear-gradient(135deg,#00d4c8,#ff6eb4)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", margin:"0 0 6px" },
    label:{ display:"block", color:"#8b949e", fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:7 },
    input:{ width:"100%", background:"#0d1117", border:"1.5px solid #30363d", borderRadius:8, color:"#e6edf3", padding:"11px 14px", fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit" },
    select:{ width:"100%", background:"#0d1117", border:"1.5px solid #30363d", borderRadius:8, color:"#e6edf3", padding:"11px 36px 11px 14px", fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit", cursor:"pointer", appearance:"none", backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238b949e' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")", backgroundRepeat:"no-repeat", backgroundPosition:"right 14px center" },
    textarea:{ width:"100%", background:"#0d1117", border:"1.5px solid #30363d", borderRadius:8, color:"#e6edf3", padding:"11px 14px", fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit", resize:"vertical", minHeight:80, lineHeight:1.6 },
    btnPrimary:{ flex:1, background:"linear-gradient(135deg,#00d4c8,#00a89e)", border:"none", borderRadius:8, color:"#080c12", fontWeight:800, fontSize:15, padding:"13px 0", cursor:"pointer", fontFamily:"inherit" },
    btnSecondary:{ padding:"13px 20px", background:"transparent", border:"1.5px solid #30363d", borderRadius:8, color:"#8b949e", cursor:"pointer", fontSize:14, fontWeight:600, fontFamily:"inherit" },
  };

  if (loading) return (
    <div style={S.app}><div ref={topRef}/>
      <div style={{...S.card, textAlign:"center", padding:"60px 40px"}}>
        <div style={{ fontSize:48, marginBottom:20, display:"inline-block", animation:"spin 2s linear infinite" }}>🌴</div>
        <div style={{ fontSize:20, fontWeight:700, color:"#00d4c8", marginBottom:8 }}>Analysing your concept...</div>
        <div style={{ color:"#8b949e", fontSize:14, lineHeight:1.7 }}>Running Miami market models<br/>Applying mall vs street survival data<br/>Calculating probabilities</div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );

  if (result) {
    const isMall = formData.location_type !== "Street / Standalone Location";
    const mallVerdictColor = result.mall_verdict?.toLowerCase().includes("street") ? "#00d4c8" : result.mall_verdict?.toLowerCase().includes("mall") ? "#ffd700" : "#8b949e";
    const D = <div style={{ height:1, background:"#21262d", margin:"22px 0" }}/>;
    return (
      <div style={S.app}><div ref={topRef}/>
        <div style={{...S.card, maxWidth:760}}>
          <div style={{ textAlign:"center", marginBottom:24 }}>
            <div style={{ fontSize:11, color:"#8b949e", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:10 }}>Miami Restaurant Survival Analysis</div>
            <h1 style={{...S.title, fontSize:22, marginBottom:14}}>Your Assessment</h1>
            <div style={{ display:"flex", justifyContent:"center", gap:12, flexWrap:"wrap", marginBottom:8 }}>
              <RatingBadge rating={result.overall_rating}/>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"10px 16px", borderRadius:8, background:"rgba(100,100,100,0.1)", border:"1.5px solid #30363d", color:"#8b949e", fontSize:13, fontWeight:700 }}>
                {MALL_DATA[formData.location_type]?.icon} {formData.location_type}
              </div>
            </div>
          </div>

          {/* Mall verdict — the new section */}
          <div style={{ background:"linear-gradient(135deg, rgba(255,215,0,0.07), rgba(0,212,200,0.05))", border:`1px solid ${mallVerdictColor}44`, borderRadius:12, padding:"16px 20px", marginBottom:20 }}>
            <div style={{ color:mallVerdictColor, fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8, fontWeight:700 }}>🏬 Mall vs Street Verdict</div>
            <div style={{ color:"#e6edf3", fontSize:14, lineHeight:1.65 }}>{result.mall_verdict}</div>
          </div>

          <div style={{ background:"#0d1117", borderRadius:12, padding:"18px 22px", marginBottom:20 }}>
            <div style={{ color:"#8b949e", fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:10 }}>Miami Market Fit Score</div>
            <ScoreBar score={result.market_fit_score}/>
          </div>

          <div style={{ color:"#8b949e", fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:14 }}>Survival Probability</div>
          <div style={{ display:"flex", justifyContent:"space-around", flexWrap:"wrap", gap:16, background:"#0d1117", borderRadius:12, padding:"24px 16px", marginBottom:20 }}>
            <Gauge value={result.survival_1yr} label="1 Year" sublabel="Short-term viability"/>
            <Gauge value={result.survival_2yr} label="2 Years" sublabel="Establishment phase"/>
            <Gauge value={result.survival_5yr} label="5 Years" sublabel="Long-term survival"/>
          </div>

          <div style={{ display:"flex", justifyContent:"space-around", flexWrap:"wrap", gap:16, marginBottom:20 }}>
            <Pill label="Rent Risk" value={result.rent_risk}/>
            <Pill label="Seasonality" value={result.seasonality_risk}/>
            <Pill label="Category Trend" value={result.category_trend}/>
          </div>
          {D}

          <div style={{ background:"linear-gradient(135deg,rgba(0,212,200,0.08),rgba(255,110,180,0.05))", border:"1px solid rgba(0,212,200,0.25)", borderRadius:12, padding:"18px 22px", marginBottom:20 }}>
            <div style={{ color:"#00d4c8", fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8, fontWeight:700 }}>⚡ Key Insight</div>
            <div style={{ color:"#e6edf3", fontSize:14, lineHeight:1.65, fontStyle:"italic" }}>"{result.killer_insight}"</div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:20 }}>
            <div style={{ background:"#0d1117", borderRadius:12, padding:"16px 18px" }}>
              <div style={{ color:"#00d4c8", fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:12, fontWeight:700 }}>✅ Strengths</div>
              {result.strengths?.map((s,i) => <div key={i} style={{ display:"flex", gap:8, marginBottom:9, alignItems:"flex-start" }}><span style={{ color:"#00d4c8", flexShrink:0 }}>•</span><span style={{ color:"#c9d1d9", fontSize:13, lineHeight:1.5 }}>{s}</span></div>)}
            </div>
            <div style={{ background:"#0d1117", borderRadius:12, padding:"16px 18px" }}>
              <div style={{ color:"#ff6b6b", fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:12, fontWeight:700 }}>⚠️ Risks</div>
              {result.risks?.map((r,i) => <div key={i} style={{ display:"flex", gap:8, marginBottom:9, alignItems:"flex-start" }}><span style={{ color:"#ff6b6b", flexShrink:0 }}>•</span><span style={{ color:"#c9d1d9", fontSize:13, lineHeight:1.5 }}>{r}</span></div>)}
            </div>
          </div>

          <div style={{ background:"#0d1117", borderRadius:12, padding:"16px 18px", marginBottom:20 }}>
            <div style={{ color:"#ffd700", fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:12, fontWeight:700 }}>🎯 Recommendations</div>
            {result.recommendations?.map((r,i) => <div key={i} style={{ display:"flex", gap:10, marginBottom:10, alignItems:"flex-start" }}><div style={{ background:"rgba(255,215,0,0.12)", border:"1px solid #ffd70044", color:"#ffd700", borderRadius:6, width:22, height:22, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, flexShrink:0 }}>{i+1}</div><div style={{ color:"#c9d1d9", fontSize:13, lineHeight:1.55, paddingTop:2 }}>{r}</div></div>)}
          </div>

          {result.comparable_concept && <div style={{ background:"rgba(155,125,232,0.08)", border:"1px solid rgba(155,125,232,0.25)", borderRadius:12, padding:"14px 18px", marginBottom:24 }}><div style={{ color:"#9b7de8", fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6, fontWeight:700 }}>📖 Comparable Concept</div><div style={{ color:"#c9d1d9", fontSize:13, lineHeight:1.55 }}>{result.comparable_concept}</div></div>}

          <div style={{ color:"#555e6b", fontSize:11, textAlign:"center", lineHeight:1.6, marginBottom:20 }}>
            Sources: NRA · WifiTalents · Capital One Shopping · GitnuX · Placer.ai · GMCVB · Cushman &amp; Wakefield · Nielsen · FRED BLS
          </div>
          <button onClick={reset} style={{...S.btnPrimary, width:"100%"}}>↩ Analyse Another Restaurant</button>
        </div>
      </div>
    );
  }

  return (
    <div style={S.app}><div ref={topRef}/>
      <div style={S.card}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ fontSize:11, color:"#8b949e", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:8 }}>Miami Market Intelligence</div>
          <h1 style={S.title}>Restaurant Survival Predictor</h1>
          <p style={{ color:"#8b949e", fontSize:13, margin:0 }}>Powered by 2022–2024 Miami market data · Mall vs street survival analysis · GMCVB, NRA, FRED analytics</p>
        </div>

        <div style={{ marginBottom:24 }}>
          <div style={{ height:3, background:"#1e2530", borderRadius:2, overflow:"hidden", marginBottom:8 }}>
            <div style={{ width:`${(step/STEPS.length)*100}%`, height:"100%", background:"linear-gradient(90deg,#00d4c8,#ff6eb4)", borderRadius:2, transition:"width 0.4s" }}/>
          </div>
          <div style={{ display:"flex", gap:6, justifyContent:"center" }}>
            {STEPS.map((_,i) => <div key={i} style={{ width:i===step?24:8, height:8, borderRadius:4, background:i<step?"#00d4c8":i===step?"#ff6eb4":"#21262d", transition:"all 0.3s" }}/>)}
          </div>
        </div>

        <div style={{ fontSize:19, fontWeight:800, color:"#e6edf3", marginBottom:22, display:"flex", alignItems:"center", gap:10 }}>
          <span>{cur.icon}</span><span>{cur.title}</span>
          <span style={{ marginLeft:"auto", color:"#8b949e", fontSize:12, fontWeight:400 }}>Step {step+1} of {STEPS.length}</span>
        </div>

        {cur.fields.map(f => (
          <div key={f.id} style={{ marginBottom:18 }}>
            <label style={S.label}>{f.label}{f.unit && <span style={{ color:"#555e6b", fontWeight:400, marginLeft:5 }}>({f.unit})</span>}</label>
            {f.type==="select" && <select style={{...S.select, ...(fieldErrors[f.id]?{borderColor:"#ff6b6b"}:{})}} value={formData[f.id]||""} onChange={e=>upd(f.id,e.target.value)}><option value="">Select...</option>{f.options.map(o=><option key={o} value={o}>{o}</option>)}</select>}
            {f.type==="number" && <div style={{ position:"relative" }}>{(f.unit==="USD"||f.unit==="USD/month")&&<span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"#555e6b", fontSize:14 }}>$</span>}<input type="number" placeholder={f.placeholder} value={formData[f.id]||""} onChange={e=>upd(f.id,e.target.value)} style={{...S.input, ...(fieldErrors[f.id]?{borderColor:"#ff6b6b"}:{}), paddingLeft:(f.unit==="USD"||f.unit==="USD/month")?24:14}}/></div>}
            {f.type==="textarea" && <textarea placeholder={f.placeholder} value={formData[f.id]||""} onChange={e=>upd(f.id,e.target.value)} style={S.textarea}/>}
            {fieldErrors[f.id] && <div style={{ color:"#ff6b6b", fontSize:12, marginTop:4 }}>This field is required</div>}
            {/* Show mall info card immediately after location_type is selected */}
            {f.id==="location_type" && formData.location_type && <MallInfoCard locationType={formData.location_type}/>}
          </div>
        ))}

        {error && <div style={{ background:"rgba(255,107,107,0.1)", border:"1px solid #ff6b6b44", borderRadius:8, padding:"12px 16px", color:"#ff6b6b", fontSize:13, marginBottom:14 }}>{error}</div>}

        <div style={{ display:"flex", gap:12, marginTop:24 }}>
          {step>0 && <button onClick={()=>{setStep(s=>s-1);topRef.current?.scrollIntoView({behavior:"smooth"})}} style={S.btnSecondary}>← Back</button>}
          <button onClick={next} style={S.btnPrimary}>{step===STEPS.length-1?"🔍 Run Analysis":"Continue →"}</button>
        </div>
        <div style={{ textAlign:"center", color:"#555e6b", fontSize:11, marginTop:16 }}>All dropdown fields on this screen are required</div>
      </div>
    </div>
  );
}
const rootElement = document.getElementById("root");

if (rootElement) {
  if (ReactDOM.createRoot) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<MiamiRestaurantPredictorV2 />);
  } else {
    ReactDOM.render(<MiamiRestaurantPredictorV2 />, rootElement);
  }
}
