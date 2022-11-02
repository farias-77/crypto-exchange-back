import { Wallets } from "@prisma/client";
import * as walletRepositories from "../repositories/walletRepository";

export async function createEmptyWallet(userId: number) {
    return await walletRepositories.initializeEmptyWallet(userId);
}

export async function getUserWallet(userId: number): Promise<Wallets | null> {
    const wallet: Wallets | null = await walletRepositories.getUserWallet(
        userId
    );

    if (!wallet) {
        throw {
            type: "not found",
            message: "We did not find a wallet associated with this user!",
        };
    }

    return wallet;
}
