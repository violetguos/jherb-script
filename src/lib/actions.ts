"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function createPlan(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const productIds = formData.getAll("productIds").map(Number);

  await prisma.plan.create({
    data: {
      name,
      description,
      products: { connect: productIds.map((id) => ({ id })) },
    },
  });

  revalidatePath("/");
  redirect("/");
}

export async function updatePlan(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const productIds = formData.getAll("productIds").map(Number);

  await prisma.plan.update({
    where: { id },
    data: {
      name,
      description,
      products: { set: productIds.map((id) => ({ id })) },
    },
  });

  revalidatePath("/");
  revalidatePath(`/plans/${id}`);
  redirect("/");
}

export async function deletePlan(id: number) {
  await prisma.plan.delete({ where: { id } });

  revalidatePath("/");
  redirect("/");
}
