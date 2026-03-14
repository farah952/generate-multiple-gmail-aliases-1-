interface Props {
  page: "home" | "dot" | "alias" | "generator" | "signature";
}

export default function SEOArticle({ page }: Props) {
  if (page === "home") return <HomeArticle />;
  if (page === "dot") return <DotArticle />;
  if (page === "alias") return <AliasArticle />;
  if (page === "generator") return <GeneratorArticle />;
  if (page === "signature") return <SignatureArticle />;
  return null;
}

/* ── shared styles ── */
const h2 = "text-xl font-extrabold text-gray-900 mt-8 mb-3";
const h3 = "text-base font-bold text-gray-800 mt-5 mb-2";
const p = "text-gray-600 leading-relaxed text-sm mb-3";
const ul = "list-disc list-inside text-gray-600 text-sm space-y-1 mb-3 pl-2";

/* ════════════════════════════════════════════
   HOME ARTICLE
════════════════════════════════════════════ */
function HomeArticle() {
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 max-w-3xl mx-auto prose-sm">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
        Gmail Tools — Free Email Utilities for Privacy, Testing &amp; Productivity
      </h1>
      <p className="text-xs text-gray-400 mb-6 font-medium">
        Last updated: June 2025 · 5 min read
      </p>

      <p className={p}>
        Managing your Gmail inbox efficiently starts with understanding the hidden features Google
        has built into its email platform. From the legendary <strong>Gmail dot trick</strong> to
        powerful <strong>+alias addressing</strong>, Gmail offers a suite of under-used capabilities
        that can dramatically improve your privacy, organisation, and productivity. This guide
        introduces four free tools that unlock all of these features without any sign-up or data
        collection.
      </p>

      <h2 className={h2}>Why Every Gmail User Needs These Tools</h2>
      <p className={p}>
        The average person uses their primary Gmail address for everything — newsletters, social
        media signups, e-commerce purchases, work communication, and software testing. This
        single-address habit creates three major problems: <strong>inbox clutter</strong>,
        <strong> privacy exposure</strong>, and <strong>difficulty tracking data leaks</strong>.
        By using Gmail's built-in addressing tricks, you can solve all three without creating
        new accounts or paying for extra services.
      </p>

      <h2 className={h2}>The Four Tools at a Glance</h2>

      <h3 className={h3}>1. Gmail Dot Trick Generator</h3>
      <p className={p}>
        Gmail completely ignores dots in usernames. This means <em>john.doe@gmail.com</em>,
        <em> j.o.h.n.d.o.e@gmail.com</em>, and <em>johndoe@gmail.com</em> all deliver to the
        same inbox. Our generator computes every possible dot placement — up to 2^(N-1)
        combinations — and lists them all instantly. This is useful when a website only allows
        one account per email, or when you want to create subtle variations of your address.
      </p>

      <h3 className={h3}>2. Gmail Alias (+tag) Generator</h3>
      <p className={p}>
        Appending a plus sign and any word to your Gmail username creates an unlimited number of
        unique addresses. For example, <em>yourname+shopping@gmail.com</em> still delivers to
        your main inbox, but you can set up Gmail filters to automatically label, archive, or
        forward those messages. This makes aliases perfect for inbox organisation and tracking
        which services share your email.
      </p>

      <h3 className={h3}>3. Fake &amp; Temp Email Generator</h3>
      <p className={p}>
        Developers and QA engineers frequently need realistic-looking email addresses for testing
        registration flows, seeding databases, or populating UI mockups. Our generator produces
        up to 1,000 addresses at once across 15 popular domains, with three styles: realistic
        (first + last name), random (word combinations), and temp Gmail (+tag format).
      </p>

      <h3 className={h3}>4. Email Signature Generator</h3>
      <p className={p}>
        First impressions matter in professional email communication. A well-crafted signature
        reinforces your brand, provides quick contact details, and links to your professional
        profiles. Our signature maker offers five designer templates, custom colour pickers, social
        media fields, and one-click export in both rich text (for direct pasting) and raw HTML (for
        developers).
      </p>

      <h2 className={h2}>Privacy &amp; Security — How We Handle Your Data</h2>
      <p className={p}>
        Every tool on this site runs <strong>entirely in your browser</strong>. No email addresses,
        names, or personal information are ever transmitted to a server. There are no tracking
        cookies, no analytics, and no advertisements. The source logic is straightforward JavaScript
        that you can inspect via your browser's developer tools. You can use these utilities with
        complete confidence that your data stays private.
      </p>

      <h2 className={h2}>Getting Started in 30 Seconds</h2>
      <ul className={ul}>
        <li>Select a tool from the navigation bar above.</li>
        <li>Enter your Gmail username or full email address.</li>
        <li>Click <strong>Generate</strong> to produce your results instantly.</li>
        <li>Copy individual addresses or download the full list as a <code>.txt</code> file.</li>
      </ul>

      <p className={p}>
        All tools are mobile-friendly, require zero installation, and work on any modern browser.
        Whether you are a developer, a privacy-conscious user, or a professional looking to polish
        your email communication, Gmail Tools has something valuable for you.
      </p>
    </article>
  );
}

