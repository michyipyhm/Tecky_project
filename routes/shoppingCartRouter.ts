import express, { Request, Response, Router } from "express";
import { pgClient } from "../main";

export const shoppingCartRouter = express.Router();

shoppingCartRouter.get("/shoppingcart", getAllItems);
shoppingCartRouter.post("/selectedQuantity", postQuantity);
shoppingCartRouter.delete("/deleteShoppingCartItem", deleteItem);
shoppingCartRouter.post("/shoppingCartSendOrder", checkout);
shoppingCartRouter.post("/addToCart", addToCart);

async function getAllItems(req: Request, res: Response) {
  const userId = req.session.userId;
  if (!userId) {
    res.status(401).json();
    return;
  }
  try {
    let queryResult = await pgClient.query(`select * from shopping_cart 
            join product on product.id = shopping_cart.product_id 
            join product_image on product_image.product_id = product.id 
            join origin on origin.id = product.origin_id 
            join format on format.id = product.format_id
            where member_id =${userId};`);
    let data = queryResult.rows;
    // console.log(data)
    let totalPriceQueryResult =
      await pgClient.query(`select sum(product_price * quantity) as total from shopping_cart 
join product on product.id = shopping_cart.product_id   
where member_id =${userId}; `);
    let totalPrice = totalPriceQueryResult.rows[0];
    res.status(200).json({ data, totalPrice });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching shopping cart");
  }
}

async function postQuantity(req: Request, res: Response) {
  try {
    let data = req.body;
    let id = data.id;
    let quantity = data.quantity;
    console.log("Product", id, "'s quantity has been changed to", quantity);
    // 檢查stock
    const checkStockQuery = await pgClient.query(
      `SELECT product_quantity FROM product WHERE id = $1`,
      [id]
    );
    const currentStock = checkStockQuery.rows[0].product_quantity;
    if (currentStock < quantity) {
      return res.status(400).json({
        message: `Available: ${currentStock}, Requested: ${quantity}`,
      });
    }
    await pgClient.query(
      `UPDATE shopping_cart SET quantity = '${quantity}' WHERE product_id = '${id}';`
    );
    return res.status(200).json({ message: "Quantity updated!" });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Quantity failed");
  }
}

async function deleteItem(req: Request, res: Response) {
  const data = req.body;
  const id = data.id;
  console.log("You are delected product", data);
  try {
    await pgClient.query(
      `DELETE FROM shopping_cart WHERE product_id = '${id}';`
    );
    res.status(200).json({ message: "Item deteted!" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Item detete failed");
  }
}

async function checkout(req: Request, res: Response) {
  try {
    const userId = req.session.userId;

    // 檢查order
    const checkOrderQuery = await pgClient.query(
      `SELECT * FROM orders WHERE state = 'Unpaid' AND member_id = $1`,
      [userId]
    );
    const checkOrder = checkOrderQuery.rows;
    if (checkOrder.length > 0) {
      return res.status(400).send({
        message: "Please check out or cancel your unpaid order first.",
      });
    }

    const state = "Unpaid";
    const shoppingCartQuery = await pgClient.query(
      `select * from shopping_cart join product on product.id = shopping_cart.product_id where member_id =${userId};`
    );
    const shoppingCartResults = shoppingCartQuery.rows;

    const totalPriceQueryResult =
      await pgClient.query(`select sum(product_price * quantity) as total from shopping_cart 
      join product on product.id = shopping_cart.product_id
      where member_id =${userId}; `);
    const totalPrice = totalPriceQueryResult.rows[0].total;

    //更新orders
    const sendOrder =
      await pgClient.query(`INSERT INTO orders (member_id, total, state) 
    VALUES ('${userId}', '${totalPrice}', '${state}')RETURNING id`);

    for (const shoppingCartResult of shoppingCartResults) {
      const orderId = sendOrder.rows[0].id;
      const productName = shoppingCartResult.product_name;
      const product_id = shoppingCartResult.product_id;
      const quantity = shoppingCartResult.quantity;
      const product_price = shoppingCartResult.product_price;
      const subtotal =
        shoppingCartResult.quantity * shoppingCartResult.product_price;

      // Check stock
      // const checkStockQuery = await pgClient.query(`SELECT product_quantity FROM product WHERE id = $1`, [product_id]);
      // const currentStock = checkStockQuery.rows[0].product_quantity;

      // if (currentStock < quantity) {
      //   return res.status(400).json({ message: `'${productName}'. Available: ${currentStock}, Requested: ${quantity}` });
      // }

      //扣product table內的庫存
      await pgClient.query(
        `UPDATE product SET product_quantity = product_quantity - '${quantity}' WHERE product.id = $1;`,
        [product_id]
      );

      //更新order details
      await pgClient.query(`INSERT INTO order_details (orders_id, product_id, quantity, product_price, subtotal) 
        VALUES ('${orderId}', '${product_id}', '${quantity}', 
        '${product_price}', '${subtotal}')`);
    }
    //清空shopping cart
    await pgClient.query(
      `DELETE FROM shopping_cart WHERE member_id =${userId};`
    );

    return res.status(200).json({ message: "Order submitted!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Order failed" });
  }
}

//將product加入購物車
async function addToCart(req: Request, res: Response) {
  try {
    const userId = req.session.userId;
    const productName = req.body.name;

    const productIdResult = await pgClient.query(
      `SELECT id FROM product WHERE product_name = $1`,
      [productName]
    );

    const productId = productIdResult.rows[0].id;

    //檢查product是否重覆
    const checkProductQuery = await pgClient.query(
      `SELECT product_id FROM shopping_cart WHERE member_id = $1`,
      [userId]
    );
    const checkProduct = checkProductQuery.rows;
    for (const result of checkProduct) {
      if (result.product_id === productId) {
        return res
          .status(400)
          .send({ message: "It is already in your shopping cart" });
      }
    }
    // 檢查stock
    const checkStockQuery = await pgClient.query(
      `SELECT product_quantity FROM product WHERE id = $1`,
      [productId]
    );
    const currentStock = checkStockQuery.rows[0].product_quantity;
    if (currentStock <= 0) {
      return res.status(400).send({ message: "It is sold out." });
    }
    // 檢查shopping cart limit
    const checkLimitQuery = await pgClient.query(
      `SELECT member_id FROM shopping_cart WHERE member_id = $1`,
      [userId]
    );
    const checkLimit = checkLimitQuery.rows.length;
    if (checkLimit > 3) {
      return res.status(400).send({
        message:
          "Shopping cart is full. Please check out or clear your shopping cart.",
      });
    }
    // add to cart
    await pgClient.query(
      `INSERT INTO shopping_cart (product_id, member_id, quantity) VALUES ($1, $2, $3)`,
      [productId, userId, 1]
    );

    return res.status(200).json({ message: "Added to shopping Cart!" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Please login first" });
  }
}
