import 'dotenv/config'
console.log(`Process = .env.${process.env.NODE_ENV}`);

import express from 'express';

import { createServer } from "http";

// création du serveur express
const app = express();
const httpServer = createServer(app);
process.env.PORT = process.env.PORT || 8080

app.set('port',process.env.PORT);
app.set('view engine', 'ejs');
app.use(express.json());

// permet de tracer toutes les requettes HTTP
app.use((req,res,next)=>{
    console.debug(`URL demandée : ${req.originalUrl}`)
    next();
})
// enalbe Cors
import cors from 'cors';
app.use(cors())

// Fichier static 
app.use(express.static('public'));


// Définition de la route client sur le serveur
import sessionRoutes from './routes/authentification/index.js';
app.use(sessionRoutes);

app.use((req, res, next)=>{
    //acces restreint
    if( true ){
        next();
    }
    res.statut = 501
})

// Définition de la route client sur le serveur
import staticRoutes from './routes/static/staticRoute.js';
app.use(staticRoutes);

// partie chat/socket.io
import tchatSocketio from './routes/tchatSocketio/index.js';
app.use("/socketio/",tchatSocketio(httpServer));

// API Rest
import REST from './routes/api/rest.js';
app.use("/api/rest/v1/",REST)

// API GraphQL
import graphQL from './routes/api/graphQL.js';
app.use("/api/graphql/v1/",graphQL)


// 404
app.use(function(req, res){
    res.render('404');
});

// lancement du serveur
httpServer.listen(process.env.PORT, () => console.log(`serveur lancé sur http://localhost:${process.env.PORT}`));