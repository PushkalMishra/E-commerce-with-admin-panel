// cloudinaryController.js
const cloudinary = require('cloudinary'); 
const { v2 } = cloudinary; 
const dotenv = require('dotenv'); dotenv.config(); 
cloudinary.v2.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET, 
});
const uploadImage = async (req, res, next) => {
  try {
    await v2.uploader.upload_stream(
      { resource_type: 'image' },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error, message: "Image upload failed" });
        }
        req.picturePath = result.secure_url;
        next();
      }
    ).end(req.file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error, message: 'Image upload failed' });
  }
};

module.exports = { uploadImage };
