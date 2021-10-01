import Iglesia from '../models/iglesia.js'

const existeIglesiaById = async (id) => {

    const existe = await Iglesia.findById(id)
    if(!existe) throw new Error('No existe iglesia con este id')

}

const existeIglesiaByCod = async (codigo) => { 
    
    const existe = await Iglesia.findOne({codigo})
    if(existe) {
        throw new Error('Ya existe Iglesia con este código')
    }

}


export {existeIglesiaById,existeIglesiaByCod}