import { Payment } from './payment.model';
import { Tpayments } from './payments.interface';

const paySubscription = async (payload: Tpayments) => {
  return await Payment.create(payload);
};

export const paymentServices = {
  paySubscription,
};
