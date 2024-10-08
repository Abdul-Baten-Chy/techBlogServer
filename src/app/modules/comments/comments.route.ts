import { Router } from 'express';
import requestVAlidator from '../../../midleware/requestValidator';
import { commentController } from './comments.controller';
import { carValidation } from './comments.validation';

const route = Router();

route.post(
  '/',
  // auth('User'),
  requestVAlidator(carValidation),
  commentController.createComments
);

route.get('/:id', commentController.getSingleComment);
// route.put('/return', auth('admin'), carsController.returnCar);
// route.get('/:id', carsController.getSingleCars);
// route.put(
//   '/:id',
//   auth('admin'),
//   requestVAlidator(carValidationUpdate),
//   carsController.updateSingleCar
// );
// route.delete('/:id', auth('admin'), carsController.deleteAcar);

export const commentsRouter = route;
