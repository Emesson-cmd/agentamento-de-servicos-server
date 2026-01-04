import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateServiceInput,
  CreateServiceUsecase,
} from 'src/usecases/service/create/create-service.usecase';
import {
  type CreateServiceRouteRequest,
  CreateServiceRouteResponse,
} from './create-service.dto';

@Controller('services')
export class CreateServiceRoute {
  public constructor(
    private readonly createServiceUsecase: CreateServiceUsecase,
  ) {}

  @Post()
  public async handle(
    @Body() request: CreateServiceRouteRequest,
  ): Promise<CreateServiceRouteResponse> {
    const input: CreateServiceInput = {
      name: request.name,
      barberShopId: request.barberShopId,
      description: request.description,
      price: request.price,
      durationMin: request.durationMin,
    };

    const result = await this.createServiceUsecase.execute(input);

    const response: CreateServiceRouteResponse = {
      id: result.id,
    };

    return response;
  }
}
