import { Model, Types } from 'mongoose';

export interface Tuser {
  email: string;
  password: string;
  role: string;

  verified: boolean;
  profile: {
    name: string;
    bio?: string;
    profilePicture?: string;
    followers?: Types.ObjectId[];
    following?: Types.ObjectId[];
  };
  createdAt?: Date;
  updatedAt?: Date;
}
export interface TuserUpdate {
  _id?: string;
  email?: string;
  password?: string;
  role?: string;
  bio: string;
  profilePicture: string;
  verified?: boolean;
  profile?: {
    name?: string;
    bio?: string;
    profilePicture?: string;
    followers?: Types.ObjectId[];
    following?: Types.ObjectId[];
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface userModel extends Model<Tuser> {
  isPasswordMatched(
    clientPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
