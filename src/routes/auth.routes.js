import { Router } from "express";
import * as authCtrl from '../controllers/auth.controller.js'
import { checkDuplicateEmail } from "../middlewares/verigySignup.js";

const router = Router();

router.post('/signup', [checkDuplicateEmail], authCtrl.signUp);
router.post('signin', authCtrl.signIn);

export default router;