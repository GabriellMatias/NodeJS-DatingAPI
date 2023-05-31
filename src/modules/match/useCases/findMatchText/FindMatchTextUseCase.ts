import { AppError } from "@shared/errors/AppError";
import MatchModel, { IMatch } from "@models/match";

interface IRequest {
  id: string;
  minMensagem: string;
  maxMensagem: string;
}

export class FindMatchTextUseCase {
  async execute({ id, minMensagem, maxMensagem }: IRequest): Promise<any> {
    const matches = MatchModel.findById(
      id,
      {
        unwind: "$menssagens",
        menssagens: {
          $slice: [parseInt(minMensagem), parseInt(maxMensagem)],
        },
      },
      {
        sort: {
          "menssagens.updatedAt": -1,
        },
        skip: parseInt(minMensagem),
        limit: parseInt(maxMensagem),
      }
    );

    if (!matches) {
      throw new AppError("User not found Match", 404);
    }

    return matches;
  }
}
