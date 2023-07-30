import { Location } from 'react-router-dom';

type StorageKey = 'auth_from';

export function getLocalStorage(name: 'auth_from'): Location | null;
export function getLocalStorage(name: StorageKey): string | null | Location {
  try {
    return JSON.parse(localStorage.getItem(name) as string);
  } catch (e) {
    return localStorage.getItem(name);
  }
}

export function setLocalStorage(name: 'auth_from', value: Location): void;
export function setLocalStorage(name: StorageKey, value: string | Location): void {
  if (typeof value === 'string') {
    localStorage.setItem(name, value);
  } else if (typeof value === 'object') {
    localStorage.setItem(name, JSON.stringify(value));
  }
}

export function removeLocalStorage(name: StorageKey): void {
  localStorage.removeItem(name);
}
