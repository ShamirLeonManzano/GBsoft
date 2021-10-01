import Red from '../models/red.js'
import Usuario from '../models/usuario.js'
import Iglesia from '../models/iglesia.js'

const existeRedById = async (id) => {
    const existe = await Red.findById(id)   
    if(!existe) throw new Error('El ID de Red no existe')
}

const existeRedByCodigo = async (codigo) => {
    const existe = await Red.findOne({codigo})
    if(existe) throw new Error('Ya existe Red con este código')
}

const existeRedByUserId = async (id) => {    
    const existe = await Usuario.findById(id)

    if(!existe){
        throw new Error (`El ID de usuario no existe`)
    }
}
const existeRedByIglesiaId = async (id) => {    
    const existe = await Iglesia.findById(id)

    if(!existe){
        throw new Error (`El ID de iglesia no existe`)
    }
}

export {existeRedById, existeRedByCodigo, existeRedByUserId, existeRedByIglesiaId}