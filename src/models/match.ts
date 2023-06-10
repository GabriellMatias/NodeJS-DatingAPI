import { ObjectId, Schema, Types, model } from "mongoose";

export enum EMatchType {
  like = "LIKE",
  superLike = "SUPERLIKE",
}

export enum EMessageType {
  text = "TEXT",
  image = "IMAGE",
}

export enum EMessageStatus {
  prepare = "PREPARE",
  sent = "SENT",
}

export interface UserMatch {
  id: string;
  name: string;
  description: string;
  age: number;
  photoProfile: [string];
}

export interface MessageText {
  author: {
    id: string;
  };
  createdAt: number;
  id: string;
  type: string;
  text: string;
}

export interface MessageMatch {
  room: string;
  text: MessageText;
  username: string;
  createdAt: Date;
  status: EMessageStatus;
}

export interface IMatch {
  user1: UserMatch;
  user2: UserMatch;
  date: Date;
  match: boolean;
  matchType: EMatchType;
  user1Like: boolean;
  user2Like: boolean;
  menssagens?: MessageMatch[];
}

const matchSchema = new Schema<IMatch>(
  {
    user1: {
      type: {
        id: String,
        name: String,
        description: String,
        age: Number,
        photoProfile: [String],
      },
      ref: "User",
      required: true,
    },
    user2: {
      type: {
        id: String,
        name: String,
        description: String,
        age: Number,
        photoProfile: [String],
      },
      ref: "User",
      required: true,
    },
    date: { type: Date, default: Date.now },
    match: { type: Boolean, default: false },
    matchType: { type: String, enum: ["LIKE", "SUPERLIKE"], required: true },
    user1Like: { type: Boolean, default: false },
    user2Like: { type: Boolean, default: false },
    menssagens: {
      type: [Object],
      default: [],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IMatch>("Match", matchSchema);
