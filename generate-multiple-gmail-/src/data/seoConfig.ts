export interface SEOPageConfig {
  title: string;
  description: string;
  canonical: string;
  h1: string;
  faqSchema: { question: string; answer: string }[];
}

type Tab = "home" | "dot" | "alias" | "generator" | "signature";

export const SEO_CONFIG: Record<Tab, SEOPageConfig> = {
  home: {
    title: "Gmail Tools — Free Dot Trick, Alias, Email Generator & Signature Maker",
    description:
      "Free Gmail utilities: generate dot-trick addresses, create +tag aliases, produce fake emails for testing, and build professional email signatures. No sign-up. 100% private.",
    canonical: "/",
    h1: "Gmail Tools — Free Email Utilities Suite",
    faqSchema: [
      {
        question: "What is the Gmail dot trick?",
        answer:
          "Gmail ignores dots in usernames, so johndoe@gmail.com and john.doe@gmail.com deliver to the same inbox. You can generate all possible dot combinations using our free Gmail Dot Trick Generator.",
      },
      {
        question: "Are all Gmail tools on this site free?",
        answer:
          "Yes. All four tools — Dot Trick Generator, Alias Generator, Email Generator, and Signature Maker — are completely free with no sign-up required.",
      },
      {
        question: "Is my data safe when using these tools?",
        answer:
          "Absolutely. All processing happens locally in your browser. No email addresses or personal information are ever sent to a server.",
      },
      {
        question: "Do I need a Gmail account to use these tools?",
        answer:
          "You need a Gmail address for the Dot Trick and Alias tools. The Email Generator and Signature Maker work with any email address.",
      },
    ],
  },

  dot: {
    title: "Gmail Dot Trick Generator — Generate All Dot Combinations for Your Gmail",
    description:
      "Use the Gmail dot trick to generate every possible dot-placement variation of your Gmail address. Up to 2^(N-1) unique addresses, all delivering to the same inbox. Free, instant, no login.",
    canonical: "/gmail-dot-trick",
    h1: "Gmail Dot Trick Generator",
    faqSchema: [
      {
        question: "How does the Gmail dot trick work?",
        answer:
          "Gmail ignores all dots in the username portion of an address. This means john.doe@gmail.com and johndoe@gmail.com are identical to Gmail's routing system, but third-party services treat them as different addresses.",
      },
      {
        question: "How many addresses can I generate with the Gmail dot trick?",
        answer:
          "For a username of N characters, you can generate 2^(N-1) unique dot-variant addresses. For an 8-character username, that is 128 addresses; for 10 characters, it is 512.",
      },
      {
        question: "Does the Gmail dot trick work with Outlook or Yahoo?",
        answer:
          "No. The dot trick is exclusive to @gmail.com addresses. Outlook, Yahoo, and other providers do not implement username dot-normalisation.",
      },
      {
        question: "Will dot-trick addresses create new Gmail inboxes?",
        answer:
          "No. All dot variants of your address deliver mail to your single existing Gmail inbox. No new accounts or storage is created.",
      },
      {
        question: "Is using the Gmail dot trick against Google's terms of service?",
        answer:
          "Using your own Gmail address variants for personal organisation and privacy protection is normal usage. Using them to abuse promotions may breach those specific platforms' terms.",
      },
    ],
  },

  alias: {
    title: "Gmail Alias Generator — Create Unlimited +Tag Email Addresses Free",
    description:
      "Generate unlimited Gmail alias addresses with custom +tags. Perfect for inbox organisation, spam tracking, and filtering. Free tool — no registration needed.",
    canonical: "/gmail-alias",
    h1: "Gmail Alias (+Tag) Generator",
    faqSchema: [
      {
        question: "What is a Gmail alias?",
        answer:
          "A Gmail alias is an address in the format username+tag@gmail.com. Gmail delivers all mail sent to any alias directly to your main inbox, and the tag is preserved in the To: field for filtering.",
      },
      {
        question: "Can I create unlimited Gmail aliases?",
        answer:
          "Yes. Gmail supports any word after the + sign, so you can create an unlimited number of aliases instantly without any configuration.",
      },
      {
        question: "Why do some websites reject Gmail aliases with a + sign?",
        answer:
          "Some websites incorrectly treat the + character as invalid in email addresses. In these cases, the Gmail dot trick may be a better alternative.",
      },
      {
        question: "How do I set up Gmail filters for my aliases?",
        answer:
          "In Gmail, open Settings > Filters and Blocked Addresses > Create a new filter. Enter your alias in the 'To' field and choose actions like Apply label, Skip Inbox, or Forward.",
      },
      {
        question: "Can I send email from a Gmail alias?",
        answer:
          "Not by default. You can receive email at any alias, but to send from one you need to add it as a 'Send mail as' address in Gmail Settings > Accounts and Import.",
      },
    ],
  },

  generator: {
    title: "Free Email Address Generator — Fake & Temp Emails for Testing | Gmail Tools",
    description:
      "Generate fake email addresses and random temp Gmail addresses instantly. Perfect for testing, database seeding, and UI mockups. Up to 1000 addresses, 15 domains, 3 styles. Free & private.",
    canonical: "/email-generator",
    h1: "Free Email Address Generator",
    faqSchema: [
      {
        question: "What is a fake email address generator?",
        answer:
          "A fake email address generator creates syntactically valid email addresses that don't correspond to real mailboxes. They are used for software testing, database seeding, and UI prototyping.",
      },
      {
        question: "Are the generated email addresses real?",
        answer:
          "No. Generated addresses (except the Temp Gmail style) are not registered with any email provider and cannot receive email. They are for testing and development purposes only.",
      },
      {
        question: "Can I generate up to 1000 email addresses at once?",
        answer:
          "Yes. Use the slider or quick-select buttons to choose between 1 and 1,000 addresses per generation. All addresses are produced instantly in your browser.",
      },
      {
        question: "What email domains are supported?",
        answer:
          "The generator supports 15 domains: gmail.com, yahoo.com, outlook.com, hotmail.com, protonmail.com, icloud.com, mail.com, zoho.com, aol.com, yandex.com, tutanota.com, fastmail.com, gmx.com, live.com, and msn.com. You can also enter a custom domain.",
      },
      {
        question: "Can I download the generated email addresses?",
        answer:
          "Yes. Click 'Download .txt' to save all generated addresses as a plain text file with one address per line, ready for use in scripts or spreadsheets.",
      },
    ],
  },

  signature: {
    title: "Free Email Signature Generator — Create Professional Signatures Instantly",
    description:
      "Create a free professional email signature with our easy-to-use signature maker. Choose from 5 templates, add social links, preview live, and export HTML. No account needed.",
    canonical: "/email-signature",
    h1: "Free Email Signature Generator",
    faqSchema: [
      {
        question: "How do I add my email signature to Gmail?",
        answer:
          "Copy your signature using the 'Copy Rich Text' button, then in Gmail go to Settings > See all settings > General > Signature, create a new signature, and paste it in. Your formatting will be preserved.",
      },
      {
        question: "What does the email signature generator include?",
        answer:
          "The generator supports your name, job title, company, profile photo, email, phone, website, address, and social links (LinkedIn, Twitter/X, GitHub, Instagram). Choose from 5 templates and 15 colour presets.",
      },
      {
        question: "Can I use a custom brand colour in my signature?",
        answer:
          "Yes. In addition to 15 preset colours, the signature maker includes a colour picker that accepts any hex code for a pixel-perfect brand colour match.",
      },
      {
        question: "Does the email signature work in Outlook and Apple Mail?",
        answer:
          "Yes. Use 'Copy HTML' and paste it into Outlook (File > Options > Mail > Signatures) or Apple Mail (Mail > Settings > Signatures). All five templates are tested for compatibility.",
      },
      {
        question: "Is the email signature generator really free?",
        answer:
          "Yes. The tool is completely free with no watermarks, no sign-up, and no hidden charges. All generation happens in your browser and no data is collected.",
      },
    ],
  },
};
