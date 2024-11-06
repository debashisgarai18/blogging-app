import { z } from "zod";

// Schema defination
export const SigninInputSchema = z.object({
  username: z.string().email({
    message: "This should be of email format / username cannot be empty",
  }),
  pwd: z.string().min(6, { message: "Password Should contain minimum 6 digits" }),
});

export const SignupInputSchema = z.object({
  name: z.string().optional(),
  username: z.string().email({
    message: "This should be of email format / username cannot be empty",
  }),
  pwd: z.string().min(6, { message: "Password Should contain minimum 6 digits" }),
});

export const postInputSchema = z.object({
  title: z.string({ message: "The title cannot be empty" }),
  content: z.string({ message: "The contents cannot be empty" }),
  thumbnail: z.string().optional(),
});

export const updateInputSchema = z.object({
  title: z.string({ message: "The title cannot be empty" }).optional(),
  content: z.string({ message: "The contents cannot be empty" }).optional(),
  thumbnail: z.string().optional(),
});

// zod type inference => these are important for Frontends
export type signinType = z.infer<typeof SigninInputSchema>;
export type signupType = z.infer<typeof SignupInputSchema>;
export type postInputType = z.infer<typeof postInputSchema>;
export type updatePostType = z.infer<typeof updateInputSchema>;
