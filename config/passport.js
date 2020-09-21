const passport=require('passport');
const googleStrategy=require('passport-google-oauth20');
const key=require('./key');
const db = require('./connection');
const to = require ('../utils/to');

passport.serializeUser( (user,done) => {
    return done(null,user.uid);    
});

passport.deserializeUser( async (id, done) => {
    let err, res;
    [err, res] = await to(db.query('select * from users where uid=?',[id]));
    return done(null,res[0]);
});

passport.use( 
    new googleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: key.google.clientID,
        clientSecret: key.google.clientSecret
    }, async function (accessToken,refreshToken,profile,done) {
        //insert into DB
        let err,res;
        date = new Date();
        [err, res]= await to(db.query('select * from users where gid=?',[profile.id]));
        if(res.length==0) {
            [err, res]= await to(db.query('insert into users(gid,name,regdate) values(?,?,?)',
            [profile.id,profile.displayName,date]));
            if(err) { return done(err); }
        }
        let user;
        [err, user]=await to(db.query('select * from users where gid=?',[profile.id]));
        done(null,user[0]);  
    })
)