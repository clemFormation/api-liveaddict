import { Router } from 'express'
const router = Router();
import { Server } from "socket.io";

export default function(httpServer) {
    // Partie client
    router.get('/tchat', function (req, res) {
        res.render('tchat');
    })
    .get('/vueTchat', function (req, res) {
        res.render('chatVue',);
    })

    // Partie serveur
    const io = new Server(httpServer, {});
    const conversation = [];

    // Quand un client se connecte, on le note dans la console
    io.sockets.on('connection', function (socket) {
        console.log('Un client est connecté !');
        socket.emit('SYSTEME_MSG', 'Vous êtes bien connecté !');
        socket.emit('CHAT_MSG', conversation);

        socket.on('CHAT_CMD', function (cmds) {
            if (cmds.pseudo){
                socket.client.pseudo = cmds.pseudo
                sendMsg(`${socket.client.pseudo} vient de se connecter.`);
            }
            //else if( cmds.getHisto)  sendMsgs(conversation);
            if( cmds.purgeHisto){
                conversation.length = 0
            }  
            
        });

        
        socket.on('CHAT_MSG', function (msg) {
            sendMsg(msg, socket.client.pseudo);
        });
        
        function sendMsg(txt,pseudo='SERVER'){
            const msg = {
                time : new Date().toJSON(),
                pseudo,
                content : txt.replace('merde','M####'),
            }
            console.log(`msg=> ${msg.pseudo}:${msg.content} `);
            conversation.push(msg)
            io.emit('CHAT_MSG', msg)
        }
    });

    return router;//middleWare
}