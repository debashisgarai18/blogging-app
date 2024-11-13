import { Hono, Context } from "hono";
import AuthMiddleware from "../Middlewares/authMiddleware";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { postInputValMW, updatePostsMW } from "../Middlewares/posstInputValMW";
// import { auth, messaging } from "firebase-admin";

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
      message: `The post is created with ${blog.id}`,
    });
  } catch (e) {
    c.status(411);
    return c.text(`Bad Request! Error : ${e}`);
  }
});

// endpoint to delete the blog given a blog ID
blogRoute.delete("/deleteBlog/:blogId", async (c: Context) => {
  const blogId = c.req.param("blogId");
  const currUser = c.get("userId");

  // intialize prisma client
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // check whether the auth of the blog and the curr user is same
    const blogDetails = await prisma.post.findUnique({
      where: {
        id: blogId,
      },
    });
    // cannot delete
    if (blogDetails?.authorId !== currUser) {
      c.status(403);
      return c.json({
        message: "Cannot delete! Unauthorized",
      });
    }

    try {
      await prisma.post.delete({
        where: {
          id: blogId,
        },
      });
      c.status(200);
      return c.json({
        message: `The blog with ${blogId} is deleted`,
      });
    } catch (err) {
      c.status(500);
      return c.json({
        message: `Some internal Server Error : ${err}`,
      });
    }
  } catch (err) {
    c.status(500);
    return c.json({
      message: `Some internal Server Error : ${err}`,
    });
  }
});

// endpoint to update the blogs given a blog id
blogRoute.put("/updateBlog/:blogId", updatePostsMW, async (c: Context) => {
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
        c.status(403);
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

  interface blogType {
    id: string;
    title: string;
    content: string;
    publishedOn: Date;
    thumbnail: string;
    author?: string;
    authorId: string;
  }

  try {
    const blogs = await prisma.post.findMany();

    // find the authorName specific to the authorID
    // use of promise all --> when we use async inside a map
    const fullBlogs: Array<blogType> = await Promise.all(
      blogs.map(async (e) => {
        const resp = await prisma.user.findUnique({
          where: {
            id: e.authorId,
          },
        });
        return {
          id: e.id,
          title: e.title,
          content: e.content,
          thumbnail: e.thumbnail ?? "",
          publishedOn: e.publishedOn,
          author: resp?.name ?? "Unknown",
          authorId: e.authorId,
        };
      })
    );
    c.status(200);
    return c.json({
      message: fullBlogs,
    });
  } catch (e) {
    c.status(411);
    return c.text(`Bad Request! Error : ${e}`);
  }
});

// endpoint to get the blog of provided specific blog Id
blogRoute.get("/:blogId", async (c: Context) => {
  const blogId = c.req.param("blogId");

  // initiate prisma
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const postById = await prisma.post.findUnique({
      where: {
        id: blogId,
      },
    });

    // get the authorId also
    const getAuth = await prisma.user.findUnique({
      where: {
        id: postById?.authorId,
      },
    });

    c.status(200);
    return c.json({
      message: {
        id: postById?.id,
        title: postById?.title,
        content: postById?.content,
        thumbnail: postById?.thumbnail ?? "",
        author: getAuth?.name ?? "",
        authorId: postById?.authorId,
        publishedOn: postById?.publishedOn,
      },
    });
  } catch (e) {
    c.status(411);
    return c.text(`Bad Request! Error : ${e}`);
  }
});
