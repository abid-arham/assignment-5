export type IRole = "ADMIN" | "CUSTOMER" | "TECHNICIAN";

export type IUser = {
  id: string;
  name: string;
  email: string;
  role: IRole;
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

export type IService = {
  id: string;
  technicianId: string;
  categoryId: string;
  title: string;
  description: string;
  price: string;
  durationMins: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

}


export type ITechnicianProfile = {
  id: string;
  userId: string;
  bio: string | null;
  skills: string[];
  experience: number;
  hourlyRate: string;
  location: string | null;
  availability: {
    days: string[];
    hours: string;
  } | null;
  averageRating: string;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  reviews: unknown[]; // type this properly once you know the review shape
}