/* ════════════════════════════════════════════
   DOT TRICK ARTICLE
════════════════════════════════════════════ */
function DotArticle() {
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
        Gmail Dot Trick: The Complete Guide to Generating Infinite Email Addresses
      </h1>
      <p className="text-xs text-gray-400 mb-6 font-medium">
        Last updated: June 2025 · 8 min read
      </p>

      <p className={p}>
        The <strong>Gmail dot trick</strong> is one of the most useful and least-known features of
        Google's email service. It allows you to create hundreds of unique email addresses from a
        single Gmail account — all of which deliver mail to the exact same inbox. This guide
        explains how the trick works, how many addresses you can generate, and the best real-world
        uses for these dot-variant addresses.
      </p>

      <h2 className={h2}>What Is the Gmail Dot Trick?</h2>
      <p className={p}>
        Gmail's routing system treats the dot character (<code>.</code>) in a username as
        completely invisible. Internally, Google normalises every incoming address by stripping all
        dots before looking up the destination inbox. This design decision was made to prevent user
        confusion from accidental dot placement, but it has the side effect of creating a massive
        number of functionally equivalent addresses.
      </p>
      <p className={p}>
        For example, if your address is <strong>johndoe@gmail.com</strong>, all of the following
        will deliver to the same inbox:
      </p>
      <ul className={ul}>
        <li>john.doe@gmail.com</li>
        <li>j.ohndoe@gmail.com</li>
        <li>j.o.h.n.d.o.e@gmail.com</li>
        <li>jo.hn.do.e@gmail.com</li>
      </ul>

      <h2 className={h2}>How Many Addresses Can You Generate?</h2>
      <p className={p}>
        The number of possible dot-placement combinations for a username of length N is{" "}
        <strong>2^(N-1)</strong>. This is because each of the N-1 gaps between characters can
        either contain a dot or not. For a typical 8-character username like <em>johndoe</em>,
        that yields 2^7 = <strong>128 unique addresses</strong>. For a 10-character username, it
        jumps to 512.
      </p>
      <p className={p}>
        Our generator computes all combinations instantly using a bitmask algorithm. Each bit in an
        integer from 0 to 2^(N-1)-1 represents whether a dot appears in the corresponding gap,
        giving an exhaustive and non-redundant list in milliseconds.
      </p>

      <h2 className={h2}>Practical Uses for Dot-Trick Addresses</h2>

      <h3 className={h3}>Bypassing "One Account Per Email" Restrictions</h3>
      <p className={p}>
        Many services enforce a single-account-per-email policy. Because these services don't
        normalise Gmail addresses the way Google does, <em>john.doe@gmail.com</em> and
        <em> johndoe@gmail.com</em> appear as two different accounts — even though they share an
        inbox. This lets you create multiple free trial accounts, enter the same contest more than
        once (where permitted by the rules), or sign up for beta access with varied addresses.
      </p>

      <h3 className={h3}>Inbox Organisation Without Extra Effort</h3>
      <p className={p}>
        You can assign different dot variants to different categories of services. Use
        <em> john.doe@gmail.com</em> for online shopping and <em>j.ohndoe@gmail.com</em> for
        newsletters. Then create Gmail filters that match those exact addresses and apply labels,
        skip the inbox, or forward to specific folders automatically.
      </p>

      <h3 className={h3}>Identifying Who Sells Your Data</h3>
      <p className={p}>
        Give a unique dot-variant to each company you sign up with. If you start receiving spam at
        a specific variant, you know exactly which company sold or leaked your address — without
        ever creating a separate account.
      </p>

      <h2 className={h2}>Limitations of the Gmail Dot Trick</h2>
      <ul className={ul}>
        <li>
          <strong>Gmail only:</strong> The dot trick is exclusive to @gmail.com addresses.
          Outlook, Yahoo, and other providers do not implement this normalisation.
        </li>
        <li>
          <strong>Smarter spam filters:</strong> Some modern services detect dot variations and
          reject or flag them as potential abuse.
        </li>
        <li>
          <strong>Not anonymous:</strong> All mail still arrives in your real inbox, so your
          primary address is ultimately tied to these variants.
        </li>
      </ul>

      <h2 className={h2}>How to Use the Gmail Dot Trick Generator</h2>
      <ul className={ul}>
        <li>Enter your Gmail username (with or without @gmail.com) in the input field.</li>
        <li>Click <strong>Generate</strong> — all combinations appear instantly.</li>
        <li>Use the search bar to filter for specific patterns.</li>
        <li>Copy any address individually or download the full list as a text file.</li>
      </ul>

      <h2 className={h2}>Frequently Asked Questions</h2>

      <h3 className={h3}>Does this work with Google Workspace addresses?</h3>
      <p className={p}>
        Dot normalisation applies only to @gmail.com consumer accounts. Google Workspace (formerly
        G Suite) domains do not share this behaviour by default, though admins can enable it.
      </p>

      <h3 className={h3}>Will using a dot variant create a new inbox?</h3>
      <p className={p}>
        No. Regardless of which variant receives an email, it always arrives in your single Gmail
        inbox. No new account or storage space is created.
      </p>

      <h3 className={h3}>Is the Gmail dot trick against Google's Terms of Service?</h3>
      <p className={p}>
        Using your own legitimate Gmail address variants for personal organisation and privacy is
        within normal usage. Using it to abuse promotions or violate platform rules may breach
        those platforms' terms of service.
      </p>
    </article>
  );
}

