import dbConnect from '../../../utility/mongo'
import OrderPoke from '../../../models/Order'

export default async function handler(req, res) {
    const { method, query:{id} } = req

    await dbConnect()

    if (method === 'GET') {
        try {
            const order = await OrderPoke.findById(id)
            res.status(200).json(order)
        } catch (err) {
            res.status(400).json(err)
        }
    }
    if (method === 'PUT') {
        try {
            const updatedOrder = await OrderPoke.findByIdAndUpdate(id, req.body, {new:true})
            res.status(200).json(updatedOrder)
        } catch (err) {
            res.status(400).json(err)
        }
    }
    if (method === 'DELETE') {
        try {
            await OrderPoke.findByIdAndDelete(id)
            res.status(200).json('Your order has been deleted')     
        } catch(err) {
            res.status(400).json(err)
        }
    }
  }