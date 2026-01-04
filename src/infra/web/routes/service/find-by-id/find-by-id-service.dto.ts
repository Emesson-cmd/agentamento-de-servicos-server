export type FindByIdServiceRequest = {
  id: string;
};

export type FindByIdServiceResponse = {
  barberShopId: string;
  name: string;
  description?: string;
  price: number;
  durationMin: number;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};
