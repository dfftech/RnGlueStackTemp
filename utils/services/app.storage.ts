import {MMKV} from 'react-native-mmkv';

export const APP_ID = 'AP';
export const TOKEN = 'TOKEN';
export const SESSION_INFO = 'SESSION_INFO';
export const GOOGLE_ACCESS_TOKEN = 'GOOGLE_ACCESS_TOKEN';
export const NAV = 'NAV';
export const LANG = 'LANG';
export const THEME = 'THEME';
export const USER = 'USER';
export const TRANS = 'TRANS';
export const DIR = 'DIR';
export const OPEN_ACTION = 'OPEN_ACTION';

// Create an MMKV instance
const storage = new MMKV();

/**
 * Set data in MMKV.
 * @param setName  The key name (without APP_ID).
 * @param setObject  The data to store (string | object).
 */
const setData = (setName: string, setObject: any) => {
  const storageKey = `${APP_ID}-${setName}`;
  let valueToStore = setObject;

  // Convert to JSON if it's an object (rather than a plain string)
  if (valueToStore && typeof valueToStore !== 'string') {
    valueToStore = JSON.stringify(valueToStore);
  }

  storage.set(storageKey, valueToStore);
};

/**
 * Get data from MMKV.
 * @param getName  The key name (without APP_ID).
 * @returns The stored data (attempted JSON parse if it looks like JSON), or null if not found.
 */
const getData = (getName: string) => {
  const storageKey = `${APP_ID}-${getName}`;
  const storedValue = storage.getString(storageKey);

  if (storedValue) {
    // If it looks like JSON, parse it
    if (
      storedValue.trim().startsWith('{') ||
      storedValue.trim().startsWith('[')
    ) {
      try {
        return JSON.parse(storedValue);
      } catch (err) {
        // If JSON parsing fails, return it as a string
        return storedValue;
      }
    }
    return storedValue; // Return plain string
  }
  return null; // If not found or null
};

/**
 * Remove a single key from MMKV.
 * @param key  The key name (without APP_ID).
 */
const removeData = (key: string) => {
  const storageKey = `${APP_ID}-${key}`;
  storage.delete(storageKey);
};

/**
 * Clears all data from MMKV.
 * If you need to preserve certain keys (like "remember-me"), you can get it then re-set it.
 */
const clearData = () => {
  // Example: If you want to preserve "remember-me"
  const rememberMeKey = `${APP_ID}-remember-me`;
  const rememberMeData = storage.getString(rememberMeKey);

  // Clear everything
  storage.clearAll();

  // Optionally re-set "remember-me"
  if (rememberMeData) {
    storage.set(rememberMeKey, rememberMeData);
  }
};

const getToken = () => {
  return AppStorage.getData(TOKEN);
};
// Language Selection Set Up

const removeAllData = () => {
  removeData(TOKEN);
  removeData(SESSION_INFO);
  removeData(GOOGLE_ACCESS_TOKEN);
};

const AppStorage = {
  getData,
  setData,
  removeData,
  clearData,
  removeAllData,
  getToken,
};

export default AppStorage;
