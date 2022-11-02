import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import tokenValidation from "../middlewares/tokenValidationMiddleware";

import { getUserWallet } from "../controllers/walletController";

import { Router } from "express";
const router = Router();

router.use(tokenValidation);
router.get("/wallet/:userId", getUserWallet);

export default router;
