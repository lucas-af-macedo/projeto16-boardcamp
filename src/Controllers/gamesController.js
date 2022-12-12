import connection from "../db/db.js";

export async function getGames(req, res) {
	const name = req.query?.name === undefined ? "" : req.query.name;

	try {
		const games = await connection.query(
			`
            SELECT 
                games.*,
                categories.name  AS "categoryName" 
            FROM 
                games 
            JOIN 
                categories 
            ON 
                games."categoryId"=categories.id
            WHERE
                games.name
            LIKE
                $1 || '%'
        `,
			[name]
		);

		res.status(200).send(games.rows);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function postGames(req, res) {
	const games = res.locals.games;

	try {
		await connection.query(
			`
            INSERT INTO  
                games (name, image, "stockTotal", "categoryId", "pricePerDay") 
            VALUES 
                ($1, $2, $3, $4, $5)`,
			[
				games.name,
				games.image,
				games.stockTotal,
				games.categoryId,
				games.pricePerDay,
			]
		);
		res.sendStatus(201);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}
