-- CreateTable
CREATE TABLE "Event_user" (
    "event_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "purchase_date" DATE NOT NULL,
    "quantity" INTEGER,

    CONSTRAINT "pk_event_user" PRIMARY KEY ("event_id","user_id","purchase_date")
);

-- CreateTable
CREATE TABLE "Events" (
    "event_id" SERIAL NOT NULL,
    "event_initial_date" DATE,
    "event_end_date" DATE,
    "location" VARCHAR(255),
    "ticket_id" INTEGER,
    "value" DECIMAL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "Tickets" (
    "ticket_id" SERIAL NOT NULL,
    "type" VARCHAR(255),

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("ticket_id")
);

-- AddForeignKey
ALTER TABLE "Event_user" ADD CONSTRAINT "fk_event_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Event_user" ADD CONSTRAINT "fk_user_event_id" FOREIGN KEY ("event_id") REFERENCES "Events"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "fk_event_ticket" FOREIGN KEY ("ticket_id") REFERENCES "Tickets"("ticket_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
