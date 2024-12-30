/*
  Warnings:

  - You are about to drop the `Event_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tickets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event_user" DROP CONSTRAINT "fk_event_user_id";

-- DropForeignKey
ALTER TABLE "Event_user" DROP CONSTRAINT "fk_user_event_id";

-- DropForeignKey
ALTER TABLE "Events" DROP CONSTRAINT "fk_event_ticket";

-- DropTable
DROP TABLE "Event_user";

-- DropTable
DROP TABLE "Events";

-- DropTable
DROP TABLE "Tickets";

-- CreateTable
CREATE TABLE "event_user" (
    "event_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "purchase_date" DATE NOT NULL,
    "quantity" INTEGER,

    CONSTRAINT "pk_event_user" PRIMARY KEY ("event_id","user_id","purchase_date")
);

-- CreateTable
CREATE TABLE "events" (
    "event_id" SERIAL NOT NULL,
    "event_initial_date" DATE,
    "event_end_date" DATE,
    "location" VARCHAR(255),
    "ticket_id" INTEGER,
    "value" DECIMAL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "ticket_id" SERIAL NOT NULL,
    "type" VARCHAR(255),

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("ticket_id")
);

-- AddForeignKey
ALTER TABLE "event_user" ADD CONSTRAINT "fk_event_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "event_user" ADD CONSTRAINT "fk_user_event_id" FOREIGN KEY ("event_id") REFERENCES "events"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "fk_event_ticket" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("ticket_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
