import DateExtension from '@joi/date';
import JoiImport from 'joi';
const joi = JoiImport.extend(DateExtension);

export const customersSchema = joi.object({
    name: joi.string().min(1).required(),
    phone: joi.string().min(10).max(11).required(),
    cpf: joi.string().min(11).max(11).required(),
    birthday: joi.date().format('YYYY-MM-DD').required()
})