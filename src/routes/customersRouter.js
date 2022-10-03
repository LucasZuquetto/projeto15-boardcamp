import { Router } from "express";
import {
   getCustomerById,
   getCustomers,
   postCustomer,
   putCustomer,
} from "../controllers/customersController.js";
import {
   CustomerIdMiddleware,
   CustomerMiddleware,
} from "../middlewares/customerMiddleware.js";

const customerRouter = Router();

customerRouter.get("/customers", getCustomers);
customerRouter.get("/customers/:id", CustomerIdMiddleware, getCustomerById);
customerRouter.post("/customers", CustomerMiddleware, postCustomer);
customerRouter.put("/customers/:id", CustomerIdMiddleware, CustomerMiddleware, putCustomer);

export default customerRouter;
