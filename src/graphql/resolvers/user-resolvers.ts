import { PrismaClient, User as DbUser, VkUser as DbVkUser } from '../../prisma/generated';
import { VkUser as GqlVkUser, VkUserInput } from '../generated/generated';

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