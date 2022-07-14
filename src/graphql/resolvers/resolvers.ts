import { mergeResolvers } from '@graphql-tools/merge';
import { resolvers as dateResolvers } from './date-resolvers';
import { resolvers as eventResolvers } from './event-resolvers';
import { resolvers as raffleResolvers } from './raffle-resolvers';
import { resolvers as userResolvers } from './user-resolvers';

export const resolvers = mergeResolvers([dateResolvers, eventResolvers, userResolvers, raffleResolvers]);
