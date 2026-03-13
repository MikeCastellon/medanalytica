import { Heart_Data } from "../generated/graphql";

export const findRecordingById = (recording: any, id: string) => {
  return recording.id === id;
};

export interface BarcodeObject {
  name: string;
  ownerId: string;
  age: number;
  gender: string;
  sampleRate: number;
  onClose: () => void;
}

export const createBarcodeString = (barcodeObject: BarcodeObject): string => {
  const jsonObject = JSON.stringify(barcodeObject);
  return window.btoa(jsonObject);
};

export const obscureEmail = (email: string) => {
  const [name, domain] = email.split("@");
  return `${name[0]}${new Array(name.length).join("*")}@${domain}`;
};
export function maskEmail(email: string) {
  let [localPart, domain] = email.split("@");

  let maskedLocal =
    localPart.length > 2
      ? localPart[0] +
        "*".repeat(localPart.length - 2) +
        localPart[localPart.length - 1]
      : localPart;

  return `${maskedLocal}@${domain}`;
}

export function maskMobileNumber(mobile: string) {
  let cleanedMobile = mobile.replace(/\D/g, "");
  let maskedPart = "*".repeat(cleanedMobile.length - 4);
  let visiblePart = cleanedMobile.slice(-4);

  return `${maskedPart}${visiblePart}`;
}
