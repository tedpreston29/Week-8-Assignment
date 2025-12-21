import { db } from "@/utils/utilities";

export async function DELETE(request) {
  console.log("DELETE /api/cheats hit");

  const { searchParams } = new URL(request.url);
  const cheatId = searchParams.get("id");

  console.log("cheatId:", cheatId);

  if (!cheatId) {
    return new Response("Missing cheat id", { status: 400 });
  }

  await db.query(`DELETE FROM cheats WHERE id = $1`, [cheatId]);

  return new Response(null, { status: 204 });
}
