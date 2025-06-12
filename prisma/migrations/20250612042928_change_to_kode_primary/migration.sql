/*
  Warnings:

  - The primary key for the `project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[kode]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kode` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `project` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `kode` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Project_kode_key` ON `Project`(`kode`);
