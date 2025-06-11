import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  rutId: { type: String, required: true },
  
  price: Number,
  origin: String,
  destination: String,
  passengerName: String,
  passengerApellido: String,
  seatNumber: Number,
  ci:String,
  fecha: Date,
  cell:String,
  qrCode: String,
  hash: String,
});

export default mongoose.model('Ticket', ticketSchema);
