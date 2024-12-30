import { PrismaDatabase } from "@configs/prisma.database";
import { OnModuleInit } from '@nestjs/common';
export declare class SeedingService implements OnModuleInit {
    private readonly prisma;
    constructor(prisma: PrismaDatabase);
    onModuleInit(): Promise<void>;
    applySequenceQuery(tableName: string, idName: string): Promise<void>;
    seed(): Promise<void>;
}
