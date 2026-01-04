import { Injectable } from '@nestjs/common';
import { Service } from 'src/domain/entities/service.entity';
import { ServiceGateway } from 'src/domain/repositories/service.gateway';
import { ServiceAlreadyExistsUsecaseException } from 'src/usecases/exceptions/service-already-exists.usecase.exception';
import { Usecase } from 'src/usecases/usecase';

export type CreateServiceInput = {
  name: string;
  barberShopId: string;
  description: string;
  price: number;
  durationMin: number;
};

export type CreateServiceOutput = {
  id: string;
};

@Injectable()
export class CreateServiceUsecase
  implements Usecase<CreateServiceInput, CreateServiceOutput>
{
  public constructor(private readonly serviceGateway: ServiceGateway) {}

  public async execute({
    name,
    barberShopId,
    description,
    price,
    durationMin,
  }: CreateServiceInput): Promise<CreateServiceOutput> {
    const existingService = await this.serviceGateway.findByName(name);

    if (existingService) {
      throw new ServiceAlreadyExistsUsecaseException(
        `Service with name ${name} already exists.`,
        `O nome ${name} ja existe.`,
        CreateServiceUsecase.name,
      );
    }

    const service = Service.create({
      name,
      barberShopId,
      description,
      price,
      durationMin,
    });

    await this.serviceGateway.create(service);

    const output: CreateServiceOutput = { id: service.getId() };
    return output;
  }
}
