import { gql } from 'apollo-server-express';

const paymentTypeDefs = gql`
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

  extend type Query {
    getPayments: [Payment!]!
  }

  extend type Mutation {
    createPayment(
      ticketId: String!
      passengerName: String!
      amount: Float!
      method: String!
    ): Payment
  }
`;

export default paymentTypeDefs;
