import { UserRole } from '@prisma/client';

export type CreateUserRouteRequest = {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: UserRole;
};

export type CreateUserRouteResponse = {
  id: string;
};
