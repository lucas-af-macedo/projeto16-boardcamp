import joi from "joi";

export const gamesSchema = joi.object({
	name: joi.string().min(1).required(),
	image: joi.string().uri().required(),
	stockTotal: joi.number().min(1).required(),
	categoryId: joi.number().required(),
	pricePerDay: joi.number().min(1).required(),
});
