const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { verifyToken } = require('../helpers/jwt');

// Set storage engine with dynamic destination
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Example: Use a parameter from the request to set the destination folder
    const uploadFolder = `./uploads/${req.body.folderName}`;

    // Create the folder if it doesn't exist
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }

    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload variable
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // limit file size to 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('myFile');

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Handle file upload
const uploadFile = (req, res) => {
  upload(req, res, (err) => {
    const username = verifyToken(req.headers.authorization)?.username
    if (err) {
      res.status(400).json({ msg: err });
    } else {
      if (req.body.file == undefined) {
        res.status(400).json({ msg: 'No file selected!' });
      } else {
        const base64Data = req.body.file.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');
        const fileName = `${username}_${req.body.szQuestionId}_${req.body.shItem}.png`; // You can adjust the file extension if necessary
        const filePath = path.join(`./uploads/${req.body.folderName}`, fileName);
        // Save the file
        fs.writeFile(filePath, buffer, (err) => {
          if (err) {
            console.error('Error saving the file:', err);
            return res.status(500).json({ message: 'Failed to save image' });
          }
          
          res.status(200).json({ message: 'Image uploaded successfully', filePath });
        });
        // res.json({
        //   msg: 'File uploaded!',
        //   file: `${req.body.folderName}/${req.file.filename}`
        // });
      }
    }
  });
};

module.exports = { uploadFile };
// class UploadController {
//   static upload(req, res, next) {
//     const files = req.files;
    
//   }
  
// }

// module.exports = UploadController;