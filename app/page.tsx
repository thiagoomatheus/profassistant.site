import Link from "next/link";
 
export default function Home() {
  return (
    <main className="mx-auto w-full h-screen p-24 flex flex-col items-center">
      <h1>Home</h1>
      <Link className="border" href={"/generator"}>gerador</Link>
    </main>
  );
}