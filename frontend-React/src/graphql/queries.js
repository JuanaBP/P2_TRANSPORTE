import { gql } from '@apollo/client';

// Buscar tickets disponibles
export const SEARCH_TICKETS = gql`
  query ($origin: String!, $destination: String!, $date: String!) {
    searchTickets(origin: $origin, destination: $destination, date: $date) {
      id
      origin
      destination
      departureTime
      arrivalTime
      price
      company
    }
  }
`;

// NLP: Parsear lenguaje natural
export const PARSE_NLP = gql`
  query ($text: String!) {
    parseNaturalText(text: $text) {
      origin
      destination
      date
      passengers
    }
  }
`;

// Obtener todos los tickets (admin)
export const GET_TICKETS = gql`
  query {
    getTickets {
      id
      origin
      destination
      passengerName
      passengerApellido
      seatNumber
      date
      price
      qrCode
      hash
    }
  }
`;

// Obtener todos los pagos (admin)
export const GET_PAYMENTS = gql`
  query {
    getPayments {
      id
      passengerName
      amount
      method
      status
      confirmationCode
      timestamp
    }
  }
`;
