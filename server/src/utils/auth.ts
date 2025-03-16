import jwt from 'jsonwebtoken';
import { Document, Types } from 'mongoose';

// Define user interface for type safety
interface UserDocument extends Document {
  _id: Types.ObjectId;
  email: string;
  name?: string;
  password: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'nexus-knowledge-secret';

export const generateToken = (user: UserDocument): string => {
  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token: string): jwt.JwtPayload | null => {
  try {
    if (!token) return null;
    return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
  } catch (error) {
    return null;
  }
};
