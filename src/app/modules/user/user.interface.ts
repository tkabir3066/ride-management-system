export enum Role {
  ADMIN = "admin",
  DRIVER = "driver",
  RIDER = "rider",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: Role;
  cancelCount?: number;
  isBlocked?: boolean;
}
