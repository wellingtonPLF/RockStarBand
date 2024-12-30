-- AlterTable
CREATE SEQUENCE auth_auth_id_seq;
ALTER TABLE "auth" ALTER COLUMN "auth_id" SET DEFAULT nextval('auth_auth_id_seq');
ALTER SEQUENCE auth_auth_id_seq OWNED BY "auth"."auth_id";

-- AlterTable
CREATE SEQUENCE user_user_id_seq;
ALTER TABLE "user" ALTER COLUMN "user_id" SET DEFAULT nextval('user_user_id_seq');
ALTER SEQUENCE user_user_id_seq OWNED BY "user"."user_id";
