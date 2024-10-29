import { useContext } from "react";
import { contextType, SigninContext } from "../Context";

export const useMySignincontext = (): contextType => {
  const context = useContext(SigninContext);

  if (context == undefined) {
    throw new Error("Context is undefined");
  }

  return context;
};