/* ════════════════════════════════════════════
   ALIAS ARTICLE
════════════════════════════════════════════ */
function AliasArticle() {
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
        Gmail Alias Generator: How to Create Unlimited +Tag Email Addresses
      </h1>
      <p className="text-xs text-gray-400 mb-6 font-medium">
        Last updated: June 2025 · 7 min read
      </p>

      <p className={p}>
        A <strong>Gmail alias</strong> is an email address created by appending a plus sign
        and any custom tag to your Gmail username. For example, if your address is
        <em> yourname@gmail.com</em>, you can instantly use <em>yourname+shopping@gmail.com</em>,
        <em> yourname+work@gmail.com</em>, or any other tag you choose. Every alias delivers
        mail directly to your main inbox, and you can create an unlimited number of them — no
        settings changes required.
      </p>

      <h2 className={h2}>How Gmail Aliases (+tags) Work</h2>
      <p className={p}>
        Gmail's email routing ignores everything after the <code>+</code> character in a username.
        So <em>yourname+anything@gmail.com</em> is treated as identical to{" "}
        <em>yourname@gmail.com</em> for delivery purposes. Unlike the dot trick, the tag portion
        is preserved in the "To:" field of received messages, which makes aliases extremely
        powerful for filtering and tracking.
      </p>

      <h2 className={h2}>Top 10 Uses for Gmail Aliases</h2>

      <h3 className={h3}>1. Inbox Organisation with Filters</h3>
      <p className={p}>
        Create a filter in Gmail that matches messages sent to <em>yourname+shopping@gmail.com</em>{" "}
        and automatically applies the label "Shopping", skips the inbox, or marks them as read.
        You can build a comprehensive filing system without any manual effort.
      </p>

      <h3 className={h3}>2. Newsletter Management</h3>
      <p className={p}>
        Use <em>yourname+newsletters@gmail.com</em> for every newsletter signup. Route them all
        to a dedicated label so they never clutter your primary inbox, but remain accessible
        when you want to read them.
      </p>

      <h3 className={h3}>3. Tracking Which Companies Sell Your Data</h3>
      <p className={p}>
        Assign a unique alias to every service you sign up for. If spam arrives at
        <em> yourname+brand123@gmail.com</em>, you know immediately that Brand 123 shared your
        address. This gives you actionable intelligence without maintaining separate accounts.
      </p>

      <h3 className={h3}>4. E-commerce &amp; Promotional Tracking</h3>
      <p className={p}>
        Use <em>yourname+amazon@gmail.com</em>, <em>yourname+ebay@gmail.com</em>, and so on.
        Organise purchase receipts, shipping notifications, and promotional offers by retailer
        without any manual sorting.
      </p>

      <h3 className={h3}>5. Job Applications</h3>
      <p className={p}>
        Create <em>yourname+jobs@gmail.com</em> for all job-application related correspondence.
        Recruiters, interview invitations, and rejection letters stay neatly separated from your
        personal communication.
      </p>

      <h3 className={h3}>6. Software Development &amp; Testing</h3>
      <p className={p}>
        Aliases are invaluable during development. Test your registration flow with
        <em> yourname+test1@gmail.com</em>, <em>yourname+test2@gmail.com</em>, and so on —
        all responses arrive in one inbox, making it easy to verify email deliverability without
        managing multiple accounts.
      </p>

      <h2 className={h2}>Setting Up Gmail Filters for Aliases</h2>
      <p className={p}>
        To make the most of aliases, pair them with Gmail's filter system:
      </p>
      <ul className={ul}>
        <li>In Gmail, click the search bar and then the filter icon.</li>
        <li>In the "To" field, enter your alias (e.g., <em>yourname+shopping@gmail.com</em>).</li>
        <li>Click "Create filter" and choose your actions: label, archive, forward, etc.</li>
        <li>Repeat for each alias you want to manage automatically.</li>
      </ul>

      <h2 className={h2}>Limitations of Gmail Aliases</h2>
      <ul className={ul}>
        <li>
          <strong>Visible tag:</strong> The <code>+tag</code> portion is visible to recipients
          and the sending service, so it doesn't provide anonymity.
        </li>
        <li>
          <strong>Blocked by some sites:</strong> Certain websites detect and reject the{" "}
          <code>+</code> character, so aliases may not work everywhere.
        </li>
        <li>
          <strong>Cannot send from an alias:</strong> You can receive mail at any alias but
          you cannot send email from one unless you configure it as a "Send mail as" address
          in Gmail settings.
        </li>
      </ul>

      <h2 className={h2}>How to Use the Gmail Alias Generator</h2>
      <ul className={ul}>
        <li>Enter your Gmail username or full email address.</li>
        <li>Type custom tags in the input field and press Enter, or select from 20+ presets.</li>
        <li>Your aliases appear instantly in the results panel.</li>
        <li>Copy individually or download all as a <code>.txt</code> file.</li>
      </ul>

      <p className={p}>
        With our generator, you can create dozens of aliases in seconds and export them for
        use in your favourite password manager, email client, or development workflow.
      </p>
    </article>
  );
}

