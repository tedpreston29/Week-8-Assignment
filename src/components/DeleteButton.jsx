"use client";

import { useRouter } from "next/navigation";

export default function DeleteCheatButton({ cheatId, gameId }) {
  const router = useRouter();

  async function handleDelete() {
    const res = await fetch(`/api/cheats?id=${cheatId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh(); // re-fetches page data
    } else {
      console.error("Delete failed");
    }
  }

  return (
    <button className="text-rose-600" onClick={handleDelete}>
      X
    </button>
  );
}
