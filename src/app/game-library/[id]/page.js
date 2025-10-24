import { db } from "@/utils/utilities";
import Link from "next/link";

export default async function GamePage({ params }) {
  const { id } = await params;

  const result = await db.query(
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
  const game = result.rows[0];
  const cheats = game.cheat_info;

  console.log("individual game:", game);
  console.log("Individual cheat:", cheats);

  return (
    <div>
      <div key={game.id}>
        <h2>{game.game_title}</h2>
        <img src={game.img_src} alt={game.game_title} />
        <p>RELEASED: {game.release_year}</p>
        <p>GENRE: {game.genre}</p>
      </div>
      <div className="cheats-container">
        {cheats.map((cheat) => (
          <div key={cheat.cheats_id} className="cheats-item">
            <p className="font-bold">CHEAT TITLE: {cheat.cheat_title}</p>
            <p>CHEAT CODE: {cheat.cheat_code}</p>
            <p>CHEAT EFFECT: {cheat.cheat_effect}</p>
          </div>
        ))}
      </div>
      <Link href={"/game-library"}>Back to All Games</Link>
    </div>
  );
}
