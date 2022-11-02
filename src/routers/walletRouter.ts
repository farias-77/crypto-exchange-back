import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import tokenValidation from "../middlewares/tokenValidationMiddleware";

import { walletSchema } from "../schemas/walletSchemas";
import {
    getUserWallet,
    updateUserWallet,
} from "../controllers/walletController";

import { Router } from "express";
const router = Router();

router.use(tokenValidation);
router.get("/wallet/:userId", getUserWallet);
router.put(
    "/wallet/:walletId",
    schemaValidation(walletSchema),
    updateUserWallet
);

export default router;
