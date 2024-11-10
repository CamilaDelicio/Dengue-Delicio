// auth.js
import express from "express";
import authController from "../controllers/authController.js"; 

const router = express.Router();
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/login', authController.postLogin);

export default router;
