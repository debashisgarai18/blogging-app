import { Hono } from "hono";
import { userRoute } from "./Routes/userRoute";
import { blogRoute } from "./Routes/blogRoute";

// intializing Hono
const app = new Hono().basePath("/api/v1");

// adding the Routing in Hono for better code structure
app.route("/user", userRoute);
app.route("/blog", blogRoute);

export default app;
