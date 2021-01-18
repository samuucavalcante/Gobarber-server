import IUsersTokenRepository from 'modules/users/repositories/IUserTokensRepository';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { uuid } from 'uuidv4';

class FakesUsersRepository implements IUsersTokenRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const findUserByToken = await this.userTokens.find(
      userToken => userToken.token === token,
    );

    return findUserByToken;
  }
}

export default FakesUsersRepository;
