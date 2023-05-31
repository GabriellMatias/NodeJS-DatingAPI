import MatchModel, { MessageMatch } from "@models/match";


export class SaveMatchUseCase {
  async execute(chat_id: String, msgs: MessageMatch[]): Promise<any> {
    return await MatchModel.findByIdAndUpdate(chat_id, {
      $push: { menssagens: { $each: msgs } }
    });
  }
}
