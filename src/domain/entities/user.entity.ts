import { Entity } from '../shared/entities/entity';
import { Utils } from '../../shared/utils/utils';
import { UserValidatorFactory } from '../factories/user-validator.factory';
import { UserPasswordValidatorFactory } from '../factories/user-password.validator.factory';
import { UserRole } from '@prisma/client';

export type UserCreateDto = {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  phone: string;
};

export type UserWithDto = {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  name: string;
  phone: string;
  role: UserRole;
  updatedAt: Date;
  resetToken?: string;
  resetTokenExpiresAt?: Date;
};

export class User extends Entity {
  private constructor(
    id: string,
    private email: string,
    private password: string,
    createdAt: Date,
    updatedAt: Date,
    private name: string,
    private phone: string,
    private role: UserRole,
    private isActive: boolean,
    private resetToken?: string,
    private resetTokenExpiresAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
    this.validate();
  }

  public static create({
    email,
    password,
    name,
    phone,
    role,
  }: UserCreateDto): User {
    const id = Utils.generateUUID();
    UserPasswordValidatorFactory.create().validate(password);
    const hashedPassword = Utils.encryptPassword(password);
    const isActive = true;
    const createdAt = new Date();
    const updatedAt = new Date();
    const resetToken = undefined;
    const resetTokenExpiresAt = undefined;

    return new User(
      id,
      email,
      hashedPassword,
      createdAt,
      updatedAt,
      name,
      phone,
      role,
      isActive,
      resetToken,
      resetTokenExpiresAt,
    );
  }

  public static with({
    id,
    email,
    password,
    createdAt,
    updatedAt,
    name,
    role,
    phone,
    resetToken,
    resetTokenExpiresAt,
  }: UserWithDto): User {
    return new User(
      id,
      email,
      password,
      createdAt,
      updatedAt,
      name,
      phone,
      role,
      true,
      resetToken,
      resetTokenExpiresAt,
    );
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

  public getName(): string {
    return this.name;
  }

  public getPhone(): string {
    return this.phone;
  }

  public getRole(): UserRole {
    return this.role;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public getResetToken(): string | undefined {
    return this.resetToken;
  }

  public getResetTokenExpiresAt(): Date | undefined {
    return this.resetTokenExpiresAt;
  }

  public setResetToken(token: string, expiresAt: Date): void {
    this.resetToken = token;
    this.resetTokenExpiresAt = expiresAt;
  }

  public clearResetToken(): void {
    this.resetToken = undefined;
    this.resetTokenExpiresAt = undefined;
  }
}
