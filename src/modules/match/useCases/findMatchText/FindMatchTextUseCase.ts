import { AppError } from "@shared/errors/AppError";
import MatchModel, { IMatch } from "@models/match";

interface IRequest {
  id: string;
  lastMessagemId: string;
  fristMensagemId: string;
}

export class FindMatchTextUseCase {
  async execute({ id ,fristMensagemId, lastMessagemId }: IRequest): Promise<any> {
    const matches:IMatch = await MatchModel.findById(id);

    //a partir da ultima mensagem
    if (lastMessagemId) {
      const lastMessagem = matches.menssagens.find((messagem) => messagem.text.id == lastMessagemId);
      const index = matches.menssagens.indexOf(lastMessagem);
      const menssagens = matches.menssagens.slice(index + 1, index + 11);
      return menssagens;
    }

    //a partir da primeira mensagem
    if (fristMensagemId) {
      const fristMessagem = matches.menssagens.find((messagem) => messagem.text.id == fristMensagemId);
      const index = matches.menssagens.indexOf(fristMessagem);
      const menssagens = matches.menssagens.slice(index - 10, index);
      return menssagens;
    }

    return matches.menssagens;
  }
}
