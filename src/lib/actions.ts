"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const imageUrl = (formData.get("imageUrl") as string) || null;

  await prisma.product.create({
    data: { name, description, price, imageUrl },
  });

  revalidatePath("/");
  redirect("/");
}

export async function updateProduct(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const imageUrl = (formData.get("imageUrl") as string) || null;

  await prisma.product.update({
    where: { id },
    data: { name, description, price, imageUrl },
  });

  revalidatePath("/");
  revalidatePath(`/products/${id}`);
  redirect("/");
}

export async function deleteProduct(id: number) {
  await prisma.product.delete({ where: { id } });

  revalidatePath("/");
  redirect("/");
}
