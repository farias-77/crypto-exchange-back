import { Request, Response } from "express";
import { TUser } from "../types/userTypes";

import * as walletServices from "../services/walletServices";
import * as authServices from "../services/authServices";

export async function signUp(req: Request, res: Response) {
    const user: TUser = {
        email: req.body.email,
        password: req.body.password,
        fullName: req.body.fullName,
    };
    const confirmPassword: string = req.body.confirmPassword;

    authServices.validateConfirmPassword(user.password, confirmPassword);
    await authServices.validateNewEmail(user.email);
    await authServices.validateNewUserName(user.fullName);
    const createdUser = await authServices.insertUser(user);
    const returnUser = authServices.sanitizeUser(createdUser);

    await walletServices.createEmptyWallet(returnUser.id);

    res.status(201).send(returnUser);
}

export async function signIn(req: Request, res: Response) {
    const user: TUser = req.body;

    await authServices.validatePassword(user);
    const token = await authServices.generateToken(user.email);
    const role = await authServices.getUserRole(user.email);
    const id = await authServices.getUserId(user.email);

    res.status(200).send({ token, role, userId: id });
}
