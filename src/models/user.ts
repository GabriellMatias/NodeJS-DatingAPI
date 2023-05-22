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
}, {
  timestamps: true,
});

userSchema.index({ location: '2dsphere' });

export default model<IUser>("User", userSchema);