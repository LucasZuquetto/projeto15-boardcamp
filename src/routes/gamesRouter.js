import { Router } from "express";
import { getGames, postGames } from "../controllers/gamesController.js";
import gamesMiddleware from "../middlewares/gamesMiddleware.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", gamesMiddleware, postGames);

export default gamesRouter;
