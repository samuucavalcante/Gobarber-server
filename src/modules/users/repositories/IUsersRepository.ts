import User from '@modules/users/models/IUser';
import ICreateDTO from '../dtos/ICreateUsersDTO';

export default interface IUsersRepository {
  create(user: ICreateDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}
