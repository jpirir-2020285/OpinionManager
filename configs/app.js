'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import { limiter } from '../middlewares/rate.limit.js'
import authRoutes from '../scr/auth/auth.routes.js'
import userRoutes from '../scr/user/user.routes.js'
import categoryRoutes from '../scr/category/category.routes.js'
import postRoutes from '../scr/post/post.routes.js'
import commentRoutes from '../scr/comment/comment.routes.js'
import { createDefaultAdmin } from '../scr/user/user.controller.js'
import { createDefaultCategory } from '../scr/category/category.controller.js' 

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false})) 
    app.use(cors())
    app.use(helmet())
    app.use(limiter)
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use('/v1/auth',authRoutes)
    app.use('/v1/user', userRoutes)
    app.use('/v1/category', categoryRoutes)
    app.use('/v1/post', postRoutes)
    app.use('/v1/comment', commentRoutes)
}


export const initServer = async()=>{
    const app = express()
    try{
        await createDefaultAdmin()
        await createDefaultCategory()
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}