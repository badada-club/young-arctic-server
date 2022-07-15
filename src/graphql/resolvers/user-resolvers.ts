import { PrismaClient, User as DbUser, VkUser as DbVkUser } from '../../prisma/generated';
import { TakePartInEvent, TakePartInEventInput, VkUser as GqlVkUser, VkUserInput } from '../generated/generated';

const db = new PrismaClient();

export const resolvers = {
    Query: {
        getVkUsers: async (): Promise<GqlVkUser[]> => {
            const dbUsers = await db.user.findMany({
                include: {
                    vk: true
                }
            });
            return dbUsers.map(toGqlVkUser);
        },    
    },
    Mutation: {
        createVkUser: async (_: any, { input }: { input: VkUserInput }): Promise<GqlVkUser> => {
            const dbEvent = await db.user.create({
                data: {
                    name: input.name,
    
                    vk: {
                        create: {
                            vkId: input.vkId,
                        }
                    }
                },
                select: {
                    id: true,
                    name: true,
                    vk: true
                }
            });
            return toGqlVkUser(dbEvent);
        },
        takePartInEvent: async (_: any, { input } : { input: TakePartInEventInput }): Promise<TakePartInEvent> => {
            const dbEventUser = await db.eventUser.upsert({
                create: {
                    userId: input.userId,
                    eventId: input.eventId
                },
                update: {
                    userId: input.userId,
                    eventId: input.eventId
                },
                where: {
                    userId_eventId: {
                        eventId: input.eventId,
                        userId: input.userId
                    }
                }
            });
            return {
                eventId: dbEventUser.eventId,
                userId: dbEventUser.userId
            };
        }       
    }
};

const toGqlVkUser = (dbUser: DbUser): GqlVkUser => {
    const dbVkUser: DbVkUser = (dbUser as any).vk as DbVkUser;
    return {
        id: dbUser.id.toString(),
        name: dbUser.name,

        vkId: dbVkUser.vkId
    };
};