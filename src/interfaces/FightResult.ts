import { GraphQLScalarType } from 'graphql';

export const FightResultScalar = new GraphQLScalarType({
  name: 'FightResultScalar',
  description: 'Custom scalar type for FightResult',
  parseValue(value) {
    if (value !== 'win' && value !== 'lose' && value !== 'draw') {
      throw new Error('Invalid FightResult value');
    }
    return value;
  },
  serialize(value) {
    if (value !== 'win' && value !== 'lose' && value !== 'draw') {
      throw new Error('Invalid FightResult value');
    }
    return value;
  },
});
