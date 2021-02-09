import { Database } from '../core/database';

import { Repository } from './repository';
import { User } from '../domain';

export class UserRepository implements Repository<User> {

  constructor(private db: Database<User>) {}

  find(): Promise<User[]> {
    return this.db.find({}, {});
  }

  findOne(user: Partial<User>): Promise<User | null> {
    return this.db.findOne({ login: user.login }, {});
  }

  findWhere(where: Partial<User>): Promise<User[]> {
    return this.db.find(where, {});
  }

  add(user: User): Promise<User> {
    return this.db.insert(user);
  }

  update(user: User, update: Partial<User>): Promise<void> {
    return this.db.update({ login: user.login }, update);
  }

}
