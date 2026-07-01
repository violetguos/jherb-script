import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { deletePlan } from "@/lib/actions";

export default async function PlanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plan = await prisma.plan.findUnique({
    where: { id: Number(id) },
    include: { products: true },
  });

  if (!plan) notFound();

  const total = plan.products.reduce((s, p) => s + p.price, 0);
  const deleteWithId = deletePlan.bind(null, plan.id);

  return (
    <div>
      <Link
        href="/"
        className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-block"
      >
        &larr; All collections
      </Link>

      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">{plan.name}</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">{plan.description}</p>
          <p className="text-sm text-gray-400 mt-2">
            {plan.products.length} products &middot; ${total.toFixed(2)} total
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link
            href={`/plans/${plan.id}/edit`}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Edit
          </Link>
          <form action={deleteWithId}>
            <button
              type="submit"
              className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </form>
        </div>
      </div>

      {plan.products.length === 0 ? (
        <p className="text-gray-500">No products in this plan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plan.products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group block rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square bg-gray-100 overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                )}
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-lg truncate">{product.name}</h2>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
