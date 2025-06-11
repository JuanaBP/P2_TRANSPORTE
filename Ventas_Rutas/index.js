import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSubgraphSchema } from '@apollo/subgraph';

import typeDefs from './typeDefs/index.js';        //  Importa los typeDefs fusionados
import resolvers from './src/resolvers/index.js';       // Importa los resolvers fusionados
import { connectDB } from './src/config/db.js';         // Ruta relativa desde ./src si estás en /src

const startServer = async () => {
  await connectDB();

  const app = express();

  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }) // Esquema federado con ambos
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4002;
  app.listen(PORT, () => {
    console.log(`venta_ruta_service listo en http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();
