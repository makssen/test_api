const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


class FileService {
    async saveFile(file) {
        try {
            if (file) {
                const uploadResponse = await cloudinary.uploader.upload(file, {
                    upload_preset: 'dev_setups'
                });
                return uploadResponse.url;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new FileService();