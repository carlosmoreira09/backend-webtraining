export interface UserDTO {
  username: string;
  password: string;
}

export interface NewUserDTO {
  username: string;
  fullName: string;
  email: string;
  password: string;
  userType: string;
  isActive?: boolean;
  paymentDate?: Date;
  paymentStatus?: string;
}
