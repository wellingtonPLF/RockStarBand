import { Injectable } from '@nestjs/common';
import { PrismaDatabase } from '@configs/prisma.database';
import { Events, Prisma } from '@prisma/client';
import { Decimal, DefaultArgs } from '@prisma/client/runtime/library';
import { IEvent } from '@/shared/interfaces/context.interface';
import { LimitTicketEnum } from '@/shared/enums/general.enum';

@Injectable()
export class EventsRepository implements IEvent {
  private database: Prisma.EventsDelegate<DefaultArgs>;

  constructor(private prisma: PrismaDatabase) {
    this.database = prisma.events;
  }

  async findAll(): Promise<any> {
    try {
      const result = await this.database.findMany();
      return result;
    } catch (e) {
      throw new Error(
        `Error At EventsRepository findAll prisma => ${e.message}`,
      );
    }
  }

  async getAllValid(): Promise<any> {
    try {
      const rawQuery = `
                SELECT 
                    e.id::integer,
                    TO_CHAR(e.event_initial_date, 'DD') AS day,
                    TO_CHAR(e.event_initial_date, 'FMMonth') AS month,
                    TO_CHAR(e.event_initial_date, 'FMDay') AS weekday,
                    TO_CHAR(e.event_initial_date, 'YYYY') AS year,	
                    e.location, 
                    e.city, 
                    c.country_name as country,
                    nt.normal, 
                    nt.fan, 
                    nt.vip
                FROM events AS e
                JOIN countries as c ON c.acronym = e.country
                LEFT JOIN (
                    WITH numbered_tickets AS (
                      SELECT 
                          id,
                          event_id,
                          ROW_NUMBER() OVER (PARTITION BY event_id ORDER BY id) AS row_num
                      FROM tickets
                  )
                  SELECT
                      nt.event_id,
                      MAX(CASE 
                          WHEN nt.row_num = 1 AND tu.quantity = ${LimitTicketEnum.NORMAL}
                          THEN null
                      WHEN nt.row_num = 1
                      THEN nt.id
                          END) AS normal,
                      MAX(CASE 
                          WHEN nt.row_num = 2 AND tu.quantity = ${LimitTicketEnum.FAN}
                          THEN null
                      WHEN nt.row_num = 2
                      THEN nt.id
                          END) AS fan,
                      MAX(CASE 
                          WHEN nt.row_num = 3 AND tu.quantity = ${LimitTicketEnum.VIP}
                          THEN null
                      WHEN nt.row_num = 3
                      THEN nt.id
                          END) AS vip
                  FROM 
                      numbered_tickets nt
                  LEFT JOIN 
                      ticket_user tu ON nt.id = tu.ticket_id
                  GROUP BY 
                      nt.event_id
                ) AS nt ON nt.event_id = e.id ORDER BY e.id limit 5
            `;
      const result = await this.prisma.$queryRaw(Prisma.sql([rawQuery]));
      return result;
    } catch (e) {
      throw new Error(
        `Error At EventsRepository findAll prisma => ${e.message}`,
      );
    }
  }

//   async findById(id: number): Promise<any> {
//     try {
//       const result = await this.database.findUnique({
//         where: { event_id: id },
//       });
//       return result;
//     } catch (e) {
//       throw new Error(
//         `Error At EventsRepository findById prisma => ${e.message}`,
//       );
//     }
//   }

//   async create({
//     ticket,
//     city,
//     location,
//     country,
//     value,
//     initialDate,
//     endDate,
//   }: any): Promise<any> {
//     try {
//       const data: any = {
//         location,
//         city,
//         country,
//         ticket_id: ticket,
//         value: new Decimal(value),
//         event_initial_date: initialDate,
//         event_end_date: endDate,
//       };
//       const events = await this.database.create({ data }).catch((e) => {
//         throw new Error(
//           `Error at EventsRepository create Prisma=> ${e.message}`,
//         );
//       });
//       return events;
//     } catch (e) {
//       throw new Error(
//         `Error at EventsRepository create prisma => ${e.message}`,
//       );
//     }
//   }

//   async update({
//     id,
//     ticket,
//     city,
//     location,
//     country,
//     value,
//     initialDate,
//     endDate,
//   }: any): Promise<any> {
//     await this.database
//       .update({
//         where: { event_id: id },
//         data: {
//           location,
//           city,
//           country,
//           ticket_id: ticket,
//           value: new Decimal(value),
//           event_initial_date: initialDate,
//           event_end_date: endDate,
//         },
//       })
//       .catch((e) => {
//         throw new Error(
//           `Error at EventsRepository update prisma => ${e.message}`,
//         );
//       });
//   }
}
