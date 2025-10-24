// import RootLayout from "./layout";
import { db } from "@/utils/utilities";

export default async function HomePage() {
  const result = await db.query(`SELECT
    games.id,
    games.game_title,
    games.release_year,
    games.img_src,
    ARRAY_AGG (json_build_object(
      'cheat_title', cheats.cheat_title,
      'cheat_code', cheats.code,
      'cheat_effect', cheats.effect
    )) AS cheat_info
    FROM games
    LEFT JOIN cheats ON cheats.game_id = games.id
    GROUP BY games.id, games.release_year, games.img_src`);
  console.log(result);

  return (
    <div>
      <h1>hi</h1>
    </div>
  );
}
