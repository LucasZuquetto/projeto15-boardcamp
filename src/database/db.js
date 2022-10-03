import pg from "pg";

const { Pool } = pg;
const connection = new Pool({
   connectionString: 'postgres://postgres:12345@localhost:5432/boardcamp',
});

export { connection };
