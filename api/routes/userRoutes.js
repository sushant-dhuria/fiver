import express from 'express';
import { deleteuser,getUser } from '../controller/user.controllor.js';
import { verifyToken } from '../middleware/jwt.js';
const router=express.Router();
router.delete("/:id",verifyToken,deleteuser);
router.get("/:id", getUser);
export default router;