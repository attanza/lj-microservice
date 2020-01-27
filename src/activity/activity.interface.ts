import { Document } from 'mongoose';

export interface IActivity extends Document {
  user: IUser;
  ip: string;
  browser: string;
  activity: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IUser {
  id: string;
  email: string;
}
