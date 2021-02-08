import { Database } from '../core/database';

import { Repository } from './repository';
import { User } from '../domain';

export class UserRepository implements Repository<User> {

  constructor(private db: Database<User>) {}

  find(): Promise<User[]> {
    return this.db.find({}, {});
  }

  findOne(login: string): Promise<User | null> {
    return this.db.findOne({ login }, {});
  }

}
