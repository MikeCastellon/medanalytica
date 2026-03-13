import axios, { AxiosPromise } from "axios";

const AUTH_URL = import.meta.env.VITE_AUTH_URL;
const AUTHORIZATION = import.meta.env.VITE_AUTHORIZATION;
const AUTH_APP_ID = import.meta.env.VITE_AUTH_APP_ID;

export type LoginWithEmailPasswordType = {
  email: string;
  password: string;
};

export const loginWithEmailPassword = ({
  email,
  password,
}: LoginWithEmailPasswordType) => {
  return axios({
    method: "POST",
    url: `${AUTH_URL}/api/login`,
    headers: {
      Authorization: `${AUTHORIZATION}`,
      "Content-Type": "application/json",
    },
    data: {
      applicationId: AUTH_APP_ID,
      loginId: email,
      password: password,
    },
  });
};

type UserMetaDataType = {
  gender: "male" | "female";
};

export type RegisterPractitionerType = {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  password: string;
  metadata: UserMetaDataType;
};

export const RegisterPractitioner = ({
  email,
  firstName,
  lastName,
  birthDate,
  password,
  metadata,
}: RegisterPractitionerType) => {
  return axios({
    method: "post",
    url: `${AUTH_URL}/api/user/registration`,
    headers: {
      Authorization: `${AUTHORIZATION}`,
    },
    data: {
      registration: {
        applicationId: AUTH_APP_ID,
        roles: ["user", "professional", "pending"], // can be moved out to types
      },
      user: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        fullName: `${firstName} ${lastName}`,
        birthDate: birthDate, //moment(new Date(data.birthYear, data.birthMonth, data.birthDay)).format('YYYY-MM-DD'),
        password: password,
        data: metadata,
      },
    },
  });
};

export type RegisterSubjectType = {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  password?: string;
  metadata: UserMetaDataType;
};
// TODO: Combine with RegisterPractitioner
export const RegisterSubject = ({
  email,
  firstName,
  lastName,
  birthDate,
  password,
  metadata,
}: RegisterSubjectType) => {
  return axios({
    method: "post",
    url: `${AUTH_URL}/api/user/registration`,
    headers: {
      Authorization: `${AUTHORIZATION}`,
    },
    data: {
      ...(!password && { sendSetPasswordEmail: true }),
      registration: {
        applicationId: AUTH_APP_ID,
      },
      user: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        fullName: `${firstName} ${lastName}`,
        birthDate: birthDate,
        ...(password && { password: password }),
        data: metadata,
      },
    },
  });
};

export type UpdateSubjectType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  mobilePhone: string;
  birthDate: string;
  password?: string;
  metadata: UserMetaDataType;
};

export const UpdateSubject = ({
  id,
  email,
  firstName,
  lastName,
  mobilePhone,
  birthDate,
  metadata,
}: UpdateSubjectType) => {
  return axios({
    method: "PATCH",
    url: `${AUTH_URL}/api/user/${id}`,
    headers: {
      Authorization: `${AUTHORIZATION}`,
    },
    data: {
      user: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        fullName: `${firstName} ${lastName}`,
        birthDate: birthDate,
        mobilePhone: mobilePhone || null,
        data: metadata,
      },
    },
  });
};

export const checkAlreadyRegistered = (email: string) => {
  return axios({
    method: "POST",
    url: `${AUTH_URL}/api/user/search`,
    headers: {
      Authorization: `${AUTHORIZATION}`,
      "Content-Type": "application/json",
    },
    data: {
      search: {
        numberOfResults: 1,
        queryString: email,
      },
    },
  });
};

export type ForgotPasswordType = {
  email: string;
};

export const ForgotPassword = ({ email }: ForgotPasswordType) => {
  return axios({
    url: `${AUTH_URL}/api/user/forgot-password`,
    method: "post",
    headers: {
      Authorization: `${AUTHORIZATION}`,
    },
    data: {
      loginId: email,
    },
  });
};

export const VerifyToken = (token: string) => {
  return axios({
    url: `${AUTH_URL}/api/jwt/validate`,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const LoginAndVerifyToken = (
  loginDetails: LoginWithEmailPasswordType
) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const loginData = await loginWithEmailPassword(loginDetails);
      const verifiedToken = await VerifyToken(loginData.data.token);

      resolve({
        ...loginData,
        roles: verifiedToken.data.jwt.roles,
      });
    } catch (error) {
      reject(error);
    }
  });
};
