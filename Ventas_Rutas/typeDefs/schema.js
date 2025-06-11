import { gql } from 'apollo-server-express';

const typeDefs = gql`
  # Tipo Ticket
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

  # Tipo Payment
  type Payment @key(fields: "id") {
    id: ID!
    ticketId: String!
    passengerName: String!
    amount: Float!
    method: String!
    status: String!
    confirmationCode: String!
    timestamp: String
  }

  # UNA SOLA definición de Query

  type Query {
    getTickets: [Ticket!]!
    getTicketById(id: ID!): Ticket
    getPayments: [Payment!]!
  }

  # UNA SOLA definición de Mutation
  
  type Mutation {
    createTicket(
      origin: String!
      destination: String!
      passengerName: String!
      passengerApellido: String!
      date: String!
      price: Float!
      seatNumber: Int!
    ): Ticket

    createPayment(
      ticketId: String!
      passengerName: String!
      amount: Float!
      method: String!
    ): Payment
  }
`;

export default typeDefs;
