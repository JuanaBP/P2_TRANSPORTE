import { ApolloServer } from '@apollo/server';
import { ApolloGateway } from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from 'dotenv';

dotenv.config();

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'ticket', url: process.env.TICKET_SERVICE_URL },
    { name: 'payment', url: process.env.PAYMENT_SERVICE_URL }
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
