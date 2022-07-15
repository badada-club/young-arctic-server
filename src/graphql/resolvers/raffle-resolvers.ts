import { PrismaClient } from '../../prisma/generated';

const db = new PrismaClient();

export const resolvers = {
    Mutation: {
        takePart: async (_: any, input: { userId: number, raffleId: number }): Promise<string> => {
            const existingRaffleUser = await db.raffleUser.findUnique({
                where: {
                    userId_raffleId: {
                        userId: input.userId,
                        raffleId: input.raffleId    
                    }
                }
            });    
            if(!existingRaffleUser) {
                const key = `${input.userId}_${input.raffleId}`;
                const dbRaffleUser = await db.raffleUser.create({
                    data: {
                        raffleId: input.raffleId,
                        userId: input.userId,
                        key: key
                    }
                });
                if(!dbRaffleUser)
                    throw new Error(`Cannot create a record for ${input.userId} taking part in the ${input.raffleId} raffle.`);
                return key;
            } else {
                return existingRaffleUser.key;
            }
        }    
    }
};