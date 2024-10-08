import { Router } from 'express';
import { commentsRouter } from '../modules/comments/comments.route';
import { postRoute } from '../modules/posts/posts.route';
import { userRouter } from '../modules/user/user.router';

const router = Router();

const appRouter = [
  {
    path: '/auth',
    route: userRouter,
  },
  {
    path: '/comments',
    route: commentsRouter,
  },
  {
    path: '/posts',
    route: postRoute,
  },
];

appRouter.forEach((route) => router.use(route.path, route.route));

export default router;
