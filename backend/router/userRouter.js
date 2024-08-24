import express from "express";
import {
  addNewAdmin,
  getAllStudents,
  login,
  logoutAdmin,
  logoutStudent,
  studentRegister,
} from "../controllers/userController.js";
import {
  isAdminAuthenticated,
  isStudentAuthenticated,
} from "../middlewares/auth.js";
// import { deleteRecord } from './uploadRouter.js';

const router = express.Router();

router.post("/student/register", studentRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/students", isAdminAuthenticated, getAllStudents);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/student/logout", isStudentAuthenticated, logoutStudent);
// router.delete("/delete/:id" , isAdminAuthenticated , deleteRecord)

export default router;
