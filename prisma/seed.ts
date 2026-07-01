import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaSqlite } from "prisma-adapter-sqlite";

const adapter = new PrismaSqlite({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

function svg(c1: string, c2: string, symbol: string) {
  const s = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
    </linearGradient></defs>
    <rect width="400" height="400" fill="url(#g)" rx="24"/>
    <circle cx="200" cy="200" r="110" fill="rgba(255,255,255,0.12)"/>
    <text x="200" y="228" text-anchor="middle" font-size="110" fill="white" font-family="system-ui,sans-serif" font-weight="bold">${symbol}</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(s)}`;
}

const products = [
  { name: "Vitamin C 1000mg", description: "High-potency vitamin C with bioflavonoids for immune system support. Each capsule delivers 1000mg of pure ascorbic acid with added rose hip extract for enhanced absorption.", price: 18.99, imageUrl: svg("#f97316", "#ea580c", "C") },
  { name: "Omega-3 Fish Oil", description: "Premium fish oil concentrate providing 1200mg of EPA and DHA per serving. Sourced from wild-caught cold-water fish. Supports heart, brain, and joint health.", price: 24.99, imageUrl: svg("#0ea5e9", "#0284c7", "ω") },
  { name: "Probiotic Complex", description: "Advanced 12-strain probiotic formula with 50 billion CFU per capsule. Includes prebiotic fiber to support healthy digestion and gut microbiome balance.", price: 32.99, imageUrl: svg("#8b5cf6", "#7c3aed", "🧬") },
  { name: "Magnesium Glycinate", description: "Highly absorbable magnesium glycinate chelate. 200mg per serving to promote relaxation, muscle recovery, and restful sleep. Gentle on the stomach.", price: 22.99, imageUrl: svg("#ec4899", "#db2777", "Mg") },
  { name: "Ashwagandha Root", description: "Organic ashwagandha root extract standardized to 5% withanolides. An adaptogenic herb traditionally used to reduce stress, support energy, and promote mental clarity.", price: 19.99, imageUrl: svg("#22c55e", "#16a34a", "🌿") },
  { name: "Whey Protein Isolate", description: "Cold-processed whey protein isolate with 25g of protein per scoop, zero sugar, and only 110 calories. Mixes instantly. Vanilla flavor. 2lb container.", price: 44.99, imageUrl: svg("#a855f7", "#9333ea", "P") },
];

async function main() {
  console.log("Seeding database...");

  await prisma.plan.deleteMany();
  await prisma.product.deleteMany();

  const created: Record<string, number> = {};
  for (const p of products) {
    const product = await prisma.product.create({ data: p });
    created[p.name] = product.id;
  }

  const plans = [
    {
      name: "Active Men's Stack",
      description: "Curated for active men who want to support energy, recovery, and performance. This stack combines protein for muscle repair, omega-3s for joint health, and magnesium for electrolyte balance and relaxation.",
      productNames: ["Whey Protein Isolate", "Omega-3 Fish Oil", "Magnesium Glycinate"],
    },
    {
      name: "Menopause Wellness",
      description: "Designed for women navigating menopause. Ashwagandha helps manage stress and cortisol, magnesium supports sleep and bone health, vitamin C boosts immunity, and omega-3s promote heart and brain health during this transition.",
      productNames: ["Ashwagandha Root", "Magnesium Glycinate", "Vitamin C 1000mg", "Omega-3 Fish Oil"],
    },
    {
      name: "Daily Immune Defense",
      description: "A foundational year-round stack for immune resilience. Vitamin C and probiotics support your first line of defense, while omega-3s help manage the inflammatory response.",
      productNames: ["Vitamin C 1000mg", "Probiotic Complex", "Omega-3 Fish Oil"],
    },
  ];

  for (const plan of plans) {
    await prisma.plan.create({
      data: {
        name: plan.name,
        description: plan.description,
        products: {
          connect: plan.productNames.map((name) => ({ id: created[name] })),
        },
      },
    });
  }

  console.log(`Seeded ${products.length} products and ${plans.length} plans.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
