import { Utils } from 'src/shared/utils/utils';
import { Entity } from '../shared/entities/entity';
import { ServiceValidatorServiceFactory } from '../factories/service-validator.factory';

export type ServiceCreateDto = {
  barberShopId: string;
  name: string;
  description?: string;
  price: number;
  durationMin: number;
};

export type ServiceWithDto = ServiceCreateDto & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};

export class Service extends Entity {
  private constructor(
    private barberShopId: string,
    id: string,
    createdAt: Date,
    updatedAt: Date,
    private name: string,
    private price: number,
    private durationMin: number,
    private isActive: boolean,
    private description?: string,
  ) {
    super(id, createdAt, updatedAt);
    this.validate();
  }

  public static create({
    barberShopId,
    name,
    description,
    price,
    durationMin,
  }: ServiceCreateDto): Service {
    const id = Utils.generateUUID();
    const createdAt = new Date();
    const updatedAt = new Date();
    const isActive = true;
    return new Service(
      barberShopId,
      id,
      createdAt,
      updatedAt,
      name,
      price,
      durationMin,
      isActive,
      description,
    );
  }

  public static with({
    barberShopId,
    id,
    createdAt,
    updatedAt,
    name,
    price,
    durationMin,
    description,
  }: ServiceWithDto): Service {
    return new Service(
      barberShopId,
      id,
      createdAt,
      updatedAt,
      name,
      price,
      durationMin,
      true,
      description,
    );
  }

  validate(): void {
    ServiceValidatorServiceFactory.create().validate(this);
  }

  public getId(): string {
    return this.id;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  protected hasUpdated() {
    this.updatedAt = new Date();
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string | undefined {
    return this.description;
  }

  public getPrice(): number {
    return this.price;
  }

  public getDurationMin(): number {
    return this.durationMin;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public getBarberShopId(): string {
    return this.barberShopId;
  }
}
