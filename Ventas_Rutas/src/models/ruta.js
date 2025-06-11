import mongoose from 'mongoose';

const rutaSchema = new mongoose.Schema({
  origin: String,
  destination: String,
  fecha: Date,
  price: Number,
});


export default mongoose.model('ruta', rutaSchema);



