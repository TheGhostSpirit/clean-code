import { UserRole } from './user-role';

export interface User {
  login: string;
  role: UserRole;
}
