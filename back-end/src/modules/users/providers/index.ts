import { container } from 'tsyringe';
import BCryptHashProvider from './HashProvider/implementation/BCryptHashProvider';
import IHashProvider from './HashProvider/models/IHashProvider';

container.registerSingleton<IHashProvider>('IHashProvider', BCryptHashProvider);
