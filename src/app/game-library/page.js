import { db } from "@/utils/utilities";
import Link from "next/link";

export default async function MainLibrary({ searchParams }) {
  const sort = searchParams.sort;

  let order;
  if (sort === "desc") {
    order = "DESC";
  } else {
    order = "ASC";
  }

  const results = await db.query(`SELECT games.id,
    games.game_title,
    games.img_src
   FROM games ORDER BY game_title ${order}`);

  const games = results.rows;
  console.log("GameLibrary:", games);

  return (
    <div>
      <h2 className="relative text-3xl pl-5 mt-11 underline ">Games Library</h2>

      <div className="flex justify-end gap-4 pr-5 underline">
        <Link href="/game-library?sort=asc">Sort Ascending</Link>
        <Link href="/game-library?sort=desc">Sort Descending</Link>
      </div>

      <div className="game-collection">
        {games.map((games) => (
          <div
            key={games.id}
            className="justify-items-center items-center border-4 rounded-lg"
          >
            <p className="text-2xl">{games.game_title}</p>
            <Link href={`/game-library/${games.id}`}>
              <img src={games.img_src} alt={games.game_title}></img>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
