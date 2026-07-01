"use client";

import Link from "next/link";
import { deletePlan } from "@/lib/actions";

export default function PlanActions({ planId }: { planId: number }) {
  const deleteWithId = deletePlan.bind(null, planId);

  return (
    <div className="flex gap-2 shrink-0">
      <Link
        href={`/plans/${planId}/edit`}
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
  );
}
