export interface Interceptor {
    request?: Array<any>;
    response?: Array<any>;
}

export interface Options {
    baseURL?: string;
    withCredentials?: boolean;
    interceptors?: Interceptor;
}

export interface HttpClient {
    get(url: string, options?: Options): Promise<any>;
    post(url: string, data?: any, options?: Options): Promise<any>;
    put(url: string, data: any, options?: Options): Promise<any>;
}