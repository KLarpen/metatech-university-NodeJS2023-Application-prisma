export function signin(
  login: string,
  password: string,
): Promise<{ status: string; token: string }>;
export function signout(): Promise<{ status: string }>;
export function restore(params: { token: string }): Promise<{ status: string }>;
