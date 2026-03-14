import { useState, useCallback } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SEOArticle from "./components/SEOArticle";
import { useSEO } from "./hooks/useSEO";
import { useHashRouter } from "./hooks/useHashRouter";
import { SEO_CONFIG } from "./data/seoConfig";

/* ─────────────────────────────────────────────
   UTILITIES — DOT TRICK
───────────────────────────────────────────── */

function generateDotTrickEmails(username: string): string[] {
  const clean = username.replace(/\./g, "").toLowerCase();
  const n = clean.length;
  if (n === 0) return [];
  const results: string[] = [];
  const total = 1 << (n - 1);
  for (let mask = 0; mask < total; mask++) {
    let address = clean[0];
    for (let i = 1; i < n; i++) {
      if (mask & (1 << (i - 1))) address += ".";
      address += clean[i];
    }
    results.push(address + "@gmail.com");
  }
  return results;
}

function generateAliasEmails(username: string, tags: string[]): string[] {
  const clean = username.replace(/\./g, "").toLowerCase();
  return tags
    .map((t) => t.trim())
    .filter((t) => t.length > 0)
    .map((tag) => `${clean}+${tag}@gmail.com`);
}

const PRESET_TAGS = [
  "shopping", "news", "social", "work", "finance",
  "newsletters", "gaming", "travel", "health", "edu",
  "promo", "support", "devs", "alerts", "personal",
  "spam", "marketing", "crypto", "food", "music",
];

/* ─────────────────────────────────────────────
   UTILITIES — EMAIL GENERATOR
───────────────────────────────────────────── */

const FIRST_NAMES = [
  "alex","jordan","taylor","morgan","riley","casey","skyler","quinn","drew","blake",
  "charlie","jamie","avery","devon","sage","parker","reese","finley","kennedy","peyton",
  "sam","max","hunter","brooke","hayden","cameron","logan","emerson","rowan","elliot",
  "james","oliver","emma","sophia","liam","noah","ava","mia","ethan","lucas",
  "aiden","caden","mason","isabella","harper","ella","lily","grace","chloe","zoey",
];

const LAST_NAMES = [
  "smith","johnson","williams","brown","jones","garcia","miller","davis","moore","taylor",
  "anderson","thomas","jackson","white","harris","martin","thompson","young","lee","walker",
  "hall","allen","wright","scott","green","baker","adams","nelson","hill","ramirez",
  "mitchell","carter","roberts","turner","phillips","campbell","parker","evans","edwards","collins",
];

const DOMAINS = [
  "gmail.com","yahoo.com","outlook.com","hotmail.com","protonmail.com",
  "icloud.com","mail.com","zoho.com","aol.com","yandex.com",
  "tutanota.com","fastmail.com","gmx.com","live.com","msn.com",
];

const GMAIL_ONLY = ["gmail.com"];

const WORDS = [
  "blue","red","dark","light","fast","cool","hot","bright","smart","quick",
  "sharp","soft","wild","bold","calm","deep","fresh","glow","prime","star",
  "peak","edge","wave","core","dash","flux","sync","volt","byte","echo",
];

/* ─────────────────────────────────────────────
   HOME TAB COMPONENT
───────────────────────────────────────────── */

