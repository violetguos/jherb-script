import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isStaticMode } from "@/lib/config";

export async function generateStaticParams() {
  const plans = await prisma.plan.findMany({ select: { id: true } });
  return plans.map((plan) => ({ id: String(plan.id) }));
}

export default async function EditPlanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (isStaticMode) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Not Available</h1>
        <p className="text-gray-500">
          Editing collections is disabled in this static version. Run the app
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

  const { id } = await params;
  const [plan, products] = await Promise.all([
    prisma.plan.findUnique({
      where: { id: Number(id) },
      include: { products: true },
    }),
    prisma.product.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!plan) notFound();

  const { updatePlan } = await import("@/lib/actions");
  const { default: PlanForm } = await import("../../form");
  const updateWithId = updatePlan.bind(null, plan.id);

  return (
    <div className="max-w-lg mx-auto">
      <Link
        href={`/plans/${plan.id}`}
        className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-block"
      >
        &larr; Back to plan
      </Link>
      <h1 className="text-2xl font-bold mb-6">Edit Collection</h1>
      <PlanForm
        products={products}
        onSubmit={updateWithId}
        defaultName={plan.name}
        defaultDescription={plan.description}
        defaultProductIds={plan.products.map((p) => p.id)}
      />
    </div>
  );
}
