import Link from "next/link";
import Image from "next/image";
import AddNewCheat from "@/components/AddNewCheat";
import DeleteCheatButton from "./DeleteButton";

export default function IndivDisplay({ HandleSavedSub, game, cheats }) {
  return (
    <section className="flex flex-col gap-5">
      <header className="bg-[#1c1f24] rounded-2xl p-4 flex justify-between gap-3 mx-auto max-w-100 w-full mt-5 ">
        <Link
          className="bg-[#1c1f24] shadow-[2px_2px_4px_#24282e] rounded-2xl p-2 hover:shadow-[2px_2px_4px_#14161a,-2px_-2px_4px_#24282e] text-rose-600 font-bold"
          href={"/game-library"}
        >
          Back to All Games?
        </Link>
        <AddNewCheat HandleSavedSub={HandleSavedSub} />
      </header>

      <div className="bg-[#1c1f24] rounded-2xl p-8 flex flex-col items-center gap-6 mx-auto max-w-2xl w-full">
        <div
          className="flex flex-col items-center p-6 rounded-2xl w-full transition duration-300 ease-in-out
        bg-[#1c1f24]
        shadow-[inset_6px_6px_12px_#14161a,inset_-6px_-6px_12px_#24282e]
        hover:shadow-[6px_6px_12px_#14161a,-6px_-6px_12px_#24282e]"
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
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-rose-600 font-bold">{cheat.cheat_title}</p>
                  <p className="text-gray-300">{cheat.cheat_code}</p>
                  <p className="text-gray-300">{cheat.cheat_effect}</p>
                </div>
                <DeleteCheatButton cheatId={cheat.cheats_id} gameId={game.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
