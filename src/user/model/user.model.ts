import { Schema, Document } from 'mongoose';

const UserShema = new Schema(
  { name: String, email: String, password: String },
  { timestamps: true, collection: 'users' },
);

export { UserShema };

export interface User extends Document {
  name: string;
  email: string;
  password: string;
}
