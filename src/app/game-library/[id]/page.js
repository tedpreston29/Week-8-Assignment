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
    <div className="flex flex-col mt-11 align ml-14 mb-10 gap-5">
      <div
        className="justify-items-center items-center border-4 rounded-lg max-w-2xl text-2xl"
        key={game.id}
      >
        <h2>{game.game_title}</h2>
        <img src={game.img_src} alt={game.game_title} />
        <p>Released: {game.release_year}</p>
        <p>Genre: {game.genre}</p>
      </div>
      <div className="flex flex-col gap-3 text-[18px]">
        {cheats.map((cheat) => (
          <div
            className="border-4 rounded-lg max-w-2xl  bg-gray-900"
            key={cheat.cheats_id}
          >
            <p className="text-fuchsia-400  font-bold underline text-2xl">
              CHEAT TITLE :
            </p>
            <p>{cheat.cheat_title}</p>
            <p className=" text-neutral-400 font-bold underline text-2xl">
              CHEAT CODE :
            </p>
            <p>{cheat.cheat_code}</p>
            <p className=" text-neutral-400 font-bold underline text-2xl">
              CHEAT EFFECT :
            </p>
            <p>{cheat.cheat_effect}</p>
          </div>
        ))}
      </div>
      <div className="underline flex flex-col gap-5 text-[20px]">
        <Link href={`/game-library/${game.id}/form`}>Submit New Cheat </Link>
        <Link href={"/game-library"}>Back to All Games</Link>
      </div>
    </div>
  );
}
