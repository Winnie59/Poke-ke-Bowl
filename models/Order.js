import mongoose from "mongoose";

const OrderPokeSchema = new mongoose.Schema({
    customer: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    method: {
        type: Number,
        required: true
    }
}, {timestamps: true})

export default mongoose.models.OrderPoke || mongoose.model('OrderPoke', OrderPokeSchema)