import { Context, Next } from "hono";
import { z } from "zod";

const valSchema = z.object({
  title: z.string({ message: "The title cannot be empty" }),
  content: z.string({ message: "The contents cannot be empty" }),
  thumbnail: z.string().optional(),
});

type valInputType = z.infer<typeof valSchema>;

const postInputValMW = async (c: Context, next: Next) => {
  const body: valInputType = await c.req.json();
  const inputCheck = valSchema.safeParse(body);

  if (inputCheck.success) {
    c.set("body", body);
    await next();
  } else {
    c.status(404);
    return c.json({
      message: "Invalid Inputs",
    });
  }
};

export default postInputValMW;
