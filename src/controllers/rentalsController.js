import dayjs from "dayjs";
import { connection } from "../database/db.js";

async function getRentals(req, res) {
   const { customerId, gameId } = req.query;
   try {
      if (customerId && !gameId) {
         const rentals = (
            await connection.query(
               `SELECT rentals.*, 
            JSON_BUILD_OBJECT('id', customers.id,'name', customers.name) AS customer, 
            JSON_BUILD_OBJECT('id', games.id, 'name', games.name, 'categoryId', games."categoryId",'categoryName', categories.name) AS game
            FROM rentals
            JOIN games ON rentals."gameId"=games.id
            JOIN customers ON rentals."customerId"=customers.id 
            JOIN categories ON games."categoryId"=categories.id
            WHERE rentals."customerId"=$1;
          `,
               [customerId]
            )
         ).rows;
         res.send(rentals);
         return;
      }

      if (gameId && !customerId) {
         const rentals = (
            await connection.query(
               `SELECT rentals.*, 
            JSON_BUILD_OBJECT('id', customers.id,'name', customers.name) AS customer, 
            JSON_BUILD_OBJECT('id', games.id, 'name', games.name, 'categoryId', games."categoryId",'categoryName', categories.name) AS game
            FROM rentals
            JOIN games ON rentals."gameId"=games.id
            JOIN customers ON rentals."customerId"=customers.id 
            JOIN categories ON games."categoryId"=categories.id
            WHERE rentals."gameId"=$1;
          `,
               [gameId]
            )
         ).rows;
         res.send(rentals);
         return;
      }

      if (gameId && customerId) {
         const rentals = (
            await connection.query(
               `SELECT rentals.*, 
            JSON_BUILD_OBJECT('id', customers.id,'name', customers.name) AS customer, 
            JSON_BUILD_OBJECT('id', games.id, 'name', games.name, 'categoryId', games."categoryId",'categoryName', categories.name) AS game
            FROM rentals
            JOIN games ON rentals."gameId"=games.id
            JOIN customers ON rentals."customerId"=customers.id 
            JOIN categories ON games."categoryId"=categories.id
            WHERE rentals."gameId"=$1 AND rentals."customerId"=$2;
          `,
               [gameId, customerId]
            )
         ).rows;
         res.send(rentals);
         return;
      }

      const rentals = (
         await connection.query(
            `SELECT rentals.*, 
        JSON_BUILD_OBJECT('id', customers.id,'name', customers.name) AS customer, 
        JSON_BUILD_OBJECT('id', games.id, 'name', games.name, 'categoryId', games."categoryId",'categoryName', categories.name) AS game
        FROM rentals
        JOIN games ON rentals."gameId"=games.id
        JOIN customers ON rentals."customerId"=customers.id 
        JOIN categories ON games."categoryId"=categories.id;
        `
         )
      ).rows;
      res.send(rentals);
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
   }
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

async function finishRentals(req,res){
    const { id } = req.params
    const dateNow = dayjs().format("YYYY-MM-DD")
    try {
        const rent = (await connection.query('SELECT "daysRented","rentDate", "gameId" FROM rentals WHERE id=($1);',[id])).rows[0]
        await connection.query('UPDATE rentals SET "returnDate"=($1) WHERE id=($2);',[dateNow,id])
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    }
}
async function deleteRentals(req,res){
    const {id} = req.params
    try {
        await connection.query('DELETE FROM rentals WHERE id=($1);',[id])
        res.sendStatus(200)
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    }
}

export { getRentals, postRentals, finishRentals, deleteRentals };
