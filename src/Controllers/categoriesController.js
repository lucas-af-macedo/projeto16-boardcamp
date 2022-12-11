import connection from "../db/db.js";

export async function getCategories(req, res){
    try{
        const categories = await connection.query("SELECT * FROM categories");

        res.status(200).send(categories.rows);
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function postCategories(req, res){
    const name = res.locals.categories.name;
    
    try{
        await connection.query("INSERT INTO categories (name) VALUES ($1)",[name]);
        res.sendStatus(201);
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}