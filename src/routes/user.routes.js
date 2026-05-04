import { Router } from "express";
import * as userCtrl from '../controllers/user.controller.js';
import { verifyToken, isAdmin } from "../middlewares/authJwt.js";

const router = Router();

router.get('/', [verifyToken, isAdmin], userCtrl.getUsers);

router.post('/', [verifyToken, isAdmin], userCtrl.createUser);

router.delete('/:id', [verifyToken, isAdmin], userCtrl.deleteUserById);

router.put('/:id', [verifyToken, isAdmin], userCtrl.updateUserById);

export default router