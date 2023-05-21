import { Date, model, Schema } from "mongoose";


export interface IImage extends Document {
  name: string;
  data: Buffer;
  contentType: string;
}

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
  password: string;
  googleId: string;

  name: string;
  city: string;
  state: string;
  country: string;
  photoProfile: IImage[],
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
  age: { type: Number },
  password: { type: String, required: true },
  googleId: { type: String },
  
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  sex: { type: String, required: true },
  sexPreference: { type: String, required: true },
  photoProfile: {
    type: [{
      name: String,
      data: Buffer,
      contentType: String,
    }],
    default: [],
  },
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