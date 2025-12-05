import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-63b71704/health", (c) => {
  return c.json({ status: "ok" });
});

// Signup endpoint
app.post("/make-server-63b71704/signup", async (c) => {
  try {
    const { email, password, name, role } = await c.req.json();
    
    if (!email || !password) {
      return c.text("Email and password are required", 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name: name || 'User', 
        role: role || 'customer' 
      },
      email_confirm: true
    });

    if (error) {
      console.error("Signup error:", error);
      return c.text(error.message, 400);
    }

    return c.json(data);
  } catch (e) {
    console.error("Unexpected error during signup:", e);
    return c.text("Internal Server Error", 500);
  }
});

Deno.serve(app.fetch);
