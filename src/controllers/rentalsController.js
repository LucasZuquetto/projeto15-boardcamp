import dayjs from "dayjs";
import { connection } from "../database/db.js";

async function getRentals(req, res) {
   const { customerId, gameId } = req.query;
}

async function postRentals(req, res) {
   const { customerId, gameId, daysRented } = req.body;
   const dateNow = dayjs().format("YYYY-MM-DD");
   const returnDate = null;
   const delayFee = null;
   try {
      const pricePerDay = (
         await connection.query(
            'SELECT "pricePerDay" FROM games WHERE id=($1);',
            [gameId]
         )
      ).rows[0].pricePerDay;
      const originalPrice = pricePerDay * daysRented;
      await connection.query(
         'INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES($1, $2, $3, $4, $5, $6, $7);',
         [
            customerId,
            gameId,
            dateNow,
            daysRented,
            returnDate,
            originalPrice,
            delayFee,
         ]
      );
      res.sendStatus(201);
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
   }
}

export { getRentals, postRentals };
