import type { RoleType } from '../../../constants';

export interface IUser {
  email: string;
  password?: string;
  role: RoleType;
  avatar?: string;
}
