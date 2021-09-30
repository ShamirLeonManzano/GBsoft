import mongoose from 'mongoose';

const redSchema = mongoose.Schema({
    codigo : {type: String, unique:true, required:true, maxlength:50},
    estado : {type:Number, default:1},
    iglesia: {type: mongoose.Schema.Types.ObjectId, ref: `Iglesia`, require: true },
    felipeS: {type: mongoose.Schema.Types.ObjectId, ref: `Usuario`, require: true },
    foto: {type: String},
})

export default mongoose.model('Red', redSchema) 