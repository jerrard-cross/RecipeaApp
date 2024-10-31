import { ClassConstructor, plainToInstance } from "class-transformer";

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
