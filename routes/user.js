const router=require('express').Router();

//middleware
isloggedIn = (req,res,next) => {
    if(req.user) return next();
    else res.redirect('/auth/login');
}

isloggedOut = (req,res,next) => {
    if(req.user) res.redirect('/profile');
    else next();
}

router.get('/profile',isLoggedIn,(req,res) => {
    res.render('profile',{user: req.user});
});

module.exports=router;