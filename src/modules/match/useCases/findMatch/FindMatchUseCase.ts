import { AppError } from "@shared/errors/AppError";
import UserModel from "@models/user";
import MatchModel, { EMatchType, IMatch } from "@models/match";
import { ObjectId } from "mongoose";
import { SaveMatchUseCase } from "../save/SaveMatchUseCase";

interface IRequest {
  id: string;
}

export class FindMatchUseCase {
  async execute({ id }: IRequest): Promise<IMatch[]> {
    const matches: IMatch[] = await MatchModel.find({
      $or: [
        { "user1.id": id },
        { "user2.id": id },
      ],
    },
    {},
    {
      new: true,
      sort: { updatedAt: -1 },
      projection: { menssagens: { $slice: -1 } },
    });

    if (!matches) {
      throw new AppError("User not found Match", 404);
    }

    return matches;
  }
}
