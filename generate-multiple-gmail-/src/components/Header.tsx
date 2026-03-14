import { useState } from "react";

type Tab = "home" | "dot" | "alias" | "generator" | "signature";

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; sub: string; emoji: string; href: string; active: string }[] = [
  {
    id: "home",
    label: "Home",
    sub: "Overview",
    emoji: "🏠",
    href: "#/",
    active: "bg-gradient-to-r from-slate-700 to-slate-900 text-white shadow-md shadow-slate-300",
  },
  {
    id: "dot",
    label: "Dot Trick",
    sub: "Dot variants",
    emoji: "🔴",
    href: "#/gmail-dot-trick",
    active: "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md shadow-red-200",
  },
  {
    id: "alias",
    label: "Alias",
    sub: "+tag aliases",
    emoji: "🔵",
    href: "#/gmail-alias",
    active: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-200",
  },
  {
    id: "generator",
    label: "Generator",
    sub: "Fake emails",
    emoji: "🟢",
    href: "#/email-generator",
    active: "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md shadow-green-200",
  },
  {
    id: "signature",
    label: "Signature",
    sub: "Email signature",
    emoji: "✍️",
    href: "#/email-signature",
    active: "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md shadow-orange-200",
  },
];

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: Tab) => {
    e.preventDefault();
    setActiveTab(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      {/* Top bar */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <a
            href="#/"
            onClick={(e) => handleNav(e, "home")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity shrink-0"
            aria-label="Gmail Tools — Home"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-lg shadow-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <span className="text-lg font-extrabold text-gray-900 leading-tight tracking-tight block">
                Gmail <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">Tools</span>
              </span>
              <p className="text-[10px] text-gray-400 font-medium">Free · No Sign-up · Privacy First</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center bg-gray-100 rounded-2xl p-1 gap-0.5" aria-label="Main navigation">
            {tabs.map((tab) => (
              <a
                key={tab.id}
                href={tab.href}
                onClick={(e) => handleNav(e, tab.id)}
                title={tab.sub}
                aria-current={activeTab === tab.id ? "page" : undefined}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap no-underline ${
                  activeTab === tab.id
                    ? tab.active
                    : "text-gray-500 hover:text-gray-800 hover:bg-white hover:shadow-sm"
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </a>
            ))}
          </nav>

          {/* Right: badge + hamburger */}
          <div className="flex items-center gap-3">
            {/* Active tab badge – tablet */}
            <div className="hidden sm:flex md:hidden items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
              <span>{tabs.find(t => t.id === activeTab)?.emoji}</span>
              <span>{tabs.find(t => t.id === activeTab)?.label}</span>
            </div>
            {/* Status pill */}
            <div className="hidden lg:flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Online
            </div>
            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors gap-1.5"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span className={`block w-5 h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-96 border-t border-gray-100" : "max-h-0"}`}>
        <nav className="max-w-5xl mx-auto px-4 py-3 grid grid-cols-2 gap-2" aria-label="Mobile navigation">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              href={tab.href}
              onClick={(e) => handleNav(e, tab.id)}
              aria-current={activeTab === tab.id ? "page" : undefined}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all no-underline ${
                activeTab === tab.id
                  ? tab.active
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100"
              }`}
            >
              <span className="text-base">{tab.emoji}</span>
              <div>
                <div className="leading-tight">{tab.label}</div>
                <div className={`text-[10px] font-normal ${activeTab === tab.id ? "text-white/70" : "text-gray-400"}`}>{tab.sub}</div>
              </div>
            </a>
          ))}
        </nav>
        {/* Divider info */}
        <div className="max-w-5xl mx-auto px-4 pb-3">
          <div className="flex items-center justify-center gap-3 text-[10px] text-gray-400 bg-gray-50 rounded-xl py-2 px-3">
            <span>🔒 No sign-up</span>
            <span>·</span>
            <span>⚡ Instant</span>
            <span>·</span>
            <span>🌐 100% local</span>
          </div>
        </div>
      </div>

      {/* Breadcrumb bar */}
      <nav aria-label="Breadcrumb" className="bg-gradient-to-r from-slate-800 to-slate-900 py-1.5">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <ol className="flex items-center gap-1.5 text-[10px] text-slate-400 list-none m-0 p-0">
            <li>
              <a
                href="#/"
                onClick={(e) => handleNav(e, "home")}
                className="hover:text-white transition-colors no-underline"
              >
                Home
              </a>
            </li>
            {activeTab !== "home" && (
              <>
                <li className="text-slate-600" aria-hidden="true">›</li>
                <li className="text-white font-semibold" aria-current="page">
                  {tabs.find(t => t.id === activeTab)?.label}
                </li>
              </>
            )}
          </ol>
          <div className="text-[10px] text-slate-500 hidden sm:block">
            Gmail Tools Suite — 4 Free Tools
          </div>
        </div>
      </nav>
    </header>
  );
}
