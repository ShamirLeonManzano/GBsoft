import mongoose from 'mongoose';

const grupobiblicoSchema = moongose.Schema({
    codigo : {type: String, required:true, maxlength:50, unique:true},
    direccion : {type: String, required:true, maxlength:50},
    telefono : {type: String, required:true, maxlength:50},
    estado : {type:Number, default:1},
    subRed: { type: mongoose.Schema.Types.ObjectId, ref: `SubRed`, require: true },
    fg: { type: mongoose.Schema.Types.ObjectId, ref: `usuario`, require: true },
    fr: { type: mongoose.Schema.Types.ObjectId, ref: `usuario`, require: true },
    fs: { type: mongoose.Schema.Types.ObjectId, ref: `usuario`, require: true },
    foto:{type: String},
    directorio:{type:mongoose.Schema.Types.ObjectId, ref: `Directorio`, require: true },
})

export default mongoose.model('GrupoBiblico', grupobiblicoSchema)