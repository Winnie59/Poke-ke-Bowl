import mongoose from "mongoose";

const PokeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: [Number],
        required: true
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    add: {
        type: [
            {
                text: String,
                priceAdd: Number,
                imgAdd: String
            }
        ]
    }
}, {timestamps: true})

export default mongoose.models.Poke || mongoose.model('Poke', PokeSchema)