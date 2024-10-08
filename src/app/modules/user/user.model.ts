import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config/config';
import AppError from '../../error/appError';
import { Tuser, userModel } from './user.interface';

const userSchema = new Schema<Tuser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['User', 'Admin'],
      required: true,
    },
    verified: { type: Boolean, default: false },
    profile: {
      name: { type: String, required: true },
      bio: { type: String, default: '' },
      profilePicture: { type: String, default: '' },
      followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password as string,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});
userSchema.pre('save', async function (next) {
  const userMail = this.email;

  const isExist = await User.findOne({ email: userMail });
  if (isExist) {
    const error = new AppError(409, 'user already exist ');
    return next(error);
  }
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isPasswordMatched = async function (
  clientPassword,
  hashedPassword
) {
  return await bcrypt.compare(clientPassword, hashedPassword);
};

export const User = model<Tuser, userModel>('User', userSchema);
