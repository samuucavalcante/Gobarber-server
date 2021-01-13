import { Response, Request } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { date, provider_id } = request.body;

      const parsedDate = parseISO(date);

      const createAppointment = container.resolve(CreateAppointmentService);

      const appointment = await createAppointment.execute({
        provider_id,
        date: parsedDate,
      });

      return response.json(appointment);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default AppointmentController;
