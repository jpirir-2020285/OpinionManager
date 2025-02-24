import { body } from "express-validator"
import { existEmail, existUsername } from "./db.validators.js"


export const registerValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('surname', 'Surname cannot be empty').notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email').notEmpty().isEmail().custom(existEmail),
    body('username', 'Username cannot be empty').notEmpty().toLowerCase().custom(existUsername),
    body('password', 'Password cannot be empty').notEmpty().isStrongPassword().withMessage('The password must be strong').isLength({min: 8}),
    body('phone', 'Phone cannot be empty or is not a valid phone').notEmpty()
]

export const loginValidator = [
    body('password', 'Password cannot be empty').notEmpty().isStrongPassword().withMessage('The password must be strong').isLength({min: 8})
]