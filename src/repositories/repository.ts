export interface Repository<T> {

  find: () => Promise<T[]>;
  findOne: (filter: any) => Promise<T | null>;

}
