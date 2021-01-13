import { Router } from 'express';
import appointmentRouter from './appointment.routes';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';

const app = Router();

app.use('/appointments', appointmentRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter);
export default app;
