import Post from "./post.model.js" 
import Category from "../category/category.model.js" 

export const createPost = async (req, res) => {
    try {
        const { title, category, content } = req.body 
        const userId = req.user.uid  

        const categoryExists = await Category.findById(category) 
        if (!categoryExists) {
            return res.status(404).send({ message: "Category not found" }) 
        }

        const newPost = new Post({
            title,
            category,
            content,
            author: userId
        }) 

        await newPost.save() 

        return res.status(201).send({
            success: true,
            message: "Post created successfully",
            post: newPost
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

export const update = async (req, res) => {
    try {
        const id = req.params.id 
        const userId = req.user.uid 
        const data = req.body 

        const post = await Post.findById(id) 
        if (!post) return res.status(404).send({ message: "Post not found" }) 

        if (post.author.toString() !== userId) {
            return res.status(403).send({ message: "You can only edit your own posts" }) 
        }

        const updatedPost = await Post.findByIdAndUpdate(id, data, { new: true, runValidators: true }) 

        return res.send({ message: "Post updated successfully", post: updatedPost }) 

    } catch (error) {
        console.error(error) 
        return res.status(500).send({ message: "General error", error }) 
    }
}

export const deletePost = async (req, res) => {
    try {
        const id = req.params.id 
        const userId = req.user.uid 

        const post = await Post.findById(id) 
        if (!post) return res.status(404).send({ message: "Post not found" }) 

        if (post.author.toString() !== userId) {
            return res.status(403).send({ message: "You can only delete your own posts" }) 
        }

        post.status = false 
        await post.save() 

        return res.send({ message: "Post deleted successfully (disabled)" }) 

    } catch (error) {
        console.error(error) 
        return res.status(500).send({ message: "General error", error }) 
    }
}

