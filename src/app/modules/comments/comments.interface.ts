import { ObjectId } from 'mongoose';

interface IComment {
  post: ObjectId;
  author: ObjectId;
  content: string;
  createdAt?: Date;
}

export default IComment;
