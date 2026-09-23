/*
  Warnings:

  - The `displayType` column on the `Attribute` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `htmlColor` on the `AttributeValue` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `AttributeValue` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[attributeId,valueName]` on the table `AttributeValue` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[attributeId,shortName]` on the table `AttributeValue` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shortName` to the `AttributeValue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueName` to the `AttributeValue` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DisplayType" AS ENUM ('select', 'pills', 'radio', 'color');

-- CreateEnum
CREATE TYPE "VariantCreation" AS ENUM ('instantly', 'dynamically', 'never');

-- DropIndex
DROP INDEX "AttributeValue_attributeId_name_key";

-- AlterTable
ALTER TABLE "Attribute" ADD COLUMN     "variantCreation" "VariantCreation" NOT NULL DEFAULT 'instantly',
DROP COLUMN "displayType",
ADD COLUMN     "displayType" "DisplayType" NOT NULL DEFAULT 'radio';

-- AlterTable
ALTER TABLE "AttributeValue" DROP COLUMN "htmlColor",
DROP COLUMN "name",
ADD COLUMN     "colorHex" TEXT,
ADD COLUMN     "shortName" TEXT NOT NULL,
ADD COLUMN     "valueName" TEXT NOT NULL;

-- DropEnum
DROP TYPE "AttributeDisplayType";

-- CreateIndex
CREATE UNIQUE INDEX "AttributeValue_attributeId_valueName_key" ON "AttributeValue"("attributeId", "valueName");

-- CreateIndex
CREATE UNIQUE INDEX "AttributeValue_attributeId_shortName_key" ON "AttributeValue"("attributeId", "shortName");
