type Tab = "home" | "dot" | "alias" | "generator" | "signature";

interface FooterProps {
  onNavigate: (tab: Tab) => void;
}

const TAB_HREFS: Record<Tab, string> = {
  home:      "#/",
  dot:       "#/gmail-dot-trick",
  alias:     "#/gmail-alias",
  generator: "#/email-generator",
  signature: "#/email-signature",
};

export default function Footer({ onNavigate }: FooterProps) {
  const year = new Date().getFullYear();

  const tools = [
    { id: "dot" as Tab, emoji: "🔴", label: "Dot Trick Generator", desc: "Generate dot-variant Gmail addresses" },
    { id: "alias" as Tab, emoji: "🔵", label: "Gmail Alias Generator", desc: "Create unlimited +tag aliases" },
    { id: "generator" as Tab, emoji: "🟢", label: "Email Generator", desc: "Generate fake emails for testing" },
    { id: "signature" as Tab, emoji: "✍️", label: "Email Signature Maker", desc: "Build a professional email signature" },
  ];

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: Tab) => {
    e.preventDefault();
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const features = [
    { icon: "🔒", text: "No data is sent to any server" },
    { icon: "⚡", text: "All processing happens locally in your browser" },
    { icon: "🚫", text: "No sign-up, no cookies, no tracking" },
    { icon: "💸", text: "Completely free with no ads" },
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-800 to-slate-950 text-white mt-0">

      {/* Wave divider */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" className="w-full h-10 fill-white">
          <path d="M0,40 C360,0 1080,0 1440,40 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Main footer content */}
      <div className="max-w-5xl mx-auto px-4 pt-4 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">

          {/* Brand column */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 border border-slate-600 shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-extrabold leading-tight">
                  Gmail <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">Tools</span>
                </h2>
                <p className="text-[10px] text-slate-400">Free Email Utilities Suite</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              A free suite of Gmail utilities — generate dot variants, aliases, fake emails for testing, and professional signatures. Everything runs locally in your browser.
            </p>
            {/* Privacy badges */}
            <div className="flex flex-wrap gap-2">
              {["🔒 Private", "⚡ Instant", "🆓 Free"].map(b => (
                <span key={b} className="text-[10px] font-bold bg-slate-700 border border-slate-600 text-slate-300 px-2.5 py-1 rounded-full">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Tools column */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-widest border-b border-slate-700 pb-2">
              🛠️ Tools
            </h3>
            <ul className="space-y-2.5">
              {tools.map((tool) => (
                <li key={tool.id}>
                  <a
                    href={TAB_HREFS[tool.id]}
                    onClick={(e) => handleNav(e, tool.id)}
                    className="group flex items-start gap-2.5 w-full hover:text-white transition-colors no-underline"
                  >
                    <span className="text-base mt-0.5 shrink-0">{tool.emoji}</span>
                    <div>
                      <div className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                        {tool.label}
                      </div>
                      <div className="text-[10px] text-slate-500 group-hover:text-slate-400 transition-colors">
                        {tool.desc}
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Privacy column */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-widest border-b border-slate-700 pb-2">
              🔐 Privacy
            </h3>
            <ul className="space-y-2.5">
              {features.map((f) => (
                <li key={f.text} className="flex items-start gap-2.5">
                  <span className="text-base shrink-0 mt-0.5">{f.icon}</span>
                  <span className="text-xs text-slate-400 leading-relaxed">{f.text}</span>
                </li>
              ))}
            </ul>
            {/* Privacy shield */}
            <div className="mt-4 bg-slate-700/50 border border-slate-600/50 rounded-xl p-3 flex items-center gap-3">
              <div className="text-2xl">🛡️</div>
              <div>
                <div className="text-xs font-bold text-slate-200">Privacy First</div>
                <div className="text-[10px] text-slate-500">Your data never leaves your browser</div>
              </div>
            </div>
          </div>

          {/* How to start column */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-widest border-b border-slate-700 pb-2">
              🚀 How to Get Started
            </h3>
            <div className="space-y-3">
              {[
                { step: "01", text: "Pick the right tool", icon: "🛠️" },
                { step: "02", text: "Enter your email address", icon: "✉️" },
                { step: "03", text: "Generate results instantly", icon: "⚡" },
                { step: "04", text: "Copy or download the file", icon: "📋" },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-3 bg-slate-800/50 border border-slate-700/50 rounded-xl p-3">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div>
                    <div className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest">Step {item.step}</div>
                    <div className="text-xs font-semibold text-slate-300">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { value: "500+", label: "Dot combinations", icon: "⚡" },
            { value: "20+", label: "Preset tags", icon: "🏷️" },
            { value: "15", label: "Email domains", icon: "🌐" },
            { value: "5", label: "Signature templates", icon: "✨" },
          ].map(stat => (
            <div key={stat.label} className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 text-center">
              <div className="text-xl mb-0.5">{stat.icon}</div>
              <div className="text-lg font-extrabold text-white">{stat.value}</div>
              <div className="text-[10px] text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700/60 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-xs text-slate-500 text-center sm:text-left">
              © {year} Gmail Tools · All rights reserved · Built with ❤️ for developers
            </div>
            {/* Tech badges */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {["React", "TypeScript", "Tailwind CSS", "Vite"].map(tech => (
                <span key={tech} className="text-[10px] font-bold bg-slate-800 border border-slate-700 text-slate-400 px-2 py-0.5 rounded-md">
                  {tech}
                </span>
              ))}
            </div>
            {/* Disclaimer */}
            <div className="text-[10px] text-slate-600 text-center">
              Not affiliated with Google or Gmail
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
