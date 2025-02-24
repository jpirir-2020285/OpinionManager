import { Router } from "express" 
import { remove, save, update } from "./category.controller.js" 
import { validateJwt } from "../../middlewares/validate.jwt.js" 
import { validateAdmin } from "../../helpers/validate.role.js" 

const api = Router()
api.post(
    '/',
    [validateJwt,validateAdmin],
    save
)

api.put(
    '/update/:id',
    [validateJwt,validateAdmin],
    update
)

api.put(
    '/eliminate/:id',
    [validateJwt, validateAdmin],
    remove
)

export default api