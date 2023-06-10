import { AppError } from "@shared/errors/AppError";
import UserModel from "@models/user";
import MatchModel, { EMatchType, IMatch } from "@models/match";
import { ObjectId } from "mongoose";

interface IRequest {
  user_id: ObjectId;
  liked: ObjectId;
}

export class MatchUseCase {
  async execute({ user_id, liked }: IRequest): Promise<any> {
    const user = await UserModel.findById(user_id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const matches: IMatch[] = [];

    const likedUser = await UserModel.findById(liked);

    if (likedUser) {
      const likedUserId = likedUser._id.toString();
      // Verifica se a pessoa que recebeu o like também deu like ou superlike
      if (
        likedUser.likeds.includes(user_id)) {
        const match: IMatch = {
          user1: {
            id: user._id.toString(),
            name: user.name,
            photoProfile: user.photoProfile,
            description: user.description,
            age: user.age,
          },
          user2: {
            id: likedUserId,
            name: likedUser.name,
            photoProfile: likedUser.photoProfile,
            description: user.description,
            age: user.age,
          },
          matchType: EMatchType.like,
          user1Like: true,
          user2Like: likedUser.likeds.includes(user_id),
          date: new Date(),
          match: true,
        };

        matches.push(match);
      }

      // Adicionar o liked na lista
      user.likeds.push(liked);

      await user.save();

      await MatchModel.create(matches);

      return {
        match: matches,
      };
    } else {
      return {}
    }
  }
}
