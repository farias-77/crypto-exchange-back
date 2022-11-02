import * as walletRepositories from "../repositories/walletRepository";

export async function createEmptyWallet(userId: number) {
    return await walletRepositories.initializeEmptyWallet(userId);
}
