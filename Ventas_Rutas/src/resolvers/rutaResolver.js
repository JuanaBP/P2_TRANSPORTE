import Ruta from '../models/ruta.js';

const rutaResolver = {
  Query: {
    getRutas: async () => await Ruta.find(),
    getRutaById: async (_, { id }) => await Ruta.findById(id),
  },

  Mutation: {
    createRuta: async (_, { origin, destination, fecha, price }) => {
      const nuevaRuta = new Ruta({ origin, destination, fecha, price });
      await nuevaRuta.save();
      return nuevaRuta;
    },
  },
};

export default rutaResolver;






