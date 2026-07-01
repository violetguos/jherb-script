import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: { plans: true },
  });

  if (!product) notFound();

  return (
    <div>
      <Link
        href="/products"
        className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-block"
      >
        &larr; All products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>

          {product.plans.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-500 mb-2">Included in these plans:</p>
              <div className="flex flex-wrap gap-2">
                {product.plans.map((plan) => (
                  <Link
                    key={plan.id}
                    href={`/plans/${plan.id}`}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    {plan.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            <Link
              href="/"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Browse collections
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
