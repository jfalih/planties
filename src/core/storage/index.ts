import Config from 'react-native-config';
import {MMKV, useMMKVString} from 'react-native-mmkv';

/**
 * Storage for application system settings.
 */
export const globalStorage = new MMKV();

/**
 * Secure storage for auth session.
 */
export const sessionStorage = new MMKV({
  id: Config.SESSION_STORAGE_ID as string,
  encryptionKey: Config.SESSION_STORAGE_ENCRYPTION_KEY as string,
});

export const useSessionStorage = () =>
  useMMKVString(Config.AUTH_TOKEN_KEY, sessionStorage);
