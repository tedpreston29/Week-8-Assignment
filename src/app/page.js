import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <button className="border-4 text-3xl  rounded-4xl p-2.5 w-2xs">
        <Link href={"/game-library"}>Enter</Link>
      </button>
    </div>
  );
}
