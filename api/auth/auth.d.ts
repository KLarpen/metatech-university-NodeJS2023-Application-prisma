declare namespace api.auth {
  function signin(args: {
    login: string;
    password: string;
  }): Promise<{ status: string; token: string }>;
  function signout(): Promise<{ status: string }>;
  function restore(args: { token: string }): Promise<{ status: string }>;
}
