import Usuario from "../models/usuario.js"

const existeUsuarioById = async (id ) =>{
    const existe = await Usuario.findById(id)

    if(!existe){
        throw new Error (`El ID no existe`)
    }
}

const existeUsuarioByCodigo = async (codigo) => {
    const existe = await Usuario.findOne({codigo})

    if(existe) throw new Error('Ya existe usuario con este código')
}

const existeUsuarioByEmail = async (email) => {
    const existe = await Usuario.findOne({email})

    if(existe) throw new Error('Ya existe usuario con este email')
}

export{existeUsuarioById, existeUsuarioByCodigo,existeUsuarioByEmail}