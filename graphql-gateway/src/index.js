import { ApolloServer } from '@apollo/server';
import { ApolloGateway } from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from 'dotenv';

dotenv.config();

const gateway = new ApolloGateway({
  serviceList: [
 
    { name: 'ventas_rutas', url: process.env.VENTAS_RUTAS_URL },
    { name: 'usuarios', url: process.env.SPRINGBOOT_PROXY_URL }
  ]
});

const server = new ApolloServer({
  gateway,
  subscriptions: false
});

const PORT = process.env.PORT || 4000;

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT }
});

console.log(`Gateway GraphQL corriendo en ${url}`);
