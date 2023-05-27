import UserModel from "@models/user";

interface MinAndMaxPreference {
  min: number;
  max: number;
}

interface IRequest {
  coordinate: number[];
  sex: string;
  sexPreference: string;
  settings: {
    agePreference: MinAndMaxPreference;
    distancePreference: MinAndMaxPreference;
  };
}


export class FindUsersUseCase {
  async execute({
    coordinate,
    sex,
    sexPreference,
    settings,
  }: IRequest): Promise<any> {
    const { min: minAge, max: maxAge } = settings.agePreference;
    const { min: minDistance, max: maxDistance } = settings.distancePreference;
    const latitude = coordinate[0];
    const longitude = coordinate[1];

    const users = await UserModel.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [latitude, longitude]
          },
          distanceField: 'distance',
          maxDistance: maxDistance * 1000,
          minDistance: minDistance * 1000,
          spherical: true
        }
      },
      {
        $match: {
          age: { $gte: minAge, $lte: maxAge },
          sex: sexPreference,
          sexPreference: sex, 
        }
      },
      {
        $project: {
          name: 1,
          distance: 1,
          age: 1,
          photoProfile: 1
        }
      }
    ]);

    return users;
  }
};
