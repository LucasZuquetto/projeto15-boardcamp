import { Router } from "express";
import { getCustomerById, getCustomers, postCustomer } from "../controllers/customersController.js";
import { getCustomerByIdMiddleware, postCustomerMiddleware } from "../middlewares/customerMiddleware.js";

const customerRouter = Router()

customerRouter.get('/customers', getCustomers)
customerRouter.get('/customers/:id',getCustomerByIdMiddleware, getCustomerById)
customerRouter.post('/customers', postCustomerMiddleware, postCustomer)

export default customerRouter