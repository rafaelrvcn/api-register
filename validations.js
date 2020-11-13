import Joi from 'joi'

export const userSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .required(),

    phone: Joi.string()
        .min(11)
        .max(13)
        .required(),

    cpf: Joi.string()
        .min(3)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    birthDate: Joi.date()
})