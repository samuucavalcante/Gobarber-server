import { container } from 'tsyringe';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import BCryptHashProvider from './implementations/BCrypyHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
