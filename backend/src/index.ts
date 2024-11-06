import { Hono } from "hono";
import { userRoute } from "./Routes/userRoute";
import { blogRoute } from "./Routes/blogRoute";
import { cors } from "hono/cors";

// intializing Hono
const app = new Hono().basePath("/api/v1");

app.use("/*", cors());
// adding the Routing in Hono for better code structure
app.route("/user", userRoute);
app.route("/blog", blogRoute);

export default app;
