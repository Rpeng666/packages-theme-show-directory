/**
 * Demo section data for the showcase — sample `Section` objects keyed by
 * block name. These drive the forwarder blocks in themes/default/blocks.
 */
import type { Section } from "@template/ui";

export const heroSection: Section = {
  id: "hero",
  label: "New",
  title: "Build beautiful interfaces with a theme system",
  description:
    "Every component and section lives in a registry. Switch themes, compare implementations, and ship the look you want — no copy-paste.",
  highlight_text: "theme system",
  buttons: [
    { title: "Get started", url: "#", variant: "default" },
    { title: "Learn more", url: "#", variant: "outline" },
  ],
  features: [
    { title: "4 themes", description: "default, pixel, semi, raycast" },
    { title: "98 components", description: "primitives + sections" },
    { title: "Open registry", description: "drop a file to register" },
  ],
};

export const featuresSection: Section = {
  id: "features",
  sr_only_title: "Features",
  title: "Everything you need",
  description: "A full set of landing blocks resolved through the registry.",
  items: [
    { title: "Data-driven", description: "Sections render from plain Section data.", icon: "sparkles" },
    { title: "Theme-able", description: "Each theme overrides any block.", icon: "palette" },
    { title: "Forwarders", description: "Blocks delegate to registered implementations.", icon: "refresh" },
    { title: "Fallback chain", description: "Missing blocks fall back to default.", icon: "shield" },
  ],
};

export const featuresGridSection: Section = {
  id: "features-grid",
  title: "Feature grid",
  description: "A responsive grid of features.",
  items: [
    { title: "Fast", description: "Rendered server-side, hydrated instantly.", icon: "zap" },
    { title: "Portable", description: "Package owns no Next dependency.", icon: "package" },
    { title: "Typed", description: "Contracts give full autocomplete.", icon: "type" },
  ],
};

export const featuresStepSection: Section = {
  id: "features-step",
  title: "How it works",
  description: "Three steps from data to deployed block.",
  items: [
    { title: "Define", description: "Shape your Section data." },
    { title: "Render", description: "Forward it through a block." },
    { title: "Ship", description: "Theme it however you like." },
  ],
};

export const featuresAccordionSection: Section = {
  id: "features-accordion",
  title: "FAQ-ish features",
  description: "Expandable rows for detailed copy.",
  items: [
    { title: "What is the registry?", description: "The filesystem is the registry — drop a file and it resolves." },
    { title: "How do themes fall back?", description: "Requested theme → default → any theme → empty." },
    { title: "Can I mix themes?", description: "Yes — resolve any component for any theme." },
  ],
};

export const featuresCompareSection: Section = {
  id: "features-compare",
  title: "Compare themes",
  description: "Side-by-side feature comparison.",
  items: [
    { title: "Default", description: "shadcn-style primitives." },
    { title: "Pixel", description: "pxlkit chunky surfaces." },
    { title: "Semi", description: "HeroUI components." },
  ],
};

export const faqSection: Section = {
  id: "faq",
  title: "Frequently asked questions",
  description: "Answers to the most common questions.",
  items: [
    { title: "How do I add a theme?", description: "Create themes/{name}/ with style/ and blocks/." },
    { title: "Where does the data come from?", description: "Landing sections are plain Section objects." },
    { title: "What if a block is missing?", description: "The loader falls back to the default theme." },
  ],
};

export const ctaSection: Section = {
  id: "cta",
  title: "Ready to get started?",
  description: "Try the registry today.",
  buttons: [
    { title: "Start now", url: "#", variant: "default" },
    { title: "Contact us", url: "#", variant: "outline" },
  ],
};

export const subscribeSection: Section = {
  id: "subscribe",
  title: "Subscribe to updates",
  description: "Get the latest news in your inbox.",
  submit: { action: "#", label: "Subscribe" },
};

