import { Auths, Auth_roles, Prisma, Roles, Users, Tickets, Events, Ticket_type } from "@prisma/client";
import { PrismaDatabase } from "@configs/prisma.database"
import { userSeed } from "@seeds/UserSeed"
import { authSeed } from "@seeds/AuthSeed";
import { roleSeed } from "@seeds/RoleSeed";
import { eventSeed } from "@seeds/EventSeed";
import { ticketSeed } from "@seeds/TicketSeed";
import { ticketTypeSeed } from "@seeds/TicketSeed";
import { authRoleSeed } from "@seeds/Auth_RoleSeed";
import { CheckSeed } from "@seeds/CheckSeed";
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class SeedingService implements OnModuleInit {
  constructor(private readonly prisma: PrismaDatabase) {}

  async onModuleInit() {
    await this.seed();
  }

  async applySequenceQuery(tableName: string, idName: string) {
    const rawQuerySequence = `SELECT pg_get_serial_sequence('${tableName}', '${idName}');`
    const result = await this.prisma.$queryRaw(Prisma.sql([rawQuerySequence]))
    const rawQuery = `ALTER SEQUENCE ${result[0].pg_get_serial_sequence} RESTART WITH 4;`
    await this.prisma.$queryRaw(Prisma.sql([rawQuery]))
  }

  async seed() {
    const roles: Array<Roles> = roleSeed;
    const users: Array<Users> = userSeed;
    const authentications: Array<Auths> = authSeed;
    const authRoles: Array<Auth_roles> = authRoleSeed;
    const tickets: Array<Tickets> = ticketSeed;
    const ticket_types: Array<Ticket_type> = ticketTypeSeed;
    const events: Array<Events> = eventSeed();

    try {
      await this.prisma.roles.createMany({
        data: await CheckSeed.simpleCheck(roles, this.prisma.roles),
      });
      await this.prisma.auths.createMany({
        data: await CheckSeed.simpleCheck(authentications, this.prisma.auths),
      });
      await this.prisma.auth_roles.createMany({
        data: await CheckSeed.authRolesCheck(authRoles, this.prisma.auth_roles),
      });
      await this.prisma.users.createMany({
        data: await CheckSeed.simpleCheck(users, this.prisma.users),
      });
      await this.prisma.ticket_type.createMany({
        data: await CheckSeed.simpleCheck(ticket_types, this.prisma.ticket_type),
      });
      await this.prisma.tickets.createMany({
        data: await CheckSeed.simpleCheck(tickets, this.prisma.tickets),
      });
      await this.prisma.events.createMany({
        data: await CheckSeed.simpleCheck(events, this.prisma.events),
      });

      const rawQuerySequence = `SELECT count(*) FROM users;`
      const result = await this.prisma.$queryRaw(Prisma.sql([rawQuerySequence]))

      if (result[0].count == 3) {
        await this.applySequenceQuery('auths', 'auth_id');
        await this.applySequenceQuery('users', 'user_id');
      }

      console.log('Seeding completed successfully');
    } catch (error) {
      console.error('Error during seeding:', error);
      throw error;
    }
  }
}
