import { connection } from "../database/db.js";

async function getCustomerByIdMiddleware(req, res, next) {
   const { id } = req.params;
   try {
    const customerIdExists = (await connection.query('SELECT * FROM customers WHERE id=($1)',[id])).rows[0]
    if (!customerIdExists) {
        res.sendStatus(404)
        return
    }
   } catch (error) {
    console.log(error.message)
    res.sendStatus(500)
   }
   next();
}

export { getCustomerByIdMiddleware };
