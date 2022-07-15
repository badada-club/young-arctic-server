import { PrismaClient } from '../prisma/generated';

const db = new PrismaClient();

import { WebHookTargets } from './webhook';

export class DbTargets implements WebHookTargets {
    async get(): Promise<string[]> {
        const dbTargets = await db.webHookTargets.findMany();
        return dbTargets.map(target => target.url);
    }
    async add(url: string): Promise<number> {
        const dbTarget = await db.webHookTargets.create({
            data: {
                url: url
            },
            select: {
                id: true
            }
        });
        return dbTarget.id;
    }
    async remove(id: number): Promise<void> {
        await db.webHookTargets.delete({
            where: {
                id: id
            }
        });
    }
}