import express from "express";
import {
	getCustomers,
	getCustomersById,
	postCustomers,
	putCustomers,
} from "../Controllers/customersController.js";
import {
	customersValidation,
	equalCpf,
	equalCpfId,
} from "../Midlewares/customersMidleware.js";

const customersRouter = express.Router();

customersRouter.get("/customers:cpf?", getCustomers);
customersRouter.get("/customers/:id", getCustomersById);
customersRouter.post(
	"/customers",
	customersValidation,
	equalCpf,
	postCustomers
);
customersRouter.put(
	"/customers/:id",
	customersValidation,
	equalCpfId,
	putCustomers
);

export default customersRouter;
