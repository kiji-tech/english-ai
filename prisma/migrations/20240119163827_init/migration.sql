-- CreateTable
CREATE TABLE "users" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'User'
);

-- CreateTable
CREATE TABLE "daiaries" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "targetDate" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "ja" TEXT NOT NULL,
    "en" TEXT NOT NULL,
    "resultJa" TEXT NOT NULL,
    "resultEn" TEXT NOT NULL,
    "points" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "daiaries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "daiaries_targetDate_user_id_key" ON "daiaries"("targetDate", "user_id");
