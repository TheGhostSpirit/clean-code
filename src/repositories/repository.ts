export interface Repository<T> {

  find: () => Promise<T[]>;
  findOne: (filter: Partial<T>) => Promise<T | null>;
  findWhere: (filter: Partial<T>) => Promise<T[]>;
  add: (object: T) => Promise<T>;
  update: (object: T, update: Partial<T>) => Promise<void>;

}
