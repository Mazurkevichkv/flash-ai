import { sql } from "@vercel/postgres";

export default async function Page() {
  const { rows } = await sql`SELECT * from Tokens`;

  return <div>Cards</div>;
}
