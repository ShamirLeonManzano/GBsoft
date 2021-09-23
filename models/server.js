import express from 'express';
import cors from 'cors';
import dbConnection from '../database/config.js';
import usuario from '../routes/usuario.js'
import fileUpload from 'express-fileupload'
import iglesia from '../routes/iglesia.js'
import red from '../routes/red.js'
import subRed from '../routes/subRed.js'
import grupoBiblico from '../routes/grupoBiblico.js';
import directorio from '../routes/directorio.js';
import publicacion from '../routes/publicacion.js'




class Server {
    constructor(){
        this.port=process.env.PORT;
        this.app = express();
        this.middlewares();
        this.connectionDb();
        this.routes();
    }

    routes(){
        this.app.use('/api/usuario',usuario)
        this.app.use('/api/iglesia',iglesia)
        this.app.use('/api/red',red)
        this.app.use('/api/subRed',subRed) 
        this.app.use('/api/grupoBiblico',grupoBiblico)
        this.app.use('/api/directorio',directorio)
        this.app.use('/api/publicacion', publicacion)
    }

    async connectionDb(){
       await dbConnection();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.static(`public`));

        this.app.use(fileUpload({
            useTempFiles:true,
            tempFileDir:'/tmp/',
            createParenthPath:true
        }));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`); 
        });
    }
}

export default Server




