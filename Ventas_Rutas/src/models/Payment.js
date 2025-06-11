import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  ticketId: { type: String, required: true },
  passengerName: String,
  amount: Number,
  method: String,
  status: String,
  confirmationCode: String,
  timestamp: { type: Date, default: Date.now } //  bien configurado
});


export default mongoose.model('Payment', paymentSchema);
