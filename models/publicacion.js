import mongoose from 'mongoose';

const publicacionSchema = mongoose.Schema({
    estado : {type:Number, default:1},
    titulo: {type: String, required: true, maxlength:50},
    descripcion: {type: String, required: true, maxlength:50},
    archivo: {type: String},
    createAt:{type:Date, default:Date.now}    
})

export default mongoose.model('Publicacion',publicacionSchema)