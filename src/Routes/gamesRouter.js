import express from "express";
import { postGames, getGames } from "../Controllers/gamesController.js";
import {
	gamesValidation,
	existCategory,
	equalGame,
} from "../Midlewares/gamesMidleware.js";

const gamesRouter = express.Router();

gamesRouter.get("/games:name?", getGames);
gamesRouter.post(
	"/games",
	gamesValidation,
	equalGame,
	existCategory,
	postGames
);

export default gamesRouter;
