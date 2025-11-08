export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white/60 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-600 flex flex-col sm:flex-row gap-2 sm:gap-6 items-center justify-between">
        <p>
          © {new Date().getFullYear()} RevGuard AI — keeping restaurant reviews trustworthy.
        </p>
        <div className="flex items-center gap-4">
          <a className="hover:text-slate-900" href="#">Privacy</a>
          <a className="hover:text-slate-900" href="#">Terms</a>
          <a className="hover:text-slate-900" href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}
