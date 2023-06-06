const multer = require ('multer');
const sharp= require ('sharp');

//on définis les mimetypes acccepté
const  MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'

}
//configuration de multer
const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null, 'image')
    },
    filename: (req, file , callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now()+ '.'+ extension);
    }
});
const upload = multer({storage}).single('image');

//redimensionner les images
const reziseImage = (req,res,next)=>{
    if(!req.file) {
        return next();
    } else {
        sharp(req.file.path)
            .resize(400,500)
            .toFile(req.file.path, (error, info) => {
                if (error){
                    res.status(500).json({error})
                }
            })
    }
};

module.exports={upload, reziseImage};