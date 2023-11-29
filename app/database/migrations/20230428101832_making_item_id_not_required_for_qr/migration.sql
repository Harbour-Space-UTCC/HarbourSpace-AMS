-- DropForeignKey
ALTER TABLE "Qr" DROP CONSTRAINT "Qr_itemId_fkey";

-- AlterTable
ALTER TABLE "Qr" ALTER COLUMN "itemId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Qr" ADD CONSTRAINT "Qr_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
