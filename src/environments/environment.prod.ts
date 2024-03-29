import {appConfig} from './app-config';

export const environment = {
  production: true,
  API_URL: appConfig.API_URL,
  USERS_TABLE: '/1',
  PRODUCTS_TABLE: '/2',
  FEEDBACKS_TABLE: '/3',
};
