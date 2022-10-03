import { connection } from "../database/db.js";

async function getGames(req, res) {
   const { name } = req.query;
   try {
      if (!name) {
         const games = (
            await connection.query(
               'SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id;'
            )
         ).rows;
         res.send(games);
      } else {
         const games = (
            await connection.query(
               'SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id WHERE games.name ILIKE ($1);',
               [`${name}%`]
            )
         ).rows;
         res.send(games);
      }
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
   }
}
async function postGames(req, res) {
   const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
   try {
      await connection.query(
         'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',
         [name, image, stockTotal, categoryId, pricePerDay]
      );
      res.sendStatus(201);
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
   }
}

export { getGames, postGames };
