import { v2 as cloudinary } from 'cloudinary';
import { API_KEY, API_SECRET, CLOUD_NAME }  from '../config.js';


cloudinary.config({
    cloud_name: 'dhtbhyqvv',
    api_key: '249178336353881',
    api_secret: 'UnxZl9pJtMiJxok35wWZMUEUx5w'
});

export const uploadImage = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'newposts'
    })
}

export const deleteImage = async (id) => {
    return await cloudinary.uploader.destroy(id);
};
