import { gql } from 'apollo-server-express';

const ticketTypeDefs = gql`
  type Ticket @key(fields: "id") {
    id: ID!
    origin: String!
    destination: String!
    passengerName: String!
    passengerApellido: String!
    seatNumber: Int!
    ci: String!
    cell: String!
    fecha: String!
    qrCode: String
    hash: String
  }

  extend type Query {
    getTickets: [Ticket!]!
    getTicketById(id: ID!): Ticket
  }

  extend type Mutation {
    createTicket(
      origin: String!
      destination: String!
      passengerName: String!
      passengerApellido: String!
      date: String!
      price: Float!
      seatNumber: Int!
    ): Ticket
  }
`;

export default ticketTypeDefs;
