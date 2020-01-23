import * as mongoose from 'mongoose';

export const RefferalSchema = new mongoose.Schema(
  {
    code: String,
    description: String,
    products: [
      {
        id: String,
        name: String,
      },
    ],
    creator: {
      id: String,
      email: String,
    },
    maxConsumer: {
      type: Number,
      default: 1,
    },
    consumer: [
      {
        id: String,
        email: String,
        date: Date,
      },
    ],
    validUntil: Date,
    isExpired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
