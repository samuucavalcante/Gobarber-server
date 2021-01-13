import IUser from '@modules/users/entities/IUser';

export default interface IAppointment {
  id: string;

  provider_id: string;

  provider: IUser;

  date: Date;

  created_at: Date;

  update_at: Date;
}
