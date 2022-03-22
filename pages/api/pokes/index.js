import dbConnect from '../../../utility/mongo'
import Poke from '../../../models/Poke'

export default async function handler(req, res) {
    const { method } = req

    dbConnect()

    if (method === 'GET') {
        try {
            const pokes = await Poke.find()
            res.status(200).json(pokes)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    if (method === 'POST') {
        try {
            const poke = await Poke.create(req.body)
            res.status(201).json(poke)
        } catch (err) {
            res.status(500).json(err)
        }
    }
  }