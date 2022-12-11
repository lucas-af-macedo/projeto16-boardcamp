import connection from "../db/db.js";

export async function getGames(req, res){
    try{
        console.log('not implemented')
        res.sendStatus(501)
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function postGames(req, res){
    const games = res.locals.games;
    
    try{
        await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',[games.name, games.image, games.stockTotal, games.categoryId, games.pricePerDay]);
        res.sendStatus(200)
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}