import HandlebarsMailTemplateProvider from '@modules/users/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from '@modules/users/providers/MailTemplateProvider/models/IMailTemplateProvider';
import { container } from 'tsyringe';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import IMailProvider from './MailProvider/models/IMailProvider';
import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProvider';
import IStorageProvider from './StorageProviders/models/IStorageProvider';

container.registerSingleton<IStorageProvider>(
  'IStorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'IMailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'IMailProvider',
  container.resolve(EtherealMailProvider),
);
