import { Router } from 'express'
import { 
    get, 
    getAll, 
    update
} from './user.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

//Rutas privadas
api.get(
    '/asignarCurso', 
    [validateJwt], 
    getAll
)
api.get(
    '/:id', 
    [validateJwt],
    get
)

api.put(
    '/update',
    [validateJwt],
    update
)

export default api