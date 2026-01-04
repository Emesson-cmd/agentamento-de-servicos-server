import { Injectable } from '@nestjs/common';
import { ServiceGateway } from 'src/domain/repositories/service.gateway';
import { ServiceNotFoundUsecaseException } from 'src/usecases/exceptions/service-not-found.usecase.exception';
import { Usecase } from 'src/usecases/usecase';

export type FindServiceInput = {
  id: string;
};

export type FindServiceOutput = {
  barberShopId: string;
  name: string;
  description?: string;
  price: number;
  durationMin: number;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};

@Injectable()
export class FindServiceUsecase
  implements Usecase<FindServiceInput, FindServiceOutput>
{
  public constructor(private readonly serviceGateway: ServiceGateway) {}

  public async execute({ id }: FindServiceInput): Promise<FindServiceOutput> {
    const service = await this.serviceGateway.findById(id);
    if (!service) {
      throw new ServiceNotFoundUsecaseException(
        `Service with id ${id} not found.`,
        `Serviço não encontrado.`,
        FindServiceUsecase.name,
      );
    }

    const output: FindServiceOutput = {
      id: service.getId(),
      barberShopId: service.getBarberShopId(),
      name: service.getName(),
      description: service.getDescription(),
      price: service.getPrice(),
      durationMin: service.getDurationMin(),
      createdAt: service.getCreatedAt(),
      updatedAt: service.getUpdatedAt(),
      isActive: service.getIsActive(),
    };

    return output;
  }
}
