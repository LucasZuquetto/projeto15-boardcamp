import Joi from "joi";
import { connection } from "../database/db.js";

export default async function categoriesMiddleware(req, res, next) {
   const { name } = req.body;
   if (!name) {
      res.sendStatus(400);
      return;
   }
   const categorySchema = Joi.object({
      name: Joi.string().required(),
   });
   const validate = categorySchema.validate(req.body, { abortEarly: false });
   if (validate.error) {
      console.error(validate.error.details.map((detail) => detail.message));
      res.sendStatus(400);
      return;
   }

   try {
      const categorieExists = (
         await connection.query("SELECT * FROM categories WHERE name=$1;", [
            name,
         ])
      ).rows[0];
      if (categorieExists) {
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
