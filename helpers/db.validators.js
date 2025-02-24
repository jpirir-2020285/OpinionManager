
import Category from '../scr/category/category.model.js'
import User from '../scr/user/user.model.js'
import { isValidObjectId } from 'mongoose'

export const existUsername = async(username)=>{
    const alreadyUsername = await User.findOne({username})
    if(alreadyUsername){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} is already taken`)
    }
}

export const objectIdValid = async(objectId)=>{
    if (!isValidObjectId(objectId)){
        throw new Error (`Id is not object valid`)
    }
        
}

export const existEmail = async(email)=>{
    const alreadyEmail = await User.findOne({email})
    if(alreadyEmail){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}

export const existCategory = async(name)=>{
    const alreadyName = await Category.findOne({name})
    if(alreadyName){
        console.error(`Category ${name} is already taken`)
        throw new Error(`Category ${name} is already taken`)
    }
}