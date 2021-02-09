import Datastore from 'nedb';

export class Database<T> {

  constructor(private dataStore: Datastore<T>) {}

  find(query: any, projection: any): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.dataStore.find(query, projection, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    });
  }

  findOne(query: any, projection: any): Promise<T> {
    return new Promise((resolve, reject) => {
      this.dataStore.findOne(query, projection, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    });
  }

  insert(object: T): Promise<T> {
    return new Promise((resolve, reject) => {
      this.dataStore.insert(object, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    });
  }

  update(query: any, update: Partial<T>): Promise<void> {
    return new Promise((resolve, reject) => {
      this.dataStore.update(query, { $set: update }, {}, err => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  }

}