/* ════════════════════════════════════════════
   GENERATOR ARTICLE
════════════════════════════════════════════ */
function GeneratorArticle() {
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
        Free Email Address Generator: Create Fake &amp; Temp Gmail Addresses Instantly
      </h1>
      <p className="text-xs text-gray-400 mb-6 font-medium">
        Last updated: June 2025 · 7 min read
      </p>

      <p className={p}>
        Whether you are a developer testing a registration form, a QA engineer seeding a
        database, or a designer populating a UI mockup, you need <strong>realistic fake email
        addresses</strong> on demand. Our free email address generator lets you create up to
        1,000 addresses at once across 15 popular domains, with three distinct styles to match
        any use case.
      </p>

      <h2 className={h2}>What Is a Fake Email Address Generator?</h2>
      <p className={p}>
        A fake email address generator is a tool that creates syntactically valid email addresses
        that do not correspond to real, active mailboxes. These addresses follow the standard
        <code> local-part@domain</code> format and pass basic format validation, but they are
        not registered with any email provider. They are designed exclusively for
        <strong> testing, development, and demonstration purposes</strong>.
      </p>

      <h2 className={h2}>Three Generation Styles</h2>

      <h3 className={h3}>Realistic Style</h3>
      <p className={p}>
        Combines common first names and last names from a curated list of 50+ names each,
        optionally adding numbers for uniqueness. Examples: <em>james.smith47@gmail.com</em>,{" "}
        <em>emma.johnson@outlook.com</em>. Use this style when you need data that looks
        convincingly human for demos and presentations.
      </p>

      <h3 className={h3}>Random Style</h3>
      <p className={p}>
        Generates addresses from a word list combined with numbers and separators. Examples:
        <em> bluewave-echo91@yahoo.com</em>, <em>darkprime42@protonmail.com</em>. This style
        is ideal for stress-testing systems that need a high volume of unique, non-repeating
        addresses with no recognisable personal information.
      </p>

      <h3 className={h3}>Temp Gmail Style</h3>
      <p className={p}>
        Creates addresses in the <em>username+tag@gmail.com</em> format using a real Gmail
        address. These technically deliver to your inbox, making them useful for testing
        email verification flows end-to-end. Example: <em>john99+temp1234@gmail.com</em>.
      </p>

      <h2 className={h2}>Supported Domains</h2>
      <p className={p}>
        Choose from 15 popular email domains — gmail.com, yahoo.com, outlook.com, hotmail.com,
        protonmail.com, icloud.com, mail.com, zoho.com, aol.com, yandex.com, tutanota.com,
        fastmail.com, gmx.com, live.com, and msn.com — or enter any custom domain for company
        or project-specific testing.
      </p>

      <h2 className={h2}>Key Use Cases</h2>

      <h3 className={h3}>Unit &amp; Integration Testing</h3>
      <p className={p}>
        Automated tests for user registration, password reset, and email notification flows
        require unique email addresses that don't trigger real delivery attempts. Generate a
        fresh batch of test addresses before each test run to avoid state conflicts.
      </p>

      <h3 className={h3}>Database Seeding</h3>
      <p className={p}>
        When setting up a staging or development database, you often need hundreds of realistic
        user records. Our generator can produce 1,000 unique addresses in under a second, ready
        to paste into a seed script or import as a CSV.
      </p>

      <h3 className={h3}>UI &amp; UX Prototyping</h3>
      <p className={p}>
        Design mockups and Figma prototypes look significantly more professional when populated
        with realistic data rather than placeholder text. Use our generator to fill email fields
        in your designs with believable addresses.
      </p>

      <h3 className={h3}>API &amp; Load Testing</h3>
      <p className={p}>
        When load-testing a system that accepts email addresses, you need a large pool of unique
        values to avoid hitting deduplication logic. Generate hundreds of addresses and use them
        as test parameters in your load-testing tool of choice.
      </p>

      <h2 className={h2}>Important Notes on Responsible Use</h2>
      <ul className={ul}>
        <li>These addresses are for testing and development only — never for spam or fraud.</li>
        <li>Do not use fake addresses to bypass email verification on production systems.</li>
        <li>Generated addresses do not have real mailboxes and cannot receive email.</li>
        <li>All generation happens locally in your browser; no data is collected or stored.</li>
      </ul>

      <h2 className={h2}>How to Use the Email Generator</h2>
      <ul className={ul}>
        <li>Choose a generation style: Realistic, Random, or Temp Gmail.</li>
        <li>Set the number of addresses (1–1,000) using the slider or quick-select buttons.</li>
        <li>Select a domain from the list or enter a custom domain.</li>
        <li>Toggle options for numbers, word inclusions, and uniqueness enforcement.</li>
        <li>Click <strong>Generate</strong> and copy or download your results.</li>
      </ul>
    </article>
  );
}

