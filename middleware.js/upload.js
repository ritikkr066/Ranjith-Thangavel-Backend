// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/thesis/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + '-' + file.originalname;
//     cb(null, uniqueName);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowed = /jpeg|jpg|png/;
//   const isValid = allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype);
//   cb(isValid ? null : new Error('Only .jpg/.png allowed'), isValid);
// };

// module.exports = multer({ storage, fileFilter });


const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the destination folder
const uploadPath = path.join(__dirname, '../uploads/thesis');

// Ensure the folder exists (create it if not)
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Define storage strategy
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

// File filter: Allow only jpg, jpeg, png
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png/;
  const extname = allowed.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowed.test(file.mimetype);
  cb(extname && mimetype ? null : new Error('Only .jpg/.jpeg/.png files allowed'), extname && mimetype);
};

module.exports = multer({ storage, fileFilter });

