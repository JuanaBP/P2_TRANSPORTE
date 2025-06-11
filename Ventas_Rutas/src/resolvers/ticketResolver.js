import Ticket from '../models/Ticket.js';
import QRCode from 'qrcode';

const ticketResolver = {
  Query: {
    getTickets: async () => await Ticket.find(),
  },

  Mutation: {
    createTicket: async (_, {
      origin,
      destination,
      passengerName,
      passengerApellido,
      seatNumber,
      date,
      price
    }) => {
      const hash = Buffer.from(`${origin}-${destination}-${passengerName}-${seatNumber}-${date}`).toString('base64');

      const qrText = `${passengerName} ${passengerApellido}|${origin}|${destination}|${seatNumber}|${date}`;
      const qrCode = await QRCode.toDataURL(qrText);

      const ticket = new Ticket({
        origin,
        destination,
        passengerName,
        passengerApellido,
        seatNumber,
        date,
        price,
        hash,
        qrCode
      });

      await ticket.save();
      return ticket;
    }
  }
};

export default ticketResolver;






