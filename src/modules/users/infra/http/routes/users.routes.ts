import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UpdateAvatarController from '../controllers/UpdateAvatarController';
import UsersController from '../controllers/UsersController';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();
const updateAvatarController = new UpdateAvatarController();
const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateAvatarController.update,
);
export default usersRouter;
