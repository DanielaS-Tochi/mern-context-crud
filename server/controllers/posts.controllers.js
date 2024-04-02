import Post from "../models/Post.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        return res.json(posts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        let image;

        if (req.files.image) {
            const result = await uploadImage(req.files.image.tempFilePath);
            await fs.remove(req.files.image.tempFilePath);
            image = {
                url: result.secure_url,
                public_id: result.public_id,
            }
        };

        const newPost = new Post({ title, description, image });

        await newPost.save();

        return res.json(newPost);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) return res.sendStatus(404);
        return res.json(post);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        // TODO: validate req.body before to update

        // if a new image is uploaded upload it to cloudinary
        if (req.files?.image) {
            const result = await uploadImage(req.files.image.tempFilePath);
            await fs.remove(req.files.image.tempFilePath);
            // add the new image to the req.body
            req.body.image = {
                url: result.secure_url,
                public_id: result.public_id,
            };
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { $set: req.body },
            {
                new: true,
            }
        );
        return res.json(updatedPost);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const postRemoved = await Posst.findByIdAndDelete(req.params.id);
        if (!postRemoved) return res.sendStatus(404);

        if (postRemoved.image.public_id) {
            await deleteImage(postRemoved.public_id);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};