import { mergeTypeDefs } from '@graphql-tools/merge';
import ticketTypeDefs from './ticketTypeDefs.js';
import paymentTypeDefs from './paymentTypeDefs.js';
import rutaTypeDefs from './rutaTypeDefs.js';


const typeDefs = mergeTypeDefs([
  ticketTypeDefs,
  paymentTypeDefs,
  rutaTypeDefs,
]);

export default typeDefs;
