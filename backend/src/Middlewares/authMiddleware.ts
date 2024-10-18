import { Context, Next } from "hono";
import { verify } from "hono/jwt";

const AuthMiddleware = async (c: Context, next: Next) => {
  const header: string | undefined = c.req.header("Authorization");

  // checking whether the header is empty or not
  if (!header) {
    c.status(404);
    return c.text("The header is not provided");
  }

  const response = await verify(header, c.env.JWT_SECRET);

  if (response) {
    // passing the user id to the blogRoute so that it can be used by the blogs
    c.set("userId", response.id);
    await next();
  } else {
    c.status(403);
    return c.json({
      message: "Error : Unauthorized",
    });
  }
};

export default AuthMiddleware;
