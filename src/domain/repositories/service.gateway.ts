import { Service } from '../entities/service.entity';

export abstract class ServiceGateway {
  abstract create(service: Service): Promise<void>;
  abstract update(service: Service): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(): Promise<Service[]>;
  abstract findById(id: string): Promise<Service | null>;
  abstract findByName(name: string): Promise<Service | null>;
}
