import express from "express";
import multer from "multer";
import XLSX from "xlsx";
import Record from "../models/recordSchema.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";
// import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
// import ErrorHandler from '../middlewares/error.js';

const router = express.Router();

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Handle file upload and data processing
router.post(
  "/",
  upload.single("file"),
  isAdminAuthenticated,
  async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    try {
      const filePath = req.file.path;
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      // Insert data into MongoDB
      await Record.insertMany(sheet);

      res.status(200).send("File uploaded and data inserted successfully.");
    } catch (error) {
      console.error("Error processing file:", error);
      res.status(500).send("An error occurred while processing the file.");
    }
  }
);

// export const deleteRecord = catchAsyncErrors(async(req, res, next)=>{
//     const {id} = req.params;
//     let Record = await Record.findById(id)
//     if(!Record){
//         return next (new ErrorHandler("No record found"))
//     }
//     await Record.deleteOne();
//     res.status(200).json({
//         success : true,
//         message : "Record Deleted"
//     })

// })

export default router;
