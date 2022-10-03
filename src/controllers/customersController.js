import { connection } from "../database/db.js";

async function getCustomers(req, res) {
   const { cpf } = req.query;
   try {
      if (!cpf) {
         const customers = (await connection.query("SELECT * FROM customers;"))
            .rows;
         res.send(customers);
      } else {
         const customers = (
            await connection.query(
               "SELECT * FROM customers WHERE cpf LIKE ($1)",
               [`${cpf}`]
            )
         ).rows;
         res.send(customers);
      }
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
   }
}

async function getCustomerById(req, res) {
   const { id } = req.params;
   try {
      const customer = (
         await connection.query("SELECT * FROM customers WHERE id=($1);", [id])
      ).rows[0];
      res.send(customer);
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
   }
}

async function postCustomer(req, res) {
   const { name, phone, cpf, birthday } = req.body;
   try {
      await connection.query(
         "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1,$2,$3,$4);",
         [name, phone, cpf, birthday]
      );
      res.sendStatus(201);
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
   }
}

async function putCustomer(req, res) {
   const { id } = req.params;
   const { name, phone, cpf, birthday } = req.body;

   try {
      await connection.query(
         "UPDATE customers SET name=($1), phone=($2), cpf=($3), birthday=($4) WHERE id=($5);",
         [name, phone, cpf, birthday, id]
      );
      res.sendStatus(200);
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
   }
}

export { getCustomers, getCustomerById, postCustomer, putCustomer };
