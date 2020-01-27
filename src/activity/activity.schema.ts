import * as mongoose from 'mongoose';

export const ActivitySchema = new mongoose.Schema(
  {
    user: {
      id: String,
      email: String,
    },
    ip: String,
    browser: String,
    activity: String,
  },
  { timestamps: true },
);
