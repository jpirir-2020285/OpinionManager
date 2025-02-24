import { Router } from "express"
import { save, updateComment, deleteComment } from "./comment.controller.js"
import { validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router()

api.post(
    "/", 
    [validateJwt], 
    save
)

api.put(
    "/update/:id", 
    [validateJwt], 
    updateComment
)

api.delete(
    "/delete/:id", 
    [validateJwt], 
    deleteComment
)

export default api