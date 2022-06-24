export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type RegisterPayload = {
  firstName: UserType["firstName"];
  lastName: UserType["lastName"];
  email: UserType["email"];
  password: UserType["password"];
};

export type LoginPayload = {
  email: UserType["email"];
  password: UserType["password"];
};
