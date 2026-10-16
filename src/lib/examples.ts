export type Area = "Money" | "Operations" | "Market" | "Technology" | "Rules";
export type Analysis = {
  rocksView: string;
  gibraltarDifference: string[];
  boardroom: { area: Area; view: string }[];
  tensions: string[];
  recommendation: string;
  nextMoves: { title: string; detail: string }[];
  confidence: "High" | "Medium" | "Low";
  confidenceReason: string;
  sources: { name: string; note: string }[];
};

const commonSources = [
  { name: "HM Government of Gibraltar — Employment Act", note: "Employer obligations, contracts and notice periods" },
  { name: "Department of Employment / ETB", note: "Registration of employment and recruitment support" },
  { name: "Income Tax Office & Social Insurance", note: "PAYE and employer contribution guidance" },
  { name: "Gibraltar Chamber of Commerce / GFSB", note: "Local business sentiment and member surveys" },
];

const EXAMPLES: Record<string, Analysis> = {
  "should i hire another employee?": {
    rocksView:
      "Not yet — hire only when you can evidence a sustained capacity gap and afford the fully loaded cost in a downside scenario. If missed sales or service failures already cost more than the role, the case is strong; otherwise test a narrower staffing solution first.",
    gibraltarDifference: [
      "A ~34,000 population limits the local talent pool; cross-frontier candidates widen it but add commuting and frontier-delay risk.",
      "Fully loaded cost includes employer Social Insurance, recruitment, equipment and potentially scarce, expensive office space.",
      "Seasonal tourism and cruise demand can make a busy quarter look like permanent growth.",
      "Treaty developments may change frontier fluidity — verify current arrangements before relying on a cross-border hire.",
    ],
    boardroom: [
      { area: "Money", view: "Model 12 months of fully loaded cost against the extra gross profit or avoided costs the hire creates. Stress-test a 20% revenue dip." },
      { area: "Operations", view: "Map where hours are actually lost. If rework or poor scheduling drive the pressure, fix the process before adding headcount." },
      { area: "Market", view: "Look for evidence: declined orders, waiting lists, lost customers. Separate sustained demand from seasonal peaks." },
      { area: "Technology", view: "Check whether booking, invoicing or Microsoft 365 automation could remove 5–10 hours a week and defer the hire." },
      { area: "Rules", view: "Plan Employment Act obligations, registration with the Department of Employment, contracts and data-protection handling of applicant data." },
    ],
    tensions: [
      "Speed of hiring vs. the cost of a wrong hire in a small market where reputations travel fast.",
      "Permanent contract security vs. flexibility of part-time or fixed-term cover.",
      "Relieving owner overload today vs. preserving cash for the next downturn.",
    ],
    recommendation:
      "Run a four-week capacity audit, then decide. If demand is proven and the role pays for itself within nine months under a cautious forecast, recruit — starting with a clearly scoped, possibly part-time role. If not, invest first in process fixes and automation.",
    nextMoves: [
      { title: "Measure the gap", detail: "Log hours, missed work and overtime for four weeks across the team." },
      { title: "Cost it properly", detail: "Build a fully loaded cost model including Social Insurance, space and onboarding." },
      { title: "Define the role", detail: "Write outcomes, not tasks — and decide full-time, part-time or fixed-term." },
    ],
    confidence: "Medium",
    confidenceReason: "Strong general principles, but the answer depends on your actual demand data and margins.",
    sources: commonSources,
  },
  "how can i improve my cash flow?": {
    rocksView:
      "Your fastest wins are in debtor days and stock, not in cutting costs. Tighten payment terms, invoice the same day and renegotiate supplier terms before touching headcount.",
    gibraltarDifference: [
      "Many businesses rely on a small number of large local clients — one late payer can distort the month.",
      "Imported goods via Spain add lead times, encouraging excess stock that ties up cash.",
      "Commercial rents are high; a lease review can release meaningful monthly cash.",
    ],
    boardroom: [
      { area: "Money", view: "Build a rolling 13-week cash forecast. Target a reduction of 10 debtor days within a quarter." },
      { area: "Operations", view: "Review stock levels and order frequency; smaller, more frequent orders reduce cash tied up." },
      { area: "Market", view: "Introduce deposits or staged payments on larger jobs; offer small discounts for upfront payment." },
      { area: "Technology", view: "Use online invoicing with card/bank links and automated reminders." },
      { area: "Rules", view: "Make sure terms and conditions clearly state payment terms and late-payment interest." },
    ],
    tensions: ["Firmer terms vs. client relationships in a close-knit market.", "Lower stock vs. the risk of running out when supply is delayed."],
    recommendation:
      "Start a weekly cash meeting with a 13-week forecast, chase your top ten debtors personally, and move every new customer onto clear 14- or 30-day terms with automated reminders.",
    nextMoves: [
      { title: "13-week forecast", detail: "Set it up this week and review it every Monday." },
      { title: "Debtor sprint", detail: "Call your ten largest overdue accounts within five working days." },
      { title: "Automate invoicing", detail: "Send invoices the day work is completed, with a pay-now link." },
    ],
    confidence: "High",
    confidenceReason: "These are proven, low-risk levers that apply to almost every Gibraltar SME.",
    sources: [commonSources[3], { name: "Gibraltar Finance Centre", note: "General business finance guidance" }],
  },
  "how could gibraltar treaty developments affect my business?": {
    rocksView:
      "Plan for opportunity, prepare for friction. Greater frontier fluidity could widen your market and workforce, but rule changes on goods, VAT-style taxation and checks may raise costs during transition.",
    gibraltarDifference: [
      "Around 15,000 workers cross the frontier daily — any change to flow directly affects staffing.",
      "Proposed customs and taxation alignment could change pricing for imported goods.",
      "Access to Campo de Gibraltar customers may increase, as may competition from them.",
    ],
    boardroom: [
      { area: "Money", view: "Model pricing and margin under possible changes to import duties and indirect taxes." },
      { area: "Operations", view: "Review supply chains and staffing dependencies on the frontier." },
      { area: "Market", view: "Explore Spanish-speaking marketing to the Campo — and watch for new competitors." },
      { area: "Technology", view: "Prepare systems for any new customs or invoicing requirements." },
      { area: "Rules", view: "Track official HMGoG and UK government guidance as texts are finalised." },
    ],
    tensions: ["Investing early to capture opportunity vs. waiting for final legal texts.", "Opening to a larger market vs. exposing yourself to larger competitors."],
    recommendation:
      "Set up a light-touch Treaty watch: one person, monthly review, a short impact register. Act on no-regret moves now — supplier diversification and Campo market research — and hold bigger investments until details are confirmed.",
    nextMoves: [
      { title: "Impact register", detail: "List the five ways the Treaty could hit your costs, staff and customers." },
      { title: "Supplier check", detail: "Identify single points of failure in your cross-border supply." },
      { title: "Market scan", detail: "Assess demand for your offer in La Línea, San Roque and Algeciras." },
    ],
    confidence: "Low",
    confidenceReason: "Final legal texts and implementation dates are still evolving.",
    sources: [
      { name: "HM Government of Gibraltar — Treaty updates", note: "Official statements and briefings" },
      { name: "UK Government (FCDO)", note: "UK–EU negotiation guidance" },
      commonSources[3],
    ],
  },
};

