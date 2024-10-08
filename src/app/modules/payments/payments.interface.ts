import { Types } from 'mongoose';

export type Tpayments = {
  userId: Types.ObjectId;
  amount: number;
  createdAt: Date;
};
