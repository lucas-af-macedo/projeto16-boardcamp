import connection from "../db/db.js";
import dayjs from "dayjs";

export async function getRentals(req, res){
    try{
        console.log('not implemented');
        res.sendStatus(501);
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