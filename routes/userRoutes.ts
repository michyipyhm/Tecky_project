import express, { Request, Response } from "express";
import { pgClient } from "../../main";
import { checkPassword, hashPassword } from "../utils/hash";

export const userRouter = express.Router();

userRouter.post("/login", async (req: Request, res: Response) => {
  // http://localhost:8080/login
  const data = req.body;
  const username = data.username;
  const password = data.password; // from client input
  const sql = `Select * from member where username = '${username}';`;

  const result = await pgClient.query(sql);
  const row = result.rows[0];
  const count = result.rowCount;
  if (count == 0) {
    res.status(401).json({ message: "Wrong Username/Password" });
    return;
  } else {
    const hashPassword = row.password; // from database
    const passwordChecking = await checkPassword({
      plainPassword: password,
      hashedPassword: hashPassword,
    });
    if (!passwordChecking) {
      res.status(401).json({ message: "Wrong Username/Password" });
      return;
    }
  }
  req.session.userId = row.id;
  res.json({
    message: "Login successful",
    nickname: row.nickname,
    userId: req.session.userId,
  });
  return;
});
userRouter.post("/register", async (req: Request, res: Response) => {
  // http://localhost:8080/register
  const data = req.body;
  const username = data.username;
  const password = data.password;
  const nickname = data.nickname;
  const birthday = data.birthday;
  const sql_1 = `Select * from member where username = '${username}'`;
  const userResult = await pgClient.query(sql_1);
  const row = userResult.rows;
  const rowCount = userResult.rowCount;
  if (rowCount == null || rowCount > 0) {
    res.status(400).json({ message: "Username exists in database" });
    return;
  }
  const sql = `INSERT INTO member (username, password, nickname, birthday) 
    VALUES ('${username}', '${await hashPassword(
    password
  )}', '${nickname}', '${birthday}');`;
  const InsertResult = await pgClient.query(sql);
  res.json({ message: "Register successful" });
});

userRouter.get("/userProfile", async (req: Request, res: Response) => {
  // http://localhost:8080/userProfile
  const userId = req.session.userId;
  const sql = `select id, username, birthday, nickname, phone from member where id = $1`;
  const userResult = await pgClient.query(sql, [userId]);
  const userRows = userResult.rows;
  const userCount = userResult.rowCount;

  console.log(userCount);
  res.json({ message: "userprofile", user: userRows[0] });
});

userRouter.post("/logout", async (req: Request, res: Response) => {
  if (req.session.userId) {
    req.session.destroy(() => {
      res.json({ message: "logout successful" });
    });
  } else {
    res.status(401).json({ message: "you never login" });
  }
});
userRouter.get("/ownId", async (req: Request, res: Response) => {
  if (req.session.userId) {
    res.json({ message: "successful", userId: req.session.userId });
    return;
  } else {
    res.status(401).json({ message: "you never login" });
    return;
  }
});
