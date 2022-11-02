import { prisma } from "../config/database";

export async function initializeEmptyWallet(userId: number) {
    return await prisma.wallets.create({ data: { userId } });
}

export async function getUserWallet(userId: number) {
    return await prisma.wallets.findFirst({ where: { userId } });
}

export async function getWalletById(walletId: number) {
    return prisma.wallets.findFirst({ where: { id: walletId } });
}

export async function updateUserWallet(
    realAmount: number,
    linkCoinAmount: number,
    walletId: number
) {
    return await prisma.wallets.update({
        where: { id: walletId },
        data: { realAmount, linkCoinAmount },
    });
}

export async function getAllWallets() {
    return await prisma.wallets.findMany();
}
