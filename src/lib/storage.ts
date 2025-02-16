export const STORAGE_KEYS = {
  THEME: "theme",
  LANGUAGE: "language",
} as const;

export const getStorageItem = <T>(key: string): T | null => {
  if (typeof window === "undefined") return null;
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    return typeof item === "string" && item.startsWith('"')
      ? (item.slice(1, -1) as T)
      : (JSON.parse(item) as T);
  } catch {
    return null;
  }
};

export const setStorageItem = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") return;
  const stringValue = typeof value === "string" ? `"${value}"` : JSON.stringify(value);
  localStorage.setItem(key, stringValue);
};
