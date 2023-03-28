export type KeysType<T> = {
  [key in keyof T]: T[key];
};

export type ByIdType<T> = { [key: string]: T };
