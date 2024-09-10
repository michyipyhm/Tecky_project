import express, { Request, Response, Router } from "express";
import { pgClient } from "../main";

export const productRouter = express.Router();

productRouter.get("/getSingleProduct", async (req, res) => {
  const productId = req.query.product;
  console.log("check productId",productId)
  try {
    const productResult = await pgClient.query(
      `SELECT * FROM product 
                JOIN product_image ON product.id = product_image.product_id 
                JOIN brand ON product.brand_id = brand.id
                JOIN origin ON product.origin_id = origin.id
                JOIN format ON product.format_id = format.id
                WHERE product.id = ${productId};`
    );

    const data = productResult.rows[0];
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).send({ message: "Faile" });
  }
});

productRouter.get("/getAllProducts", async (req: Request, res: Response) => {
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
    return;
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving the product information.",
    });
    return;
  }
});
