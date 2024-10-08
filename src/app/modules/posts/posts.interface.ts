import { Types } from 'mongoose';

type TPost = {
  author: Types.ObjectId;
  title: string;
  content: string;
  images?: string[];
  category: string;
  tags?: string[];
  premium?: boolean;
  upvotes?: number;
  downvotes?: number;
  comments?: Types.ObjectId[];
  createdAt?: Date;
};

export default TPost;
