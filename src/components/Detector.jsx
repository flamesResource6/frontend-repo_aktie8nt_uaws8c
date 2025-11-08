import { useState } from "react";
import { ShieldAlert, ShieldCheck } from "lucide-react";

export default function Detector() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const backend = import.meta.env.VITE_BACKEND_URL || "";

  async function handleDetect() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${backend}/detect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review: text }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ error: "Unable to reach detection service." });
    } finally {
      setLoading(false);
    }
  }

  const isFake = result?.label === "fake";
  const confidence = result?.confidence != null ? Math.round(result.confidence * 100) : null;

  return (
    <section className="max-w-3xl mx-auto p-4">
      <div className="bg-white/80 backdrop-blur rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Fake Review Detector</h2>
        <p className="text-slate-600 mb-4">Paste a review below and we'll analyze it using an AI model.</p>

        <textarea
          className="w-full h-40 rounded-lg border border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-200 p-3 outline-none resize-y"
          placeholder="Type or paste a restaurant review..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleDetect}
            disabled={!text.trim() || loading}
            className="px-4 py-2 rounded-md bg-slate-900 text-white disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Detect"}
          </button>
          <span className="text-slate-500 text-sm">Confidence and explanation appear here after analysis.</span>
        </div>

        {result && (
          <div className="mt-6">
            {result.error ? (
              <div className="text-red-600">{result.error}</div>
            ) : (
              <div className={`p-4 rounded-lg border ${isFake ? "border-red-200 bg-red-50" : "border-emerald-200 bg-emerald-50"}`}>
                <div className="flex items-center gap-2 font-medium">
                  {isFake ? (
                    <ShieldAlert className="text-red-600" size={18} />
                  ) : (
                    <ShieldCheck className="text-emerald-600" size={18} />
                  )}
                  <span>{isFake ? "This review is likely fake." : "This review seems genuine."}</span>
                </div>
                <div className="mt-2 text-sm text-slate-700">
                  {confidence != null && (<span>Confidence: {confidence}%</span>)}
                </div>
                {result.explanation && (
                  <div className="mt-3 text-sm text-slate-600">
                    <span className="font-medium">Why: </span>
                    <span>{result.explanation}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
