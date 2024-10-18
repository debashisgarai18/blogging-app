import { Context, Next } from "hono";
import {
  SigninInputSchema,
  signinType,
  SignupInputSchema,
  signupType,
} from "@deba018/blogs-common";

export const signinInpuValidationMiddleware = async (
  c: Context,
  next: Next
) => {
  const body: signinType = await c.req.json();

  const statusCheck = SigninInputSchema.safeParse(body);

  if (statusCheck.success) {
    await next();
  } else {
    c.status(400);
    return c.json({
      message: statusCheck.error?.errors,
    });
  }
};

export const signupInpuValidationMiddleware = async (
  c: Context,
  next: Next
) => {
  const body: signupType = await c.req.json();
  const statusCheck = SignupInputSchema.safeParse(body);

  if (statusCheck.success) {
    await next();
  } else {
    c.status(400);
    return c.json({
      message: statusCheck.error?.errors,
    });
  }
};
