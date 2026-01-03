import { FindUserOutput } from 'src/usecases/user/findById/find-user.usecase';
import { FindByIdUserResponse } from './find-by-id-user.dto';

export class FindByIdUserPresenter {
  public static toHttp(input: FindUserOutput): FindByIdUserResponse {
    return {
      id: input.id,
      email: input.email,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
      name: input.name,
      phone: input.phone,
      role: input.role,
    };
  }
}
