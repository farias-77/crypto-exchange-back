/*
  Warnings:

  - The `linkCoinAmount` column on the `wallets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `realAmount` column on the `wallets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "wallets" DROP COLUMN "linkCoinAmount",
ADD COLUMN     "linkCoinAmount" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "realAmount",
ADD COLUMN     "realAmount" INTEGER NOT NULL DEFAULT 0;
