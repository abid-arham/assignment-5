export type IRole = "ADMIN" | "CUSTOMER" | "TECHNICIAN";

export type IUser = {
  id: string;
  name: string;
  email: string;
  role: IRole;
};

export type ICar = {
  id: string;
  brand: string;
  model: string;
  dailyRate: number;
  location: string;
  isAvailable: boolean;
  ownerId: string;
};

export type ITokenPayload = {
  id: string;
  email: string;
  role: IRole;
  iat: number;
  exp: number;
};

export type ILoginState = {
  success: boolean;
  message: string;
};