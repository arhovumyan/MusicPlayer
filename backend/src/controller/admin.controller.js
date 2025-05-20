import { Song } from "../mondels/song.model.js"
import { Album } from "../models/album.model.js"
import cloudinary from "../lib/cloudinary.js"


const uploadToCloudinary = async (file) => {

    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resourse_type: "auto",
        })
        return result.secure_url
    } catch (error) {
        console.log("Error in uploadToCloudinary", error)
        throw new Error("Error uploading to cloudinary")
    }
}

export const createSong = async (req, res, next) => {
    try {
        //check for audio and video files
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({ message: "Please upload all files" })
        }

        const { title, artist, albumId, duration } = req.body
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile

        const audioUrl = await uploadToCloudinary(audioFile)
        const imageUrl = await uploadToCloudinary(imageFile)


        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null
        })

        await song.save()
        //if song belongs to an album, then add the song to the album's array
        if (albumId) {
            await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song._id },
            })
        }
        res.status(201).json(song)
    } catch (error) {
        console.log("Error creating a song", error)
        next(error)
        
    }
}