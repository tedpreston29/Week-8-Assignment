import Image from "next/image";
import Link from "next/link";

export default function MainDisplay({ content }) {
  return (
    <>
      <header className="bg-[#1c1f24] rounded-2xl p-4 flex justify-between gap-3 mx-auto max-w-200 w-full mt-5 items-center">
        <h2 className="text-3xl ">Games Library</h2>

        <div className="flex gap-4">
          <Link
            className="bg-[#1c1f24] shadow-[inset_12px_12px_24px_#14161a,inset_-12px_-12px_24px_#24282e]
        hover:shadow-[8px_8px_16px_#14161a,-4px_-4px_16px_#24282e]
        transition-shadow duration-300 rounded-lg p-2 items-center text-rose-600 font-bold"
            href="/game-library?sort=asc"
          >
            Sort Ascending
          </Link>
          <Link
            className="bg-[#1b1e23]
        shadow-[inset_12px_12px_24px_#14161a,inset_-12px_-12px_24px_#24282e]
        hover:shadow-[8px_8px_16px_#14161a,-4px_-4px_16px_#24282e]
        transition-shadow duration-300 rounded-lg p-2 items-center text-rose-600 font-bold"
            href="/game-library?sort=desc"
          >
            Sort Descending
          </Link>
        </div>
      </header>
      <main className="flex justify-center mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:w-3/6 sm:w-4/6 md:w-5/6 p-5 bg-[#1c1f24] rounded-2xl">
          {content.map((games) => (
            <div
              key={games.id}
              className="flex flex-col items-center rounded-lg text-gray-200 text-center bg-[#1b1e23]
        shadow-[inset_12px_12px_24px_#14161a,inset_-12px_-12px_24px_#24282e]
        hover:shadow-[8px_8px_16px_#14161a,-8px_-8px_16px_#24282e]
        transition-shadow duration-300"
            >
              <p>{games.game_title}</p>
              <Link href={`/game-library/${games.id}`}>
                <Image
                  src={games.img_src}
                  width={500}
                  height={500}
                  alt={games.game_title}
                  className="w-full h-auto max-w-[180px] rounded-lg"
                />
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
