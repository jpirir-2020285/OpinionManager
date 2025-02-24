import Category from "./category.model.js"

export const createDefaultCategory = async () => {
    try {
        const categoryCount = await Category.countDocuments()
        
        if (categoryCount === 0) {
            const defaultCategory = new Category({
                name: "Noticia",
                description: "Apartado sobre noticias para mantenerte informado",
                status: true
            })

            await defaultCategory.save() 
            console.log("Default category created successfully") 
        } else {
            console.log("Default category already exists") 
        }

    } catch (err) {
        console.error("Error creating default category", err) 
    }
}

export const save = async(req, res) => {
    const data = req.body
    try {
        const category = new Category(data)
 
        await category.save()
        return res.send({success: true, message: `${category.name} saved successfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success: false, message: 'General error when adding category'})
    }
}

export const update = async (req,res) => {
    try {
        const id = req.params.id
        const data = req.body
        const update = await Category.findByIdAndUpdate(id,data,{new:true})

        if (!update) return res.status(404).send({
            sucess: false,
            message: 'Category not found'
        })
            return res.send({
                success: true,
                message: 'Category Updated',
                update
            })
    } catch (error) {
        console.error(err)
        return res.status(500).send({
                success: false,
                message: 'General error', 
                err
        })
    }
}

export const remove = async (req, res) => {
    try {
        const id = req.params.id

        const update = await Category.findByIdAndUpdate(id, { status: false }, { new: true })

        if (!update) {
            return res.status(404).send({
                success: false,
                message: "Category not found"
            })
        }

        return res.send({
            success: true,
            message: "Category disabled successfully",
            update
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            success: false,
            message: "General error",
            error
        })
    }
} 
