import CryptoJS from "crypto-js";

export const encrypt = (text: string): string => {
  return CryptoJS.AES.encrypt(text, import.meta.env.VITE_SECRET_KEY).toString();
};

export const decrypt = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, import.meta.env.VITE_SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
