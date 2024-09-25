import Joi from "joi";

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

const signUpSchema = Joi.object({
    name:  Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

export {loginSchema, signUpSchema}