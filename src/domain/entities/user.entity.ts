import { Entity } from '../shared/entities/entity';
import { Utils } from '../../shared/utils/utils';
import { UserValidatorFactory } from '../factories/user-validator.factory';
import { UserPasswordValidatorFactory } from '../factories/user-password.validator.factory';

export type UserCreateDto = {
  email: string;
  password: string;
};

export type UserWithDto = {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export class User extends Entity {
  private constructor(
    id: string,
    private email: string,
    private password: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt);
    this.validate();
  }

  public static create({ email, password }: UserCreateDto): User {
    const id = Utils.generateUUID();
    UserPasswordValidatorFactory.create().validate(password);
    const hashedPassword = Utils.encryptPassword(password);
    const createdAt = new Date();
    const updatedAt = new Date();
    return new User(id, email, hashedPassword, createdAt, updatedAt);
  }

  public static with({
    id,
    email,
    password,
    createdAt,
    updatedAt,
  }: UserWithDto): User {
    return new User(id, email, password, createdAt, updatedAt);
  }

  protected validate(): void {
    UserValidatorFactory.create().validate(this);
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public comparePassword(password: string): boolean {
    return Utils.comparePassword(password, this.password);
  }
}
