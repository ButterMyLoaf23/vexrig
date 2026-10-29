-- CreateEnum
CREATE TYPE "Retailer" AS ENUM ('AMAZON', 'WALMART', 'BEST_BUY', 'MICRO_CENTER', 'NEWEGG');

-- CreateTable
CREATE TABLE "RetailerOffer" (
    "id" SERIAL NOT NULL,
    "componentId" INTEGER NOT NULL,
    "retailer" "Retailer" NOT NULL,
    "externalId" TEXT,
    "url" TEXT NOT NULL,
    "price" DECIMAL(10,2),
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "inStock" BOOLEAN,
    "fetchedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RetailerOffer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RetailerOffer_componentId_retailer_key" ON "RetailerOffer"("componentId", "retailer");
CREATE INDEX "RetailerOffer_componentId_idx" ON "RetailerOffer"("componentId");

-- AddForeignKey
ALTER TABLE "RetailerOffer" ADD CONSTRAINT "RetailerOffer_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE CASCADE ON UPDATE CASCADE;
