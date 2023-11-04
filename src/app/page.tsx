import {sql} from "@vercel/postgres";

export default async function Page() {
    const { rows } = await sql`
        INSERT INTO Tokens (Token, Translation, UserId) 
        VALUES ('Hi', 'Hola', '1');`;

    console.log(rows);
    return (
      <div>
        Page
      </div>
  );
}