import mongoose from 'mongoose';

const directorioSchema = moongose.Schema({
    nombre: {type: String, required: true, maxlength:50},
    cumpleaños: {type: String, required: true, maxlength:50},
    dirección: {type: String, required: true, maxlength:50},
    telefono: {type: String, required: true, maxlength:50},
    email: {type: String, required: true, maxlength:50},
})

export default mongoose.model('Directorio',directorioSchema)