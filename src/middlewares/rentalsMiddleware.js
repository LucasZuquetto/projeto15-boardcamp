import { connection } from "../database/db.js";

async function postRentalsMiddleware(req, res, next) {
   const { customerId, gameId, daysRented } = req.body;
   try {
      const customerExists = (await connection.query(
         "SELECT * FROM customers WHERE id=($1);",
      [customerId])).rows[0];
      const gameExists = (await connection.query(
         "SELECT * FROM games WHERE id=($1);"
      ,
      [gameId])).rows[0];
      const rentalsTotal = (
         await connection.query('SELECT * FROM rentals WHERE "gameId"=($1);', [
            gameId,
         ])
      ).rows.length;
      const stockTotal = (
         await connection.query("SELECT * FROM games WHERE id=($1);", [gameId])
      ).rows[0].stockTotal;

      if (
         !customerExists ||
         !gameExists ||
         daysRented <= 0 ||
         stockTotal <= rentalsTotal
      ) {
         res.sendStatus(400);
         return;
      }
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
   }

   next();
}

export { postRentalsMiddleware };
