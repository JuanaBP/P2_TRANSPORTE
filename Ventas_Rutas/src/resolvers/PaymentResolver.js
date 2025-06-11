import Payment from '../models/Payment.js';
import { v4 as uuidv4 } from 'uuid';

const paymentResolver = {
  Query: {
    getPayments: async () => await Payment.find(),
  },

  Mutation: {
    createPayment: async (_, { ticketId, passengerName, amount, method }) => {
      const confirmationCode = uuidv4();

      const payment = new Payment({
        ticketId,
        passengerName,
        amount,
        method,
        status: 'CONFIRMED',
        confirmationCode,
        timestamp: new Date().toISOString(),
      });

      await payment.save();
      return payment;
    },
  },
};

export default paymentResolver;
