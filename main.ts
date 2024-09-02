import express, { query, Request, response, Response } from "express";
import expressSession from "express-session";
import { isLoggedIn } from "./utils/guards";
import { Client } from "pg";
import dotenv from "dotenv";
import { userRouter } from "./routes/userRoutes";
import Stripe from 'stripe';
<<<<<<< HEAD
import { getShoppingCart } from './routes/shoppingCartRoutes';
import { productInfo } from './routes/mainPageProduct';
import { filter } from './routes/filter';
=======
import { shoppingCartRouter } from './routes/shoppingCartRoutes';
import { shoppingCartDeleteRoutes} from './routes/shoppingCartDeleteRoutes';
>>>>>>> 0a5c57ffec6f8e603b81795bb3f7a84fa28fd497

const stripe = require("stripe")(
  "sk_test_51PreUORwdDaooQDsamp23arHGzTPt6evgQoLolZw1DcnkEIyIZ86rptWHnack4RBbeMAzEj6vdViamrhUXI5nmO200vL2SOcjX"
);

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



// order結算
app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: req.body.currency,
          product_data: {
            name: "AAA",
          },
          unit_amount: req.body.price,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:8080/index.html",
    cancel_url: "http://localhost:8080/shoppingcart.html",
  });

  res.json({ id: session.id });
});

<<<<<<< HEAD
=======
//get photo from databases
app.get("/api/product-image", async (req: Request, res: Response) => {
  try {
    const image_path_result = await pgClient.query(
      `select image_path from product_image`
    );
    // console.log("result is!!!!!!!!", image_path_result);
    res.json(image_path_result.rows.map((row) => row.image_path));
  } catch (error) {
    console.log("error is!!!!!!!!!", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the images." });
  }
});
>>>>>>> 0a5c57ffec6f8e603b81795bb3f7a84fa28fd497


<<<<<<< HEAD

app.use('/', userRouter)
// app.use('/resources', isLoggedIn, appleRoutes) // protected resources
app.use('/api/shopping-cart', getShoppingCart);
app.use('/', productInfo)
app.use('/', filter)
=======
app.post("/test", async (req, res) => {
  console.log(req.body);

  let query = `SELECT * FROM product 
    JOIN product_image ON product.id = product_image.product_id 
    JOIN brand ON product.brand_id = brand.id
    JOIN origin ON product.origin_id = origin.id
    JOIN format ON product.format_id = format.id`;

  if (Object.keys(req.body).length > 0) {
    query += " WHERE ";
    let count = 0;

    for (let key in req.body) {
      console.log(key);
      if (count > 0) query += " AND ";
      query += `${key} = '${req.body[key]}'`;
      count++;
    }
  }
  console.log(query);


});

app.use('/', userRouter)
app.use('/', shoppingCartRouter);
app.use('/', shoppingCartDeleteRoutes);


>>>>>>> 0a5c57ffec6f8e603b81795bb3f7a84fa28fd497

app.use(express.static("public"));
app.use(isLoggedIn, express.static("private"));

app.use((req, res) => {
  res.redirect("404.html");
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
