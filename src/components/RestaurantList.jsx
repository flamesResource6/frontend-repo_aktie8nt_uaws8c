import { useState } from "react";
import { MapPin, Star, Filter } from "lucide-react";

const sampleRestaurants = [
  {
    id: 1,
    name: "Saffron & Stone",
    address: "123 Market St, San Francisco",
    cuisine: "Indian",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    fakeRatio: 0.12,
  },
  {
    id: 2,
    name: "Marina Trattoria",
    address: "200 Bay Ave, San Francisco",
    cuisine: "Italian",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop",
    fakeRatio: 0.08,
  },
  {
    id: 3,
    name: "Umami Lane",
    address: "77 Cedar St, San Francisco",
    cuisine: "Japanese",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1562158070-8a4e4f784209?q=80&w=1200&auto=format&fit=crop",
    fakeRatio: 0.22,
  },
];

export default function RestaurantList() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("rating");

  const filtered = sampleRestaurants
    .filter((r) =>
      [r.name, r.cuisine, r.address].some((x) =>
        x.toLowerCase().includes(query.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "fake") return a.fakeRatio - b.fakeRatio;
      return a.name.localeCompare(b.name);
    });

  return (
    <section className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Restaurants</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Filter className="absolute left-2 top-2.5 text-slate-400" size={16} />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="pl-7 pr-3 py-2 border rounded-md text-sm"
            >
              <option value="rating">Sort by Rating</option>
              <option value="fake">Sort by Fake Ratio</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="px-3 py-2 border rounded-md text-sm"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((r) => (
          <article key={r.id} className="bg-white/80 backdrop-blur rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <img src={r.image} alt={r.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">{r.name}</h3>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm font-medium">{r.rating.toFixed(1)}</span>
                </div>
              </div>
              <div className="text-slate-600 text-sm mt-1 flex items-center gap-1">
                <MapPin size={14} /> {r.address}
              </div>
              <div className="mt-2 text-xs text-slate-500">Cuisine: {r.cuisine}</div>
              <div className="mt-3 text-xs">
                <span className={`px-2 py-1 rounded-full ${
                  r.fakeRatio > 0.2
                    ? "bg-red-100 text-red-700"
                    : r.fakeRatio > 0.1
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}>
                  Fake review ratio: {(r.fakeRatio * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
