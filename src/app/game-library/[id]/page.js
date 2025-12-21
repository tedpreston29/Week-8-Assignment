import { db } from "@/utils/utilities";
import Link from "next/link";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import IndivDisplay from "@/components/IndivDisplay";

export default async function GamePage({ params }) {
  const { id } = await params;

  const gameDetails = await db.query(
    `SELECT games.id,
    games.game_title,
    games.release_year,
    games.genre,
    games.img_src,
    ARRAY_AGG (json_build_object(
      'cheats_id', cheats.id,
      'game_id', cheats.game_id,
      'cheat_title', cheats.cheat_title,
      'cheat_code', cheats.code,
      'cheat_effect', cheats.effect
    )) AS cheat_info
    FROM games
    LEFT JOIN cheats ON cheats.game_id = games.id
    WHERE games.id = $1
    GROUP BY games.id, games.release_year, games.img_src, games.genre`,
    [id]
  );
  const game = gameDetails?.rows?.[0];

  if (!game) {
    return <p>Game not found. Please check the URL.</p>;
  }

  const cheats = game.cheat_info || [];

  async function HandleSavedSub(formData) {
    "use server";
    const cheat_title = formData.get("cheat_title");
    const cheat_code = formData.get("cheat_code");
    const cheat_effect = formData.get("cheat_effect");
    await db.query(
      `INSERT INTO cheats (cheat_title, code, effect, game_id) VALUES ($1, $2, $3, $4)`,
      [cheat_title, cheat_code, cheat_effect, id]
    );
    revalidatePath(`/game-library/${game.id}`);
    redirect(`/game-library/${game.id}`);
  }

  return (
    <IndivDisplay HandleSavedSub={HandleSavedSub} game={game} cheats={cheats} />
  );
}
