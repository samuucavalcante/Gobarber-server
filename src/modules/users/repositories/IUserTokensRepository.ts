import IUserToken from '../models/IUserToken';

export default interface IUserTokenRepository {
  generate(user_id: string): Promise<IUserToken>;
  findByToken(token: string): Promise<IUserToken | undefined>;
}
