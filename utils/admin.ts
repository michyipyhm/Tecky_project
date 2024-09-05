import { Request, Response, NextFunction } from 'express'
import { pgClient } from '../main';
export const isAdminLoggedIn = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.session?.userId) {
        const userId = req.session?.userId
        const result = ((await pgClient.query(`select * from admin where id = '${userId}' and admin_name = '${req.session.adminName}';`)));
        const row = result.rows[0]
        const count = result.rowCount
        if (count === 1 && row.admin_name === req.session.adminName) {
            next()
        } else {
            // res.status(401).json({message: "please login first"})
            res.redirect("/login.html")
            // redirect to index page
        }
    }
};