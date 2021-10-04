import Informe from "../models/informe.js";
import Usuario from "../models/usuario.js"

const existeInformeById = async (id) => {

    const existe = await Informe.findById(id)
    if(!existe) throw new Error('No existe informe con este id')

}

const existeTipo =  async (tipo) =>{
    if (tipo != "GB")  {
        if (tipo != "R") {
            if (tipo != "SR") {
                if (tipo !="IGL"){

                    throw new Error(`Tipos: GB, SB, R, IGL`)
                }
            }
        }
    }
}

const existeInformeByCod = async (codigo) => { 
    
    const existe = await Informe.findOne({codigo})
    if(existe) {
        throw new Error('Ya existe Informe con este código')
    }

}

const existeUsuarioById = async (usuario) =>{    
    const existe = await Usuario.findById(usuario)
    if(!existe){
        throw new Error (`El ID no existe`)
    }
}

export {existeInformeById, existeTipo, existeInformeByCod, existeUsuarioById}