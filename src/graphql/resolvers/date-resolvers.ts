import { GraphQLError, GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        serialize(value: Date): number {
            return value.valueOf();
        },
        parseValue(value: number): Date {
            return new Date(value);
        },
        parseLiteral(ast): Date {
            if(ast.kind === Kind.INT) {
                return new Date(parseInt(ast.value));
            }
            throw new GraphQLError('Expected date value to be an Int but got: ' + ast.kind, [ast]);
        },
    })
};