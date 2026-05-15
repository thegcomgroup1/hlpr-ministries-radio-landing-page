const KEY = "hlpr_admin_password";

export function getAdminPassword(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(KEY);
}

export function setAdminPassword(value: string) {
  window.localStorage.setItem(KEY, value);
}

export function clearAdminPassword() {
  window.localStorage.removeItem(KEY);
}
