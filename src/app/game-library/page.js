import { db } from "@/utils/utilities";
import Link from "next/link";
import GamesDisplay from "@/components/GameDisplay";

export default async function MainLibrary({ searchParams }) {
  const resolvedParams = await searchParams;
  const sortParam = resolvedParams?.sort;
  const order = sortParam === "desc" ? "DESC" : "ASC";

  const results = await db.query(`SELECT games.id,
    games.game_title,
    games.img_src
   FROM games ORDER BY game_title ${order}`);

  const games = results.rows;

  return <GamesDisplay content={games} />;
}
