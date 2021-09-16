import mongoose from 'mongoose';

const redSchema = moongose.Schema({
    codigo : {type: String, required:true, maxlength:50, unique:true},
    estado : {type:Number, default:1},
    iglesia: { type: mongoose.Schema.Types.ObjectId, ref: `Iglesia`, require: true },
})

export default mongoose.model('Red', redSchema)