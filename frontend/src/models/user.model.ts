export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userType: UserType;
}

export enum UserType {
  Superuser = 0,
  Admin = 1,
  Buyer = 2,
  Seller = 3,
}
