import { User } from 'src/domain/entities/user.entity';
import { LoginUserUsecase } from './login-user.usecase';
import { UserGateway } from 'src/domain/repositories/user.gateway';
import { JwtService } from 'src/infra/services/jwt/jwt.service';
import { CredentialsNotValidUsecaseException } from 'src/usecases/exceptions/credentials-not-valid.usecase.exception';

describe('LoginUserUsecase (Unit)', () => {
  let userGateway: jest.Mocked<UserGateway>;
  let jwtService: jest.Mocked<JwtService>;
  let useCase: LoginUserUsecase;

  beforeEach(() => {
    userGateway = {
      findByEmail: jest.fn(),
    } as unknown as jest.Mocked<UserGateway>;

    jwtService = {
      generateAuthToken: jest.fn(),
      generateRefreshToken: jest.fn(),
    } as unknown as jest.Mocked<JwtService>;

    useCase = new LoginUserUsecase(userGateway, jwtService);
  });

  it('should login successfully and return auth + refresh tokens', async () => {
    const mockUser = {
      getId: () => 'user-123',
      comparePassword: jest.fn().mockReturnValue(true),
    } as User;

    userGateway.findByEmail.mockResolvedValue(mockUser);
    jwtService.generateAuthToken.mockResolvedValue('auth-token');
    jwtService.generateRefreshToken.mockResolvedValue('refresh-token');

    const input = {
      email: 'email@example.com',
      password: '12345678',
    };

    const result = await useCase.execute(input);

    expect(userGateway.findByEmail).toHaveBeenCalledWith('email@example.com');
    expect(mockUser.comparePassword).toHaveBeenCalledWith('12345678');

    expect(jwtService.generateAuthToken).toHaveBeenCalledWith('user-123');
    expect(jwtService.generateRefreshToken).toHaveBeenCalledWith('user-123');

    expect(result).toEqual({
      authToken: 'auth-token',
      refreshToken: 'refresh-token',
    });
  });

  it('should throw CredentialsNotValidUsecaseException when user is not found', async () => {
    userGateway.findByEmail.mockResolvedValue(null);

    const input = {
      email: 'test@example.com',
      password: '123',
    };

    await expect(useCase.execute(input)).rejects.toBeInstanceOf(
      CredentialsNotValidUsecaseException,
    );

    expect(userGateway.findByEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('should throw CredentialsNotValidUsecaseException when password is invalid', async () => {
    const mockUser = {
      comparePassword: jest.fn().mockReturnValue(false),
    };

    userGateway.findByEmail.mockResolvedValue(mockUser as any);

    const input = {
      email: 'user@mail.com',
      password: 'wrongpass',
    };

    await expect(useCase.execute(input)).rejects.toBeInstanceOf(
      CredentialsNotValidUsecaseException,
    );

    expect(mockUser.comparePassword).toHaveBeenCalledWith('wrongpass');
  });
});
