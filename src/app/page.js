import Link from "next/link";

export default async function HomePage() {
  return (
    <div>
      <button className="enter-button">
        <Link href={"/game-library"}>Enter</Link>
      </button>
    </div>
  );
}
