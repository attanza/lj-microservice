import * as mongoose from 'mongoose';

export const ReferralSchema = new mongoose.Schema(
  {
    code: String,
    description: String,
    products: [
      {
        _id: false,
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
      default: 0,
    },
    consumer: [
      {
        _id: false,
        id: String,
        email: String,
        date: Date,
        other: String,
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
