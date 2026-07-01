"use client";

import { useTransition } from "react";

type Product = { id: number; name: string; price: number; imageUrl: string | null };
type Action = (formData: FormData) => Promise<void>;

export default function PlanForm({
  products,
  onSubmit,
  defaultProductIds,
  defaultName,
  defaultDescription,
}: {
  products: Product[];
  onSubmit: Action;
  defaultProductIds?: number[];
  defaultName?: string;
  defaultDescription?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={(fd) => startTransition(() => onSubmit(fd))}
      className="space-y-4"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Collection name
        </label>
        <input
          id="name"
          name="name"
          defaultValue={defaultName}
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={defaultDescription}
          required
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Products</label>
        <div className="max-h-80 overflow-y-auto space-y-2 rounded-lg border border-gray-200 p-3">
          {products.map((product) => {
            const checked = defaultProductIds?.includes(product.id) ?? false;
            return (
              <label
                key={product.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="productIds"
                  value={product.id}
                  defaultChecked={checked}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                  {product.imageUrl && (
                    <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <p className="text-xs text-gray-500">${product.price.toFixed(2)}</p>
                </div>
              </label>
            );
          })}
        </div>
        {products.length === 0 && (
          <p className="text-sm text-gray-400 mt-1">No products available.</p>
        )}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50 transition-colors"
      >
        {pending ? "Saving..." : "Save Collection"}
      </button>
    </form>
  );
}
