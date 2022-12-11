import express from "express";
import { getCategories, postCategories } from "../Controllers/categoriesController.js"; 
import { equalCategory, categoryValidation } from "../Midlewares/categoriesMidleware.js";

const categoriesRouter = express.Router();
categoriesRouter.get('/categories', getCategories);
categoriesRouter.post('/categories', categoryValidation, equalCategory, postCategories);

export default categoriesRouter;