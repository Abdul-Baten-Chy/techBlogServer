import { User } from '../user/user.model';
import { Payment } from './payment.model';
import { Tpayments } from './payments.interface';

const paySubscription = async (payload: Tpayments) => {
  const paymentInfo = await Payment.create(payload);
  const updatedUser = await User.findByIdAndUpdate(
    payload.userId,
    {
      $set: { verified: true },
    },
    { new: true }
  );
  const updatedInfo = { paymentInfo, updatedUser };
  return updatedInfo;
};

export const paymentServices = {
  paySubscription,
};
