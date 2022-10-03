import { Router } from "express";
import { getCustomerById, getCustomers } from "../controllers/customersController.js";
import { getCustomerByIdMiddleware } from "../middlewares/customerMiddleware.js";

const customerRouter = Router()

customerRouter.get('/customers', getCustomers)
customerRouter.get('/customers/:id',getCustomerByIdMiddleware, getCustomerById)

export default customerRouter