import express from "express";
import connection from "../db/db.js";

export async function getCategories(req, res){
    try{
        const categories = await connection.query("SELECT * FROM categories");
        console.log(categories.rows);
        res.status(200).send(categories.rows);
    } catch(err){
        console.log(err);
        res.sendStatus(500);
        return;
    }
}