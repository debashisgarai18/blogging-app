import { Hono, Context } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signinInpuValidationMiddleware } from "../Middlewares/inputValMW";

export const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// TODO : Password encryption by the use of web crypto in cloudfare (for both signin and signup)
// TODO : ==> Later : Add bcrypt like package for the passwod encryption
// the signup endpoint
userRoute.post(
  "/signup",
  signinInpuValidationMiddleware,
  async (c: Context) => {
    // get the prisma client
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const { name, username, pwd } = await c.req.json();

    try {
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
        return c.json({
          message: {
            token: token,
            username: response.name,
          },
        });
      } else {
        c.status(404);
        return c.json({
          message: "The user already exists!!",
        });
      }
    } catch (e) {
      c.status(500);
      return c.text(`Bad Request! Error : ${e}`);
    }
  }
);

// the signin endpoint
userRoute.post(
  "/signin",
  signinInpuValidationMiddleware,
  async (c: Context) => {
    // get the prisma client
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
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
            message: "The enterred password is incorrect",
          });
        } else {
          const token = await sign({ id: findUser.id }, c.env.JWT_SECRET);
          c.status(200);
          return c.json({
            message: {
              token: token,
              username: findUser.name,
            },
          });
        }
      }
    } catch (e) {
      c.status(400);
      return c.text(`Bad Request! Error : ${e}`);
    }
  }
);
