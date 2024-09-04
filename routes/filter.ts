import express, { query, Request, response, Response } from "express";
import { pgClient } from "../main";

export const filter = express.Router();

let flow_one = ["product_type", "camera_type"];

let flow_one_Digital = [
  "product_type",
  "camera_type",
  "is_used",
  "origin_country",
  "brand_name",
];

let flow_one_Analog = [
  "product_type",
  "camera_type",
  "is_used",
  "iso",
  "origin_country",
  "brand_name",
];

let flow_two = [
  "product_type",
  "format_name",
  "iso",
  "origin_country",
  "brand_name",
];

filter.post("/filter", async (req, res) => {
  console.log("reqbody is", req.body);

  let query = `SELECT * FROM product 
      JOIN product_image ON product.id = product_image.product_id 
      JOIN brand ON product.brand_id = brand.id
      JOIN origin ON product.origin_id = origin.id
      JOIN format ON product.format_id = format.id`;

  // let priceHighToLow;
  // let priceLowToHigh;

  if (Object.keys(req.body).length > 0) {
    query += " WHERE ";
    let count = 0;

    for (let key in req.body) {
      console.log("key is", key);
      if (count > 0) query += " AND ";
      query += `${key} = '${req.body[key]}'`;
      count++;
    }
  }

  if (req.body.order === "dec") {
    query += ` ORDER BY product_price DESC`;
  } else if (req.body.order === "asc") {
    query += ` ORDER BY product_price ASC`;
  }


  
  console.log("query is", query);

  // priceHighToLow = await pgClient.query(query += `ORDER BY product_price DESC`);
  // priceLowToHigh = await pgClient.query(query += `ORDER BY product_price ASC`);

  let products;
  try {
    products = (await pgClient.query(query)).rows;
  } catch (err) {
    console.log("error is", err);
    res.status(500).json({ message: "filter error 1" });
  }

  // console.log("products are", products)

  let ObjectArray = Object.keys(req.body);

  let lastCriteria =
    ObjectArray.length > 0 ? ObjectArray[ObjectArray.length - 1] : "none";
  console.log("last criteria is", lastCriteria);

  let nextCriteria;
  let destined_flow;

  if (req.body.product_type === "camera") {
    if (req.body.camera_type === "digital") {
      destined_flow = flow_one_Digital;
    } else {
      destined_flow = flow_one_Analog;
    }
  } else {
    destined_flow = flow_two;
  }

  console.log(" destined flow is", destined_flow);
  let currentIndex;
  currentIndex = destined_flow.findIndex((step) => step === lastCriteria);
  console.log("currentIndex is", currentIndex);

  nextCriteria = destined_flow[currentIndex + 1];

  console.log("*******nextCriteria is", nextCriteria);

  let nextOptions;
  if (!nextCriteria) {
    nextOptions = "";
    nextCriteria = "";
  } else {
    let optionQuery = `SELECT ${nextCriteria} FROM product 
    JOIN product_image ON product.id = product_image.product_id 
    JOIN brand ON product.brand_id = brand.id
    JOIN origin ON product.origin_id = origin.id
    JOIN format ON product.format_id = format.id
    `;
    console.log("check object req body length", Object.keys(req.body).length);
    if (Object.keys(req.body).length > 0) {
      optionQuery += " WHERE ";
      let count = 0;

      for (let key in req.body) {
        console.log(key);
        if (count > 0) optionQuery += " AND ";
        optionQuery += `${key} = '${req.body[key]}'`;
        count++;
      }

      optionQuery += ` GROUP BY ${nextCriteria}`;
    }

    console.log("optionQuery is", optionQuery);

    try {
      nextOptions = (await pgClient.query(optionQuery)).rows;
      console.log("nextOptions are", nextOptions);
    } catch (err) {
      res.status(500).json({ message: "filter error 2" });
      return;
    }
  }

  // let imagePath ;
  // try {
  //   // const image_path_result = await pgClient.query(
  //   //   `select image_path from product_image`
  //   // );
  //   // console.log("result is!!!!!!!!", image_path_result);
  //   imagePath = (await (pgClient.query(query))).rows;
  //   console.log("imagePath is >>>>>>>", imagePath);
  //   // .rows.map((row) => row.image_path);

  // } catch (error) {
  //   console.log("imagePath error >>>>>", error);
  //   res
  //     .status(500)
  //     .json({ message: "An error occurred while retrieving the images." });
  // }

  res.status(200).json({
    nextCriteria: nextCriteria,
    nextOptions: nextOptions,
    products: products,
  });
  return;
});
