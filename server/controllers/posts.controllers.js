import Post from '../models/Post.js'
import {uploadImage} from '../libs/cloudinary.js'

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.send(posts)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    try {
        const { title, description } = req.body

        if (req.files.image) {
            const result = await uploadImage(req.files.image.tempFilePath)
            console.log(result)
        }

        const newPost = new Post({ title, description })

        await newPost.save()

        return res.json(newPost)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    try {
        const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.send(updatePost)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deletePost = async (req, res) => {
    try {
        const postRemoved = await Post.findByIdAndDelete(req.params.id)
        if (!postRemoved) return res.sendStatus(404)
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.sendStatus(404)
        return res.json(post)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
