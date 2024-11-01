import { config } from "@/src/constants/config";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ClassConstructor, plainToInstance } from "class-transformer";

export interface ResponseDataObject<T> {
  response: AxiosResponse<any, any>;
  data: T;
}

export async function getURL(): Promise<string> {
  return config.GATEWAY_URL;
}

// Configure axios, load constants, baseURL
export const apiClient = axios.create({
  baseURL: config.GATEWAY_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function mapResponseToDataInstance<T>(classType: ClassConstructor<T>) {
  return ({ data, ...rest }: any) => {
    return { ...rest, data: mapToInstance(classType)(data) };
  };
}

export function mapResponseToInstance<T>(classType: ClassConstructor<T>) {
  return ({ data }: any) => {
    return mapToInstance(classType)(data);
  };
}

export function mapResponseToDataArray<T>(classType: ClassConstructor<T>) {
  return ({ data, ...rest }: any) => {
    return { ...rest, data: mapToArray(classType)(data) };
  };
}

export function mapResponseToArray<T>(classType: ClassConstructor<T>) {
  return ({ data }: any) => {
    return mapToArray(classType)(data);
  };
}

export function mapToInstance<T>(classType: ClassConstructor<T>) {
  return (r: T) => {
    return !r ? null : plainToInstance(classType, r, {});
  };
}

export function mapToArray<T>(classType: ClassConstructor<T>) {
  return (r: T[]) => {
    return !r ? null : r.map((m: T) => plainToInstance(classType, m));
  };
}

export class BaseService {
  async query<T>(
    url: string,
    method: string,
    data?: any
  ): Promise<ResponseDataObject<T>> {
    const response = await apiClient.request({
      url,
      method,
      data,
    });

    return {
      response,
      data: response.data,
    };
  }

  async get<T>(url: string): Promise<ResponseDataObject<T>> {
    return await this.query(url, "GET");
  }

  async post<T>(url: string, data?: any): Promise<ResponseDataObject<T>> {
    return await this.query(url, "POST", data);
  }

  async put<T>(url: string, data?: any): Promise<ResponseDataObject<T>> {
    return await this.query(url, "PUT", data);
  }

  async delete<T>(url: string): Promise<ResponseDataObject<T>> {
    return await this.query(url, "DELETE");
  }
}
