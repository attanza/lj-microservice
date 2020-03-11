import { Document } from 'mongoose';

export interface IReferral extends Document {
  code: string;
  description: string;
  products: IProduct[];
  creator: IUser;
  maxConsumer: number;
  consumer: IUser[];
  validUntil: Date;
  isExpired: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct {
  id: string;
  name: string;
}

export interface IUser {
  id: string;
  email: string;
  date?: Date;
  other?: string;
}
