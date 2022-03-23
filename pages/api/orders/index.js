import dbConnect from '../../../utility/mongo'
import OrderPoke from '../../../models/Order'

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    if (method === 'GET') {
        try {
            const orders = await OrderPoke.find()
            res.status(200).json(orders)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    if (method === 'POST') {
        try {
            const order = await OrderPoke.create(req.body)
            res.status(201).json(order)
        } catch (err) {
            res.status(500).json(err)
        }
    }
  }