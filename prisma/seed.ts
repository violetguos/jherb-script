import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaSqlite } from "prisma-adapter-sqlite";

const adapter = new PrismaSqlite({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const products = [
  {
    name: "Handcrafted Ceramic Mug",
    description: "A beautiful hand-thrown ceramic mug with a subtle glaze finish. Holds approximately 12oz. Microwave and dishwasher safe.",
    price: 24.99,
    imageUrl: "https://picsum.photos/seed/mug/400/400",
  },
  {
    name: "Wool Blend Blanket",
    description: "Ultra-soft wool blend throw blanket, perfect for chilly evenings. Available in heather gray. 50 x 60 inches.",
    price: 49.99,
    imageUrl: "https://picsum.photos/seed/blanket/400/400",
  },
  {
    name: "Leather Journal",
    description: "Hand-bound leather journal with 200 pages of acid-free paper. Features a convenient bookmark ribbon and elastic closure.",
    price: 19.99,
    imageUrl: "https://picsum.photos/seed/journal/400/400",
  },
  {
    name: "Bamboo Cutting Board",
    description: "Large bamboo cutting board with juice groove. Naturally antimicrobial and gentle on knives. 18 x 12 inches.",
    price: 34.99,
    imageUrl: "https://picsum.photos/seed/cutting-board/400/400",
  },
  {
    name: "Soy Candle Set",
    description: "Set of 3 hand-poured soy candles in reusable glass jars. Scents: lavender, vanilla bean, and sandalwood. 8oz each.",
    price: 29.99,
    imageUrl: "https://picsum.photos/seed/candle/400/400",
  },
  {
    name: "Linen Tea Towels",
    description: "Set of 4 French linen tea towels with traditional stripe pattern. Highly absorbent and lint-free. 18 x 28 inches.",
    price: 22.99,
    imageUrl: "https://picsum.photos/seed/towels/400/400",
  },
];

async function main() {
  console.log("Seeding database...");

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log(`Seeded ${products.length} products successfully.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
