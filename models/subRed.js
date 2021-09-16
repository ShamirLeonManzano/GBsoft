import mongoose from 'mongoose';

const subRedSchema = moongose.Schema({
    codigo : {type: String, required:true, maxlength:50, unique:true},
    estado : {type:Number, default:1},
    red: { type: mongoose.Schema.Types.ObjectId, ref: `Red`, require: true },
})

export default mongoose.model('SubRed', subRedSchema)