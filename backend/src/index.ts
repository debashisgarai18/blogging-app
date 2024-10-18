import { Context, Hono, Next } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import {
  signinInpuValidationMiddleware,
  signupInpuValidationMiddleware,
} from "./Middlewares/inputValMW";
import AuthMiddleware from "./Middlewares/authMiddleware";

// intializing Hono
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>().basePath("/api/v1");

// Auth Check Middleware with the routes having endpoint ending with blog
app.use("/blog/*", AuthMiddleware);

// TODO : Password encryption by the use of web crypto in cloudfare (for both signin and signup)
// TODO : ==> Later : Add bcrypt like package for the passwod encryption
// the signup endpoint
app.post("/signup", signupInpuValidationMiddleware, async (c: Context) => {
  // get the prisma client
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const { name, username, pwd } = await c.req.json();

  // check if the username already exists
  const checkUser = await prisma.user.findUnique({
    where: {
      email: username,
    },
  });

  // if the user does not exists then create the user in the DB
  if (!checkUser) {
    const response = await prisma.user.create({
      data: {
        name,
        email: username,
        password: pwd,
      },
    });
    const token = await sign({ id: response.id }, c.env.JWT_SECRET);
    c.status(200);
    return c.json({ token });
  } else {
    c.status(404);
    return c.json({
      message: "The user already exists!!",
    });
  }
});

// the signin endpoint
app.post("/signin", signinInpuValidationMiddleware, async (c: Context) => {
  // get the prisma client
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const { username, pwd } = await c.req.json();
  const findUser = await prisma.user.findUnique({
    where: {
      email: username,
    },
  });
  if (!findUser) {
    c.status(403);
    return c.json({
      message: "The user is not found!!",
    });
  } else {
    if (findUser.password !== pwd) {
      c.status(404);
      return c.json({
        message: "The enterred paddword is incorrect",
      });
    } else {
      const token = await sign({ id: findUser.id }, c.env.JWT_SECRET);
      c.status(200);
      return c.json({ token });
    }
  }
});

app.post("/blog/postBlog", (c: Context) => {
  c.status(200);
  return c.json({
    message: "To post the posts",
  });
});

app.put("/blog/:blogId", (c: Context) => {
  return c.json({
    message: "To upadte the specific blog",
  });
});

app.get("/blog/bulk", (c: Context) => {
  return c.json({
    message: "To get all the blog posts",
  });
});

app.get("/blog/:blogId", (c: Context) => {
  return c.json({
    message: "To get the blog of specific Id",
  });
});

export default app;
