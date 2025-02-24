import User from "./user.model.js"
import { checkPassword,encrypt } from "../../utils/encrypt.js"

export const createDefaultAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ role: 'ADMIN' })
        if (!existingAdmin) {
            const defaultAdmin = new User({
                name: 'Jose Miguel',
                surname: 'Pirir',
                email: 'jpirir@gmail.com',
                username: 'jpirir123',
                phone: '13429786',
                password: await encrypt('Hola123.'),
                role: 'ADMIN'
            })

            await defaultAdmin.save() 
            console.log("Default ADMIN user created successfully")
        } else {
            console.log("Default ADMIN user already exists")
        }
    } catch (err) {
        console.error("Error creating default ADMIN user", err)
    }
}

export const getAll = async(req, res)=>{
    try{
        const { limit = 20, skip = 0 } = req.query
        const users = await User.find().skip(skip).limit(limit)
        if(users.length === 0) return res.status(404).send({message: 'Users not found', success: false})
        return res.send(
            {
                success: true,
                message: 'Users found: ', 
                users,
                total: users.length
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}

export const get = async(req, res)=>{
    try{
        const { id } = req.params
        const user = await User.findById(id)

        if(!user) return res.status(404).send(
            {
                sucess: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User found',
                user
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}

export const update = async (req, res) => {
    try {
        const id = req.user.uid 
        const data = req.body 

        // Bloquear la edición de ciertos campos
        if (data.role) return res.status(403).send({ message: 'Role not editable' }) 
        if (data.username) return res.status(403).send({ message: 'Username not editable' }) 
        if (data.email) return res.status(403).send({ message: 'Email not editable' }) 

        // Manejar cambio de contraseña con verificación
        if (data.password) {
            if (!data.currentPassword) {
                return res.status(400).send({ message: 'Current password is required to change password' }) 
            }

            // Buscar el usuario en la base de datos
            const user = await User.findById(id) 
            if (!user) return res.status(404).send({ message: 'User not found' }) 

            // Verificar si la contraseña actual es correcta
            const isMatch = await checkPassword(data.currentPassword, user.password) 
            if (!isMatch) {
                return res.status(401).send({ message: 'Incorrect current password' }) 
            }

            // Encriptar la nueva contraseña antes de actualizarla
            data.password = await encrypt(data.password) 
        }

        // Actualizar los datos permitidos
        const update = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true }) 

        if (!update) return res.status(404).send({ message: 'User not found' }) 
        return res.send({ message: 'User updated successfully', update }) 

    } catch (err) {
        console.error(err) 
        return res.status(500).send({ message: 'General Error', err }) 
    }
} 


export const cambiarPassword = async (req, res) => {
    try {
        const { id } = req.params  // Obtener el ID del usuario
        const { currentPassword, newPassword } = req.body  // Obtener contraseñas

        // Verificar si el usuario existe
        const user = await User.findById(id) 
        if (!user) return res.status(404).send({ message: 'User not found' }) 

        // Verificar si la contraseña actual es correcta
        const passwordMatch = await checkPassword(user.password, currentPassword)  
        if (!passwordMatch) return res.status(400).send({ message: 'Incorrect current password' }) 


        // Encriptar la nueva contraseña
        user.password = await encrypt(newPassword) 
        await user.save() 

        return res.send({ message: 'Password updated successfully' }) 
    } catch (err) {
        console.console.log(err)
        return res.status(500).send({message: 'General Error',err})
    }
}