import {sql} from "@vercel/postgres";

export default async function Page() {
    const { rows } = await sql`SELECT * from Tokens`;

    console.log(rows)
    return (
        <div>
            Cards
        </div>
    );
}