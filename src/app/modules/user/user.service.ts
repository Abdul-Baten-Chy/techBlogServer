import config from '../../../config/config';
import { createToken } from '../auth/auth.utils';
import { Tuser, TuserUpdate } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: Tuser) => {
  console.log(payload, 'payload');

  const jwtPayload = {
    userEmail: payload.email,
    role: payload.role,
  };

  const token = createToken(jwtPayload, config.secreteKey as string);
  const user = await User.create(payload);
  return { user, token };
};
const updateUserIntoDB = async (payload: TuserUpdate) => {
  if (payload.bio) {
    return await User.findByIdAndUpdate(
      payload._id,
      { $set: { 'profile.bio': payload.bio } },
      { new: true }
    );
  }

  if (payload.profilePicture) {
    const user = await User.findByIdAndUpdate(
      payload._id,
      { $set: { 'profile.profilePicture': payload.profilePicture } },
      { new: true }
    );
    return user;
  }
};
const followUserIntoDB = async (payload: {
  followerId: string;
  targetUserId: string;
}) => {
  const { followerId, targetUserId } = payload;
  const targetUser = await User.findByIdAndUpdate(
    targetUserId,
    { $addToSet: { 'profile.followers': followerId } },
    { new: true }
  );
  if (!targetUser) {
    throw new Error('Target user not found');
  }
  const follower = await User.findByIdAndUpdate(
    followerId,
    { $addToSet: { 'profile.following': targetUserId } },
    { new: true }
  );

  if (!follower) {
    throw new Error('Folower  not found');
  }

  return { targetUser, follower };
};
const getUserFromDB = async (payload: string) => {
  console.log(payload);

  const user = await User.findById(payload);

  return user;
};

export const userServices = {
  createUserIntoDB,
  followUserIntoDB,
  updateUserIntoDB,
  getUserFromDB,
};
