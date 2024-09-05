import express, { query, Request, response, Response } from "express";
import { pgClient } from '../main';

export const productInfo = express();

  productInfo.get("/product-info", async (req: Request, res: Response) => {
    try {
      const product_info_result = await pgClient.query(
        `select product_id, image_path, product_name, product_price, created_at from product
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
          created_at: row.created_at,
        }))
      );
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while retrieving the product information.",
      });
    }
  });
  
//將product加入購物車
productInfo.post("/addToCart", async (req, res) => {
  const userId = req.session.userId
  const productName = req.body.name
  try {
    const productIdResult = await pgClient.query(`SELECT id FROM product WHERE product_name = '${productName}';`)
    const productId = productIdResult.rows[0]
    console.log(productId.id)
    console.log(userId)
    await pgClient.query(`INSERT INTO shopping_cart (product_id, member_id, quantity) VALUES ('${productId.id}', '${userId}', '1');`)
    res.status(200).json({message: 'Added to shopping Cart!'})
  } catch (err) {
    res.status(500).send({message: 'add to shopping cart faile'})
  }
})