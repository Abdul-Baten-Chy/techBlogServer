import { Request, Response } from 'express';
import Stripe from 'stripe';
import catchAsyncAwait from '../../utills/catchAsyncAwait';
import sendResponse from '../../utills/sendResponse';
import { paymentServices } from './payment.service';

const stripe = new Stripe(
  'sk_test_51OupxERuBpildU6cZ4IuCbjyIVGlLbXjzllSz3MppyDSjhLIlm06fenoDOATLtmrZn0F2dlzmpgrD3gMNUuNSgb500SAhnnbAn'
);

const paymentIntent = catchAsyncAwait(async (req: Request, res: Response) => {
  console.log('up', req.body);

  const { amount } = req.body;
  const amountParse = parseInt(amount);
  console.log(amountParse, 'amount inside the intent');

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
const paySubscription = catchAsyncAwait(async (req: Request, res: Response) => {
  const payment = req.body;
  console.log(payment, 'my payment');
  const paymentResult = await paymentServices.paySubscription(payment);

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'payment created successfully',
    data: paymentResult,
  });
});

export const paymentController = { paymentIntent, paySubscription };
