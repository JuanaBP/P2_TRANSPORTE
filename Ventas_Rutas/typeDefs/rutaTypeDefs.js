import { gql } from 'apollo-server-express';

const rutaTypeDefs = gql`
  type Ruta @key(fields: "id") {
    id: ID!
    origin: String!
    destination: String!
    fecha: String!
    price: Float!
  }

  extend type Query {
    getRutas: [Ruta!]!
    getRutaById(id: ID!): Ruta
  }

  extend type Mutation {
    createRuta(
      origin: String!
      destination: String!
      fecha: String!
      price: Float!
    ): Ruta
  }
`;

export default rutaTypeDefs;
