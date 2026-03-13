import axios from "axios";

export interface FollowingDTO {
  id: string;
  follower_id: string | null;
  following_id: string | null;
  created_on: Date | null;
  requested_on: Date | null;
  accepted_on: Date | null;
  deleted_on: Date | null;
}

// export interface Follower {
//   user: User;
//   requested_on: Date;
//   accepted_on: Date;
//   deleted_on: Date;
// }
export interface Followee {
  id: string;
  user: User;
  requested_on: Date;
  accepted_on: Date | null;
  //   deleted_on: Date;
}

interface FusionAuthUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  birthDate: string;
  data: {
    gender: string;
  };
  title: string;
  mobilePhone: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  title: string;
  mobilePhone: string;
}

export const getUserInitials = (user: User) => {
  return `${user.firstName[0]}${user.lastName[0]}`;
};

export const getUserAge = (dateOfBirth: string) => {
  return new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
};

export const getUserFullName = (user: User) => {
  return `${user.firstName} ${user.lastName}`;
};

export const getBirthDay = (dateOfBirth: string) => {
  return new Date(dateOfBirth).getDate();
};

export const getBirthMonth = (dateOfBirth: string) => {
  return new Date(dateOfBirth).getMonth();
};

export const getBirthYear = (dateOfBirth: string) => {
  return new Date(dateOfBirth).getFullYear();
};

const FA_BASE_URL = import.meta.env.VITE_AUTH_URL;
const FA_SECRET = import.meta.env.VITE_AUTHORIZATION;
const VITE_MAILER_URL = import.meta.env.VITE_MAILER_URL;
const ZEPTO_KEY = import.meta.env.VITE_ZEPTO_KEY;
const ZEPTO_TEMPLATE_KEY = import.meta.env.VITE_MAIL_CONN_KEY;

export async function getBulkUsers(ids: string[]) {
  const response = await fetch(`${FA_BASE_URL}/api/user/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${FA_SECRET}`,
    },
    body: JSON.stringify({
      search: {
        ids: ids,
      },
    }),
  });

  const body = await response.json();

  const mappedUsers: User[] = await body?.users.map((authUser: unknown) => {
    const typedUser = authUser as FusionAuthUserResponse;
    const user: User = {
      id: typedUser.id,
      firstName: typedUser.firstName,
      lastName: typedUser.lastName,
      email: typedUser.email,
      username: typedUser.username,
      dateOfBirth: typedUser.birthDate,
      gender: typedUser?.data?.gender, // TODO; This needs to be fixed
      age: getUserAge(typedUser.birthDate),
      title: typedUser.title,
      mobilePhone: typedUser.mobilePhone,
    };
    return user;
  });

  return mappedUsers;
}

export const searchUser = async (search: string) => {
  const data = await axios({
    method: "POST",
    url: `${FA_BASE_URL}/api/user/search`,
    headers: {
      Authorization: `${FA_SECRET}`,
      "Content-Type": "application/json",
    },
    data: {
      search: {
        numberOfResults: 20,
        queryString: search,
        sortFields: [
          {
            name: "insertInstant",
            order: "desc",
          },
        ],
      },
    },
  });
  const mappedUsers: User[] = await data?.data?.users?.map(
    (authUser: unknown) => {
      const typedUser = authUser as FusionAuthUserResponse;
      const user: User = {
        id: typedUser.id,
        firstName: typedUser.firstName,
        lastName: typedUser.lastName,
        email: typedUser.email,
        username: typedUser.username,
        dateOfBirth: typedUser.birthDate,
        gender: typedUser?.data?.gender, // TODO; This needs to be fixed
        age: getUserAge(typedUser.birthDate),
        title: typedUser.title,
        mobilePhone: typedUser.mobilePhone,
      };
      return user;
    }
  );

  return mappedUsers;
};

export async function postConnectionRequest(
  email: string,
  full_name: string,
  conn_req_link: string,
  pract_name: string
) {
  const response = await fetch(`${VITE_MAILER_URL}/mailer/generic-mail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      subject: "Connection Request",
      full_name: full_name,
      template_key:
        "2d6f.133c59290fadf5a8.k1.58221a20-83f9-11ef-96c2-525400d6cd4f.192627d74c2",
      merge_info: {
        full_name: full_name,
        conn_req_link: conn_req_link,
        pract_name: pract_name,
      },
    }),
  });
  const body = await response.json();
  return body;
}
