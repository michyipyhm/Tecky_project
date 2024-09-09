import express, { query, Request, response, Response } from "express";
import { pgClient } from '../main';

export const productInfo = express();

productInfo.get("/product-info", async (req: Request, res: Response) => {
  try {
    const product_info_result = await pgClient.query(
      `select product_id, image_path, product_name, product_price, created_at, product_quantity from product
          JOIN product_image ON product.id = product_image.product_id 
        ORDER by created_at DESC`
    );
    res.json(
      product_info_result.rows.map((row) => ({
        id: row.id,
        product_name: row.product_name,
        product_price: row.product_price,
        image_path: row.image_path,
        product_id: row.product_id,
        quantity: row.product_quantity,
        created_at: row.created_at,
      }))
    );
    return
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving the product information.",
    });
    return

  }
});

//將product加入購物車
productInfo.post("/addToCart", async (req, res) => {
  try {
    const userId = req.session.userId
    const productName = req.body.name

    const productIdResult = await pgClient.query(
      `SELECT id FROM product WHERE product_name = $1`, [productName])

    const productId = productIdResult.rows[0].id

    //檢查product是否重覆
    const checkProductQuery = await pgClient.query(
      `SELECT product_id FROM shopping_cart WHERE member_id = $1`,[userId])
    const checkProduct = checkProductQuery.rows
    for (const result of checkProduct) {
      if (result.product_id === productId) {
        return res.status(400).send({ message: 'It is already in your shopping cart' })
      }
    }
    // 檢查stock
    const checkStockQuery = await pgClient.query(
      `SELECT product_quantity FROM product WHERE id = $1`,[productId])
    const currentStock = checkStockQuery.rows[0].product_quantity
    if (currentStock <= 0) {
      return res.status(400).send({ message: 'It is sold out.' })
    }
    // 檢查shopping cart limit
    const checkLimitQuery = await pgClient.query(
      `SELECT member_id FROM shopping_cart WHERE member_id = $1`,[userId])
    const checkLimit = checkLimitQuery.rows.length
    if (checkLimit > 9) {
      return res.status(400).send({ message: 'Shopping cart is full. Please check out or clear your shopping cart.' })
    }
    // add to cart
    await pgClient.query(
      `INSERT INTO shopping_cart (product_id, member_id, quantity) VALUES ($1, $2, $3)`, [productId, userId, 1])

    return res.status(200).json({ message: 'Added to shopping Cart!' })

  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Please login first' })
  }
});
