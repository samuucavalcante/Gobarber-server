import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointments';
import { uuid } from 'uuidv4';
import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointments = this.appointments.find(
      appointment => appointment.date === date,
    );
    return findAppointments;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = new Appointment();

    appointment.id = uuid();
    appointment.provider_id = provider_id;
    appointment.date = date;

    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
