const multer = require ('multer');
const sharp= require ('sharp');
const fs = require ('fs')

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
        const name = file.originalname.split('.jpg').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now()+ '.'+ extension);
    }
});
const upload = multer({storage}).single('image');

//redimensionner les images
const reziseImage = (req,res,next)=>{
    if(!req.file) {
        next();
    } else {
        //création d'un nouveau nom 
        const outputPath = req.file.path.replace(/\.[^/.]+$/, "") + "-resized.jpg";
        sharp(req.file.path)
        //resize en taille voulu
            .resize(400,500)
            //enregistrement sur le nouveau chemin 
            .toFile(outputPath, (error, info) => {
                if (error){
                    res.status(500).json({info})
                }else {
                    //suppression du premier fichier créé par multer 
                    const odlPath= outputPath.split('-resized').join("");
                    fs.unlink(odlPath,(err) => {   if (err) {res.status(501).json({err})}});
                }
            });
            //modification de la requête pour l'envoie
            req.file.filename= req.file.filename.replace(/\.[^/.]+$/, "") + "-resized.jpg";
            req.file.path=outputPath;
            next();
    }
};

module.exports={upload, reziseImage};