/* ════════════════════════════════════════════
   SIGNATURE ARTICLE
════════════════════════════════════════════ */
function SignatureArticle() {
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
        Free Email Signature Generator: Create a Professional Email Signature in Minutes
      </h1>
      <p className="text-xs text-gray-400 mb-6 font-medium">
        Last updated: June 2025 · 8 min read
      </p>

      <p className={p}>
        Your email signature is the last thing a recipient sees in every message you send. A
        well-designed <strong>professional email signature</strong> reinforces your personal or
        company brand, provides essential contact information at a glance, and links to your
        professional profiles — all in a compact, visually polished format. Our free email
        signature generator makes it easy to create a stunning signature in minutes, with no
        design skills required.
      </p>

      <h2 className={h2}>Why Your Email Signature Matters</h2>
      <p className={p}>
        Studies show that professionals send an average of 40 emails per day. Each of those
        emails is an opportunity to reinforce your identity and provide a clear call to action.
        A signature that includes your name, role, company, phone number, and a link to your
        LinkedIn profile can significantly increase response rates and professional credibility.
      </p>
      <p className={p}>
        Conversely, a missing or poorly formatted signature can make you appear unorganised or
        less professional — especially in B2B contexts where first impressions are made through
        email before any face-to-face interaction.
      </p>

      <h2 className={h2}>Five Professional Signature Templates</h2>

      <h3 className={h3}>Modern Template</h3>
      <p className={p}>
        Features a bold coloured left border and clean sans-serif typography. Ideal for tech
        professionals, startups, and creative agencies who want a contemporary, minimalist look.
        Works well in dark and light email clients.
      </p>

      <h3 className={h3}>Classic Template</h3>
      <p className={p}>
        Uses serif typography and a traditional horizontal divider. Perfect for lawyers,
        accountants, consultants, and anyone in a traditional industry where formality and
        authority are important.
      </p>

      <h3 className={h3}>Minimal Template</h3>
      <p className={p}>
        Presents all information in a single compact line, separated by vertical dividers.
        Best for those who prefer brevity and know their recipients already have their contact
        details — great for ongoing threads and internal communication.
      </p>

      <h3 className={h3}>Bold Template</h3>
      <p className={p}>
        Features a high-contrast design with a coloured background header for the name and
        title. Designed to stand out in a crowded inbox while remaining professional.
        Particularly effective for sales, business development, and marketing roles.
      </p>

      <h3 className={h3}>Creative Template</h3>
      <p className={p}>
        Uses a gradient header, rounded avatar, and coloured icon buttons for social links.
        Suited for designers, content creators, photographers, and other creative professionals
        who want their signature to reflect their artistic sensibility.
      </p>

      <h2 className={h2}>What to Include in a Professional Email Signature</h2>
      <ul className={ul}>
        <li><strong>Full name</strong> — make it easy to find you.</li>
        <li><strong>Job title</strong> — establish your role and credibility.</li>
        <li><strong>Company name</strong> — reinforce brand recognition.</li>
        <li><strong>Email address</strong> — surprisingly often omitted, but useful in forwarded threads.</li>
        <li><strong>Phone number</strong> — provide an alternative contact channel.</li>
        <li><strong>Website</strong> — drive traffic to your portfolio or company site.</li>
        <li><strong>LinkedIn URL</strong> — standard in professional correspondence.</li>
        <li><strong>Profile photo</strong> — adds a personal touch and improves recognition.</li>
      </ul>

      <h2 className={h2}>How to Add Your Signature to Gmail</h2>
      <p className={p}>
        Once you have generated and copied your signature, adding it to Gmail takes less than
        a minute:
      </p>
      <ul className={ul}>
        <li>Open Gmail and click the ⚙️ gear icon, then <strong>See all settings</strong>.</li>
        <li>Scroll down to the <strong>Signature</strong> section in the General tab.</li>
        <li>Click <strong>Create new</strong> and give your signature a name.</li>
        <li>Paste your copied signature into the text area. Formatting will be preserved.</li>
        <li>Scroll down and click <strong>Save Changes</strong>.</li>
      </ul>

      <h2 className={h2}>Best Practices for Email Signatures</h2>

      <h3 className={h3}>Keep It Concise</h3>
      <p className={p}>
        Aim for no more than four to six lines of information. Signatures that are longer than
        the email body create a poor visual impression. Include only the details that are
        genuinely useful to your recipients.
      </p>

      <h3 className={h3}>Optimise for Mobile</h3>
      <p className={p}>
        Over 50% of emails are opened on mobile devices. Choose templates with single-column
        layouts and avoid images that may not load correctly on cellular connections. Our
        templates are all tested for mobile responsiveness.
      </p>

      <h3 className={h3}>Use Your Brand Colours</h3>
      <p className={p}>
        A signature that matches your company or personal brand colours creates a cohesive,
        professional impression. Use the custom colour picker to enter your exact brand hex
        code for a pixel-perfect match.
      </p>

      <h3 className={h3}>Update It Regularly</h3>
      <p className={p}>
        Outdated phone numbers, former job titles, or defunct company websites undermine your
        credibility. Review your signature quarterly and regenerate it whenever your details
        change.
      </p>

      <h2 className={h2}>Export Options</h2>
      <p className={p}>
        Our generator provides three export methods: <strong>Copy Rich Text</strong> for direct
        pasting into Gmail, Outlook, or Apple Mail; <strong>Copy HTML</strong> for embedding
        in email clients that accept raw HTML signatures; and <strong>Download HTML File</strong>{" "}
        for saving and sharing your signature template with colleagues.
      </p>
    </article>
  );
}
