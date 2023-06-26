import {Router} from 'express';
import models from '#root/lib/DAL/index.js';

const router = new Router();

router
.get('/',function(req,res){
    res.send({
        statut : "ready",
    });
})
.get('/:elmt/:id?',async function(req,res){
    const response ={}
    if(!models[req.params.elmt] ) {
        response.error = `L'élément '${req.params.elmt}' n'existe pas`;
    }
    const options={
        where : {}
    }
    if(!models[req.params.id] ) {
        options.where[`id${req.params.elmt}`] = req.params.id
    }
    response.data = await models[req.params.elmt].findAll(options)
    
    
    res.send(response)
})

export default router;