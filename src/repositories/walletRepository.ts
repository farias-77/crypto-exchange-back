import { prisma } from "../config/database";

export async function initializeEmptyWallet(userId: number) {
    return await prisma.wallets.create({ data: { userId } });
}

export async function getUserWallet(userId: number) {
    return await prisma.wallets.findFirst({ where: { userId } });
}
