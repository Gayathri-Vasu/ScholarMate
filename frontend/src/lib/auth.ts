export type AuthUser = {
  email: string;
  loggedInAt: string;
};

const AUTH_KEY = "auth_user";

export function getAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return !!getAuthUser();
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}



