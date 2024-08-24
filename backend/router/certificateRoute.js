import express from "express";
import Record from "../models/recordSchema.js";
import { isStudentAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// ------------- Search certificate by C_ID ---------------------------

router.get("/search/:c_id", isStudentAuthenticated, async (req, res) => {
  try {
    const certificate = await Record.findOne({
      c_id: req.params.c_id,
    });
    if (certificate) {
      res.status(200).json(certificate);
    } else {
      res.status(404).json({ message: "Certificate not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
