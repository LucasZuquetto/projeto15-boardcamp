import { connection } from "../database/db.js";

async function getCustomers(req, res) {
   const { cpf } = req.query;
   try {
      if (!cpf) {
         const customers = (await connection.query("SELECT * FROM customers;"))
            .rows;
         res.send(customers);
      }else{
        const customers = (await connection.query('SELECT * FROM customers WHERE cpf LIKE ($1)',[`${cpf}`])).rows
        res.send(customers)
      }
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
   }
}

export { getCustomers };
