/*
  Warnings:

  - You are about to drop the column `points` on the `daiaries` table. All the data in the column will be lost.
  - You are about to drop the column `resultEn` on the `daiaries` table. All the data in the column will be lost.
  - You are about to drop the column `resultJa` on the `daiaries` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `daiaries` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "corrections" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "dairy_id" TEXT NOT NULL,
    "ja" TEXT,
    "en" TEXT,
    "resultJa" TEXT,
    "resultEn" TEXT,
    "points" TEXT,
    "score" INTEGER,
    "delete_flag" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "corrections_dairy_id_fkey" FOREIGN KEY ("dairy_id") REFERENCES "daiaries" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "words" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "dairy_id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "mean" TEXT NOT NULL,
    "delete_flag" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "words_dairy_id_fkey" FOREIGN KEY ("dairy_id") REFERENCES "daiaries" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_daiaries" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "targetDate" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "ja" TEXT,
    "en" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "delete_flag" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "daiaries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_daiaries" ("created_at", "en", "ja", "targetDate", "uid", "updated_at", "user_id") SELECT "created_at", "en", "ja", "targetDate", "uid", "updated_at", "user_id" FROM "daiaries";
DROP TABLE "daiaries";
ALTER TABLE "new_daiaries" RENAME TO "daiaries";
CREATE UNIQUE INDEX "daiaries_targetDate_user_id_key" ON "daiaries"("targetDate", "user_id");
CREATE TABLE "new_users" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'User',
    "delete_flag" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_users" ("name", "role", "uid") SELECT "name", "role", "uid" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "corrections_dairy_id_key" ON "corrections"("dairy_id");

-- CreateIndex
CREATE UNIQUE INDEX "words_dairy_id_key" ON "words"("dairy_id");
