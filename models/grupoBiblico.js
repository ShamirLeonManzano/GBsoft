import mongoose from 'mongoose';

const grupobiblicoSchema = mongoose.Schema({
    titulo : {type: String, required:true, maxlength:50, },
    codigo : {type: String, required:true, maxlength:50, unique:true},
    direccion : {type: String, required:true, maxlength:50},
    telefono : {type: String, required:true, maxlength:50},
    estado : {type:Number, default:1},
    red:{ type: mongoose.Schema.Types.ObjectId, ref: `Red`, require: true },
    subRed: { type: mongoose.Schema.Types.ObjectId, ref: `SubRed`, require: true },
    felipeG: { type: mongoose.Schema.Types.ObjectId, ref: `Usuario`, require: true },    
    foto:{type: String},   
})

export default mongoose.model('GrupoBiblico', grupobiblicoSchema)