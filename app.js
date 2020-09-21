const express=require('express');
const path=require('path');
const auth=require('./routes/auth');
const user=require('./routes/user');
const app=express();
const session = require('express-session');
const passport=require('passport');
const passportConfig= require('./config/passport');


app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: "secret-key",
      cookie: { maxAge: 604800000 }
    })
  );

app.use(passport.initialize());
app.use(passport.session());

//routes
app.get('/', (req,res)=> {
    res.render('home', {user: req.user});
});
app.use('/auth',auth);
app.use('/',user);

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log("server started");
})