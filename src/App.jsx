import { useState } from "react";
import Navbar from "./components/Navbar";
import Detector from "./components/Detector";
import RestaurantList from "./components/RestaurantList";
import Insights from "./components/Insights";
import Footer from "./components/Footer";

function App() {
  const [page, setPage] = useState("detect");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-violet-50 text-slate-800 flex flex-col">
      <Navbar current={page} onNavigate={setPage} />

      <main className="flex-1">
        {page === "detect" && <Detector />}
        {page === "restaurants" && <RestaurantList />}
        {page === "insights" && <Insights />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
