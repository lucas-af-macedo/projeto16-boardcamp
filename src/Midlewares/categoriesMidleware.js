import connection from "../db/db.js";
import { categoriesSchema } from "../Schemas/categoriesSchema.js";
import { cleanStringData } from "../server.js";


export async function categorieValidation(req, res, next){
    const categories = {
        name: cleanStringData(req.body?.name)
    };

	const validation = categoriesSchema.validate(categories, { abortEarly: false });

	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		res.status(400).send(errors);
		return;
	} else {
		res.locals.categories = categories;
	}
	next();
}

export async function equalCategorie(req, res, next){
    const name = res.locals.categories.name;
    try{
        const categorie = await connection.query("SELECT * FROM categories WHERE name=$1",[name]);

        if (categorie.rows.length){
            res.sendStatus(409);
            return;
        }
        next();
    }catch (err){
        console.log(err);
        res.sendStatus(500);
    }
}