export function getAnalysis(question: string): Analysis {
  const hit = EXAMPLES[question.trim().toLowerCase()];
  if (hit) return hit;
  return {
    rocksView: `A sound decision here rests on three things: whether the numbers work under a cautious forecast, whether your team can deliver it, and whether Gibraltar's market and rules support it. Here is the board's initial view on: "${question}".`,
    gibraltarDifference: [
      "A small, relationship-driven market means reputation effects are amplified — positive and negative.",
      "Cross-frontier workforce and supply chains add both flexibility and exposure.",
      "High property costs and limited space shape what growth is realistic.",
      "Treaty developments may shift costs and opportunities over the next 24 months.",
    ],
    boardroom: [
      { area: "Money", view: "Quantify the upside and the downside. Check payback, cash runway and margin impact." },
      { area: "Operations", view: "Check capacity, key-person dependency and whether processes can scale." },
      { area: "Market", view: "Validate demand with real customers before committing significant resources." },
      { area: "Technology", view: "Identify tools that could reduce cost or risk of executing this decision." },
      { area: "Rules", view: "Confirm licensing, employment and data-protection implications early." },
    ],
    tensions: ["Moving fast vs. getting it right in a small market.", "Growth ambition vs. cash preservation."],
    recommendation:
      "Treat this as a staged decision: gather the key data, run a small test, then commit. Involve your accountant and, where regulation is involved, a Gibraltar-qualified adviser.",
    nextMoves: [
      { title: "Clarify the decision", detail: "Write down what success looks like in 12 months." },
      { title: "Gather the numbers", detail: "Pull three months of sales, costs and cash data." },
      { title: "Run a small test", detail: "Find the cheapest way to prove the idea before scaling." },
    ],
    confidence: "Medium",
    confidenceReason: "General guidance — more detail about your business would sharpen this view.",
    sources: commonSources,
  };
}

export type Saved = { id: string; question: string; date: string; confidence: Analysis["confidence"] };

export const EXAMPLE_SAVED: Saved[] = [
  { id: "ex1", question: "Should I hire another employee?", date: "2026-10-09", confidence: "Medium" },
  { id: "ex2", question: "How can I improve my cash flow?", date: "2026-10-02", confidence: "High" },
  { id: "ex3", question: "How could Gibraltar Treaty developments affect my business?", date: "2026-09-21", confidence: "Low" },
];

const KEY = "rockbrain.saved";
export function loadSaved(): Saved[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
export function saveDecision(s: Saved) {
  const list = loadSaved().filter((x) => x.question !== s.question);
  localStorage.setItem(KEY, JSON.stringify([s, ...list]));
}
export function removeSaved(id: string) {
  localStorage.setItem(KEY, JSON.stringify(loadSaved().filter((x) => x.id !== id)));
}
