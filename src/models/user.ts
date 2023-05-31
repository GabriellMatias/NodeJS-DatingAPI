import { Date, model, Schema } from "mongoose";

export interface IMinAndMaxPreference {
  min: number;
  max: number;
}

export interface IUser {
  expiredToken: string;
  expiredDate: Date;
  email: string;
  cellphone: string;
  dateBirth: string;
  age: number;
  googleId: string;

  name: string;
  description: string;
  username: string;
  photoProfile: [string],
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  sex: string;
  sexPreference: string;
  settings: {
    agePreference: IMinAndMaxPreference;
    distancePreference: IMinAndMaxPreference;
  };
  likeds: [Schema.Types.ObjectId],
  dislikeds: [Schema.Types.ObjectId],
  superlikeds: [Schema.Types.ObjectId],
}

const userSchema = new Schema<IUser>({
  expiredToken: { type: String, default: null},
  expiredDate: { type: Date, default: null},
  email: { type: String, required: true },
  cellphone: { type: String, required: true },
  dateBirth: { type: String, required: true },
  age: { type: Number, required: true },
  googleId: { type: String },
  
  name: { type: String, required: true },
  description: { type: String, default: "Hello, I'm new here" },
  username: { type: String },
  sex: { type: String, required: true },
  sexPreference: { type: String, required: true },
  photoProfile: { type: [String], default: [] },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  settings: {
    agePreference: {
      min: { type: Number, default: 18 },
      max: { type: Number, default: 100 },
    },
    distancePreference: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 100 },
    },
  },
  likeds: [{ type: Schema.Types.ObjectId, ref: "User" }],
  dislikeds: [{ type: Schema.Types.ObjectId, ref: "User" }],
  superlikeds: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, {
  timestamps: true,
});

userSchema.index({ location: '2dsphere' });

export default model<IUser>("User", userSchema);