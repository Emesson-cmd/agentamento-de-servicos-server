export type CreateServiceRouteRequest = {
  name: string;
  barberShopId: string;
  description: string;
  price: number;
  durationMin: number;
};

export type CreateServiceRouteResponse = {
  id: string;
};
