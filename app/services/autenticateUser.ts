import FetchAdapter from '../infra/http/FetchAdapter';

const httpClient = new FetchAdapter();
const API_BASE_URL = '/api';

interface LoginCredentials {
  email: string;
  password: string;
}

export const autenticateUser = {
  async login(credentials: LoginCredentials) {
    return await httpClient.post(`${API_BASE_URL}/login`, JSON.stringify(credentials));
  }
};
