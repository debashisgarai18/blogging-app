import { Hono, Context } from "hono";
import AuthMiddleware from "../Middlewares/authMiddleware";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { postInputValMW, updatePostsMW } from "../Middlewares/posstInputValMW";

export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

// Auth Check Middleware with the routes having endpoint ending with blog
blogRoute.use("/*", AuthMiddleware);

// endpoint to post the blogs
blogRoute.post("/postBlog", postInputValMW, async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  c.status(200);

  const authorId = c.get("userId");
  try {
    const body = await c.req.json();
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        thumbnail: body.thumbnail,
        authorId: authorId,
      },
    });
    c.status(200);
    return c.json({
      messgae: `The post is created with ${blog.id}`,
    });
  } catch (e) {
    c.status(411);
    return c.text(`Bad Request! Error : ${e}`);
  }
});

// endpoint to update the blogs given a blog id
// TODO : to keep a check that the author can update only his blogs, not other blogs
blogRoute.put("/:blogId", updatePostsMW, async (c: Context) => {
  const blogId = c.req.param("blogId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  c.status(200);

  try {
    const body = await c.req.json();
    const idExists = await prisma.post.findFirst({
      where: {
        id: blogId,
      },
    });
    if (idExists) {
      // check whether the user is the author of the blog or not
      if (idExists.authorId !== c.get("userId")) {
        c.status(404);
        return c.json({
          message: "You dont have access to edit this post",
        });
      } else {
        const updatePosts = await prisma.post.update({
          where: {
            id: blogId,
          },
          data: {
            title: body.title,
            content: body.content,
            thumbnail: body.thumbnail,
          },
        });
        c.status(200);
        return c.json({
          message: updatePosts,
        });
      }
    } else {
      c.status(404);
      return c.json({
        message: "The post to update doesnot exist",
      });
    }
  } catch (e) {
    c.status(411);
    return c.text(`Bad Request! Error : ${e}`);
  }
});

// enpoint to should all all the posts available
// TODO : have the pagination for the blogs, display 10 at a time in the landing page
blogRoute.get("/bulk", async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  c.status(200);

  try {
    const blogs = await prisma.post.findMany();
    c.status(200);
    return c.json({
      message: blogs,
    });
  } catch (e) {
    c.status(411);
    return c.text(`Bad Request! Error : ${e}`);
  }
});

// ebdpoint to get the blog of provided specific blog Id
blogRoute.get("/:blogId", async (c: Context) => {
  const blogId = c.req.param("id");

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const postById = await prisma.post.findFirst({
      where: {
        id: blogId,
      },
    });
    c.status(200);
    return c.json({
      message: postById,
    });
  } catch (e) {
    c.status(411);
    return c.text(`Bad Request! Error : ${e}`);
  }
});
