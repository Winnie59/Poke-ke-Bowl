import dbConnect from '../../../utility/mongo'
import OrderPoke from '../../../models/Order'
import { getSession } from '@auth0/nextjs-auth0'
import Email from '../../../utility/email'

export default async function handler(req, res) {
    const session = getSession(req, res)
    const userId = session.user.sub
    const userEmail = session.user.email
    const userName = session.user.name
    const { method } = req

    await dbConnect()

    if (method === 'POST') {
        try {
            const order = await OrderPoke.create(req.body,userId)
            const sendEmail = await new Email(userEmail,userName, order).sendMagicLink()
            res.status(201).json(order, sendEmail)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}