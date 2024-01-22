-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_daiaries" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "targetDate" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "ja" TEXT,
    "en" TEXT,
    "resultJa" TEXT,
    "resultEn" TEXT,
    "points" TEXT,
    "score" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "daiaries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_daiaries" ("created_at", "en", "ja", "points", "resultEn", "resultJa", "score", "targetDate", "uid", "updated_at", "user_id") SELECT "created_at", "en", "ja", "points", "resultEn", "resultJa", "score", "targetDate", "uid", "updated_at", "user_id" FROM "daiaries";
DROP TABLE "daiaries";
ALTER TABLE "new_daiaries" RENAME TO "daiaries";
CREATE UNIQUE INDEX "daiaries_targetDate_user_id_key" ON "daiaries"("targetDate", "user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
