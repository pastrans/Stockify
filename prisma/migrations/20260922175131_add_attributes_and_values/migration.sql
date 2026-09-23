-- CreateEnum
CREATE TYPE "AttributeDisplayType" AS ENUM ('RADIO', 'SELECT', 'COLOR', 'PILLS');

-- CreateTable
CREATE TABLE "Attribute" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "displayType" "AttributeDisplayType" NOT NULL DEFAULT 'RADIO',
    "sequence" INTEGER NOT NULL DEFAULT 0,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttributeValue" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "htmlColor" TEXT,
    "sequence" INTEGER NOT NULL DEFAULT 0,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "attributeId" INTEGER NOT NULL,

    CONSTRAINT "AttributeValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_name_key" ON "Attribute"("name");

-- CreateIndex
CREATE INDEX "Attribute_sequence_idx" ON "Attribute"("sequence");

-- CreateIndex
CREATE INDEX "AttributeValue_attributeId_sequence_idx" ON "AttributeValue"("attributeId", "sequence");

-- CreateIndex
CREATE UNIQUE INDEX "AttributeValue_attributeId_name_key" ON "AttributeValue"("attributeId", "name");

-- AddForeignKey
ALTER TABLE "AttributeValue" ADD CONSTRAINT "AttributeValue_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
