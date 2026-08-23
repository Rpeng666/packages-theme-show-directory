import type { Section } from "@template/ui";


export const pricingSection = {
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

export const props = { section: pricingSection };
