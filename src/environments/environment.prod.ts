import {appConfig} from './app-config';

export const environment = {
  production: true,
  API_URL: appConfig.API_URL,
  USERS_TABLE_PATH: '/1',
  PRODUCTS_TABLE_PATH: '/2',
};
