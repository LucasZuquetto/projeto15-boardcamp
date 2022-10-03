import { Router } from "express";
import { getRentals, postRentals } from "../controllers/rentalsController.js";
import { postRentalsMiddleware } from "../middlewares/rentalsMiddleware.js";

const rentalsRouter = Router()

rentalsRouter.get('/rentals',getRentals)
rentalsRouter.post('/rentals',postRentalsMiddleware, postRentals)

export default rentalsRouter