import connection from "../db/db.js";
import { rentalsSchema } from "../Schemas/rentalsSchema.js";
import { cleanStringData } from "../server.js";


export async function rentalsValidation(req, res, next){
    const rentals = {};

    Object.keys(req.body).forEach((key)=>(
        rentals[key] = cleanStringData(req.body[key])
    ));


	const validation = rentalsSchema.validate(rentals, { abortEarly: false });

	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		res.status(400).send(errors);
		return;
	} else {
		res.locals.rentals = rentals;
	}
	next();
}

export async function existCustomer(req, res, next){
    const customerId = res.locals.rentals.customerId;
    console.log(customerId)
    
    try{
        const customer = await connection.query("SELECT * FROM categories WHERE id=$1",[customerId]);

        if (!customer.rows.length){
            res.sendStatus(400);
            return;
        }
        next();
    }catch (err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function existGame(req, res, next){
    const gameId = res.locals.rentals.gameId;

    try{
        const games = await connection.query("SELECT * FROM games WHERE id=$1",[gameId]);

        if (!games.rows.length){
            res.sendStatus(400);
            return;
        } else if (!games.rows[0].stockTotal){
            res.sendStatus(400);
            return;
        }
        next();
    }catch (err){
        console.log(err);
        res.sendStatus(500);
    }
}