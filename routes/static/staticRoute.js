import { Router } from 'express'
const router = Router();

router
.get('/', function(req, res){
    res.render('accueil');
})
.get('/doc([.]php)?', function(req, res){
    res.render('doc');
})

export default router