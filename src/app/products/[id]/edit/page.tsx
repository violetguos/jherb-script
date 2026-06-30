import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditProductForm from "./form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product) notFound();

  return (
    <div className="max-w-lg mx-auto">
      <Link
        href={`/products/${product.id}`}
        className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-block"
      >
        &larr; Back to product
      </Link>
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <EditProductForm product={product} />
    </div>
  );
}
