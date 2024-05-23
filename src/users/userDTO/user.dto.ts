export interface UserDTO {
  username: string;
  password: string;
}

export interface newUser {
  username: string;
  fullName: string;
  email: string;
  password: string;
  isActive?: boolean;
  userType?: number;
}
