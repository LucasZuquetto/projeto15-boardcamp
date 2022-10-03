import { Router } from "express";
import { deleteRentals, finishRentals, getRentals, postRentals } from "../controllers/rentalsController.js";
import { deleteRentalsMiddleware, finishRentalsMiddleware, postRentalsMiddleware } from "../middlewares/rentalsMiddleware.js";

const rentalsRouter = Router()

rentalsRouter.get('/rentals',getRentals)
rentalsRouter.post('/rentals',postRentalsMiddleware, postRentals)
rentalsRouter.post('/rentals/:id/return',finishRentalsMiddleware, finishRentals)
rentalsRouter.delete('/rentals/:id',deleteRentalsMiddleware,deleteRentals)

export default rentalsRouter