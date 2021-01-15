import { container } from 'tsyringe';

import IHashProvider from './models/IHashProvider';
import BCryptHashProvider from './implementations/BCrypyHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
