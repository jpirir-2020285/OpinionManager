import Comment from "./comment.model.js";
import Post from "../post/post.model.js";
import mongoose from "mongoose";

export const save = async (req, res) => {
    const data = req.body;
    try {
        // Convertir post a ObjectId
        const postId = new mongoose.Types.ObjectId(data.post);

        // Verificar si el post existe
        const post = await Post.findOne({ _id: postId });
        if (!post) {
            return res.status(403).send({
                success: false,
                message: "Post not found"
            });
        }

        // Crear y guardar el comentario
        const comment = new Comment({
            post: postId,
            content: data.content,
            author: req.user.uid // Usuario autenticado
        });

        await comment.save();

        return res.send({
            success: true,
            message: "Comment added successfully",
            comment
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: "General Error",
            err
        });
    }
};

export const updateComment = async (req, res) => {
    try {
        const id = req.params.id 
        const userId = req.user.uid 
        const { content } = req.body 

        const comment = await Comment.findById(id) 
        if (!comment) return res.status(404).send({ message: "Comment not found" }) 

        if (comment.author.toString() !== userId) {
            return res.status(403).send({ message: "You can only edit your own comments" }) 
        }

        comment.content = content 
        await comment.save() 

        return res.send({ message: "Comment updated successfully", comment }) 

    } catch (error) {
        console.error(error) 
        return res.status(500).send({ message: "General error", error }) 
    }
} 

export const deleteComment = async (req, res) => {
    try {
        const id = req.params.id 
        const userId = req.user.uid 

        const comment = await Comment.findById(id) 
        if (!comment) return res.status(404).send({ message: "Comment not found" }) 

        if (comment.author.toString() !== userId) {
            return res.status(403).send({ message: "You can only delete your own comments" }) 
        }

        comment.status = false 
        await comment.save() 

        return res.send({ message: "Comment deleted successfully (disabled)" }) 

    } catch (error) {
        console.error(error) 
        return res.status(500).send({ message: "General error", error }) 
    }
} 

