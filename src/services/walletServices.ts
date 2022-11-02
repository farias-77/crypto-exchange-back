import { Wallets } from "@prisma/client";
import * as walletRepositories from "../repositories/walletRepository";

export async function createEmptyWallet(userId: number) {
    return await walletRepositories.initializeEmptyWallet(userId);
}

export async function getWalletById(walletId: number): Promise<Wallets> {
    const wallet: Wallets | null = await walletRepositories.getWalletById(
        walletId
    );

    if (!wallet) {
        throw {
            type: "not found",
            message: "We did not find a wallet with the informed id!",
        };
    }

    return wallet;
}

export async function getUserWallet(userId: number): Promise<Wallets> {
    const wallet: Wallets | null = await walletRepositories.getUserWallet(
        userId
    );

    if (!wallet) {
        throw {
            type: "not found",
            message: "We did not find a wallet associated with this user!",
        };
    }

    const intValueWallet: Wallets = sanitizeWalletValues(wallet);

    return intValueWallet;
}

export async function updateUserWallet(
    linkCoinAmount: number,
    realAmount: number,
    walletId: number
) {
    return await walletRepositories.updateUserWallet(
        realAmount,
        linkCoinAmount,
        walletId
    );
}

export async function getAllWallets() {
    return await walletRepositories.getAllWallets();
}

function sanitizeWalletValues(wallet: Wallets): Wallets {
    return {
        ...wallet,
        linkCoinAmount: wallet.linkCoinAmount / 100,
        realAmount: wallet.realAmount / 100,
    };
}
