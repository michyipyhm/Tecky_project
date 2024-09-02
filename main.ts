import express, { query, Request, response, Response } from "express";
import expressSession from "express-session";
import { isLoggedIn } from "./utils/guards";
import { Client } from "pg";
import dotenv from "dotenv";
import { userRouter } from "./routes/userRoutes";
import { productInfo } from './routes/mainPageProduct';
import { filter } from './routes/filter';
import { shoppingCartRouter } from './routes/shoppingCartRoutes';
import { shoppingCartDeleteRoutes} from './routes/shoppingCartDeleteRoutes';
import { shoppingCartSendOrder} from './routes/shoppingCartSendOrder';
import { orderRoutes} from './routes/orderRoutes';
import { stripeCheckout} from './routes/stripeCheckout';

<<<<<<< HEAD

const stripe = require("stripe")(
  "sk_test_51PreUORwdDaooQDsamp23arHGzTPt6evgQoLolZw1DcnkEIyIZ86rptWHnack4RBbeMAzEj6vdViamrhUXI5nmO200vL2SOcjX"
);
=======
>>>>>>> e050d83bd8c699745fc21eab5eef74ba211f00b7
const app = express();

dotenv.config();

export const pgClient = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: "localhost",
});

pgClient.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  expressSession({
    secret: "Tecky-C32-WSP012-Michael-Victor-Kees",
    resave: true,
    saveUninitialized: true,
  })
);

declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}

app.use('/', userRouter)
app.use('/', shoppingCartRouter);
app.use('/', shoppingCartDeleteRoutes);
<<<<<<< HEAD


app.use(express.static("uploads"));
=======
app.use('/', shoppingCartSendOrder);
app.use('/', orderRoutes);
app.use('/', stripeCheckout)
app.use('/', productInfo)
app.use('/', filter)

>>>>>>> e050d83bd8c699745fc21eab5eef74ba211f00b7
app.use(express.static("public"));
app.use(isLoggedIn, express.static("private"));

app.use((req, res) => {
  res.redirect("404.html");
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
