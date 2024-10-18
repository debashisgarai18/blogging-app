import { Context, Next } from "hono";
import { z } from "zod";

// Schema defination
const SigninInputSchema = z.object({
  username: z
    .string()
    .email({
      message: "This should be of email format / username cannot be empty",
    }),
  pwd: z.string().min(6, { message: "Should contain minimum 6 digits" }),
});
const SignupInputSchema = z.object({
  name: z.string().optional(),
  username: z
    .string()
    .email({
      message: "This should be of email format / username cannot be empty",
    }),
  pwd: z.string().min(6, { message: "Should contain minimum 6 digits" }),
});

// zod type inference
type updatedTypesSignin = z.infer<typeof SigninInputSchema>;
type updatedTypesSignup = z.infer<typeof SignupInputSchema>;

export const signinInpuValidationMiddleware = async (
  c: Context,
  next: Next
) => {
  const body: updatedTypesSignin = await c.req.json();

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
  const body: updatedTypesSignup = await c.req.json();
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
