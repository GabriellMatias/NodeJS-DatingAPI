import { Schema, model } from "mongoose";

export enum EMatchType {
  like = "LIKE",
  superLike = "SUPERLIKE",
}

export interface IMatch {
  user1: Schema.Types.ObjectId;
  user2: Schema.Types.ObjectId;
  date: Date;
  match: boolean;
  matchType: EMatchType;
  user1Like: boolean;
  user2Like: boolean;
  user1SuperLike: boolean;
  user2SuperLike: boolean;
}

const matchSchema = new Schema<IMatch>({
  user1: { type: Schema.Types.ObjectId, ref: "User", required: true },
  user2: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  match: { type: Boolean, default: false },
  matchType: { type: String, enum: ["LIKE", "SUPERLIKE"], required: true },
  user1Like: { type: Boolean, default: false },
  user2Like: { type: Boolean, default: false },
  user1SuperLike: { type: Boolean, default: false },
  user2SuperLike: { type: Boolean, default: false },
}, {
  timestamps: true,
});

export default model<IMatch>("Match", matchSchema);