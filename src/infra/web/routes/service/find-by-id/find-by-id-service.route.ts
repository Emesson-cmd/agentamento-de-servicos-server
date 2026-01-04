import { Controller, Get, Param } from '@nestjs/common';
import {
  FindServiceInput,
  FindServiceUsecase,
} from 'src/usecases/service/findById/find-service.usecase';
import { FindByIdServiceResponse } from './find-by-id-service.dto';

@Controller('/services')
export class FindByIdServiceRoute {
  public constructor(private readonly findServiceUsecase: FindServiceUsecase) {}

  @Get('/:id')
  public async getCurrentService(
    @Param('id') serviceId: string,
  ): Promise<FindByIdServiceResponse> {
    const input: FindServiceInput = { id: serviceId };

    const output = await this.findServiceUsecase.execute(input);

    const response: FindByIdServiceResponse = output;

    return response;
  }
}
