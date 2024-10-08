import { Router } from 'express';
import { paymentController } from './payment.controller';

const route = Router();

route.post('/create-payment-intent', paymentController.paymentIntent);
route.post('/subscription', paymentController.paySubscription);

export const paymentRouter = route;
