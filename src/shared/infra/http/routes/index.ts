import { Router } from 'express';
import appointmentRouter from '@modules/appointments/infra/http/routes/appointment.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const app = Router();

app.use('/appointments', appointmentRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter);
export default app;
