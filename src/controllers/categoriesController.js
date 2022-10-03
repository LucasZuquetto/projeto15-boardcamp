import { connection } from "../database/db.js";

async function getCategories(req, res) {
   try {
      const categories = (await connection.query("SELECT * FROM categories"))
         .rows;
      res.send(categories);
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
   }
}

async function postCategories(req, res) {
   const { name } = req.body;
   try {
      await connection.query("INSERT INTO categories (name) VALUES ($1)", [
         name,
      ]);
      res.sendStatus(201);
   } catch (error) {
      console.log(error);
      res.sendStatus(500);
   }
}

export { postCategories, getCategories };
