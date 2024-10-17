import { z } from "zod";

// Schema defination
const SigninInputSchema = z.object({
  username: z.string().email({ message: "This should be of email format!!" }),
  pwd: z.string().min(6, { message: "Should contain minimum 6 digits!!" }),
});
const SignupInputSchema = z.object({
  name : z.string(),
  username: z.string().email({ message: "This should be of email format!!" }),
  pwd: z.string().min(6, { message: "Should contain minimum 6 digits!!" }),
})

// zod type inference
type updatedTypes = z.infer<typeof SigninInputSchema>;


export const signinInpuValidationMiddleware = async (c: any, next: any) => {
  const statusCheck = SigninInputSchema.safeParse(await c.req.json());

  if (statusCheck.success) {
    c.req.username = await c.req.json().username
    return await next();}
  else {
    c.status(400);
    return c.json({
      message: statusCheck.error?.errors,
    });
  }
};

export const signupInpuValidationMiddleware = async (c: any, next: any) => {
  const statusCheck = SigninInputSchema.safeParse(await c.req.json());

  if (statusCheck.success) {
    c.req.username = await c.req.json().username
    return await next();}
  else {
    c.status(400);
    return c.json({
      message: statusCheck.error?.errors,
    });
  }
};
