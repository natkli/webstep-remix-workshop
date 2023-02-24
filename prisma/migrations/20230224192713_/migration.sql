/*
  Warnings:

  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `winenrId` on the `Icing` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Icing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `winnerId` to the `Icing` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Note";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Icing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "winnerId" TEXT NOT NULL,
    "loserId" TEXT NOT NULL,
    CONSTRAINT "Icing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Icing_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Icing_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Icing_loserId_fkey" FOREIGN KEY ("loserId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Icing" ("createdAt", "eventId", "id", "loserId", "updatedAt") SELECT "createdAt", "eventId", "id", "loserId", "updatedAt" FROM "Icing";
DROP TABLE "Icing";
ALTER TABLE "new_Icing" RENAME TO "Icing";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
