import { webhook } from '../..';
import { Event as DbEvent, PrismaClient, VkEvent as DbVkEvent } from '../../prisma/generated';
import { VkEvent as GqlVkEvent, VkEventInput } from '../generated/generated';

const db = new PrismaClient();

export const resolvers = {
    Query: {
        getVkEvents: async (): Promise<GqlVkEvent[]> => {
            const dbEvents = await db.event.findMany({
                include: {
                    vk: true,
                    raffle: true
                }
            });
            return dbEvents.map(toGqlVkEvent);
        },    
    },
    Mutation: {
        createVkEvent: async (_: any, { input }: { input: VkEventInput }): Promise<GqlVkEvent> => {
            const dbEvent = await db.event.create({
                data: {
                    name: input.name,
                    date: input.date,
                    description: input.description,
                    location: input.location,
                    cost: input.cost,
    
                    vk: {
                        create: {
                            creatorVkId: input.creatorVkId,
                            groupVkId: input.groupVkId
                        }
                    }
                },
                select: {
                    id: true,
                    name: true,
                    date: true,
                    description: true,
                    location: true,
                    cost: true,

                    vk: true
                }
            });
            await webhook.trigger({ id: dbEvent.id });
            return toGqlVkEvent(dbEvent);
        }    
    }
};

const toGqlVkEvent = (dbEvent: DbEvent): GqlVkEvent => {
    const dbVkEvent: DbVkEvent = (dbEvent as any).vk as DbVkEvent;
    
    return {
        id: dbEvent.id.toString(),
        name: dbEvent.name,
        date: dbEvent.date,
        description: dbEvent.description,
        location: dbEvent.location,
        cost: dbEvent.cost,

        creatorVkId: dbVkEvent.creatorVkId,
        groupVkId: dbVkEvent.groupVkId,

        raffleId: (dbEvent as any)?.raffleId
    };
};