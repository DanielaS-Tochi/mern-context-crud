import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name: 'dhtbhyqvv',
    api_key: '249178336353881',
    api_secret: 'UnxZl9pJtMiJxok35wWZMUEUx5w'
})

export const uploadImage = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'newposts'
    })
}
