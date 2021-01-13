import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import CreateUsersService from '@modules/users/services/CreateUsersService';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = container.resolve(CreateUsersService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });
    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatarService = container.resolve(
        UpdateUserAvatarService,
      );

      const user = await updateUserAvatarService.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ err: err.message });
    }
  },
);
export default usersRouter;
