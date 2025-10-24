import { db } from "@/utils/utilities";
import Link from "next/link";

export default async function MainLibrary() {
  const results = await db.query(`SELECT games.id,
    games.game_title,
    games.img_src
   FROM games`);

  const games = results.rows;
  console.log("GameLibrary:", games);

  return (
    <div>
      <h2>Games Library</h2>
      <div className="game-collection">
        {games.map((games) => (
          <div key={games.id} className="indiv-game">
            <p>{games.game_title}</p>
            <Link href={`/game-library/${games.id}`}>
              <img src={games.img_src} alt={games.game_title}></img>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
