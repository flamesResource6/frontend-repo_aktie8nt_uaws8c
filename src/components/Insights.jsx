import { useMemo } from "react";
import { PieChart as PieIcon, Activity, BarChart3 } from "lucide-react";

function Pie({ fake, genuine }) {
  const total = fake + genuine || 1;
  const fakePct = (fake / total) * 100;
  const genuinePct = 100 - fakePct;
  const circumference = 2 * Math.PI * 42; // r=42
  const fakeLen = (fakePct / 100) * circumference;
  const genuineLen = circumference - fakeLen;
  return (
    <svg viewBox="0 0 100 100" className="w-48 h-48">
      <g transform="translate(50,50)">
        <circle r="42" fill="transparent" stroke="#f1f5f9" strokeWidth="16" />
        <circle
          r="42"
          fill="transparent"
          stroke="#fca5a5"
          strokeWidth="16"
          strokeDasharray={`${fakeLen} ${circumference}`}
          strokeDashoffset={circumference / 4}
        />
        <circle
          r="42"
          fill="transparent"
          stroke="#86efac"
          strokeWidth="16"
          strokeDasharray={`${genuineLen} ${circumference}`}
          strokeDashoffset={circumference / 4 + fakeLen}
        />
      </g>
    </svg>
  );
}

function Bar({ label, value }) {
  return (
    <div className="space-y-1">
      <div className="text-sm text-slate-600">{label}</div>
      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-3 bg-blue-300 rounded-full"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}

export default function Insights() {
  const summary = { fake: 32, genuine: 118 };
  const byRestaurant = [
    { name: "Saffron & Stone", fakePct: 12 },
    { name: "Marina Trattoria", fakePct: 8 },
    { name: "Umami Lane", fakePct: 22 },
    { name: "Green Spoon", fakePct: 15 },
  ];

  const totals = useMemo(() => {
    const total = summary.fake + summary.genuine;
    return {
      fakePct: Math.round((summary.fake / total) * 100),
      genuinePct: Math.round((summary.genuine / total) * 100),
    };
  }, [summary]);

  return (
    <section className="max-w-6xl mx-auto p-4 grid lg:grid-cols-2 gap-6">
      <div className="bg-white/80 backdrop-blur rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <PieIcon size={18} className="text-slate-500" />
          <h3 className="font-semibold text-slate-900">Fake vs Genuine</h3>
        </div>
        <div className="flex items-center gap-6">
          <Pie fake={summary.fake} genuine={summary.genuine} />
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-sm bg-rose-300" />
              <span>Fake: {summary.fake} ({totals.fakePct}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-sm bg-emerald-300" />
              <span>Genuine: {summary.genuine} ({totals.genuinePct}%)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 size={18} className="text-slate-500" />
          <h3 className="font-semibold text-slate-900">Fake Review % by Restaurant</h3>
        </div>
        <div className="space-y-3">
          {byRestaurant.map((r) => (
            <Bar key={r.name} label={r.name} value={r.fakePct} />
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-2">
          <Activity size={18} className="text-indigo-500" />
          <h3 className="font-semibold text-slate-900">What this means</h3>
        </div>
        <p className="text-slate-600 text-sm">
          These insights help illustrate how an AI system can surface suspicious activity and keep ratings trustworthy.
          In a full implementation, these visuals would update from live model outputs and database stats.
        </p>
      </div>
    </section>
  );
}
