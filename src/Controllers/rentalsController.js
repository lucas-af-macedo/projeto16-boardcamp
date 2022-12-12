import connection from "../db/db.js";
import dayjs from "dayjs";

export async function getRentals(req, res){
    const customerId = (req.query?.customerId===undefined) ? 0 : req.query.customerId;
    const gameId = (req.query?.gameId===undefined) ? 0 : req.query.gameId;

    try{
        const rentals = await connection.query(`
            SELECT 
                rentals.*,
                json_build_object('id', customers.id, 'name', customers.name) AS "customer",
                json_build_object('id', games.id, 'name', games.name, "categoryId", games."categoryId", 'categoryName', categories.name) AS game
            FROM
                rentals
            INNER JOIN 
                customers 
            ON 
                rentals."customerId"=customers.id
            INNER JOIN 
                games 
            ON 
                rentals."gameId"=games.id
            JOIN 
                categories 
            ON 
                games."categoryId"=categories.id
            WHERE (
                CASE 
                    WHEN
                        $1<>0
                    THEN
                        rentals."customerId"=$1
                    ELSE TRUE
                END
            )
            AND(
                CASE 
                    WHEN
                        $2<>0
                    THEN
                        rentals."customerId"=$2
                    ELSE TRUE
                END
            )
        `,[customerId, gameId]);
        
        res.status(200).send(rentals.rows);
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function postRentals(req, res){
    const rentals = res.locals.rentals;
    const now = dayjs().format("YYYY-MM-DD");

    try{
        const game = (await connection.query(`SELECT * FROM games WHERE id=$1`,[rentals.gameId])).rows[0];
        const originalPrice = game.pricePerDay * rentals.daysRented;
        const stockFinal = game.stockTotal - 1;

        await connection.query(`
            INSERT INTO  
                rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice") 
            VALUES 
                ($1, $2, $3, $4, $5)`,
            [rentals.customerId, rentals.gameId, rentals.daysRented, now, originalPrice]);

        res.sendStatus(201);

        await connection.query(`
            UPDATE 
                games 
            SET
                "stockTotal"=$1
            WHERE
                id=$2`,
            [stockFinal, game.id]);

    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function returnRentals(req, res){
    const rental = res.locals.rental
    const id = Number(req.params.id);
    const now = dayjs().format("YYYY-MM-DD");
    let delayDays = dayjs(now).diff(rental.rentDate, 'day') - rental.daysRented;

    if(delayDays<0){
        delayDays = 0;
    }

    try{
        const game = (await connection.query(`SELECT * FROM games WHERE id=$1`,[rental.gameId])).rows[0];
        const delayFee = delayDays * game.pricePerDay;
        const stockFinal = game.stockTotal + 1;

        await connection.query(`
            UPDATE 
                rentals 
            SET
                "returnDate"=$1, "delayFee"=$2
            WHERE
                id=$3`,
            [now, delayFee, id]);
        
        res.sendStatus(200);

        await connection.query(`
            UPDATE 
                games 
            SET
                "stockTotal"=$1
            WHERE
                id=$2`,
            [stockFinal, game.id]);
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function deleteRentals(req, res){
    const id = req.params.id;

    try{
        await connection.query(`DELETE FROM rentals WHERE id=$1`,[id]);
        
        res.sendStatus(200);
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}