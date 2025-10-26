import { db } from "@/utils/utilities";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function NewCheatForm({ params }) {
  const { id } = await params; // note to self, dont do params.id - params is a promise so it doesn't hold a value yet at this point.

  const result = await db.query(
    `SELECT games.id,
    games.game_title,
    games.img_src FROM games WHERE id = $1`,
    [id]
  );

  const game = result.rows[0];
  console.log(game);

  if (!game) {
    return <p>Game not found. Please check the URL.</p>;
  }

  async function HandleSavedSub(formData) {
    "use server";
    console.log("saving post to the database...");

    const cheat_title = formData.get("cheat_title");
    const cheat_code = formData.get("cheat_code");
    const cheat_effect = formData.get("cheat_effect");

    await db.query(
      `INSERT INTO cheats (cheat_title, code, effect, game_id) VALUES ($1, $2, $3, $4)`,
      [cheat_title, cheat_code, cheat_effect, id]
    );
    console.log("cheat saved!");

    revalidatePath(`/game-library/${game.id}`);
    redirect(`/game-library/${game.id}`);
  }

  return (
    <div>
      <div className="form-page-image">
        <h2>{game.game_title}</h2>
        <img src={game.img_src} alt={game.game_title} />
      </div>
      <form className="form" action={HandleSavedSub}>
        <label htmlFor="cheat_title">Enter Title</label>
        <input id="cheat_title" name="cheat_title" type="text" required />

        <label htmlFor="cheat_code">Enter Code</label>
        <input id="cheat_code" name="cheat_code" type="text" required />

        <label htmlFor="cheat_effect">Enter Effect</label>
        <textarea id="cheat_effect" name="cheat_effect" required />

        <button type="submit">Submit Cheat</button>
      </form>
      <Link href={`/game-library`}>Back to Library</Link>
    </div>
  );
}
