export abstract class Entity {
  protected id: string;
  protected createdAt: Date;
  protected updatedAt: Date;

  protected constructor(id: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  protected abstract validate(): void;

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
}
