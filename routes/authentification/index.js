import { Router } from 'express'
const router = Router();
import bodyParser from "body-parser";
//http://www.passportjs.org/docs/
import passport from 'passport';
import session from "express-session"
import {Strategy as LocalStrategy} from 'passport-local';
import flash from 'connect-flash';

// strategy d'authentification
passport.use(new LocalStrategy(
    function(username, password, done) {
        if( username !=="admin")
            return done(null, false, { message: 'Incorrect username.' });
        return done(null, {username});
  
    }
  ));
passport.serializeUser(function (user, done) {
    return done(null, user.username);
});
passport.deserializeUser(function (username, done) {
    return done(null, {username});
});



router
// initilisation de passport
.use(session({ secret: "cats" }))
.use(bodyParser.urlencoded({ extended: false }))
.use(passport.initialize())
.use(passport.session())
.use(function (req, res, next) {
    res.locals.user = req.user ?? false
    console.log('user local='+res.locals.user.username);
    next()
})
.use(flash())

// permet d'ajouter l'objet user à tous les templates
// Page de connexion 
.get('/connexion', function(req, res){
    res.render('connexion',{error: req.flash("error")});
})
.post('/connexion', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/connexion',
    failureFlash: true,
}))
// page de déconnexion
.get('/deconnexion',(req,res)=>{
    //res.clearCookie('Admin.SID');
    req.logout();
    res.redirect('/');
})

export default router 