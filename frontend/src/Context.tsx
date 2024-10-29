import { createContext } from "react";

export interface contextType {
  isSigninActive: boolean;
  setSigninActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SigninContext = createContext<contextType | undefined>(undefined);
