import { User } from 'src/domain/entities/user.entity';
import { FindUserUsecase } from './find-user.usecase';
import { UserGateway } from 'src/domain/repositories/user.gateway';
import { UserNotFoundUsecaseException } from 'src/usecases/exceptions/user-not-found.usecase.exception';

describe('FindUserUsecase (Unit)', () => {
  let userGateway: jest.Mocked<UserGateway>;
  let useCase: FindUserUsecase;

  beforeEach(() => {
    userGateway = {
      findById: jest.fn(),
    } as unknown as jest.Mocked<UserGateway>;

    useCase = new FindUserUsecase(userGateway);
  });

  it('should return user when found', async () => {
    const mockUser = {
      getId: () => '123',
      getEmail: () => 'email@example.com',
      getCreatedAt: () => new Date('2023-01-01'),
      getUpdatedAt: () => new Date('2023-01-02'),
    };

    userGateway.findById.mockResolvedValue(mockUser as User);

    const input = { id: '123' };

    const result = await useCase.execute(input);

    expect(userGateway.findById).toHaveBeenCalledWith('123');
    expect(result).toEqual({
      id: '123',
      email: 'email@example.com',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-02'),
    });
  });

  it('should throw UserNotFoundUsecaseException when user does not exist', async () => {
    userGateway.findById.mockResolvedValue(null);

    const input = { id: 'abc' };

    await expect(useCase.execute(input)).rejects.toBeInstanceOf(
      UserNotFoundUsecaseException,
    );

    expect(userGateway.findById).toHaveBeenCalledWith('abc');
  });
});
