import express from "express";
import expressSession from "express-session";
import { isLoggedIn } from "./utils/guards";
import { Client } from "pg";
import dotenv from "dotenv";
import { userRouter } from "./routes/userRouter";

import { filterRouter } from "./routes/filter";
import { shoppingCartRouter } from "./routes/shoppingCartRouter";
import { orderRouter } from "./routes/orderRoutes";
import { stripeCheckout } from "./routes/stripeCheckout";
import { isAdminLoggedIn } from "./utils/admin";
import { productRouter } from "./routes/productRouter";

const app = express();

dotenv.config();

if (!process.env.DB_NAME) throw Error("Missing DB_NAME in .env");
if (!process.env.DB_USER) throw Error("Missing DB_USER in .env");
if (!process.env.DB_PASSWORD) throw Error("Missing DB_PASSWORD in .env");
if (!process.env.DB_HOST) throw Error("Missing DB_HOST in .env");
if (!process.env.SECRET) throw Error("Missing SECRET in .env");

export const pgClient = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
});

pgClient.connect();

app.use(stripeCheckout);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  expressSession({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

declare module "express-session" {
  interface SessionData {
    userId?: number;
    adminName: string;
  }
}

app.use(userRouter);
app.use(shoppingCartRouter);
app.use(orderRouter);
app.use(filterRouter);
app.use(productRouter);

app.use(express.static("uploads"));
app.use(express.static("public"));
app.use(isLoggedIn, express.static("private"));
app.use(isAdminLoggedIn, express.static("admin"));

app.use((req, res) => {
  res.redirect("404.html");
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
