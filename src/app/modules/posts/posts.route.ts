import { Router } from 'express';
import { postController } from './posts.controller';

const route = Router();

route.post('/', postController.createPost);
route.patch('/upVotes', postController.increaseUpvote);
route.patch('/downVotes', postController.increasedownVotes);
route.get('/', postController.getAllPosts);
route.get('/:id', postController.getSinglePost);
route.delete('/:id', postController.deletePost);
// route.get('/all-bookings', auth('admin'), bookingController.getAllCarBooking);
// route.get('/my-bookings', auth('user'), bookingController.getMybookings);

export const postRoute = route;
