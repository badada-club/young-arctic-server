import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const typesArray = loadFilesSync('./src/graphql/schemes');

export const typeDefs = mergeTypeDefs(typesArray);