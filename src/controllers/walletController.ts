import { Request, Response } from "express";
import { Wallets } from "@prisma/client";

import { TWalletValues } from "../types/walletTypes";

import * as walletServices from "../services/walletServices";
import * as authServices from "../services/authServices";

export async function getUserWallet(req: Request, res: Response) {
    const userId: number = Number(req.params.userId);
    const { id: requesterId } = res.locals.retornoJwtVerify;

    await authServices.validateIdentity(userId, requesterId);
    const wallet: Wallets | null = await walletServices.getUserWallet(userId);

    res.status(200).send(wallet);
}

export async function updateUserWallet(req: Request, res: Response) {
    const walletId: number = Number(req.params.walletId);
    const newValues: TWalletValues = req.body;
    const { id: userId } = res.locals.retornoJwtVerify;

    await authServices.validateUserPrivilege(userId);

    await walletServices.getWalletById(walletId);
    await walletServices.updateUserWallet(
        newValues.linkCoinAmount * 100,
        newValues.realAmount * 100,
        walletId
    );

    const updatedWallet: Wallets = await walletServices.getWalletById(walletId);

    res.status(200).send(updatedWallet);
}

export async function getAllWallets(req: Request, res: Response) {
    const { id: userId } = res.locals.retornoJwtVerify;
    await authServices.validateUserPrivilege(userId);
    const wallets = await walletServices.getAllWallets();

    res.status(200).send(wallets);
}
