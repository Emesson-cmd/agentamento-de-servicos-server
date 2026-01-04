import { UserGateway } from 'src/domain/repositories/user.gateway';
import { CreateUserUsecase } from './create-service.usecase';
import { User } from 'src/domain/entities/user.entity';
import { EmailAlreadyExistsUsecaseException } from 'src/usecases/exceptions/email-already-exists.usecase.exception';

describe('Usecase > User > Create', () => {
  let userGateway: jest.Mocked<UserGateway>;
  let useCase: CreateUserUsecase;

  beforeEach(() => {
    userGateway = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<UserGateway>;
    useCase = new CreateUserUsecase(userGateway);
  });

  it('should create a new user when email does not exist', async () => {
    userGateway.findByEmail.mockResolvedValue(null);

    const input = { email: 'test@example.com', password: '12345678' };

    const result = await useCase.execute(input);

    expect(userGateway.findByEmail).toHaveBeenCalledWith(input.email);

    // create deve ser chamado com uma entidade User
    expect(userGateway.create).toHaveBeenCalled();
    const createdUser = userGateway.create.mock.calls[0][0];
    expect(createdUser).toBeInstanceOf(User);

    expect(result).toHaveProperty('id');
    expect(typeof result.id).toBe('string');
  });

  it('should throw exception when user already exists', async () => {
    userGateway.findByEmail.mockResolvedValue({
      id: '123',
      email: 'a@a.com',
    } as unknown as User);

    const input = { email: 'a@a.com', password: '123' };

    await expect(useCase.execute(input)).rejects.toBeInstanceOf(
      EmailAlreadyExistsUsecaseException,
    );

    expect(userGateway.create).not.toHaveBeenCalled();
  });
});
