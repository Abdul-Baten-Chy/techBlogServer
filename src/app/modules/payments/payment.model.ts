import { Schema, model } from 'mongoose';
import { Tpayments } from './payments.interface';

const paymentSchema = new Schema<Tpayments>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
      },
    },
  }
);

export const Payment = model<Tpayments>('Payment', paymentSchema);
