import { User } from '../entities/user.entity';

export abstract class UserGateway {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract create(user: User): Promise<void>;
}
