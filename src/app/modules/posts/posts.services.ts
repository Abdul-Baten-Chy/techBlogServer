import TPost from './posts.interface';
import { Post } from './posts.model';

const createPostIntoDB = async (payload: TPost) => {
  // const user = await User.findOne({ email: userEmail });
  // if (user) {
  //   payload.author = user?._id;
  // }

  const newPost = await Post.create(payload);

  // if (newPost) {
  //   await Car.findByIdAndUpdate(payload.car, { status: 'unavailable' });
  // }
  await newPost.populate('author');
  return newPost;
};
const increaseUpvoteInDB = async (payload: { postId: string }) => {
  const { postId } = payload;
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { $inc: { upvotes: 1 } },
    { new: true }
  );

  return updatedPost;
};
const increasedownVoteInDB = async (payload: { postId: string }) => {
  const { postId } = payload;
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      $inc: {
        downvotes: 1,
      },
    },
    { new: true }
  );

  return updatedPost;
};
const getAllPostsFromDB = async () => {
  return await Post.find().populate('author').exec();
};
const getSinglePostFromDB = async (id: string) => {
  return await Post.findById(id)
    .populate('author')
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        select: 'profile.name  profile.profilePicture',
      },
    })
    .exec();
};
// const getMyBookingFromDb = async (userEmail: string) => {
//   const user = await User.findOne({ email: userEmail });
//   let userId;
//   if (user) {
//     userId = user?._id;
//     console.log({ userId, user });
//   }

//   return await Booking.find({ user: userId });
// };
// const getAllCarBookingFromDb = async () => {
//   const result = await Booking.find();

//   return result;
// };
export const postService = {
  createPostIntoDB,
  increaseUpvoteInDB,
  increasedownVoteInDB,
  getAllPostsFromDB,
  getSinglePostFromDB,
};
