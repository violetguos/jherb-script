import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const plans = await prisma.plan.findMany({
    include: { products: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Collections</h1>
      <p className="text-gray-500 mb-8">Curated supplement stacks for your wellness goals.</p>

      {plans.length === 0 ? (
        <p className="text-gray-500">No collections yet. Create your first plan!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <Link
              key={plan.id}
              href={`/plans/${plan.id}`}
              className="group block rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold group-hover:text-gray-600 transition-colors">
                  {plan.name}
                </h2>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {plan.description}
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-xs font-medium text-gray-400">
                    {plan.products.length} product{plan.products.length !== 1 ? "s" : ""}
                  </span>
                  <span className="text-xs text-gray-300">·</span>
                  <span className="text-xs text-gray-400">
                    ${plan.products.reduce((s, p) => s + p.price, 0).toFixed(0)}+
                  </span>
                </div>
                <div className="flex -space-x-2 mt-3">
                  {plan.products.slice(0, 4).map((product) => (
                    <div
                      key={product.id}
                      className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden"
                    >
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                      ) : null}
                    </div>
                  ))}
                  {plan.products.length > 4 && (
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs text-gray-500 font-medium">
                      +{plan.products.length - 4}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
