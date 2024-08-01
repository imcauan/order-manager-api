-- CreateTable
CREATE TABLE "Tables" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tables_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "Tables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
