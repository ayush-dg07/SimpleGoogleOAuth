const router=require('express').Router();
const passport=require('passport');

//middleware
isLoggedIn = (req,res,next) => {
    if(req.user) return next();
    else res.redirect('/auth/login');
}

isLoggedOut = (req,res,next) => {
    if(req.user) res.redirect('/profile');
    else next();
}

router.get('/login',isLoggedOut,(req,res)=> {
    res.render('login');
});

router.get('/google',passport.authenticate('google', {
    scope: ['profile']
}   
));

router.get('/google/redirect',isLoggedOut,passport.authenticate('google'),(req,res)=> {
    res.redirect('/profile');
});

router.get('/logout',isLoggedIn,(req,res)=> {
    req.logout();
    return res.redirect('/');
});

module.exports=router;