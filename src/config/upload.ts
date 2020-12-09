import multer from 'multer';
import path from 'path';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads')

export default {
  directory: uploadFolder,

  storage: multer.diskStorage({
        destination: uploadFolder,
        
        filename: (request, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname.trim()}`;

            return cb(null, fileName);
        },
    }),
}