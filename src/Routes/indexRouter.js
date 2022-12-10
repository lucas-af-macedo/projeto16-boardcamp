import express from "express";
import categoriesRouter from "./categoriesRouter.js";

const router = express.Router();
router.use(categoriesRouter);

export default router;