import { Hono } from 'hono'

const app = new Hono().basePath("/api/v1")

// endpoint for signup
app.post('/signup', async (c) => {
    const {fname, lname, username, pwd} = await c.req.json();
    
    return c.json({
      message : "data fetched"
    }) 
})

export default app
