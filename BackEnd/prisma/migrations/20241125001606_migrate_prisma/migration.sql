/*
  Warnings:

  - You are about to drop the `auth` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `token` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `roleName` on the `roles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RoleNames" AS ENUM ('ROLE_ADMIN', 'ROLE_USER');

-- DropForeignKey
ALTER TABLE "auth_roles" DROP CONSTRAINT "auth_roles_auth_id_fkey";

-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "token_auth_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_auth_id_fkey";

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "roleName",
ADD COLUMN     "roleName" "RoleNames" NOT NULL;

-- DropTable
DROP TABLE "auth";

-- DropTable
DROP TABLE "token";

-- DropTable
DROP TABLE "user";

-- DropEnum
DROP TYPE "RoleName";

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "nickName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "bornDate" TIMESTAMP(3) NOT NULL,
    "auth_id" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "auths" (
    "auth_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "auths_pkey" PRIMARY KEY ("auth_id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "token_id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "auth_id" INTEGER NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("token_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_auth_id_key" ON "users"("auth_id");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_auth_id_key" ON "tokens"("auth_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_auth_id_fkey" FOREIGN KEY ("auth_id") REFERENCES "auths"("auth_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_auth_id_fkey" FOREIGN KEY ("auth_id") REFERENCES "auths"("auth_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_roles" ADD CONSTRAINT "auth_roles_auth_id_fkey" FOREIGN KEY ("auth_id") REFERENCES "auths"("auth_id") ON DELETE RESTRICT ON UPDATE CASCADE;
