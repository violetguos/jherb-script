import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createPlan } from "@/lib/actions";
import PlanForm from "../form";

export default async function NewPlanPage() {
  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-lg mx-auto">
      <Link
        href="/"
        className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-block"
      >
        &larr; All collections
      </Link>
      <h1 className="text-2xl font-bold mb-6">New Collection</h1>
      <PlanForm products={products} onSubmit={createPlan} />
    </div>
  );
}
