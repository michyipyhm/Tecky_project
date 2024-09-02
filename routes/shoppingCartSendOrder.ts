import express, { Request, Response, Router } from 'express';
import { pgClient } from '../main';

export const shoppingCartSendOrder = express.Router()

shoppingCartSendOrder.post("/shoppingCartSendOrder", async (req, res) => {
  const userId = req.session.userId;
  try {
    const shoppingCartQuery = await pgClient.query
      (`select * from shopping_cart join product on product.id = shopping_cart.product_id where member_id =${userId};`)
    const shoppingCartResults = shoppingCartQuery.rows

    if (shoppingCartResults.length === 0) {
      res.status(400).json({ message: 'Shopping cart is empty' });
    }

    const totalPriceQueryResult = await pgClient.query
      (`select sum(product_price * quantity) as total from shopping_cart 
      join product on product.id = shopping_cart.product_id
      where member_id =${userId}; `)
    const totalPrice = totalPriceQueryResult.rows[0].total

    const state = "Unpaid"

    const sendOrder = await pgClient.query
      (`INSERT INTO orders (member_id, total, state) 
    VALUES ('${userId}', '${totalPrice}', '${state}')RETURNING id`)

    for (const shoppingCartResult of shoppingCartResults) {

      const orderId = sendOrder.rows[0].id
      const product_id = shoppingCartResult.product_id
      const quantity = shoppingCartResult.quantity
      const product_price = shoppingCartResult.product_price
      const subtotal = shoppingCartResult.quantity * shoppingCartResult.product_price

      await pgClient.query
        (`INSERT INTO order_details (orders_id, product_id, quantity, product_price, subtotal) 
      VALUES ('${orderId}', '${product_id}', '${quantity}', 
      '${product_price}', '${subtotal}')`)
    }
    res.status(200).json({ message: 'Order submitted!' })
    await pgClient.query(`DELETE FROM shopping_cart WHERE member_id =${userId};`)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Order Failed' })
  }
})