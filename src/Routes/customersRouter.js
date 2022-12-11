import express from 'express';
import { getCustomers, getACustomers, postCustomers, putCustomers } from '../Controllers/customersController.js';
import { customersValidation, equalCpf } from '../Midlewares/customersMidleware.js';

const customersRouter = express.Router();

customersRouter.get('/customers:cpf?', getCustomers);
customersRouter.get('/customers/:id', getACustomers);
customersRouter.post('/customers', customersValidation, equalCpf, postCustomers);
customersRouter.put('/customers', putCustomers);

export default customersRouter;