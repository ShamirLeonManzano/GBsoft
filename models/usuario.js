import mongoose from 'mongoose'

const UsuarioSchema = mongoose.Schema({
    codigo: {type: String, required:true, maxlength:50, unique:true},
    nombre: { type: String, required: true, maxlength: 50 },
    email: { type: String, uniqued: true, maxlength: 50 },
    password: { type: String, required: true },
    rol: { type: String, required: true, maxlength: 20 }, //ADMIN - PS - FS - FR - FG    
    telefono: { type: Number, required: true, maxlength: 10},
    estado: { type: Number, default: 1 },
    foto: {type: String},
    createAt: { type: Date, default: Date.now }
})

export default mongoose.model('Usuario', UsuarioSchema)