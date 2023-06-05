import { AppError } from "@shared/errors/AppError";
import UserModel from "@models/user";
import MatchModel, { EMatchType, IMatch } from "@models/match";
import { ObjectId } from "mongoose";

interface IRequest {
  user_id: ObjectId;
  likeds: [ObjectId];
  dislikeds: [ObjectId];
  superlikeds: [ObjectId];
}

interface IResponse {
  matches: IMatch[];
}

export class MatchUseCase {
  async execute({
    user_id,
    likeds,
    dislikeds,
    superlikeds,
  }: IRequest): Promise<IResponse> {
    const user = await UserModel.findById(user_id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const matches: IMatch[] = [];

    for (const likedId of likeds) {
      const likedUser = await UserModel.findById(likedId);
      const likedUserId = likedUser._id.toString();

      if (likedUser) {
        // Verifica se a pessoa que recebeu o like também deu like ou superlike
        if (likedUser.likeds.includes(user_id) || likedUser.superlikeds.includes(user_id)) {
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
            user1SuperLike: false,
            user2SuperLike: false,
            date: new Date(),
            match: true,
          };

          if (likedUser.superlikeds.includes(user_id)) {
            match.matchType = EMatchType.superLike,
            match.user1SuperLike = true;
            match.user2SuperLike = true;
          }

          matches.push(match);
        }
      }
    }

    // Atualiza os likes, superlikes e deslikes do usuário
    user.likeds = likeds;
    user.superlikeds = superlikeds;
    user.dislikeds = dislikeds;
    await user.save();

    // Salva os matches no banco de dados
    
    // Verifica se a conta possui usuario, se não cria um
    await MatchModel.create(matches);

    return {
      matches: matches,
    };
  }
}
