import { useMutation } from "@tanstack/react-query";
import React, { Children, useEffect, useState } from "react";
import {
  ForgotPassword,
  ForgotPasswordType,
  LoginAndVerifyToken,
  loginWithEmailPassword,
  LoginWithEmailPasswordType,
  RegisterPractitioner,
  RegisterPractitionerType,
  RegisterSubject,
  RegisterSubjectType,
  VerifyToken,
} from "../Services/AuthService";
const AUTH_APP_ID = import.meta.env.VITE_AUTH_APP_ID;

type TSignUp = {
  email: string;
  firstName: string;
  lastName: string;
  birthdate: Date;
  gender: "male" | "female";
  password: string;
};

type TAddSubject = {
  email: string;
  firstName: string;
  lastName: string;
  birthdate: Date;
  gender: "male" | "female";
  password?: string;
};

type UserState = {
  token: string;
  refreshToken: string;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: "male" | "female";
  active: boolean;
  connectorId: string;
  roles: string[];
};

type AuthContextType = {
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (user: TSignUp) => void;
  addSubject: (
    user: TAddSubject,
    cb?: () => void,
    errCb?: (err: Error | AxiosError) => void
  ) => void;
  forgotPassword: (email: string, cb?: () => void) => void;
  setGraphsExpanded: () => void;
  setDisclaimerToAgreed: () => void;
  disclaimerAgreed: boolean;
} & AuthContextState &
  ViewsContextState;

type AuthContextState = {
  status: "loggedOut" | "loggedIn" | "loading";
  user: UserState | null;
};

type ViewsContextState = {
  graphsExpanded: boolean;
};

import { Dispatch, SetStateAction } from "react";
import { format } from "date-fns";
import { useDoctorFollowUserMutation } from "../generated/graphql";
import { userInfo } from "os";
import { AxiosError } from "axios";
import _ from "lodash";

type PersistedState<T> = [T, Dispatch<SetStateAction<T>>];

function usePersistedState<T>(defaultValue: T, key: string): PersistedState<T> {
  const [value, setValue] = useState<T>(() => {
    const value = window.localStorage.getItem(key);

    return value ? (JSON.parse(value) as T) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider(props: { children: React.ReactNode }) {
  const [state, setState] = usePersistedState<AuthContextState>(
    {
      status: "loggedOut",
      user: null,
    },
    "auth"
  );

  const [views, setViews] = usePersistedState<ViewsContextState>(
    {
      graphsExpanded: true,
    },
    "views"
  );

  const [disclaimerAgreed, setDisclaimerAgreed] = useState<boolean>(false);

  const { mutate: loginMutate } = useMutation(
    (data: LoginWithEmailPasswordType) => {
      return loginWithEmailPassword(data);
    }
  );

  const { mutate: signupMutate } = useMutation(
    (data: RegisterPractitionerType) => {
      return RegisterPractitioner(data);
    }
  );

  const { mutate: addSubjectMutate } = useMutation(
    (data: RegisterSubjectType) => {
      return RegisterSubject(data);
    }
  );

  const { mutate: forgotPasswordMutate } = useMutation(
    (data: ForgotPasswordType) => {
      return ForgotPassword(data);
    }
  );

  const connectToSelf = useDoctorFollowUserMutation({
    endpoint: import.meta.env.VITE_GRAPHQL_URL,
    fetchParams: {
      headers: {
        // 'Authorization': `Bearer ${auth.user?.token}`,
        "X-Hasura-Admin-Secret": import.meta.env.VITE_GRAPHQL_HEADER,
      },
    },
  });

  const login = (email: string, password: string) => {
    setState({
      ...state,
      status: "loading",
    });
    loginMutate(
      { email, password },
      {
        onSuccess: ({ data }) => {
          const registrations = data.user?.registrations;
          const applicationRegistration = _.find(registrations, (o) => {
            return o.applicationId === AUTH_APP_ID;
          });

          setState({
            status: "loggedIn",
            user: {
              token: data.token,
              refreshToken: data.refreshToken,
              id: data.user.id,
              email: data.user.email,
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              birthDate: new Date(data.user.birthDate),
              gender: data.user?.data?.gender,
              active: data.user.active,
              connectorId: data.user.connectorId,
              roles: applicationRegistration.roles,
            },
          });
        },
        onError: () => {
          setState({
            status: "loggedOut",
            user: null,
          });
        },
      }
    );
  };

  const signup = (user: TSignUp) => {
    setState({
      ...state,
      status: "loading",
    });
    signupMutate(
      {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: format(new Date(user.birthdate), "yyyy-MM-dd"),
        password: user.password,
        metadata: {
          gender: user.gender,
        },
      },
      {
        onSuccess: ({ data }) => {
          console.log(data);
          setState({
            status: "loggedIn",
            user: {
              token: data.token,
              refreshToken: data.refreshToken,
              id: data.user.id,
              email: data.user.email,
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              birthDate: new Date(data.user.birthDate),
              gender: data.user.data.gender,
              active: data.user.active,
              connectorId: data.user.connectorId,
              roles: ["professional", "pending"],
            },
          });
          connectToSelf.mutate({
            followee_id: data.user.id,
            follower_id: data.user.id,
          });
        },
        onError: () => {
          setState({
            status: "loggedOut",
            user: null,
          });
        },
      }
    );
  };

  const addSubject = (
    user: TAddSubject,
    cb?: () => void,
    errCb?: (err: any) => void
  ) => {
    addSubjectMutate(
      {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: format(new Date(user.birthdate), "yyyy-MM-dd"),
        ...(user.password && { password: user.password }),
        metadata: {
          gender: user.gender,
        },
      },
      {
        onSuccess: ({ data }) => {
          connectToSelf.mutate({
            followee_id: data.user.id,
            follower_id: state.user?.id,
            accepted_on: "now()",
          });
          cb && cb();
          location.reload();
        },
        onError: (error) => {
          console.log("Could not add subject", error);
          errCb && errCb(error);
        },
      }
    );
  };

  const forgotPassword = (email: string, cb?: () => void) => {
    setState({
      ...state,
      status: "loading",
    });
    forgotPasswordMutate(
      {
        email: email,
      },
      {
        onSuccess: () => {
          setState({
            ...state,
            status: "loggedOut",
          });
          cb && cb();
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  const logout = () => {
    setState({
      status: "loggedOut",
      user: null,
    });
    setDisclaimerAgreed(false);
  };
  const setGraphsExpanded = () => {
    setViews({
      ...views,
      graphsExpanded: !views.graphsExpanded,
    });
  };

  const setDisclaimerToAgreed = () => {
    setDisclaimerAgreed(true);
  };

  const contextValue = React.useMemo(
    () => ({
      ...state,
      ...views,
      ...{
        disclaimerAgreed: disclaimerAgreed,
      },
      login,
      signup,
      addSubject,
      logout,
      forgotPassword,
      setGraphsExpanded,
      setDisclaimerToAgreed,
    }),
    [state, views, disclaimerAgreed]
  );

  return (
    <AuthContext.Provider value={contextValue} children={props.children} />
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function Auth() {
  const auth = useAuth();
}