export const testimonialsSection: Section = {
  id: "testimonials",
  title: "Loved by developers",
  description: "What people say about the theme system.",
  items: [
    { name: "Ada Lovelace", role: "Engineer", quote: "The registry approach is genius.", avatar: { src: "", alt: "Ada" } },
    { name: "Grace Hopper", role: "Architect", quote: "Fallback chains just work.", avatar: { src: "", alt: "Grace" } },
    { name: "Linus Torvalds", role: "Maintainer", quote: "Simple, data-driven, theme-able.", avatar: { src: "", alt: "Linus" } },
  ],
};

export const toolsGridSection: Section = {
  id: "tools-grid",
  title: "Tools",
  description: "Every tool in one grid.",
  items: [
    { title: "Code Images", description: "Beautiful code screenshots", url: "#", icon: "code" },
    { title: "Icon Maker", description: "Create extension icons", url: "#", icon: "image" },
    { title: "Prompt Explorer", description: "Browse AI prompts", url: "#", icon: "sparkles" },
  ],
};

export const showcasesSection: Section = {
  id: "showcases",
  title: "Showcases",
  description: "Real projects using the system.",
  items: [
    { title: "Project One", description: "Uses default theme", url: "#" },
    { title: "Project Two", description: "Uses pixel theme", url: "#" },
  ],
};

export const heroCleanerSection: Section = {
  id: "hero-cleaner",
  title: "Clean up any image",
  description: "Remove backgrounds in one click.",
  buttons: [{ title: "Try it free", url: "#", variant: "default" }],
};

export const heroLiveSection: Section = {
  id: "hero-live",
  title: "Live editing",
  description: "See changes in real time.",
  buttons: [{ title: "Open studio", url: "#", variant: "default" }],
};

export const pricingSection: Section = {
  id: "pricing",
  title: "Simple pricing",
  description: "Pick a plan that works for you.",
  groups: [
    { name: "monthly", title: "Monthly", is_featured: true },
    { name: "yearly", title: "Yearly" },
  ],
  items: [
    {
      product_id: "free",
      title: "Free",
      description: "For individuals",
      price: "$0",
      currency: "USD",
      amount: 0,
      group: "monthly",
      features: ["1 project", "Community support"],
      is_featured: false,
    },
    {
      product_id: "pro",
      title: "Pro",
      description: "For teams",
      price: "$12",
      currency: "USD",
      amount: 12,
      group: "monthly",
      features: ["Unlimited projects", "Priority support"],
      is_featured: true,
    },
  ],
};

export const blogSection: Section = {
  id: "blog",
  title: "From the blog",
  description: "Latest articles.",
  items: [
    { title: "Introducing the theme registry", description: "How the filesystem became the registry.", url: "#" },
    { title: "Fallback chains explained", description: "Requested → default → any → empty.", url: "#" },
  ],
};

export const blogDetailSection: Section = {
  id: "blog-detail",
  title: "A deep dive into theme blocks",
  description: "How forwarders resolve registered implementations.",
};

export const blogDetailPost = {
  id: "blog-detail",
  slug: "theme-blocks",
  title: "A deep dive into theme blocks",
  description: "How forwarders resolve registered implementations.",
  created_at: "2024-08-23",
  author_name: "Ada Lovelace",
  author_role: "Platform Engineer",
  author_image: "",
  content:
    "Every block in themes/default/blocks is a forwarder: it resolves the registered section from the registry and injects the section data. The registry falls back through requested theme → default → any theme → empty.",
};

/** Every demo section keyed by block name. */
export const DEMO_SECTIONS: Record<string, Section> = {
  Hero: heroSection,
  Features: featuresSection,
  FeaturesGrid: featuresGridSection,
  FeaturesStep: featuresStepSection,
  FeaturesAccordion: featuresAccordionSection,
  FeaturesCompare: featuresCompareSection,
  Faq: faqSection,
  Cta: ctaSection,
  Subscribe: subscribeSection,
  Testimonials: testimonialsSection,
  ToolsGrid: toolsGridSection,
  Showcases: showcasesSection,
  HeroCleaner: heroCleanerSection,
  HeroLive: heroLiveSection,
  Pricing: pricingSection,
  Blog: blogSection,
  BlogDetail: blogDetailSection,
};