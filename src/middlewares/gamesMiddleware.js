import Joi from "joi";
import { connection } from "../database/db.js";

export default async function gamesMiddleware(req, res, next) {
   const gameObject = req.body;

   const gameSchema = Joi.object({
      name: Joi.string().required(),
      image: Joi.string().required(),
      stockTotal: Joi.number().greater(0).required(),
      categoryId: Joi.number().required(),
      pricePerDay: Joi.number().greater(0).required(),
   });
   const validate = gameSchema.validate(gameObject, { abortEarly: false });
   if (validate.error) {
      console.error(validate.error.details.map((detail) => detail.message));
      res.sendStatus(400);
      return;
   }
   try {
      const categoryIdExists = (
         await connection.query("SELECT * FROM categories WHERE id=($1);", [
            gameObject.categoryId,
         ])
      ).rows[0];
      if (!categoryIdExists) {
         res.sendStatus(400);
         return;
      }
      const nameExists = (
         await connection.query("SELECT * FROM games WHERE name=($1)", [
            gameObject.name,
         ])
      ).rows[0];
      if (nameExists) {
         res.sendStatus(409);
         return;
      }
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
      return;
   }
   next();
}
