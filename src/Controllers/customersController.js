import connection from "../db/db.js";

export async function getCustomers(req, res){
    const cpf = req.query?.cpf==undefined?"":req.query.cpf;

    try{
        const customers = await connection.query(`SELECT * FROM customers WHERE cpf LIKE $1 || '%'`,[cpf]);

        res.status(200).send(customers.rows);
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
    const customer = res.locals.customer;
    const  id = req.params.id;

    try{
        await connection.query(`
            UPDATE 
                customers 
            SET
                name=$1, phone=$2, cpf=$3, birthday=$4
            WHERE
                id=$5`,
            [customer.name, customer.phone, customer.cpf, customer.birthday, id]);
        res.sendStatus(200)
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}