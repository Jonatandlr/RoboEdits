-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
