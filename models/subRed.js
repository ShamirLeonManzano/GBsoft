import mongoose from 'mongoose';

const subRedSchema = mongoose.Schema({
    codigo : {type: String, required:true, maxlength:50, unique:true},
    titulo : {type: String, required:true, maxlength:50, },
    estado : {type:Number, default:1},
    red: { type: mongoose.Schema.Types.ObjectId, ref: `Red`, require: true },
    felipeR: {type: mongoose.Schema.Types.ObjectId, ref: `Usuario`, require: true },
    foto: {type: String},
})

export default mongoose.model('SubRed', subRedSchema)