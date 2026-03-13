import React, { useState } from "react";
import { Heart_Data } from "../generated/graphql";

type UserContextType = {
  setCurrentRecording: (value: Heart_Data) => void;
  currentRecording: Heart_Data | undefined;
};

const UserContext = React.createContext<UserContextType>(null!);

export const UserProvider = (props: { children: React.ReactNode }) => {
  const [currentRecording, setCurrentRecording] = useState<Heart_Data>();

  return (
    <UserContext.Provider
      value={{
        setCurrentRecording,
        currentRecording,
      }}
      children={props.children}
    />
  );
};

export function useUserContext() {
  return React.useContext(UserContext);
}
