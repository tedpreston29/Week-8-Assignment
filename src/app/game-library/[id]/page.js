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
      <div className="bg-[#1c1f24] shadow-[4px_4px_8px_#24282e] rounded-2xl p-4 flex justify-center gap-3 mx-auto max-w-80 w-full mt-5">
        <Link
          className="bg-[#1c1f24] shadow-[2px_2px_4px_#24282e] rounded-2xl p-2 hover:shadow-[2px_2px_4px_#14161a,-2px_-2px_4px_#24282e] text-rose-600 font-bold"
          href={"/game-library"}
        >
          Back to All Games?
        </Link>
        <AddNewCheat HandleSavedSub={HandleSavedSub} />
      </div>

      <div className="bg-[#1c1f24] shadow-[8px_8px_16px_#24282e] rounded-2xl p-8 flex flex-col items-center gap-6 mx-auto max-w-2xl w-full">
        <div
          className="flex flex-col items-center p-6 rounded-2xl w-full transition duration-300 ease-in-out
        bg-[#1c1f24]
        shadow-[inset_6px_6px_12px_#14161a,inset_-6px_-6px_12px_#24282e]
        hover:shadow-[8px_8px_16px_#14161a,-8px_-8px_16px_#24282e]"
          key={game.id}
        >
          <h2 className="text-2xl underline mb-4 text-gray-200">
            {game.game_title}
          </h2>

          <Image
            src={game.img_src}
            width={400}
            height={400}
            alt={game.game_title}
            className="rounded-xl transition duration-300 ease-in-out
          shadow-[6px_6px_12px_#14161a,-6px_-6px_12px_#24282e]
          hover:shadow-[8px_8px_16px_#14161a,-8px_-8px_16px_#24282e]"
          />

          <p className="text-gray-400 mt-3">
            {game.genre} | {game.release_year}
          </p>
        </div>

        <div className="flex flex-col gap-4 text-lg w-full">
          {cheats.map((cheat) => (
            <div
              className="rounded-2xl w-full p-4
            bg-[#1c1f24]
            shadow-[inset_6px_6px_12px_#14161a,inset_-6px_-6px_12px_#24282e]
            hover:shadow-[8px_8px_16px_#14161a,-8px_-8px_16px_#24282e]"
              key={cheat.cheats_id}
            >
              <p className="text-rose-600 font-bold">{cheat.cheat_title}</p>
              <p className="text-gray-300">{cheat.cheat_code}</p>
              <p className="text-gray-300">{cheat.cheat_effect}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
