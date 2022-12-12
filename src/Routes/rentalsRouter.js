import express from 'express';
import { getRentals, postRentals, returnRentals, deleteRentals } from '../Controllers/rentalsController.js';
import { rentalsValidation, existCustomer, existGame, existRentals } from '../Midlewares/rentalsMidleware.js';

const rentalsRouter = express.Router();

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', rentalsValidation, existCustomer, existGame, postRentals);
rentalsRouter.post('/rentals/:id/return', existRentals, returnRentals);
rentalsRouter.delete('/rentals/:id', deleteRentals);

export default rentalsRouter;