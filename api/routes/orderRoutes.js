import express from 'express';
import {login,logout,register} from '../controller/auth.controller.js'
const router=express.Router();


router.get("/login",login);
router.post("/register",register)
router.post("/logout",logout)
export default router;