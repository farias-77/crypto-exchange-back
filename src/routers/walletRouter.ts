import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import tokenValidation from "../middlewares/tokenValidationMiddleware";

import { Router } from "express";
const router = Router();

router.use(tokenValidation);

export default router;
