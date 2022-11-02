import { Router } from "express";
const router = Router();

import authRouter from "./authRouter";
import walletRouter from "./walletRouter";

router.use(authRouter);
router.use(walletRouter);

export default router;
