import { PrismaClient } from '../../prisma/generated';
import { TakePartInRaffle, TakePartInRaffleInput } from '../generated/generated';

const db = new PrismaClient();

export const resolvers = {
    Mutation: {
        takePartInRaffle: async (_: any, { input } : { input: TakePartInRaffleInput }): Promise<TakePartInRaffle> => {
            const existingRaffleUser = await db.raffleUser.findUnique({
                where: {
                    userId_raffleId: {
                        userId: input.userId,
                        raffleId: input.raffleId    
                    }
                }
            });    
            let key: string;
            if(!existingRaffleUser) {
                key = `${input.userId}_${input.raffleId}`;
                const dbRaffleUser = await db.raffleUser.upsert({
                    create: {
                        raffleId: input.raffleId,
                        userId: input.userId,
                        key: key
                    },
                    update: {
                        raffleId: input.raffleId,
                        userId: input.userId,
                        key: key
                    },
                    where: {
                        userId_raffleId: {
                            raffleId: input.raffleId,
                            userId: input.userId,   
                        }
                    }
                });
                if(!dbRaffleUser)
                    throw new Error(`Cannot create a record for ${input.userId} taking part in the ${input.raffleId} raffle.`);
                return {
                    userId: dbRaffleUser.userId,
                    raffleId: dbRaffleUser.raffleId,
                    key: dbRaffleUser.key    
                };
            } else {
                return {
                    userId: existingRaffleUser.userId,
                    raffleId: existingRaffleUser.raffleId,
                    key: existingRaffleUser.key    
                };
            } 
            
        }    
    }
};