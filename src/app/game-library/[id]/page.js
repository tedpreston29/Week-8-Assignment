import { db } from "@/utils/utilities";
import Link from "next/link";
import AddNewCheat from "@/components/AddNewCheat";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Image from "next/image";

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
  const game = gameDetails.rows[0];
  const cheats = game.cheat_info;

  if (!game) {
    return <p>Game not found. Please check the URL.</p>;
  }

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
    <section className="flex flex-col gap-5">
      <div className="underline flex flex-col items-start gap-1 m-2 text-lg">
        <Link href={"/game-library"}>Back to All Games?</Link>
        <AddNewCheat HandleSavedSub={HandleSavedSub} />
      </div>

      <div className="bg-[#0f0f13] rounded-lg p-6 flex flex-col items-center pb-4 gap-4 mx-auto max-w-2xl w-full">
        <div
          className="flex flex-col  items-center p-3 rounded-lg w-full scale-100 transition duration-300 ease-in-out hover:scale-105 "
          key={game.id}
        >
          <h2 className="text-2xl underline mb-4">{game.game_title}</h2>

          <Image
            src={game.img_src}
            width={400}
            height={400}
            alt={game.game_title}
            className="transition duration-300 ease-in-out hover:shadow-[0_0_5px_6px_rgba(0,128,255,0.8)]"
          />

          <p className="text-muted-foreground">
            {game.genre} | {game.release_year}
          </p>
        </div>

        <div className="flex flex-col gap-3 text-lg w-full drop-shadow-lg m-5">
          {cheats.map((cheat) => (
            <div
              className="bg-gray-900 rounded-lg w-full p-3  transition duration-300 ease-in-out hover:shadow-[0_0_10px_1px_rgba(0,128,255,0.8)]"
              key={cheat.cheats_id}
            >
              <p className="text-rose-600 font-bold">{cheat.cheat_title}</p>
              <p>{cheat.cheat_code}</p>
              <p>{cheat.cheat_effect}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
