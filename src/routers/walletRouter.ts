import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import tokenValidation from "../middlewares/tokenValidationMiddleware";

import { walletSchema } from "../schemas/walletSchemas";
import {
    getUserWallet,
    updateUserWallet,
    getAllWallets,
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
router.get("/allwallets", getAllWallets);

export default router;
