import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointments';
import IAppointments from '@modules/appointments/entities/IAppointment';

export default interface IAppointmentsRepository {
  create(appointment: ICreateAppointmentsDTO): Promise<IAppointments>;
  findByDate(date: Date): Promise<IAppointments | undefined>;
}
