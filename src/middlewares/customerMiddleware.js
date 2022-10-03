import Joi from "joi";
import { connection } from "../database/db.js";

async function CustomerIdMiddleware(req, res, next) {
   const { id } = req.params;
   try {
      const customerIdExists = (
         await connection.query("SELECT * FROM customers WHERE id=($1)", [id])
      ).rows[0];
      if (!customerIdExists) {
         res.sendStatus(404);
         return;
      }
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
   }
   next();
}

async function CustomerMiddleware(req, res, next) {
   const { cpf } = req.body;
   const customerObject = req.body;

   const customerSchema = Joi.object({
      name: Joi.string().required(),
      phone: Joi.string()
         .pattern(/^[0-9]+$/)
         .min(10)
         .max(11),
      cpf: Joi.string()
         .length(11)
         .pattern(/^[0-9]+$/)
         .required(),
      birthday: Joi.date().required(),
   });
   const validate = customerSchema.validate(customerObject, {
      abortEarly: false,
   });
   if (validate.error) {
      console.error(validate.error.details.map((detail) => detail.message));
      res.sendStatus(400);
      return;
   }

   try {
      const cpfExists = (
         await connection.query("SELECT * FROM customers WHERE cpf=($1);", [
            cpf,
         ])
      ).rows[0];
      if (cpfExists) {
         res.sendStatus(409);
         return;
      }
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
   }
   next();
}

export { CustomerIdMiddleware, CustomerMiddleware };
