import express from "express";
import categoriesRouter from "./categoriesRouter.js";
import gamesRouter from "./gamesRouter.js";
import customersRouter from "./customersRouter.js";

const router = express.Router();
router.use(categoriesRouter);
router.use(gamesRouter);
router.use(customersRouter);

export default router;