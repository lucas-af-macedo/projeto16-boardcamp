import connection from "../db/db.js";

export async function getCustomers(req, res){
    try{
        console.log('not implemented1');
        res.sendStatus(501);
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getACustomers(req, res){
    try{
        console.log('not implemented2');
        res.sendStatus(501);
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function postCustomers(req, res){
    const customer = res.locals.customer;

    try{
        await connection.query(`
            INSERT INTO  
                customers (name, phone, cpf, birthday) 
            VALUES 
                ($1, $2, $3, $4)`,
            [customer.name, customer.phone, customer.cpf, customer.birthday]);
        res.sendStatus(201)
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function putCustomers(req, res){
    try{
        console.log('not implemented');
        res.sendStatus(501);
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}