function HomeTab({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const tools = [
    {
      id: "dot" as Tab,
      emoji: "🔴",
      title: "Dot Trick",
      subtitle: "Gmail Dot Trick Generator",
      desc: "Generate all possible dot-placement combinations for any Gmail address. One inbox, hundreds of unique addresses!",
      color: "red",
      bg: "from-red-500 to-red-600",
      shadow: "shadow-red-200",
      border: "border-red-100",
      bgLight: "bg-red-50",
      textColor: "text-red-700",
      badge: "2^(N-1) addresses",
      features: ["Instant generation", "Copy all", "Download .txt"],
    },
    {
      id: "alias" as Tab,
      emoji: "🔵",
      title: "Alias Generator",
      subtitle: "Gmail Alias +tag Generator",
      desc: "Create alias addresses using +tag to auto-sort your inbox. Perfect for filtering and tracking email sources.",
      color: "blue",
      bg: "from-blue-500 to-indigo-600",
      shadow: "shadow-blue-200",
      border: "border-blue-100",
      bgLight: "bg-blue-50",
      textColor: "text-blue-700",
      badge: "Unlimited aliases",
      features: ["20 preset tags", "Custom tags", "Auto-filtering"],
    },
    {
      id: "generator" as Tab,
      emoji: "🟢",
      title: "Email Generator",
      subtitle: "Fake & Temp Email Generator",
      desc: "Generate fake email addresses for testing and development. Multiple styles and up to 1000 addresses at once.",
      color: "green",
      bg: "from-green-500 to-emerald-600",
      shadow: "shadow-green-200",
      border: "border-green-100",
      bgLight: "bg-green-50",
      textColor: "text-green-700",
      badge: "Up to 1000 addresses",
      features: ["3 styles", "15 domains", "Custom domain"],
    },
    {
      id: "signature" as Tab,
      emoji: "✍️",
      title: "Signature Generator",
      subtitle: "Email Signature Maker",
      desc: "Design a professional email signature with ready-made templates, custom colors, and social media links.",
      color: "orange",
      bg: "from-orange-500 to-pink-500",
      shadow: "shadow-orange-200",
      border: "border-orange-100",
      bgLight: "bg-orange-50",
      textColor: "text-orange-700",
      badge: "5 pro templates",
      features: ["Live preview", "HTML export", "Custom colors"],
    },
  ];

  const stats = [
    { value: "500+", label: "Dot combinations", icon: "⚡" },
    { value: "20+", label: "Preset tags", icon: "🏷️" },
    { value: "15", label: "Email domains", icon: "🌐" },
    { value: "5", label: "Signature templates", icon: "✨" },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Choose a Tool",
      desc: "Select the tool that fits your need from the tabs above",
      icon: "🎯",
      color: "bg-red-100 text-red-600",
    },
    {
      step: "02",
      title: "Enter Your Data",
      desc: "Type your username or email address in the input field",
      icon: "✏️",
      color: "bg-blue-100 text-blue-600",
    },
    {
      step: "03",
      title: "Generate Results",
      desc: "Hit the generate button and get your results instantly",
      icon: "⚡",
      color: "bg-green-100 text-green-600",
    },
    {
      step: "04",
      title: "Copy or Download",
      desc: "Copy addresses individually or download them all as a text file",
      icon: "📋",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const useCases = [
    { icon: "🛡️", title: "Protect Your Privacy", desc: "Use different addresses for each website to shield your real inbox from spam" },
    { icon: "🧪", title: "Test Your App", desc: "Generate fake addresses to test registration forms and populate databases" },
    { icon: "📂", title: "Organize Your Inbox", desc: "Use aliases to auto-sort incoming messages with Gmail filters" },
    { icon: "💼", title: "Professional Signature", desc: "Create a polished email signature that reflects your professional identity" },
    { icon: "🔔", title: "Track Email Sources", desc: "Know who sells your data by assigning a unique alias to each website" },
    { icon: "🚀", title: "Accelerate Development", desc: "Speed up your dev cycle by generating realistic test data instantly" },
  ];

  return (
    <div className="space-y-10">
      {/* ── Hero Section ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8 sm:p-12 text-white text-center">
        {/* decorative blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-red-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-xs font-semibold text-white/80 border border-white/10 mb-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Free · No Sign-up · Privacy First
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Gmail <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">Tools</span>
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            Free Gmail utilities — Dot Trick · Alias Generator · Email Generator · Signature Maker
          </p>
          <p className="text-sm text-white/50">
            All processing happens locally in your browser — no data is ever sent to any server
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 max-w-lg mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur rounded-xl p-3 border border-white/10">
                <div className="text-xl font-black text-white">{s.value}</div>
                <div className="text-xs text-white/50 leading-tight mt-0.5">{s.label}</div>
                <div className="text-lg mt-1">{s.icon}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {tools.map((t) => (
              <button
                key={t.id}
                onClick={() => onNavigate(t.id)}
                className={`flex items-center gap-2 bg-gradient-to-r ${t.bg} px-4 py-2 rounded-xl text-white text-sm font-semibold shadow-lg ${t.shadow} hover:scale-105 active:scale-95 transition-all`}
              >
                <span>{t.emoji}</span>
                <span>{t.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tools Cards ── */}
      <div>
        <div className="text-center mb-6">
          <span className="inline-block bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full mb-2 tracking-widest uppercase">Tools</span>
          <h2 className="text-xl font-extrabold text-gray-800">4 Tools in One Place</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onNavigate(tool.id)}
              className={`text-left ${tool.bgLight} border ${tool.border} rounded-2xl p-5 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all group space-y-3`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className={`flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${tool.bg} shadow-md ${tool.shadow} text-white text-xl shrink-0`}>
                  {tool.emoji}
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full bg-white/70 ${tool.textColor} border ${tool.border}`}>
                  {tool.badge}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`font-extrabold text-base ${tool.textColor}`}>{tool.title}</h3>
                </div>
                <p className="text-xs text-gray-400 font-medium">{tool.subtitle}</p>
                <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{tool.desc}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tool.features.map((f) => (
                  <span key={f} className={`text-xs px-2 py-0.5 rounded-full bg-white/60 ${tool.textColor} font-medium border ${tool.border}`}>
                    ✓ {f}
                  </span>
                ))}
              </div>
              <div className={`flex items-center gap-1 ${tool.textColor} text-xs font-bold group-hover:gap-2 transition-all`}>
                <span>Get Started</span>
                <span>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── How It Works ── */}
      <div>
        <div className="text-center mb-6">
          <span className="inline-block bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full mb-2 tracking-widest uppercase">How It Works</span>
          <h2 className="text-xl font-extrabold text-gray-800">4 Simple Steps</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {howItWorks.map((step, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center space-y-3 hover:shadow-md transition-shadow">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${step.color} text-xl mx-auto`}>
                {step.icon}
              </div>
              <div className="text-xs font-black text-gray-300 tracking-widest">STEP {step.step}</div>
              <div className="font-bold text-sm text-gray-800">{step.title}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Use Cases ── */}
      <div>
        <div className="text-center mb-6">
          <span className="inline-block bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full mb-2 tracking-widest uppercase">Use Cases</span>
          <h2 className="text-xl font-extrabold text-gray-800">Why Use Gmail Tools?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {useCases.map((u, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex gap-3 items-start">
              <div className="text-2xl shrink-0">{u.icon}</div>
              <div>
                <div className="font-bold text-sm text-gray-800">{u.title}</div>
                <div className="text-xs text-gray-500 mt-1 leading-relaxed">{u.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Privacy Notice ── */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-6 flex gap-4 items-start">
        <div className="text-3xl shrink-0">🔒</div>
        <div className="space-y-1">
          <h3 className="font-extrabold text-green-800 text-sm">Your Privacy is 100% Protected</h3>
          <p className="text-xs text-green-700 leading-relaxed">
            All tools run entirely inside your browser — no email addresses or personal data are ever sent to any server. No registration, no cookies, no tracking.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {["No sign-up", "No cookies", "No ads", "Open source"].map(tag => (
              <span key={tag} className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">✓ {tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Home SEO Article ── */}
      <SEOArticle page="home" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   FAQ COMPONENT
───────────────────────────────────────────── */

const FAQ_ITEMS = [
  {
    category: "dot",
    color: "red",
    icon: "🔴",
    q: "What is the Gmail Dot Trick and how does it work?",
    a: "Gmail completely ignores dots in the username, meaning john.doe@gmail.com, johndoe@gmail.com, and j.o.h.n.d.o.e@gmail.com all arrive in the same inbox. This tool generates every possible dot-placement combination for your username.",
  },
  {
    category: "dot",
    color: "red",
    icon: "🔴",
    q: "How many addresses can be generated?",
    a: "The count equals 2^(N-1), where N is the number of characters in the username. For example, a 6-character name like 'gmail' produces 16 addresses, while a 10-character name yields 512. That's why we cap very long usernames.",
  },
  {
    category: "dot",
    color: "red",
    icon: "🔴",
    q: "Does the Dot Trick work with Outlook or Yahoo?",
    a: "No — this feature is exclusive to Gmail. Other email providers treat the dot as part of the username, so john.doe and johndoe are two completely separate accounts.",
  },
  {
    category: "alias",
    color: "blue",
    icon: "🔵",
    q: "What is the difference between an Alias (+tag) and the Dot Trick?",
    a: "An alias uses the + sign followed by a custom tag, such as yourname+shopping@gmail.com. The tag is visible in your inbox, making filtering easy. The Dot Trick produces addresses that look completely normal and are harder to identify as variants.",
  },
  {
    category: "alias",
    color: "blue",
    icon: "🔵",
    q: "Can some websites reject alias addresses?",
    a: "Yes — some sites block the + character in the email field. In that case, use the Dot Trick instead, since those addresses look like regular Gmail addresses.",
  },
  {
    category: "alias",
    color: "blue",
    icon: "🔵",
    q: "How do I use aliases to organize my inbox?",
    a: "Go to Gmail Settings → Filters and Blocked Addresses → Create a new filter. Enter the alias in the 'To' field, then choose an action like applying a label or skipping the inbox. Every message sent to yourname+shopping will be sorted automatically.",
  },
  {
    category: "generator",
    color: "green",
    icon: "🟢",
    q: "Are the generated addresses real and usable?",
    a: "No — addresses generated in the Email Generator section are fake and intended for testing and development purposes only. Do not use them to register on real websites or for any other purpose.",
  },
  {
    category: "generator",
    color: "green",
    icon: "🟢",
    q: "What are the main use cases for the Email Generator?",
    a: "It is used for: testing registration forms (Unit Tests), seeding databases with fake data (Seed DB), UI mockups, API testing, and demos that require realistic-looking data.",
  },
  {
    category: "generator",
    color: "green",
    icon: "🟢",
    q: "Can I use my own custom domain?",
    a: "Yes! The Email Generator has a 'Custom Domain' field where you can enter any domain, such as mycompany.com or test.dev, and all addresses will be generated with that domain.",
  },
  {
    category: "privacy",
    color: "purple",
    icon: "🟣",
    q: "Is my data safe when using these tools?",
    a: "Absolutely. All processing happens locally inside your browser (client-side only). No data is sent to any server, and there is no tracking or logging of anything you enter.",
  },
  {
    category: "privacy",
    color: "purple",
    icon: "🟣",
    q: "Does using these tools violate Gmail's terms of service?",
    a: "No. The Dot Trick and Alias are both official features documented by Google itself. The Email Generator produces fake data for testing and does not violate any policy as long as it is not used for harmful activities.",
  },
  {
    category: "privacy",
    color: "purple",
    icon: "🟣",
    q: "What is the best way to protect my inbox from spam?",
    a: "Use a different alias for every site you sign up for, such as yourname+amazon@gmail.com. If you receive spam on that address, you will immediately know where it came from, and you can block it with a single filter without affecting the rest of your mail.",
  },
];

type FAQItemProps = {
  q: string;
  a: string;
  icon: string;
  color: string;
  isOpen: boolean;
  onToggle: () => void;
};

function FAQItem({ q, a, icon, color, isOpen, onToggle }: FAQItemProps) {
  const borderMap: Record<string, string> = {
    red: "border-red-200 hover:border-red-400",
    blue: "border-blue-200 hover:border-blue-400",
    green: "border-green-200 hover:border-green-400",
    purple: "border-purple-200 hover:border-purple-400",
  };
  const bgMap: Record<string, string> = {
    red: "bg-red-50",
    blue: "bg-blue-50",
    green: "bg-green-50",
    purple: "bg-purple-50",
  };
  const textMap: Record<string, string> = {
    red: "text-red-700",
    blue: "text-blue-700",
    green: "text-green-700",
    purple: "text-purple-700",
  };
  const iconBgMap: Record<string, string> = {
    red: "bg-red-100",
    blue: "bg-blue-100",
    green: "bg-green-100",
    purple: "bg-purple-100",
  };

  return (
    <div
      className={`border-2 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${borderMap[color]} ${isOpen ? bgMap[color] : "bg-white"}`}
      onClick={onToggle}
    >
      <div className="flex items-center gap-3 p-4">
        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${iconBgMap[color]}`}>
          {icon}
        </span>
        <span className={`flex-1 font-bold text-sm leading-snug ${isOpen ? textMap[color] : "text-gray-700"}`}>
          {q}
        </span>
        <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${isOpen ? `${bgMap[color]} ${textMap[color]}` : "bg-gray-100 text-gray-400"}`}>
          {isOpen ? "−" : "+"}
        </span>
      </div>
      {isOpen && (
        <div className="px-4 pb-4 pt-0">
          <div className={`h-px w-full mb-3 ${color === "red" ? "bg-red-200" : color === "blue" ? "bg-blue-200" : color === "green" ? "bg-green-200" : "bg-purple-200"}`} />
          <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

const CATEGORY_FILTERS = [
  { key: "all", label: "All", icon: "✨" },
  { key: "dot", label: "Dot Trick", icon: "🔴" },
  { key: "alias", label: "Alias", icon: "🔵" },
  { key: "generator", label: "Generator", icon: "🟢" },
  { key: "privacy", label: "Security & Privacy", icon: "🟣" },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = FAQ_ITEMS.filter((item) => {
    const matchCat = activeCategory === "all" || item.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = q === "" || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setOpenIndex(null); }}
          className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none text-sm bg-white transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
          >✕</button>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {CATEGORY_FILTERS.map((cat) => (
          <button
            key={cat.key}
            onClick={() => { setActiveCategory(cat.key); setOpenIndex(null); }}
            className={`px-4 py-2 rounded-full text-xs font-bold border-2 transition-all duration-200 flex items-center gap-1.5
              ${activeCategory === cat.key
                ? "bg-purple-600 text-white border-purple-600 shadow-md scale-105"
                : "bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:text-purple-600"
              }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="text-center text-xs text-gray-400">
        {filtered.length} question{filtered.length !== 1 ? "s" : ""}
      </div>

      {/* FAQ Items */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-3">🤷</div>
          <p className="font-medium">No matching results</p>
          <p className="text-xs mt-1">Try a different search term or select another category</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item, idx) => (
            <FAQItem
              key={idx}
              q={item.q}
              a={item.a}
              icon={item.icon}
              color={item.color}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      )}

      {/* Expand All / Collapse All */}
      <div className="flex justify-center gap-3 pt-2">
        <button
          onClick={() => setOpenIndex(0)}
          className="text-xs text-purple-500 hover:text-purple-700 underline underline-offset-2"
        >
          Open first question
        </button>
        <span className="text-gray-300">|</span>
        <button
          onClick={() => setOpenIndex(null)}
          className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2"
        >
          Collapse all
        </button>
      </div>
    </div>
  );
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomEmail(opts: {
  style: "realistic" | "random" | "temp-gmail";
  domain: string;
  includeNumbers: boolean;
  includeWords: boolean;
}): string {
  const { style, domain, includeNumbers, includeWords } = opts;

  if (style === "temp-gmail") {
    const base = randomItem(FIRST_NAMES) + (Math.random() > 0.5 ? randomItem(LAST_NAMES) : randomInt(10, 999));
    const num = includeNumbers ? randomInt(1, 999) : "";
    const word = includeWords ? randomItem(WORDS) : "";
    const parts = [base, word, num].filter(Boolean).join(Math.random() > 0.5 ? "." : "");
    const tag = ["test","demo","temp","dev","qa","noreply","fake","sandbox"][randomInt(0, 7)];
    return `${parts}+${tag}@gmail.com`;
  }

  if (style === "realistic") {
    const first = randomItem(FIRST_NAMES);
    const last = randomItem(LAST_NAMES);
    const sep = randomItem([".", "_", ""]);
    const numSuffix = includeNumbers ? (Math.random() > 0.5 ? randomInt(1, 999) : "") : "";
    const username = `${first}${sep}${last}${numSuffix}`;
    return `${username}@${domain}`;
  }

  // random
  const word1 = includeWords ? randomItem(WORDS) : randomItem(FIRST_NAMES);
  const word2 = Math.random() > 0.5 ? randomItem(LAST_NAMES) : randomItem(WORDS);
  const num = includeNumbers ? randomInt(1, 9999) : "";
  const sep = randomItem([".", "_", "-", ""]);
  const username = [word1, word2, num].filter(Boolean).join(sep);
  return `${username}@${domain}`;
}

function generateBulkEmails(opts: {
  count: number;
  style: "realistic" | "random" | "temp-gmail";
  domain: string;
  includeNumbers: boolean;
  includeWords: boolean;
  noDuplicates: boolean;
}): string[] {
  const set = new Set<string>();
  const results: string[] = [];
  let attempts = 0;
  const maxAttempts = opts.count * 20;

  while (results.length < opts.count && attempts < maxAttempts) {
    attempts++;
    const email = generateRandomEmail(opts);
    if (opts.noDuplicates) {
      if (!set.has(email)) {
        set.add(email);
        results.push(email);
      }
    } else {
      results.push(email);
    }
  }
  return results;
}

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */

function CopyIcon({ className = "h-4 w-4" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ className = "h-4 w-4" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   SHARED EMAIL LIST COMPONENT
───────────────────────────────────────────── */

type AccentColor = "red" | "blue" | "green";

function EmailList({
  emails,
  accentColor,
  downloadName = "emails",
  label,
}: {
  emails: string[];
  accentColor: AccentColor;
  downloadName?: string;
  label?: string;
}) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [search, setSearch] = useState("");

  const palette = {
    red: {
      badge: "bg-red-100 text-red-600",
      hover: "hover:bg-red-50 hover:border-red-200",
      hoverText: "group-hover:text-red-700",
      hoverBtn: "hover:text-red-500 group-hover:text-red-400 hover:bg-red-100",
      copyAll: "border-gray-200 hover:bg-gray-50 text-gray-600",
      download: "bg-gray-900 hover:bg-gray-800 text-white",
      searchRing: "focus:ring-red-300",
      dot: "🔴",
      defaultLabel: "All these addresses deliver to the same inbox",
    },
    blue: {
      badge: "bg-blue-100 text-blue-600",
      hover: "hover:bg-blue-50 hover:border-blue-200",
      hoverText: "group-hover:text-blue-700",
      hoverBtn: "hover:text-blue-500 group-hover:text-blue-400 hover:bg-blue-100",
      copyAll: "border-blue-200 hover:bg-blue-50 text-blue-600",
      download: "bg-blue-600 hover:bg-blue-700 text-white",
      searchRing: "focus:ring-blue-300",
      dot: "🔵",
      defaultLabel: "All these aliases deliver to the same inbox",
    },
    green: {
      badge: "bg-green-100 text-green-700",
      hover: "hover:bg-green-50 hover:border-green-200",
      hoverText: "group-hover:text-green-700",
      hoverBtn: "hover:text-green-500 group-hover:text-green-400 hover:bg-green-100",
      copyAll: "border-green-200 hover:bg-green-50 text-green-700",
      download: "bg-green-600 hover:bg-green-700 text-white",
      searchRing: "focus:ring-green-300",
      dot: "🟢",
      defaultLabel: "Randomly generated email addresses",
    },
  };

  const accent = palette[accentColor];
  const filtered = emails.filter((e) => e.toLowerCase().includes(search.toLowerCase()));

  const handleCopy = (email: string, idx: number) => {
    navigator.clipboard.writeText(email);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(filtered.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([filtered.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${downloadName}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs text-gray-400 mt-0.5">
            <span className={`font-semibold text-sm ${accentColor === "red" ? "text-red-500" : accentColor === "blue" ? "text-blue-500" : "text-green-600"}`}>
              {emails.length.toLocaleString()}
            </span>{" "}
            addresses generated
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyAll}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border transition-colors ${accent.copyAll}`}
          >
            {copiedAll ? <CheckIcon /> : <CopyIcon />}
            {copiedAll ? "Copied!" : "Copy all"}
          </button>
          <button
            onClick={handleDownload}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg transition-colors ${accent.download}`}
          >
            <DownloadIcon />
            Download .txt
          </button>
        </div>
      </div>

      {/* Search */}
      {emails.length > 8 && (
        <div className="px-5 py-3 border-b border-gray-50 bg-gray-50/50">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <SearchIcon />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search results..."
              className={`w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 ${accent.searchRing} transition-all`}
              dir="ltr"
            />
            {search && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="p-4 max-h-[420px] overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-8 text-sm">No matching results</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filtered.map((email, idx) => (
              <div
                key={`${email}-${idx}`}
                className={`group flex items-center justify-between gap-2 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 transition-all ${accent.hover}`}
              >
                <span className={`font-mono text-sm text-gray-700 truncate transition-colors ${accent.hoverText}`}>
                  {email}
                </span>
                <button
                  onClick={() => handleCopy(email, idx)}
                  className={`shrink-0 text-gray-300 transition-colors p-1 rounded-lg ${accent.hoverBtn}`}
                  title="Copy"
                >
                  {copiedIndex === idx ? (
                    <span className="text-green-500"><CheckIcon /></span>
                  ) : (
                    <CopyIcon />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-gray-50/60 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
        <span>{accent.dot} {label ?? accent.defaultLabel}</span>
        <span className="font-mono">{filtered.length} / {emails.length}</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DOT TRICK TAB
───────────────────────────────────────────── */

function DotTrickTab() {
  const [input, setInput] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState("");

  const parseUsername = (raw: string) => {
    const trimmed = raw.trim();
    if (trimmed.includes("@")) {
      const parts = trimmed.split("@");
      if (parts[1].toLowerCase().includes("gmail")) return parts[0];
      return null;
    }
    return trimmed;
  };

  const handleGenerate = useCallback(() => {
    const username = parseUsername(input);
    if (!username) { setError("Please enter a valid Gmail address."); return; }
    const clean = username.replace(/\./g, "");
    if (clean.length < 2) { setError("Username must be at least 2 characters."); return; }
    if (clean.length > 14) { setError("Username is too long (maximum 14 characters)."); return; }
    if (!/^[a-zA-Z0-9.]+$/.test(username)) { setError("Username contains invalid characters."); return; }
    setError("");
    setEmails(generateDotTrickEmails(username));
    setGenerated(true);
  }, [input]);

  const username = parseUsername(input) || "";
  const clean = username.replace(/\./g, "");
  const expectedCount = clean.length > 1 ? 1 << (clean.length - 1) : 0;

  return (
    <div className="space-y-6">
      {/* Info */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex gap-4">
        <span className="text-red-400 mt-0.5 shrink-0 text-xl">💡</span>
        <div className="text-sm text-red-900 space-y-1 leading-relaxed">
          <p className="font-semibold">What is the Gmail Dot Trick?</p>
          <p className="text-red-700">
            Gmail ignores dots (.) in the username entirely, meaning{" "}
            <code className="bg-red-100 px-1.5 py-0.5 rounded text-xs font-mono">john.doe@gmail.com</code> and{" "}
            <code className="bg-red-100 px-1.5 py-0.5 rounded text-xs font-mono">johndoe@gmail.com</code>{" "}
            both land in the same inbox!
          </p>
          <p className="text-red-500 text-xs">🔹 For a username with N characters you get 2^(N-1) unique addresses.</p>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <label className="block text-sm font-semibold text-gray-700">
          Enter a Gmail address
        </label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(""); if (generated) setGenerated(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="e.g. johndoe or johndoe@gmail.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
              dir="ltr"
            />
            {input && clean.length > 1 && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full font-mono">
                  {expectedCount.toLocaleString()} results
                </span>
              </div>
            )}
          </div>
          <button
            onClick={handleGenerate}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md shadow-red-200 active:scale-95 whitespace-nowrap text-sm"
          >
            Generate ✨
          </button>
        </div>
        {error && <p className="text-red-500 text-sm flex items-center gap-1"><span>⚠️</span> {error}</p>}
      </div>

      {/* Results */}
      {generated && emails.length > 0 && (
        <EmailList emails={emails} accentColor="red" downloadName="gmail-dot-trick" />
      )}

      {/* Example */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-5 text-white shadow-lg shadow-red-200">
        <h3 className="font-bold mb-3">Quick Example</h3>
        <p className="text-red-100 text-sm mb-3">
          <code className="bg-white/20 px-2 py-0.5 rounded font-mono text-white">abc</code> (3 characters) = 4 addresses:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {["abc@gmail.com", "a.bc@gmail.com", "ab.c@gmail.com", "a.b.c@gmail.com"].map((e) => (
            <div key={e} className="bg-white/15 rounded-lg px-3 py-2 font-mono text-xs text-center border border-white/20">{e}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ALIAS GENERATOR TAB
───────────────────────────────────────────── */

function AliasTab() {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState<string[]>([...PRESET_TAGS.slice(0, 6)]);
  const [tagInput, setTagInput] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState("");

  const parseUsername = (raw: string) => {
    const trimmed = raw.trim();
    if (trimmed.includes("@")) {
      const parts = trimmed.split("@");
      if (parts[1].toLowerCase().includes("gmail")) return parts[0];
      return null;
    }
    return trimmed;
  };

  const addTag = (tag: string) => {
    const cleaned = tag.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-_]/g, "");
    if (!cleaned || tags.includes(cleaned)) return;
    setTags((prev) => [...prev, cleaned]);
    setTagInput("");
  };

  const removeTag = (tag: string) => setTags((prev) => prev.filter((t) => t !== tag));
  const clearAllTags = () => setTags([]);

  const addPreset = (tag: string) => {
    if (!tags.includes(tag)) setTags((prev) => [...prev, tag]);
  };

  const handleGenerate = useCallback(() => {
    const username = parseUsername(input);
    if (!username) { setError("Please enter a valid Gmail address."); return; }
    const clean = username.replace(/\./g, "");
    if (clean.length < 2) { setError("Username must be at least 2 characters."); return; }
    if (!/^[a-zA-Z0-9.]+$/.test(username)) { setError("Username contains invalid characters."); return; }
    if (tags.length === 0) { setError("Please add at least one tag."); return; }
    setError("");
    setEmails(generateAliasEmails(username, tags));
    setGenerated(true);
  }, [input, tags]);

  return (
    <div className="space-y-6">
      {/* Info */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-4">
        <span className="text-blue-400 mt-0.5 shrink-0 text-xl">💡</span>
        <div className="text-sm text-blue-900 space-y-1 leading-relaxed">
          <p className="font-semibold">What is a Gmail Alias?</p>
          <p className="text-blue-700">
            Add <code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs font-mono">+anytext</code> right after your username.
            For example: <code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs font-mono">johndoe+shopping@gmail.com</code> goes to the same inbox as <code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs font-mono">johndoe@gmail.com</code>.
          </p>
          <p className="text-blue-500 text-xs">🔹 Perfect for organizing your inbox and tracking where each email comes from.</p>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Enter a Gmail address
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(""); if (generated) setGenerated(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="e.g. johndoe@gmail.com"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
              dir="ltr"
            />
            <button
              onClick={handleGenerate}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md shadow-blue-200 active:scale-95 whitespace-nowrap text-sm"
            >
              Generate ✨
            </button>
          </div>
          {error && <p className="text-red-500 text-sm flex items-center gap-1"><span>⚠️</span> {error}</p>}
        </div>

        {/* Tags Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700">
              Tags
              <span className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full font-mono">{tags.length}</span>
            </label>
            {tags.length > 0 && (
              <button
                onClick={clearAllTags}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
              >
                <TrashIcon /> Clear all
              </button>
            )}
          </div>

          {/* Add custom tag */}
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { addTag(tagInput); } }}
              placeholder="Add a custom tag... (press Enter)"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
              dir="ltr"
            />
            <button
              onClick={() => addTag(tagInput)}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all active:scale-95"
            >
              <PlusIcon /> Add
            </button>
          </div>

          {/* Selected tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 bg-blue-50/60 rounded-xl border border-blue-100 min-h-[48px]">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-mono px-3 py-1.5 rounded-full"
                >
                  +{tag}
                  <button onClick={() => removeTag(tag)} className="hover:bg-blue-500 rounded-full p-0.5 transition-colors">
                    <XIcon />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Preset tags */}
          <div className="space-y-2">
            <p className="text-xs text-gray-400 font-medium">Preset tags — click to add:</p>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_TAGS.map((preset) => {
                const isAdded = tags.includes(preset);
                return (
                  <button
                    key={preset}
                    onClick={() => isAdded ? removeTag(preset) : addPreset(preset)}
                    className={`inline-flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-full border transition-all ${
                      isAdded
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  >
                    {isAdded ? <CheckIcon className="h-3 w-3" /> : <PlusIcon />}
                    {preset}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {generated && emails.length > 0 && (
        <EmailList emails={emails} accentColor="blue" downloadName="gmail-aliases" />
      )}

      {/* Use Cases */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
          <span className="text-lg">🎯</span> Usage Examples
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { tag: "shopping", desc: "Sign up for online stores" },
            { tag: "newsletter", desc: "Subscribe to email newsletters" },
            { tag: "work", desc: "Work and project correspondence" },
            { tag: "social", desc: "Social media platforms" },
            { tag: "promo", desc: "Deals and discount offers" },
            { tag: "alerts", desc: "System and app notifications" },
          ].map((item) => (
            <div key={item.tag} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
              <code className="text-xs font-mono bg-blue-100 text-blue-700 px-2 py-1 rounded-lg shrink-0">
                +{item.tag}
              </code>
              <span className="text-sm text-gray-600">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-5 text-white shadow-lg shadow-blue-200">
        <h3 className="font-bold mb-2">💡 Pro Tip</h3>
        <p className="text-blue-100 text-sm leading-relaxed">
          Combine aliases with Gmail filters to automatically sort your incoming messages.
          For example, every email sent to{" "}
          <code className="bg-white/20 px-2 py-0.5 rounded font-mono text-white">you+shopping@gmail.com</code>{" "}
          can be moved automatically to a "Shopping" folder 🛍️
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   EMAIL GENERATOR TAB
───────────────────────────────────────────── */

type GenStyle = "realistic" | "random" | "temp-gmail";

const STYLE_INFO: Record<GenStyle, { label: string; desc: string; emoji: string; color: string }> = {
  realistic: {
    label: "Realistic",
    desc: "Real names + domain",
    emoji: "👤",
    color: "border-green-400 bg-green-50 text-green-800",
  },
  random: {
    label: "Random",
    desc: "Random word combinations",
    emoji: "🎲",
    color: "border-purple-400 bg-purple-50 text-purple-800",
  },
  "temp-gmail": {
    label: "Temp Gmail",
    desc: "Temporary Gmail with +tag",
    emoji: "⏱️",
    color: "border-orange-400 bg-orange-50 text-orange-800",
  },
};

function EmailGeneratorTab() {
  const [count, setCount] = useState(20);
  const [style, setStyle] = useState<GenStyle>("realistic");
  const [domain, setDomain] = useState("gmail.com");
  const [customDomain, setCustomDomain] = useState("");
  const [useCustomDomain, setUseCustomDomain] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeWords, setIncludeWords] = useState(false);
  const [noDuplicates, setNoDuplicates] = useState(true);
  const [emails, setEmails] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState("");

  const effectiveDomain = style === "temp-gmail"
    ? "gmail.com"
    : useCustomDomain
      ? customDomain.trim()
      : domain;

  const handleGenerate = useCallback(() => {
    if (useCustomDomain && !customDomain.trim().includes(".")) {
      setError("Please enter a valid domain, e.g. example.com");
      return;
    }
    if (count < 1 || count > 1000) {
      setError("Count must be between 1 and 1000.");
      return;
    }
    setError("");
    const result = generateBulkEmails({
      count,
      style,
      domain: effectiveDomain,
      includeNumbers,
      includeWords,
      noDuplicates,
    });
    setEmails(result);
    setGenerated(true);
  }, [count, style, effectiveDomain, includeNumbers, includeWords, noDuplicates, useCustomDomain, customDomain]);

  const handleRegenerate = () => {
    setGenerated(false);
    setTimeout(() => {
      const result = generateBulkEmails({
        count,
        style,
        domain: effectiveDomain,
        includeNumbers,
        includeWords,
        noDuplicates,
      });
      setEmails(result);
      setGenerated(true);
    }, 50);
  };

  const DOMAIN_LIST = style === "temp-gmail" ? GMAIL_ONLY : DOMAINS;

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-green-50 border border-green-100 rounded-2xl p-5 flex gap-4">
        <span className="text-green-500 mt-0.5 shrink-0 text-xl">🧪</span>
        <div className="text-sm text-green-900 space-y-1 leading-relaxed">
          <p className="font-semibold">Random Email Address Generator</p>
          <p className="text-green-700">
            Generate fake and random email addresses for testing, development, and demo purposes.
            Do not use these addresses for any unlawful purpose.
          </p>
          <p className="text-green-600 text-xs">🔹 Use cases: Unit Tests · API Testing · Demo Data · Fake Accounts for Development</p>
        </div>
      </div>

      {/* Settings Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">

        {/* Style Selector */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Generation Style</label>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(STYLE_INFO) as GenStyle[]).map((s) => {
              const info = STYLE_INFO[s];
              const active = style === s;
              return (
                <button
                  key={s}
                  onClick={() => { setStyle(s); setGenerated(false); }}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-center ${
                    active
                      ? info.color + " border-current shadow-sm"
                      : "border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-xl">{info.emoji}</span>
                  <span className="text-xs font-bold">{info.label}</span>
                  <span className="text-xs opacity-70 leading-tight">{info.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Count */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Number of addresses
            <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-mono">{count}</span>
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={500}
              value={count}
              onChange={(e) => { setCount(Number(e.target.value)); setGenerated(false); }}
              className="flex-1 accent-green-500"
            />
            <input
              type="number"
              min={1}
              max={1000}
              value={count}
              onChange={(e) => { setCount(Number(e.target.value)); setGenerated(false); }}
              className="w-20 border border-gray-200 rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[10, 25, 50, 100, 200, 500].map((n) => (
              <button
                key={n}
                onClick={() => { setCount(n); setGenerated(false); }}
                className={`text-xs px-3 py-1 rounded-full border transition-all font-mono ${
                  count === n
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-gray-500 border-gray-200 hover:border-green-300 hover:text-green-700"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Domain */}
        {style !== "temp-gmail" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-700">Domain</label>
              <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={useCustomDomain}
                  onChange={(e) => { setUseCustomDomain(e.target.checked); setGenerated(false); }}
                  className="accent-green-600 w-4 h-4"
                />
                Custom domain
              </label>
            </div>
            {useCustomDomain ? (
              <input
                type="text"
                value={customDomain}
                onChange={(e) => { setCustomDomain(e.target.value); setGenerated(false); }}
                placeholder="example.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
                dir="ltr"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {DOMAIN_LIST.map((d) => (
                  <button
                    key={d}
                    onClick={() => { setDomain(d); setGenerated(false); }}
                    className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all ${
                      domain === d
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white text-gray-500 border-gray-200 hover:border-green-300 hover:text-green-700"
                    }`}
                  >
                    @{d}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Options */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Options</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Include numbers", desc: "e.g. john99", val: includeNumbers, set: setIncludeNumbers },
              { label: "Include words", desc: "e.g. bluejohn", val: includeWords, set: setIncludeWords },
              { label: "No duplicates", desc: "Unique addresses only", val: noDuplicates, set: setNoDuplicates },
            ].map((opt) => (
              <label
                key={opt.label}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all select-none ${
                  opt.val ? "border-green-300 bg-green-50" : "border-gray-100 bg-gray-50 hover:border-gray-200"
                }`}
              >
                <input
                  type="checkbox"
                  checked={opt.val}
                  onChange={(e) => { opt.set(e.target.checked); setGenerated(false); }}
                  className="accent-green-600 w-4 h-4 mt-0.5 shrink-0"
                />
                <div>
                  <p className={`text-sm font-medium ${opt.val ? "text-green-800" : "text-gray-600"}`}>{opt.label}</p>
                  <p className="text-xs text-gray-400">{opt.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex gap-3">
          <button
            onClick={handleGenerate}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-green-200 active:scale-95 text-sm flex items-center justify-center gap-2"
          >
            <span>✨</span>
            Generate {count.toLocaleString()} addresses
          </button>
          {generated && (
            <button
              onClick={handleRegenerate}
              title="Regenerate"
              className="bg-white border border-green-200 hover:bg-green-50 text-green-700 px-4 py-3 rounded-xl transition-all active:scale-95 flex items-center gap-1.5 text-sm font-medium"
            >
              <RefreshIcon />
              New
            </button>
          )}
        </div>
        {error && <p className="text-red-500 text-sm flex items-center gap-1"><span>⚠️</span> {error}</p>}
      </div>

      {/* Results */}
      {generated && emails.length > 0 && (
        <EmailList
          emails={emails}
          accentColor="green"
          downloadName="random-emails"
          label="Generated addresses for testing — for development use only"
        />
      )}

      {/* Use Cases */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3">
          <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
            <span className="text-base">🛠️</span> Use Cases
          </h3>
          <div className="space-y-2">
            {[
              { icon: "🧪", label: "Unit & Integration Testing" },
              { icon: "🗄️", label: "Seed Database with Fake Data" },
              { icon: "🎨", label: "UI/UX Design Mockups" },
              { icon: "📊", label: "Demo & Presentation Data" },
              { icon: "🤖", label: "API Load Testing" },
              { icon: "📝", label: "Form Validation Testing" },
            ].map((u) => (
              <div key={u.label} className="flex items-center gap-2 text-sm text-gray-600">
                <span>{u.icon}</span>
                <span>{u.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3">
          <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
            <span className="text-base">📋</span> Generation Styles
          </h3>
          <div className="space-y-2.5">
            {[
              { style: "👤 Realistic", example: "james.smith47@gmail.com" },
              { style: "🎲 Random", example: "bluewave-echo91@yahoo.com" },
              { style: "⏱️ Temp Gmail", example: "john99+temp@gmail.com" },
            ].map((p) => (
              <div key={p.style} className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs font-semibold text-gray-500 mb-1">{p.style}</p>
                <code className="text-xs font-mono text-gray-700">{p.example}</code>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
        <span className="text-amber-500 shrink-0 text-lg">⚠️</span>
        <div className="text-sm text-amber-800 leading-relaxed">
          <p className="font-semibold mb-1">Important Notice</p>
          <p>These addresses are randomly generated and may coincidentally match real addresses. Use them only in development and testing environments. Do not use them to send unsolicited messages or for any illegal purpose.</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   EMAIL SIGNATURE GENERATOR
───────────────────────────────────────────── */

type SignatureTemplate = "modern" | "classic" | "minimal" | "bold" | "creative";

type SignatureData = {
  fullName: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  linkedin: string;
  twitter: string;
  github: string;
  instagram: string;
  avatar: string;
  primaryColor: string;
  template: SignatureTemplate;
};

const DEFAULT_SIG: SignatureData = {
  fullName: "Jane Smith",
  jobTitle: "Software Engineer",
  company: "Tech Corp",
  email: "jane@example.com",
  phone: "+1 (555) 123-4567",
  website: "www.example.com",
  address: "San Francisco, CA",
  linkedin: "linkedin.com/in/janesmith",
  twitter: "@jane_dev",
  github: "github.com/janesmith",
  instagram: "@jane.design",
  avatar: "",
  primaryColor: "#3B82F6",
  template: "modern",
};

const TEMPLATE_DEFS: { id: SignatureTemplate; label: string; desc: string; emoji: string }[] = [
  { id: "modern",   label: "Modern",   desc: "Sleek design with colored sidebar",  emoji: "🎨" },
  { id: "classic",  label: "Classic",  desc: "Classic and professional",           emoji: "🏢" },
  { id: "minimal",  label: "Minimal",  desc: "Clean and simple",                   emoji: "✨" },
  { id: "bold",     label: "Bold",     desc: "Bold heavy-weight style",            emoji: "💪" },
  { id: "creative", label: "Creative", desc: "Creative gradient with color icons", emoji: "🌈" },
];

const COLOR_PRESETS = [
  "#3B82F6","#EF4444","#10B981","#8B5CF6","#F59E0B",
  "#EC4899","#06B6D4","#84CC16","#F97316","#6366F1",
  "#14B8A6","#E11D48","#0EA5E9","#D97706","#7C3AED",
];

function buildSignatureHTML(d: SignatureData): string {
  const c = d.primaryColor || "#3B82F6";
  const socials = [
    d.linkedin  && `<a href="https://${d.linkedin}"  style="text-decoration:none;color:${c};font-size:11px;margin-right:10px">LinkedIn</a>`,
    d.twitter   && `<a href="https://twitter.com/${d.twitter.replace("@","")}" style="text-decoration:none;color:${c};font-size:11px;margin-right:10px">Twitter/X</a>`,
    d.github    && `<a href="https://${d.github}"   style="text-decoration:none;color:${c};font-size:11px;margin-right:10px">GitHub</a>`,
    d.instagram && `<a href="https://instagram.com/${d.instagram.replace("@","")}" style="text-decoration:none;color:${c};font-size:11px;margin-right:10px">Instagram</a>`,
  ].filter(Boolean).join("");

  const avatarBlock = d.avatar
    ? `<img src="${d.avatar}" style="width:60px;height:60px;border-radius:50%;object-fit:cover;margin-right:14px;border:2px solid ${c}" />`
    : "";

  if (d.template === "modern") {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:480px">
  <tr>
    <td style="border-left:4px solid ${c};padding-left:14px">
      <table cellpadding="0" cellspacing="0">
        <tr>
          ${d.avatar ? `<td style="vertical-align:top;padding-right:14px">${avatarBlock}</td>` : ""}
          <td style="vertical-align:top">
            <div style="font-size:16px;font-weight:700;color:#111;margin-bottom:2px">${d.fullName || "Your Full Name"}</div>
            ${d.jobTitle ? `<div style="font-size:12px;color:${c};font-weight:600;margin-bottom:6px">${d.jobTitle}${d.company ? " · " + d.company : ""}</div>` : ""}
            <table cellpadding="0" cellspacing="0" style="font-size:12px;color:#555">
              ${d.email   ? `<tr><td style="padding:1px 0">📧</td><td style="padding:1px 0 1px 6px"><a href="mailto:${d.email}" style="color:#555;text-decoration:none">${d.email}</a></td></tr>` : ""}
              ${d.phone   ? `<tr><td style="padding:1px 0">📞</td><td style="padding:1px 0 1px 6px">${d.phone}</td></tr>` : ""}
              ${d.website ? `<tr><td style="padding:1px 0">🌐</td><td style="padding:1px 0 1px 6px"><a href="https://${d.website}" style="color:${c};text-decoration:none">${d.website}</a></td></tr>` : ""}
              ${d.address ? `<tr><td style="padding:1px 0">📍</td><td style="padding:1px 0 1px 6px">${d.address}</td></tr>` : ""}
            </table>
            ${socials ? `<div style="margin-top:8px;border-top:1px solid #eee;padding-top:6px">${socials}</div>` : ""}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
  }

  if (d.template === "classic") {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Georgia,serif;max-width:480px;border-top:2px solid ${c};padding-top:10px">
  <tr>
    ${d.avatar ? `<td style="vertical-align:top;padding-right:14px">${avatarBlock}</td>` : ""}
    <td style="vertical-align:top">
      <div style="font-size:17px;font-weight:bold;color:#1a1a1a">${d.fullName || "Your Full Name"}</div>
      ${d.jobTitle ? `<div style="font-size:12px;color:#666;font-style:italic;margin:2px 0 8px">${d.jobTitle}${d.company ? " | " + d.company : ""}</div>` : ""}
      <div style="font-size:12px;color:#444;line-height:1.8">
        ${d.email   ? `📧 <a href="mailto:${d.email}" style="color:#444;text-decoration:none">${d.email}</a><br>` : ""}
        ${d.phone   ? `📞 ${d.phone}<br>` : ""}
        ${d.website ? `🌐 <a href="https://${d.website}" style="color:${c};text-decoration:none">${d.website}</a><br>` : ""}
        ${d.address ? `📍 ${d.address}` : ""}
      </div>
      ${socials ? `<div style="margin-top:8px;font-size:12px">${socials}</div>` : ""}
    </td>
  </tr>
  <tr><td colspan="2"><div style="margin-top:10px;height:1px;background:${c};opacity:0.3"></div></td></tr>
</table>`;
  }

  if (d.template === "minimal") {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:400px">
  <tr>
    <td>
      <span style="font-size:15px;font-weight:700;color:#222">${d.fullName || "Your Full Name"}</span>
      ${d.jobTitle ? `<span style="font-size:12px;color:#999;margin-left:8px"> / ${d.jobTitle}${d.company ? ", " + d.company : ""}</span>` : ""}
      <br>
      <div style="margin-top:5px;font-size:12px;color:#666">
        ${[
          d.email   && `<a href="mailto:${d.email}" style="color:${c};text-decoration:none">${d.email}</a>`,
          d.phone   && `<span>${d.phone}</span>`,
          d.website && `<a href="https://${d.website}" style="color:${c};text-decoration:none">${d.website}</a>`,
        ].filter(Boolean).join(' <span style="color:#ddd">|</span> ')}
      </div>
      ${socials ? `<div style="margin-top:5px">${socials}</div>` : ""}
    </td>
  </tr>
</table>`;
  }

  if (d.template === "bold") {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:500px;background:#f8f9fa;border-radius:8px;padding:16px">
  <tr>
    ${d.avatar ? `<td style="vertical-align:middle;padding-right:16px">${avatarBlock}</td>` : ""}
    <td style="vertical-align:middle">
      <div style="font-size:20px;font-weight:900;color:${c};letter-spacing:-0.5px">${d.fullName || "Your Full Name"}</div>
      ${d.jobTitle ? `<div style="font-size:13px;font-weight:700;color:#333;margin-bottom:8px;text-transform:uppercase;letter-spacing:1px">${d.jobTitle}${d.company ? " · " + d.company : ""}</div>` : ""}
      <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:12px;color:#555">
        ${d.email   ? `<span>📧 <a href="mailto:${d.email}" style="color:#555;text-decoration:none">${d.email}</a></span>` : ""}
        ${d.phone   ? `<span>📞 ${d.phone}</span>` : ""}
        ${d.website ? `<span>🌐 <a href="https://${d.website}" style="color:${c};text-decoration:none">${d.website}</a></span>` : ""}
      </div>
      ${socials ? `<div style="margin-top:8px">${socials}</div>` : ""}
    </td>
  </tr>
</table>`;
  }

  // creative
  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:500px">
  <tr>
    <td style="background:linear-gradient(135deg,${c}22,${c}08);border-radius:12px;padding:16px;border:1px solid ${c}33">
      <table cellpadding="0" cellspacing="0" width="100%">
        <tr>
          ${d.avatar ? `<td style="vertical-align:top;width:70px">${avatarBlock}</td>` : ""}
          <td style="vertical-align:top">
            <div style="font-size:18px;font-weight:800;color:${c}">${d.fullName || "Your Full Name"}</div>
            ${d.jobTitle ? `<div style="font-size:12px;color:#666;margin:3px 0 10px;font-weight:600">${d.jobTitle}${d.company ? " · " + d.company : ""}</div>` : ""}
            <table cellpadding="0" cellspacing="1" style="font-size:12px">
              ${d.email   ? `<tr><td><span style="background:${c};color:#fff;border-radius:4px;padding:1px 6px;font-size:10px">EMAIL</span></td><td style="padding:1px 0 1px 8px"><a href="mailto:${d.email}" style="color:#444;text-decoration:none">${d.email}</a></td></tr>` : ""}
              ${d.phone   ? `<tr><td><span style="background:${c};color:#fff;border-radius:4px;padding:1px 6px;font-size:10px">PHONE</span></td><td style="padding:1px 0 1px 8px">${d.phone}</td></tr>` : ""}
              ${d.website ? `<tr><td><span style="background:${c};color:#fff;border-radius:4px;padding:1px 6px;font-size:10px">WEB</span></td><td style="padding:1px 0 1px 8px"><a href="https://${d.website}" style="color:${c};text-decoration:none">${d.website}</a></td></tr>` : ""}
              ${d.address ? `<tr><td><span style="background:${c};color:#fff;border-radius:4px;padding:1px 6px;font-size:10px">ADDR</span></td><td style="padding:1px 0 1px 8px;color:#666">${d.address}</td></tr>` : ""}
            </table>
            ${socials ? `<div style="margin-top:10px;padding-top:8px;border-top:1px dashed ${c}55">${socials}</div>` : ""}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function SignaturePreview({ data }: { data: SignatureData }) {
  return (
    <div
      className="bg-white rounded-xl border border-gray-200 p-5 overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: buildSignatureHTML(data) }}
    />
  );
}

function SignatureGeneratorTab() {
  const [data, setData] = useState<SignatureData>({ ...DEFAULT_SIG });
  const [copiedHTML, setCopiedHTML] = useState(false);
  const [copiedRich, setCopiedRich]  = useState(false);
  const [activeSection, setActiveSection] = useState<"personal"|"contact"|"social"|"style">("personal");

  const set = (field: keyof SignatureData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData((prev) => ({ ...prev, [field]: e.target.value }));

  const html = buildSignatureHTML(data);

  const handleCopyHTML = () => {
    navigator.clipboard.writeText(html);
    setCopiedHTML(true);
    setTimeout(() => setCopiedHTML(false), 2000);
  };

  const handleCopyRich = async () => {
    try {
      const blob = new Blob([html], { type: "text/html" });
      const item = new ClipboardItem({ "text/html": blob });
      await navigator.clipboard.write([item]);
      setCopiedRich(true);
      setTimeout(() => setCopiedRich(false), 2000);
    } catch {
      handleCopyHTML();
    }
  };

  const handleDownload = () => {
    const full = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Email Signature</title></head><body style="margin:20px">${html}</body></html>`;
    const blob = new Blob([full], { type: "text/html" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "email-signature.html"; a.click();
    URL.revokeObjectURL(url);
  };

  const SECTIONS = [
    { id: "personal", label: "Personal Info", emoji: "👤" },
    { id: "contact",  label: "Contact",       emoji: "📞" },
    { id: "social",   label: "Social Media",  emoji: "🔗" },
    { id: "style",    label: "Design",        emoji: "🎨" },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Info */}
      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 flex gap-4">
        <span className="text-orange-400 mt-0.5 shrink-0 text-xl">✍️</span>
        <div className="text-sm text-orange-900 space-y-1 leading-relaxed">
          <p className="font-semibold">Email Signature Generator</p>
          <p className="text-orange-700">
            Create a professional email signature in seconds. Choose a template, enter your details, and get a ready-to-paste HTML code for any email client.
          </p>
          <p className="text-orange-500 text-xs">🔹 Supports Gmail · Outlook · Apple Mail · Yahoo Mail and all major email clients</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT — Form */}
        <div className="space-y-4">
          {/* Section Tabs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5 grid grid-cols-4 gap-1">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex flex-col items-center gap-0.5 py-2 px-1 rounded-xl text-center transition-all ${
                  activeSection === s.id
                    ? "bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-sm"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="text-base">{s.emoji}</span>
                <span className="text-xs font-medium leading-tight">{s.label}</span>
              </button>
            ))}
          </div>

          {/* Form Fields */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">

            {/* Personal */}
            {activeSection === "personal" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">👤 Personal Information</h3>
                {[
                  { field: "fullName", label: "Full Name *",        ph: "Jane Smith",        icon: "👤" },
                  { field: "jobTitle", label: "Job Title",          ph: "Software Engineer", icon: "💼" },
                  { field: "company",  label: "Company / Organization", ph: "Tech Corp",     icon: "🏢" },
                ].map((f) => (
                  <div key={f.field} className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600">{f.label}</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">{f.icon}</span>
                      <input
                        type="text"
                        value={data[f.field as keyof SignatureData] as string}
                        onChange={set(f.field as keyof SignatureData)}
                        placeholder={f.ph}
                        className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50 focus:bg-white transition-all"
                        dir="ltr"
                      />
                    </div>
                  </div>
                ))}
                {/* Avatar URL */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">Profile Photo URL (optional)</label>
                  <input
                    type="text"
                    value={data.avatar}
                    onChange={set("avatar")}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50 focus:bg-white transition-all"
                    dir="ltr"
                  />
                  {data.avatar && (
                    <div className="flex items-center gap-2 mt-1">
                      <img src={data.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover border-2 border-orange-200" onError={(e) => (e.currentTarget.style.display = "none")} />
                      <span className="text-xs text-gray-400">Photo preview</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Contact */}
            {activeSection === "contact" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">📞 Contact Information</h3>
                {[
                  { field: "email",   label: "Email Address",  ph: "jane@example.com",       icon: "📧" },
                  { field: "phone",   label: "Phone Number",   ph: "+1 (555) 123-4567",       icon: "📞" },
                  { field: "website", label: "Website",        ph: "www.example.com",          icon: "🌐" },
                  { field: "address", label: "Address",        ph: "San Francisco, CA",        icon: "📍" },
                ].map((f) => (
                  <div key={f.field} className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600">{f.label}</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">{f.icon}</span>
                      <input
                        type="text"
                        value={data[f.field as keyof SignatureData] as string}
                        onChange={set(f.field as keyof SignatureData)}
                        placeholder={f.ph}
                        className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50 focus:bg-white transition-all"
                        dir="ltr"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Social */}
            {activeSection === "social" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">🔗 Social Media Links</h3>
                {[
                  { field: "linkedin",  label: "LinkedIn",   ph: "linkedin.com/in/username", icon: "💼", color: "text-blue-600" },
                  { field: "twitter",   label: "Twitter / X", ph: "@username",               icon: "🐦", color: "text-sky-500" },
                  { field: "github",    label: "GitHub",     ph: "github.com/username",      icon: "🐙", color: "text-gray-700" },
                  { field: "instagram", label: "Instagram",  ph: "@username",                icon: "📸", color: "text-pink-500" },
                ].map((f) => (
                  <div key={f.field} className="space-y-1.5">
                    <label className={`text-xs font-semibold ${f.color}`}>{f.icon} {f.label}</label>
                    <input
                      type="text"
                      value={data[f.field as keyof SignatureData] as string}
                      onChange={set(f.field as keyof SignatureData)}
                      placeholder={f.ph}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50 focus:bg-white transition-all"
                      dir="ltr"
                    />
                  </div>
                ))}
                <div className="bg-blue-50 rounded-xl p-3 text-xs text-blue-700">
                  <span className="font-semibold">💡 Tip:</span> Leave a field empty if you don't want it shown in the signature.
                </div>
              </div>
            )}

            {/* Style */}
            {activeSection === "style" && (
              <div className="space-y-5">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">🎨 Design & Colors</h3>

                {/* Template */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600">Template</label>
                  <div className="grid grid-cols-1 gap-2">
                    {TEMPLATE_DEFS.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setData((p) => ({ ...p, template: t.id }))}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                          data.template === t.id
                            ? "border-orange-400 bg-orange-50 text-orange-800"
                            : "border-gray-100 bg-gray-50 text-gray-500 hover:border-orange-200"
                        }`}
                      >
                        <span className="text-xl">{t.emoji}</span>
                        <div>
                          <p className="text-sm font-bold">{t.label}</p>
                          <p className="text-xs opacity-70">{t.desc}</p>
                        </div>
                        {data.template === t.id && (
                          <span className="ml-auto text-orange-500 text-xs font-bold">✓ Selected</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600">Primary Color</label>
                  <div className="flex flex-wrap gap-2">
                    {COLOR_PRESETS.map((clr) => (
                      <button
                        key={clr}
                        onClick={() => setData((p) => ({ ...p, primaryColor: clr }))}
                        style={{ backgroundColor: clr }}
                        className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                          data.primaryColor === clr ? "border-white ring-2 ring-gray-400 scale-110" : "border-white/60"
                        }`}
                        title={clr}
                      />
                    ))}
                    <div className="relative">
                      <input
                        type="color"
                        value={data.primaryColor}
                        onChange={(e) => setData((p) => ({ ...p, primaryColor: e.target.value }))}
                        className="w-8 h-8 rounded-full border-2 border-gray-200 cursor-pointer opacity-0 absolute inset-0"
                      />
                      <div
                        style={{ backgroundColor: data.primaryColor }}
                        className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-white text-xs font-bold pointer-events-none"
                      >+</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-5 h-5 rounded-full border border-gray-200" style={{ backgroundColor: data.primaryColor }} />
                    <span className="text-xs font-mono text-gray-500">{data.primaryColor}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Preview + Actions */}
        <div className="space-y-4">
          {/* Preview */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
              <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <span>👁️</span> Live Preview
              </span>
              <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium">
                {TEMPLATE_DEFS.find(t => t.id === data.template)?.emoji} {TEMPLATE_DEFS.find(t => t.id === data.template)?.label}
              </span>
            </div>
            {/* Simulated email header */}
            <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 text-xs text-gray-400 space-y-1">
              <div className="flex gap-2"><span className="w-10 shrink-0 font-medium text-gray-500">From:</span><span>{data.email || "jane@example.com"}</span></div>
              <div className="flex gap-2"><span className="w-10 shrink-0 font-medium text-gray-500">To:</span><span>recipient@example.com</span></div>
              <div className="flex gap-2"><span className="w-10 shrink-0 font-medium text-gray-500">Subj:</span><span>Email with professional signature</span></div>
            </div>
            <div className="p-5">
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Dear Team,<br />
                Please find the attached report for your review. Let me know if you have any questions.<br /><br />
                Best regards,
              </p>
              <div className="border-t border-gray-100 pt-4">
                <SignaturePreview data={data} />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
            <h3 className="text-sm font-bold text-gray-700">📋 Export Signature</h3>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={handleCopyRich}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-orange-200 active:scale-95 text-sm"
              >
                {copiedRich ? <CheckIcon /> : <CopyIcon />}
                {copiedRich ? "✅ Copied! Paste into your email client" : "📋 Copy Signature (Rich Text)"}
              </button>
              <button
                onClick={handleCopyHTML}
                className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2.5 rounded-xl transition-all active:scale-95 text-sm"
              >
                {copiedHTML ? <CheckIcon /> : <CopyIcon />}
                {copiedHTML ? "✅ HTML Copied!" : "🧑‍💻 Copy HTML Code"}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-gray-700 font-semibold py-2.5 rounded-xl transition-all active:scale-95 text-sm"
              >
                <DownloadIcon />
                Download HTML File
              </button>
            </div>
          </div>

          {/* How to use */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2"><span>📖</span> How to Add to Your Email Client</h3>
            <div className="space-y-2">
              {[
                { icon: "📧", app: "Gmail",      steps: "Settings → See all settings → General → Signature" },
                { icon: "📮", app: "Outlook",    steps: "File → Options → Mail → Signatures" },
                { icon: "🍎", app: "Apple Mail", steps: "Mail → Settings → Signatures" },
                { icon: "📬", app: "Yahoo Mail", steps: "Settings → More Settings → Writing email → Signature" },
              ].map((item) => (
                <div key={item.app} className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{item.icon}</span>
                    <span className="text-xs font-bold text-gray-700">{item.app}</span>
                  </div>
                  <p className="text-xs text-gray-500 font-mono">{item.steps}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: "🎯", title: "Keep It Concise", desc: "Don't overload your signature. Name, title, email, and phone are usually enough." },
          { icon: "📱", title: "Think Mobile", desc: "Many people read email on their phone. Choose a template that looks great on small screens." },
          { icon: "🎨", title: "Match Your Brand Colors", desc: "Pick a color that aligns with your company or personal brand for a consistent, professional look." },
        ].map((tip) => (
          <div key={tip.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="text-2xl mb-2">{tip.icon}</div>
            <h4 className="text-sm font-bold text-gray-800 mb-1">{tip.title}</h4>
            <p className="text-xs text-gray-500 leading-relaxed">{tip.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */

type Tab = "home" | "dot" | "alias" | "generator" | "signature";

/* ── Per-page SEO wrapper ── */
function PageSEO({ tab }: { tab: Tab }) {
  const cfg = SEO_CONFIG[tab];
  useSEO({
    title: cfg.title,
    description: cfg.description,
    canonical: cfg.canonical,
    faqSchema: cfg.faqSchema,
  });
  return null;
}

export function App() {
  const [activeTab, setActiveTab] = useHashRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 font-sans flex flex-col">

      {/* ── Per-page SEO (title, meta, JSON-LD) ── */}
      <PageSEO tab={activeTab} />

      {/* ── Header ── */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-5xl mx-auto w-full px-4 py-8 space-y-6 flex-1">

        {/* ── H1 (visually hidden for non-home pages, visible on home) ── */}
        {activeTab !== "home" && (
          <h1 className="sr-only">{SEO_CONFIG[activeTab].h1}</h1>
        )}

        {/* Tab Content */}
        <div>
          {activeTab === "home"      && <HomeTab onNavigate={setActiveTab} />}
          {activeTab === "dot"       && <DotTrickTab />}
          {activeTab === "alias"     && <AliasTab />}
          {activeTab === "generator" && <EmailGeneratorTab />}
          {activeTab === "signature" && <SignatureGeneratorTab />}
        </div>

        {/* ── SEO Article (below tool, above comparison) ── */}
        {activeTab !== "home" && (
          <section aria-label="About this tool" className="space-y-0">
            <SEOArticle page={activeTab} />
          </section>
        )}

        {/* Comparison Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4" id="comparison">
          <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
            <span className="text-lg">⚡</span> Comparison: All 4 Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-red-50 rounded-xl p-4 border border-red-100 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-sm font-bold text-red-700">Dot Trick</span>
              </div>
              <ul className="text-xs text-red-600 space-y-1 leading-relaxed">
                <li>• Generates 2^(N-1) addresses</li>
                <li>• Dots are invisible to Gmail</li>
                <li>• Addresses look "normal"</li>
                <li>• Hard to track or identify</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-sm font-bold text-blue-700">Alias (+tag)</span>
              </div>
              <ul className="text-xs text-blue-600 space-y-1 leading-relaxed">
                <li>• Unlimited aliases</li>
                <li>• Easy to create and remember</li>
                <li>• Perfect for inbox filtering</li>
                <li>• Tag is visible in the address</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-100 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm font-bold text-green-700">Email Generator</span>
              </div>
              <ul className="text-xs text-green-600 space-y-1 leading-relaxed">
                <li>• Fake addresses for testing</li>
                <li>• Multiple styles and domains</li>
                <li>• Supports up to 1,000 addresses</li>
                <li>• For development use only</li>
              </ul>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                <span className="text-sm font-bold text-orange-700">Signature</span>
              </div>
              <ul className="text-xs text-orange-600 space-y-1 leading-relaxed">
                <li>• 5 professional templates</li>
                <li>• Live preview</li>
                <li>• Custom colors & photos</li>
                <li>• Ready-to-use HTML export</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section>
          <div className="text-center mb-8">
            <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-widest uppercase">FAQ</span>
            <h2 className="text-2xl font-extrabold text-gray-800">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-sm mt-1">Everything you need to know about Gmail Tools</p>
          </div>
          <FAQSection />
        </section>

      </main>

      {/* ── Footer ── */}
      <Footer onNavigate={setActiveTab} />

    </div>
  );
}

export default App;
