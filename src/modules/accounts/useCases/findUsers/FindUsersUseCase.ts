import UserModel, { IUser } from "@models/user";
interface IRequest {
  latitude: string;
  longitude: string;
  id: string;
}
export class FindUsersUseCase {
  async execute({ latitude, longitude, id }: IRequest): Promise<any> {
    const user: IUser = await UserModel.findById(id);

    const users = await UserModel.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          distanceField: "distance",
          maxDistance: user.settings.distancePreference.max * 1000,
          minDistance: user.settings.distancePreference.min * 1000,
          spherical: true,
        },
      },
      {
        $match: {
          _id: { $nin: user.likeds },
          "liked._id": { $nin: [id] },
          age: {
            $gte: user.settings.agePreference.min,
            $lte: user.settings.agePreference.max,
          },
          sex: user.sexPreference,
          sexPreference: user.sex,
        },
      },
      { $limit: 20 },
    ]);

    const likeds = await UserModel.aggregate([
      { $match: { _id: { $in: user.likeds } } },
      { $limit: 20 },
    ])

    return {
      match: users,
      liked: likeds
    };
  }
}
