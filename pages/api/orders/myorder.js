import dbConnect from '../../../utility/mongo'
import OrderPoke from '../../../models/Order'
import { getSession } from '@auth0/nextjs-auth0'

export default async function handler(req, res) {
    const session = getSession(req, res)
    const userId = session.user.sub
    const { method } = req

    await dbConnect()

    if (method === 'GET') {
        try {
            const order = await OrderPoke.find({userId:session.user.sub})
            res.status(201).json(order)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}