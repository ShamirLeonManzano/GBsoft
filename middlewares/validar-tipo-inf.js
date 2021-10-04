const validarTipo=(...tipos)=>{
    return (req,res,next)=>{
        if (!(tipos.includes(req.informe.tipo))){
            return res.status(401).json({
                msg:`El informe requiere uno de estos tipos ${tipos}`
            })
        }
        next();
    }
}

export {validarTipo}