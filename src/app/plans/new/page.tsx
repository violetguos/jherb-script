import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { isStaticMode } from "@/lib/config";

export default async function NewPlanPage() {
  if (isStaticMode) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Not Available</h1>
        <p className="text-gray-500">
          Creating collections is disabled in this static version. Run the app
          locally to make changes.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-sm text-gray-500 hover:text-gray-900"
        >
          &larr; Back to collections
        </Link>
      </div>
    );
  }

  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
  });

  const { createPlan } = await import("@/lib/actions");
  const { default: PlanForm } = await import("../form");

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
