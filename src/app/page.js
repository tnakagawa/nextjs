import { sql } from "@vercel/postgres";

export default async function Home() {
  const { rows } = await sql`SELECT LOCALTIME`;

  return (
    <main className="flex flex-col p-6">
      <div className="flex place-content-center">
        <div className="text-xl">Hello</div>
      </div>
      <div className="flex place-content-center">
        <div>{process.env.TEST_ENV}</div>
      </div>
      <div className="flex place-content-center">
        <div>
          {rows[0].localtime}
        </div>
      </div>
    </main>
  );
}
