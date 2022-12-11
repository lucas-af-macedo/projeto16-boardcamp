import connection from "../db/db.js";
import { gamesSchema } from "../Schemas/gamesSchema.js";
import { cleanStringData } from "../server.js";


export async function gamesValidation(req, res, next){
    console.log(req.body?.image)
    const games = {
        name: req.body?.name!==undefined ? cleanStringData(req.body?.name):undefined,
        image: req.body?.image!==undefined ? cleanStringData(req.body?.image):undefined,
        stockTotal: req.body?.stockTotal,
        categoryId: req.body?.categoryId,
        pricePerDay: req.body?.pricePerDay
    };

	const validation = gamesSchema.validate(games, { abortEarly: false });

	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		res.status(400).send(errors);
		return;
	} else {
		res.locals.games = games;
	}
	next();
}

export async function existCategory(req, res, next){
    const categoryId = res.locals.games.categoryId;
    try{
        const category = await connection.query("SELECT * FROM categories WHERE id=$1",[categoryId]);

        if (!category.rows.length){
            res.sendStatus(400);
            return;
        }
        next();
    }catch (err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function equalGame(req, res, next){
    const name = res.locals.games.name;
    try{
        const games = await connection.query("SELECT * FROM games WHERE name=$1",[name]);

        if (games.rows.length){
            res.sendStatus(409);
            return;
        }
        next();
    }catch (err){
        console.log(err);
        res.sendStatus(500);
    }
}