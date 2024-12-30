"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketTypeSeed = exports.ticketSeed = void 0;
const library_1 = require("@prisma/client/runtime/library");
exports.ticketSeed = [
    {
        id: 1,
        value: new library_1.Decimal(100),
        event_id: BigInt(1),
        ticket_type_id: 1
    },
    {
        id: 2,
        value: new library_1.Decimal(200),
        event_id: BigInt(1),
        ticket_type_id: 2
    },
    {
        id: 3,
        value: new library_1.Decimal(300),
        event_id: BigInt(1),
        ticket_type_id: 3
    },
    {
        id: 4,
        value: new library_1.Decimal(100),
        event_id: BigInt(2),
        ticket_type_id: 1
    },
    {
        id: 5,
        value: new library_1.Decimal(200),
        event_id: BigInt(2),
        ticket_type_id: 2
    },
    {
        id: 6,
        value: new library_1.Decimal(300),
        event_id: BigInt(2),
        ticket_type_id: 3
    },
    {
        id: 7,
        value: new library_1.Decimal(100),
        event_id: BigInt(3),
        ticket_type_id: 1
    },
    {
        id: 8,
        value: new library_1.Decimal(200),
        event_id: BigInt(3),
        ticket_type_id: 2
    },
    {
        id: 9,
        value: new library_1.Decimal(300),
        event_id: BigInt(3),
        ticket_type_id: 3
    },
    {
        id: 10,
        value: new library_1.Decimal(100),
        event_id: BigInt(4),
        ticket_type_id: 1
    },
    {
        id: 11,
        value: new library_1.Decimal(200),
        event_id: BigInt(4),
        ticket_type_id: 2
    },
    {
        id: 12,
        value: new library_1.Decimal(300),
        event_id: BigInt(4),
        ticket_type_id: 3
    },
    {
        id: 13,
        value: new library_1.Decimal(100),
        event_id: BigInt(5),
        ticket_type_id: 1
    },
    {
        id: 14,
        value: new library_1.Decimal(200),
        event_id: BigInt(5),
        ticket_type_id: 2
    },
    {
        id: 15,
        value: new library_1.Decimal(300),
        event_id: BigInt(5),
        ticket_type_id: 3
    },
    {
        id: 16,
        value: new library_1.Decimal(200),
        event_id: BigInt(6),
        ticket_type_id: 1
    },
    {
        id: 17,
        value: new library_1.Decimal(300),
        event_id: BigInt(6),
        ticket_type_id: 2
    }
];
exports.ticketTypeSeed = [
    {
        id: 1,
        description: "Normal",
        acronym: "NORMAL"
    },
    {
        id: 1,
        description: "Fan Club",
        acronym: "FAN"
    },
    {
        id: 1,
        description: "Vip Tickets",
        acronym: "VIP"
    },
    {
        id: 1,
        description: "Ultra Special",
        acronym: "SPECIAL"
    },
    {
        id: 1,
        description: "Legend Ticket",
        acronym: "LEGEND"
    }
];
//# sourceMappingURL=TicketSeed.js.map