import { Event as DbEvent, PrismaClient, VkEvent as DbVkEvent } from '../../prisma/generated';
import { Event as GqlEvent, EventInput } from '../generated/generated';

const db = new PrismaClient();

export const resolvers = {
    Query: {
        getEvents: async (): Promise<GqlEvent[]> => {
            const dbEvents = await db.event.findMany({
                include: {
                    vk: true
                }
            });
            return dbEvents.map(toGqlEvent);
        },    
    },
    Mutation: {
        createEvent: async (_: any, { input }: { input: EventInput }): Promise<GqlEvent> => {
            const dbEvent = await db.event.create({
                data: {
                    name: input.name,
                    date: input.date,
                    description: input.description,
    
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
                    vk: true
                }
            });
            return toGqlEvent(dbEvent);
        }    
    }
};

const toGqlEvent = (dbEvent: DbEvent): GqlEvent => {
    const dbVkEvent: DbVkEvent = (dbEvent as any).vk as DbVkEvent;
    return {
        id: dbEvent.id.toString(),
        name: dbEvent.name,
        date: dbEvent.date,
        description: dbEvent.description,

        creatorVkId: dbVkEvent.creatorVkId,
        groupVkId: dbVkEvent.groupVkId
    };
};