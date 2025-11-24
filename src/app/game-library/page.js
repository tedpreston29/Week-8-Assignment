import { db } from "@/utils/utilities";
import Link from "next/link";
import Image from "next/image";

export default async function MainLibrary({ searchParams }) {
  const resolvedParams = await searchParams;
  const sortParam = resolvedParams?.sort;

  const order = sortParam === "desc" ? "DESC" : "ASC";

  const results = await db.query(`SELECT games.id,
    games.game_title,
    games.img_src
   FROM games ORDER BY game_title ${order}`);

  const games = results.rows;
  console.log("GameLibrary:", games);

  return (
    <div className="flex justify-center">
      <div className="lg:w-5/6 p-4">
        <div>
          <div className="flex items-baseline justify-between m-2.5 ">
            <h2 className="text-3xl underline">Games Library</h2>

            <div className="flex justify-end gap-4 underline">
              <Link className="text-red-700" href="/game-library?sort=asc">
                Sort Ascending
              </Link>
              <Link className="text-cyan-300" href="/game-library?sort=desc">
                Sort Descending
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {games.map((games) => (
              <div
                key={games.id}
                className="flex flex-wrap justify-items-center items-center border-4 rounded-lg"
              >
                <p className="text-">{games.game_title}</p>
                <Link href={`/game-library/${games.id}`}>
                  <Image
                    src={games.img_src}
                    width={500}
                    height={500}
                    alt={games.game_title}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
