import jwt from 'jsonwebtoken';
type Tpayload = {
  userEmail: string;
  role: string;
};
export const createToken = (jwtPayload: Tpayload, secret: string) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: '20d',
  });
};
