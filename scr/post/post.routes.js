import { Router } from "express"
import { createPost, update, deletePost } from "./post.controller.js"
import { validateJwt } from "../../middlewares/validate.jwt.js" 

const api = Router()

api.post(
    "/", 
    [validateJwt], 
    createPost
)

api.put("/update/:id", 
    [validateJwt], 
    update
)

api.put("/delete/:id", 
    [validateJwt], 
    deletePost
)


export default api