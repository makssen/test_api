const uuid = require('uuid');
const path = require('path');

class FileService {
    saveFile(file) {
        try {
            const filename = uuid.v4() + '.jpg';
            const filePath = path.resolve('static', filename);
            file.mv(filePath);
            return filename;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new FileService();