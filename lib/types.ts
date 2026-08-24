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
  reviews: unknown[];
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export type IBookingFormInput = {
  technicianId: string;
  serviceId: string;
  scheduledAt: string;
  location: string;
  notes?:string;
  totalAmount: number;
}

export type IBooking = {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  scheduledAt: string;
  location: string;
  notes: string | null;
  totalAmount: string; 
  status: string; 
  createdAt: string;
  updatedAt: string;
}

export type IBookingStatus = 
  "ACCEPTED"|
  "DECLINED"|      
  "IN_PROGRESS"|
  "COMPLETED"|
  "REQUESTED"|
  "CANCELLED"|
  "PAID"


  export type IActiveStatus = "ACTIVE" | "BLOCKED";

export type IAdminUser = {
  id: string;
  name: string;
  email: string;
  role: IRole;
  activeStatus: IActiveStatus;
  createdAt: string;
};

export type ICategory = {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};