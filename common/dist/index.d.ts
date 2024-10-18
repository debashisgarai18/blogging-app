import { z } from "zod";
export declare const SigninInputSchema: z.ZodObject<{
    username: z.ZodString;
    pwd: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    pwd: string;
}, {
    username: string;
    pwd: string;
}>;
export declare const SignupInputSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    username: z.ZodString;
    pwd: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    pwd: string;
    name?: string | undefined;
}, {
    username: string;
    pwd: string;
    name?: string | undefined;
}>;
export declare const postInputSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    thumbnail: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    thumbnail?: string | undefined;
}, {
    title: string;
    content: string;
    thumbnail?: string | undefined;
}>;
export declare const updateInputSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    thumbnail: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    content?: string | undefined;
    thumbnail?: string | undefined;
}, {
    title?: string | undefined;
    content?: string | undefined;
    thumbnail?: string | undefined;
}>;
export type signinType = z.infer<typeof SigninInputSchema>;
export type signupType = z.infer<typeof SignupInputSchema>;
export type postInputType = z.infer<typeof postInputSchema>;
export type updatePostType = z.infer<typeof updateInputSchema>;
