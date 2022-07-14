import { mergeResolvers } from '@graphql-tools/merge';
import { resolvers as dateResolvers } from './date-resolvers';
import { resolvers as eventResolvers } from './event-resolvers';

export const resolvers = mergeResolvers([dateResolvers, eventResolvers]);
