import { Column, CreateDateColumn, DeleteDateColumn, Timestamp } from 'typeorm';

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
  userType: string;
  paymentStatus: PaymentStatus;
}


export enum PaymentStatus {
  pago = 'Pago',
  delayed = 'Nao Pago',
}
