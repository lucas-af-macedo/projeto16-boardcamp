import express from "express";
import { getCategories, postCategories } from "../Controllers/categoriesController.js"; 
import { equalCategorie, categorieValidation } from "../Midlewares/categoriesMidleware.js";

const categoriesRouter = express.Router();
categoriesRouter.get('/categories', getCategories);
categoriesRouter.post('/categories', categorieValidation, equalCategorie, postCategories);

export default categoriesRouter;