import mongoose from 'mongoose';

const iglesiaSchema = mongoose.Schema({
    codigo : {type: String, required:true, maxlength:50, unique:true},
    titulo : {type: String, required:true, maxlength:50,},
    foto: {type: String},
    estado : {type:Number, default:1},
})

export default mongoose.model('Iglesia', iglesiaSchema)