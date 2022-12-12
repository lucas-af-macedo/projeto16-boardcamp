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
    try{
        console.log('not implemented');
        res.sendStatus(501);
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function deleteRentals(req, res){
    try{
        console.log('not implemented');
        res.sendStatus(501);
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}