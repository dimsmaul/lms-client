import { decrypt, encrypt } from "./encrypt";

export const secretStorage = {
  getItem(key: string) {
    const value = localStorage.getItem(key);
    const decryptedVal = value ? decrypt(value) : null;
    return decryptedVal ? JSON.parse(decryptedVal) : null;
  },

  setItem(key: string, value: any) {
    const encryptedVal = encrypt(JSON.stringify(value));
    localStorage.setItem(key, encryptedVal);
  },

  removeItem(key: string) {
    localStorage.removeItem(key);
  },

  clearItem() {
    localStorage.clear();
  },
};
