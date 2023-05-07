import {appConfig} from './app-config';

export const environment = {
  production: true,
  API_URL: appConfig.API_URL,
  // authenticate
  LOGIN: '/authenticate/login',
  REGISTER: '/authenticate/register',
};
