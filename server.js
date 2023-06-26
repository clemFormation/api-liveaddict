import express from 'express';
import { createServer } from "http";

import staticRoutes from './routes/static/staticRoute.js';
import sessionRoutes from './routes/authentification/index.js';
import tchatSocketio from './routes/tchatSocketio/index.js';
//import { TransformQuery } from 'graphql-tools';
 
const app = express();
const httpServer = createServer(app);
process.env.PORT = process.env.PORT || 8080

app.set('port',process.env.PORT);
app.set('view engine', 'ejs');
app.use(express.json());

// permet de tracer toutes les requettes HTTP
app
.use((req,res,next)=>{
    console.debug(`URL demandée : ${req.originalUrl}`)
    next();
})
// Fichier static 
app.use(express.static('public'))

// Définition de la route client sur le serveur
.use(sessionRoutes);

app.use((req, res, next)=>{
    //acces restreint
    if( true ){
        next();
    }
    res.statut = 501
})

// Définition de la route client sur le serveur
.use(staticRoutes)

// partie chat/socket.io
.use("/socketio/",tchatSocketio(httpServer))
    

// 404
app.use(function(req, res){
    res.render('404');
});

httpServer.listen(process.env.PORT, () => console.log(`serveur lancé sur http://localhost:${process.env.PORT}`));