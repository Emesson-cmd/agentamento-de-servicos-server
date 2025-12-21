import { Test, TestingModule } from '@nestjs/testing';
import { RequestPasswordResetUsecase } from './request-password-reset.usecase';
import { UserGateway } from 'src/domain/repositories/user.gateway';
import { EmailService } from 'src/infra/services/email/email.service';
import { User } from 'src/domain/entities/user.entity';
import { UserNotFoundUsecaseException } from 'src/usecases/exceptions/user-not-found.usecase.exception';

describe('RequestPasswordResetUsecase', () => {
  let usecase: RequestPasswordResetUsecase;
  let userGateway: jest.Mocked<UserGateway>;
  let emailService: jest.Mocked<EmailService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestPasswordResetUsecase,
        {
          provide: UserGateway,
          useValue: {
            findByEmail: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendPasswordResetEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    usecase = module.get<RequestPasswordResetUsecase>(
      RequestPasswordResetUsecase,
    );
    userGateway = module.get(UserGateway);
    emailService = module.get(EmailService);
  });

  it('should throw UserNotFoundUsecaseException if user not found', async () => {
    userGateway.findByEmail.mockResolvedValue(null);

    await expect(
      usecase.execute({ email: 'test@example.com' }),
    ).rejects.toThrow(UserNotFoundUsecaseException);
  });

  it('should send reset email and update user', async () => {
    const user = User.with({
      id: '1',
      email: 'test@example.com',
      password: 'hashed',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    userGateway.findByEmail.mockResolvedValue(user);
    userGateway.update.mockResolvedValue();
    emailService.sendPasswordResetEmail.mockResolvedValue();

    await usecase.execute({ email: 'test@example.com' });

    expect(userGateway.update).toHaveBeenCalled();
    expect(emailService.sendPasswordResetEmail).toHaveBeenCalledWith(
      'test@example.com',
      expect.any(String),
    );
  });
});
