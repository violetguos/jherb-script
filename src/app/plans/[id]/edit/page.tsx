import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePlan } from "@/lib/actions";
import PlanForm from "../../form";

export default async function EditPlanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [plan, products] = await Promise.all([
    prisma.plan.findUnique({
      where: { id: Number(id) },
      include: { products: true },
    }),
    prisma.product.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!plan) notFound();

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
