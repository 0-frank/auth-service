import { Router } from "express";
import * as userCtrl from '../controllers/user.controller.js';
import { verifyToken, isAdmin } from "../middlewares/authJwt.js";

const router = Router();

router.get('/', [verifyToken, isAdmin], userCtrl.getUsers);

router.post('/', [verifyToken, isAdmin], userCtrl.createUser);

export default router