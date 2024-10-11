import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";


// get the prisma client
const prisma = new PrismaClient({
  datasourceUrl: env.DATABASE_URL,
}).$extends(withAccelerate());

const app = new Hono().basePath("/api/v1");

// endpoint for signup
app.post("/signup", async (c) => {
  const { fname, lname, username, pwd } = await c.req.json();

  return c.json({
    message: "data fetched",
  });
});

export default app;
