export type User = {
  email: string;
  userName: string;
  authentification: {
    password: string;
    salt: string;
    sessionToken?: string;
  };
};
