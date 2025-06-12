import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import fetch from 'node-fetch';

const SPRINGBOOT_URL = 'http://localhost:8080/graphql';

const typeDefs = gql`
  type Usuario @key(fields: "id") {
    id: ID!
    nombre: String
    email: String
    password: String
    token: String
    rol_id: Int
  }

  type Query {
    obtenerUsuarios: [Usuario]
  }

  type Mutation {
    createUsuario(nombre: String!, email: String!, password: String!): Usuario
  }
`;

const resolvers = {
  Query: {
    obtenerUsuarios: async () => {
      const response = await fetch(SPRINGBOOT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query {
              obtenerUsuarios {
                id
                nombre
                email
                rol_id
              }
            }
          `
        }),
      });

      const result = await response.json();
      return result.data.obtenerUsuarios;
    },
  },
  Mutation: {
    createUsuario: async (_, { nombre, email, password }) => {
      const response = await fetch(SPRINGBOOT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation {
              createUsuario(input: {
                nombre: "${nombre}"
                email: "${email}"
                password: "${password}"
              }) {
                id
                nombre
                email
                rol_id
              }
            }
          `
        }),
      });

      const result = await response.json();
      return result.data.createUsuario;
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`Proxy federado corriendo en: ${url}`);
});
