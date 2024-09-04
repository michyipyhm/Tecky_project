import express, { Request, Response } from "express";
import { pgClient } from "../main";
import { checkPassword, hashPassword } from "../utils/hash";
import formidable from 'formidable';
import * as fs from 'fs';


export const userRouter = express.Router();
//////////////////////////////////////////

userRouter.post("/login", async (req: Request, res: Response) => {//http://localhost:8080/login.html
  const data = req.body
  const username = data.username
  const password = data.password //from client input
  const result = ((await pgClient.query(`select * from member where username = '${username}';`)));
  const row = result.rows[0]
  const count = result.rowCount
  if (count == 0) {
    res.status(401).json({ message: "The username or password is incorrect." })
    return
  } else {
    const hashPassword = row.password //from database
    const passwordChecking = await checkPassword({ plainPassword: password, hashedPassword: hashPassword, })
    if (!passwordChecking) {
      res.status(401).json({ message: "The username or password is incorrect." });
      return
    }
  }
  req.session.userId = row.id
  res.json({ message: "Login successful.", nickanme: row.nickname, userId: req.session.userId })
  return;
})
//////////////////////////////////////////

userRouter.post("/register", async (req: Request, res: Response) => {//http://localhost:8080/register.html

  const data = req.body;
  const username = data.username;
  const password = data.password;
  const nickname = data.nickname;
  const gender = data.gender;
  const birthday = data.birthday;
  const phone = data.phone;
  const address = data.address;
  const email = data.email
  const sql_1 = `Select * from member where username = '${username}'`;
  const userResult = await pgClient.query(sql_1);
  const row = userResult.rows;
  const rowCount = userResult.rowCount;
  if (rowCount == null || rowCount > 0) {
    res.status(400).json({ message: "username exists in database" });
    return;
  }
  const sql = `INSERT INTO member (username, password, nickname, gender, birthday, phone, address, email) 
    VALUES ('${username}', '${await hashPassword(password)}', '${nickname}', '${gender}', '${birthday}', '${phone}', '${address}', '${email}')RETURNING id;`;

  const insertResult = await pgClient.query(sql);
  req.session.userId = insertResult.rows[0].id
  res.json({ message: "Register successful" });
});
//////////////////////////////////////////

userRouter.get("/userprofile", async (req: Request, res: Response) => {//http://localhost:8080/profile.html
  const userId = req.session.userId
  if (!userId) {
    res.status(401).json({ message: "Please login first." });
    return;
  }
  const sql_1 = `select id, username, nickname, gender, birthday, phone, address, email from member where id = $1`
  const userResult = await pgClient.query(sql_1, [userId])
  const userRows = userResult.rows

  res.json({ message: "userprofile", user: userRows[0] })
})
//////////////////////////////////////////

userRouter.post("/logout", async (req: Request, res: Response) => {
  if (req.session.userId) {
    req.session.destroy(() => {
      res.json({ message: "Logout successful." })
    })
  } else {
    res.json({ message: "Please login first." })
  }
})
///////////////////////////////////

userRouter.post("/updateprofile", async (req: Request, res: Response) => {//http://localhost:8080/updateprofile.html
  console.log("/updateprofile start 1");

  if (!req.session) {
    res.status(401).json({ message: "Please login first." });
  }

  const data = req.body;
  console.log("data:[" + JSON.stringify(data) + "]")
  const nickname = data.nickname;
  console.log("nickname:[" + JSON.stringify(nickname) + "]")
  const gender = data.gender;
  console.log("gender:[" + JSON.stringify(gender) + "]")
  const birthday = data.birthday;
  console.log("birthday:[" + JSON.stringify(birthday) + "]")
  const phone = data.phone;
  const address = data.address;
  const email = data.email;

  try {

    console.log("/updateprofile req.session.userId:[" + req.session.userId + "]");

    const sql = `UPDATE member SET 
  nickname = '${nickname} ',
  gender = '${gender}', 
  birthday = '${birthday}', 
  phone = '${phone}', 
  address = '${address}', 
  email = '${email}' 
  WHERE id = '${req.session.userId}'`;

    console.log("/updateprofile sql:[" + sql + "]");

    await pgClient.query(sql);

    console.log("/updateprofile end");
    res.json({ message: "Date updated successfully" });
  } catch (error) {
    console.log(error)
    console.log("/updateprofile error:[" + error + "]");
    res.status(500).json({ message: "Failed to update data." });
  }
});
///////////////////////////////////////////////////

userRouter.post("/adminlogin", async (req: Request, res: Response) => {//http://localhost:8080/adminlogin.html
  const data = req.body
  console.log(data);
  const username = data.username
  console.log(username);
  const password = data.password //from client input
  const result = ((await pgClient.query(`select * from admin where admin_name = '${username}';`)));
  console.log("result:[" + JSON.stringify(result) + "]");
  const row = result.rows[0]
  console.log("row:[" + JSON.stringify(row) + "]");
  const count = result.rowCount
  console.log("count:[" + count + "]");
  if (count == 0) {
    res.status(401).json({ message: "The username or password is incorrect." })
    return
  } else {
    const hashPassword = row.password //from database
    // const james = await hashPassword("12345678")
    // console.log("james: ", james)
    console.log("hashPassword:[" + hashPassword + "]");
    const passwordChecking = await checkPassword({ plainPassword: password, hashedPassword: hashPassword, })
    console.log("passwordChecking:[" + passwordChecking + "]");
    if (!passwordChecking) {
      res.status(401).json({ message: "The username or password is incorrect." });
      return
    }
  }
  req.session.userId = row.id
  res.json({ message: "Login successful.", userId: req.session.userId })
  return;
})



userRouter.post("/addproduct", async (req: Request, res: Response) => {//http://localhost:8080/adminlogin.html


  const uploadDir = './uploads'
  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 2000 * 1024, // 2MB
    filter: part => part.mimetype?.startsWith('image/') || false,
  })
  try {
    // handle incoming multipart form data using formidable
    let parsedResult = ((await form.parse(req)) as any);
    let data = parsedResult[0];

    let image = parsedResult[1]

    console.log("image is ", image.imageuploads[0].newFilename)

    const sql = `INSERT INTO product (product_name, product_type, camera_type, brand_id, origin_id, format_id, product_price, product_quantity, production_year, weight, pixel, "ISO", is_used) 
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING id;`;


    const result = await pgClient.query(sql, [data.productname[0], data.producttype[0], data.cameratype[0], data.brand[0], data.origin[0], data.format[0], data.productprice[0], data.productquantity[0], data.productionyear[0], data.weight[0], data.pixel[0], data.iso[0], data.isused[0]]);

    console.log("result  product id is !!!", result.rows[0].id)
    // console.log("productid:[" + JSON.stringify(productid) + "]");
    const sql_2 = `INSERT INTO product_image(product_id, image_path)
VALUES ($1,$2)`;
    const result2 = await pgClient.query(sql_2, [result.rows[0].id, image.imageuploads[0].newFilename])

    return data
  } catch (error) {
    console.log("catch error!", error);
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
    else return res.status(500).json({ message: "Internal Server Error" });
  }

});
