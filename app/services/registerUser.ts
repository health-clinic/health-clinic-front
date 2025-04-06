import FetchAdapter from '../infra/http/FetchAdapter';

const httpClient = new FetchAdapter();
const API_BASE_URL = '/api';

interface IAddressProps {
  zip_code: string;
  district: string;
  street: string;
  number: string;
  complement: string;
}

interface IRegisterProps {
  name: string;
  email: string;
  document: string;
  phone: string;
  birthdate: string;
  address: IAddressProps;
  password: string;
}

export const registerUser = {
  async register(data: IRegisterProps) {
    return await httpClient.post(`${API_BASE_URL}/register`, JSON.stringify(data));
  }
};
