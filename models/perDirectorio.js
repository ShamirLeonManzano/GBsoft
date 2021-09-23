import mongoose from 'mongoose';

const directorioSchema = mongoose.Schema({
    estado : {type:Number, default:1},
    gBiblico: { type: mongoose.Schema.Types.ObjectId, ref: `GrupoBiblico`, require: true },
    nombre: {type: String, required: true, maxlength:50},
    cumpleaños: {type: String, required: true, maxlength:50},
    direccion: {type: String, required: true, maxlength:50},
    telefono: {type: String, required: true, maxlength:50},
    email: {type: String, required: true, maxlength:50},
})

export default mongoose.model('Directorio',directorioSchema)