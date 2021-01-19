import { getRepository, Repository } from 'typeorm';

import IUsersTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '../entities/UserToken';

class UsersTokenRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const findToken = await this.ormRepository.findOne({ where: { token } });

    return findToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    console.log('userToken');
    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UsersTokenRepository;
