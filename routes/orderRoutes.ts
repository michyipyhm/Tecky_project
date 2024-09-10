import express from 'express';
import { pgClient } from '../main';

export const orderRouter = express.Router()
//顯示訂單
orderRouter.get("/checkOrder", async (req, res) => {
    const userId = req.session.userId
    if (!userId) {
        res.status(401).json();
        return;
    }
    try {
        const orderResult = await pgClient.query(`select * from orders where member_id =${userId};`)
        const data = orderResult.rows
        res.status(200).json({ data })
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching order');
    }
})

//訂單明細
orderRouter.get("/order", async (req, res) => {
    try {
        const userId = req.session.userId
        const orderNum = req.query.orderNum
        const currectUserIdResult = await pgClient.query(`select member_id from orders where id =${orderNum};`)
        const currectUserId = currectUserIdResult.rows[0]
        if (userId != currectUserId.member_id) {
            res.status(401).json({ message: "Fail to load order." });
            return;
        }
        const orderDetailsResult = await pgClient.query(`select * from order_details 
        join product on product.id = order_details.product_id 
        join product_image on product_image.product_id = product.id 
        where orders_id =${orderNum};`)
        const orderStatusResult = await pgClient.query(`SELECT state FROM orders where id = ${orderNum}`)
        const orderStatus = orderStatusResult.rows[0]

        const data = orderDetailsResult.rows
        const totalPriceQResult = await pgClient.query(`select total from orders WHERE id =${orderNum};`)
        const totalPrice = totalPriceQResult.rows[0]
        return res.status(200).json({ data, totalPrice, orderStatus })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'This is not your order.' })
    }
})

// 取消order
orderRouter.post("/orderCancel", async (req, res) => {
    try {
        const queryResult = await pgClient.query(`SELECT * FROM order_details JOIN product on product.id = order_details.product_id WHERE orders_id =$1`, [req.body.orderId])
        const products = queryResult.rows

        for (const product of products) {
            const product_id = product.product_id
            const quantity = product.quantity
            await pgClient.query(
                `UPDATE product SET product_quantity = product_quantity + '${quantity}' WHERE product.id = $1`, [product_id])
        }
        // await pgClient.query(
        //     `DELETE FROM order_details WHERE order_details.orders_id =$1`, [req.body.orderId])

        // await pgClient.query(
        //     `DELETE FROM orders WHERE id =$1`, [req.body.orderId])

        await pgClient.query(
            `UPDATE orders SET state = 'Canceled' WHERE id =$1`, [req.body.orderId])

        return res.status(200).json({ message: 'Order canceled!' })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Something go wrong' })
    }
})
