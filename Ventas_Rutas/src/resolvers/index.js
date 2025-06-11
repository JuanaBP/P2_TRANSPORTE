import { mergeResolvers } from '@graphql-tools/merge';

import ticketResolver from './ticketResolver.js';
import paymentResolver from './PaymentResolver.js';
import rutaResolver from './rutaResolver.js';

const resolvers = mergeResolvers([
  ticketResolver,
  paymentResolver,
  rutaResolver,
]);

export default resolvers;

