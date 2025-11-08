import { Rocket, ShieldCheck, Star, PieChart } from "lucide-react";

export default function Navbar({ current, onNavigate }) {
  const tabs = [
    { key: "detect", label: "Detect", icon: ShieldCheck },
    { key: "restaurants", label: "Restaurants", icon: Star },
    { key: "insights", label: "Insights", icon: PieChart },
  ];

  return (
    <header className="sticky top-0 z-20 w-full backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2 text-slate-900 font-semibold">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white">
            <Rocket size={18} />
          </div>
          <span>RevGuard AI</span>
        </div>
        <nav className="ml-auto flex items-center gap-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = current === t.key;
            return (
              <button
                key={t.key}
                onClick={() => onNavigate(t.key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon size={16} />
                {t.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
