import { Request, Response } from "express";
import { Wallets } from "@prisma/client";

import * as walletServices from "../services/walletServices";

export async function getUserWallet(req: Request, res: Response) {
    const userId: number = Number(req.params.userId);
    const wallet: Wallets | null = await walletServices.getUserWallet(userId);

    res.status(200).send(wallet);
}
