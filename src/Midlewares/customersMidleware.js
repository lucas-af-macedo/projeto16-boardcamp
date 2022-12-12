import connection from "../db/db.js";
import { customersSchema } from "../Schemas/customersSchema.js";
import { cleanStringData } from "../server.js";

export async function customersValidation(req, res, next) {
	const customer = {};

	Object.keys(req.body).forEach(
		(key) => (customer[key] = cleanStringData(req.body[key]))
	);

	const validation = customersSchema.validate(customer, { abortEarly: false });

	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		res.status(400).send(errors);
		return;
	} else {
		res.locals.customer = customer;
	}
	next();
}

export async function equalCpf(req, res, next) {
	const cpf = res.locals.customer.cpf;

	try {
		const customer = await connection.query(
			"SELECT * FROM customers WHERE cpf=$1",
			[cpf]
		);

		if (customer.rows.length) {
			res.sendStatus(409);
			return;
		}
		next();
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function equalCpfId(req, res, next) {
	const cpf = res.locals.customer.cpf;
	const id = req.params.id;

	try {
		const customer = await connection.query(
			"SELECT * FROM customers WHERE cpf=$1 AND id!=$2",
			[cpf, id]
		);

		if (customer.rows.length) {
			res.sendStatus(409);
			return;
		}
		next();
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}
