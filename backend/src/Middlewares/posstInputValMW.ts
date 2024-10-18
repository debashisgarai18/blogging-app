import {
  postInputSchema,
  postInputType,
  updateInputSchema,
  updatePostType,
} from "@deba018/blogs-common";
import { Context, Next } from "hono";

export const postInputValMW = async (c: Context, next: Next) => {
  const body: postInputType = await c.req.json();
  const inputCheck = postInputSchema.safeParse(body);

  if (inputCheck.success) {
    await next();
  } else {
    c.status(404);
    return c.json({
      message: "Invalid Inputs",
    });
  }
};

export const updatePostsMW = async (c: Context, next: Next) => {
  const body: updatePostType = await c.req.json();
  const inputCheck = updateInputSchema.safeParse(body);

  if (inputCheck.success) {
    await next();
  } else {
    c.status(404);
    return c.json({
      message: "Invalid Inputs",
    });
  }
};
