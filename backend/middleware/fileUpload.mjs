import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from 'fs'

// Get __dirname equivalent for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the storage location and filename handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Initialize the multer middleware
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedExtensions = /jpeg|jpg|png|gif|pdf|mp4|avi|mov|mkv|webm|csv|xlsx|xls/;
    const extName = allowedExtensions.test(path.extname(file.originalname).toLowerCase());

    const allowedMimeTypes = [
      'image/jpeg', 'image/png', 'image/gif',
      'application/pdf',
      'video/mp4', 'video/avi', 'video/quicktime', 'video/x-matroska', 'video/webm',
      'text/csv',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel' // .xls
    ];
    const mimeType = allowedMimeTypes.includes(file.mimetype);

    if (mimeType && extName) {
      cb(null, true);
    } else {
      cb(new Error("Only images, PDFs, videos, CSV, and Excel files are allowed."));
    }
  },
});

export default upload;
