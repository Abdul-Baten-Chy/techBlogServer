import { Request, Response } from 'express';
import catchAsyncAwait from '../../utills/catchAsyncAwait';
import sendResponse from '../../utills/sendResponse';
import { postService } from './posts.services';

const createPost = catchAsyncAwait(async (req: Request, res: Response) => {
  const payload = req.body;

  // const token = req?.headers?.authorization?.split(' ')[1] as string;
  // console.log(req?.headers?.authorization, 'tik');

  // const decoded = jwt.verify(token, config.secreteKey as string) as JwtPayload;

  // const userEmail = decoded.userEmail;

  const result = await postService.createPostIntoDB(payload);
  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Post Created successfully',
    data: result,
  });
});
const increaseUpvote = catchAsyncAwait(async (req: Request, res: Response) => {
  console.log('up', req.body);

  const result = await postService.increaseUpvoteInDB(req.body);

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Post Created successfully',
    data: result,
  });
});
const increasedownVotes = catchAsyncAwait(
  async (req: Request, res: Response) => {
    const result = await postService.increasedownVoteInDB(req.body);

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Post Created successfully',
      data: result,
    });
  }
);
const getAllPosts = async (req: Request, res: Response) => {
  const result = await postService.getAllPostsFromDB();
  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Post retrieved successfully',
    data: result,
  });
};
const getSinglePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);

  const result = await postService.getSinglePostFromDB(id);
  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Post retrieved successfully',
    data: result,
  });
};
const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);

  const result = await postService.deletepostFromDB(id);
  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Post retrieved successfully',
    data: result,
  });
};

// const getMybookings = catchAsyncAwait(async (req: Request, res: Response) => {
//   const token = req?.headers?.authorization?.split(' ')[1] as string;

//   const decoded = jwt.verify(token, config.secreteKey as string) as JwtPayload;

//   const userEmail = decoded.userEmail;
//   console.log(userEmail, 'hellow');

//   const result = await bookingService.getMyBookingFromDb(userEmail);
//   return sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: 'Bookings retrieved successfully',
//     data: result,
//   });
// });
// const getAllCarBooking = catchAsyncAwait(
//   async (req: Request, res: Response) => {
//     const result = await bookingService.getAllCarBookingFromDb();
//     return sendResponse(res, {
//       success: true,
//       statusCode: 200,
//       message: 'Bookings retrieved successfully',
//       data: result,
//     });
//   }
// );

export const postController = {
  createPost,
  increaseUpvote,
  increasedownVotes,
  getAllPosts,
  getSinglePost,
  deletePost,
};
