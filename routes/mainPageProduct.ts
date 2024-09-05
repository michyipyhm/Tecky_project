import express, { query, Request, response, Response } from "express";
import { pgClient } from '../main';




export const productInfo = express();

//get photo from databases
productInfo.get("/api/product-image", async (req: Request, res: Response) => {
    try {
      const image_path_result = await pgClient.query(
        `select image_path from product_image`
      );
      // console.log("result is!!!!!!!!", image_path_result);
      res.json(image_path_result.rows.map((row) => row.image_path));
    
    } catch (error) {
      // console.log("error is!!!!!!!!!", error);
      res
        .status(500)
        .json({ message: "An error occurred while retrieving the images." });
    }
  });
  
  productInfo.get("/api/product-info", async (req: Request, res: Response) => {
    try {
      const product_info_result = await pgClient.query(
        `select product_name, product_price from product`
      );
      res.json(
        product_info_result.rows.map((row) => ({
          product_name: row.product_name,
          product_price: row.product_price,
        }))
      );
    } catch (error) {
      // console.log("error is!!!!!!!!!", error);
      res.status(500).json({
        message: "An error occurred while retrieving the product information.",
      });
    }
  });

productInfo.get("/api/product-info", async (req: Request, res: Response) => {
  try {
    const product_info_result = await pgClient.query(
      `select product_name, product_price from product`
    );
    res.json(
      product_info_result.rows.map((row) => ({
        product_name: row.product_name,
        product_price: row.product_price,
      }))
    );
  } catch (error) {
    // console.log("error is!!!!!!!!!", error);
    res.status(500).json({
      message: "An error occurred while retrieving the product information.",
    });
  }
});

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
