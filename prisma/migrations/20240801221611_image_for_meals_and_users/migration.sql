-- AlterTable
ALTER TABLE "Meals" ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "image" TEXT;
