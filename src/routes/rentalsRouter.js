import { Router } from "express";
import { deleteRentals, finishRentals, getRentals, postRentals } from "../controllers/rentalsController.js";
import { deleteRentalsMiddleware, postRentalsMiddleware } from "../middlewares/rentalsMiddleware.js";

const rentalsRouter = Router()

rentalsRouter.get('/rentals',getRentals)
rentalsRouter.post('/rentals',postRentalsMiddleware, postRentals)
rentalsRouter.post('/rentals/:id/return', finishRentals)
rentalsRouter.delete('/rentals/:id',deleteRentalsMiddleware,deleteRentals)

export default rentalsRouter