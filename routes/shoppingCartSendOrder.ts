import express, { Request, Response, Router } from 'express';
import { pgClient } from '../main';

export const shoppingCartSendOrder = express.Router()

shoppingCartSendOrder.post("/shoppingCartSendOrder", async (req, res) => {
  try {
    const userId = req.session.userId;

    // 檢查order
    const checkOrderQuery = await pgClient.query(
      `SELECT * FROM orders WHERE state = 'Unpaid' AND member_id = $1`,[userId])
    const checkOrder = checkOrderQuery.rows
    if (checkOrder.length > 0) {
      return res.status(400).send({ message: 'Please check out or cancel your unpaid order first.' })
    }

    const state = "Unpaid"
    const shoppingCartQuery = await pgClient.query
      (`select * from shopping_cart join product on product.id = shopping_cart.product_id where member_id =${userId};`)
    const shoppingCartResults = shoppingCartQuery.rows

    const totalPriceQueryResult = await pgClient.query
      (`select sum(product_price * quantity) as total from shopping_cart 
      join product on product.id = shopping_cart.product_id
      where member_id =${userId}; `)
    const totalPrice = totalPriceQueryResult.rows[0].total

    //更新orders
    const sendOrder = await pgClient.query
      (`INSERT INTO orders (member_id, total, state) 
    VALUES ('${userId}', '${totalPrice}', '${state}')RETURNING id`)

    for (const shoppingCartResult of shoppingCartResults) {

      const orderId = sendOrder.rows[0].id
      const productName = shoppingCartResult.product_name
      const product_id = shoppingCartResult.product_id
      const quantity = shoppingCartResult.quantity
      const product_price = shoppingCartResult.product_price
      const subtotal = shoppingCartResult.quantity * shoppingCartResult.product_price

      // Check stock
      // const checkStockQuery = await pgClient.query(`SELECT product_quantity FROM product WHERE id = $1`, [product_id]);
      // const currentStock = checkStockQuery.rows[0].product_quantity;

      // if (currentStock < quantity) {
      //   return res.status(400).json({ message: `'${productName}'. Available: ${currentStock}, Requested: ${quantity}` });
      // }

      //扣product table內的庫存
      await pgClient.query(
        `UPDATE product SET product_quantity = product_quantity - '${quantity}' WHERE product.id = $1;`, [product_id])

      //更新order details
      await pgClient.query
        (`INSERT INTO order_details (orders_id, product_id, quantity, product_price, subtotal) 
        VALUES ('${orderId}', '${product_id}', '${quantity}', 
        '${product_price}', '${subtotal}')`)
    }
    //清空shopping cart
    await pgClient.query(`DELETE FROM shopping_cart WHERE member_id =${userId};`)

    return res.status(200).json({ message: 'Order submitted!' })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Order failed' });
  }
})