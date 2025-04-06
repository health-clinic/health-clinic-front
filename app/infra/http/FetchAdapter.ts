import { HttpClient } from './HttpClient';

export default class FetchAdapter implements HttpClient {
  async get (url: string): Promise<any> {
    const response = await fetch(url, { method: 'get' });
    return response;
  }

  async post (url: string, data: any): Promise<any> {
    const response = await fetch(url, { method: 'post', body: data});
    return response;
  }

  async put (url: string, data: any): Promise<any> {
    const response = await fetch(url, { method: 'put', body: data });
    return response;
  }
}