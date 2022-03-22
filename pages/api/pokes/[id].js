import dbConnect from '../../../utility/mongo'
import Poke from '../../../models/Poke'

export default async function handler(req, res) {
    const { method, query:{id} } = req

    dbConnect()

    if (method === 'GET') {
        try{
            const poke = await Poke.findById(id)
            res.status(200).json(poke)
        } catch(err) {
            res.status(400).json(err)
        }
    }
    if (method === 'PUT') {
        try{
            const updatedPoke = await Poke.findByIdAndUpdate(id, req.body, {new: true})
            res.status(200).json(updatedPoke)
        } catch(err) {
            res.status(400).json(err)
        }
    }
    if (method === 'DELETE') {
        try {
            await Poke.findByIdAndDelete(id)
            res.status(200).json('The product has been deleted')
        } catch(err) {
            res.status(400).json(err)
        }
    }
  }