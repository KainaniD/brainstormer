const userModel = require('../models/userModel.js')
require('../config/env.js').createEnvironment();

module.exports = {
    initPassport: function (app, passport, session) {

        app.use(session({
            secret: process.env.SECRET,
            resave: false,
            saveUninitialized: true,
            proxy: true,
            cookie: {
                secure: (process.env.MODE === "dev") ? false : true,
                sameSite: (process.env.MODE === "dev") ? 'lax' : 'none',
                maxAge: 1000 * 60 * 60 * 24
            }
        }))

        app.use(passport.session());

        passport.use(userModel.createStrategy());
        passport.serializeUser(userModel.serializeUser());
        passport.deserializeUser(userModel.deserializeUser());

    },
    register: function (app) {
        app.post("/register", (req, res) => {
            const { username, email, password } = req.body;


            const regexCheck = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!email.match(regexCheck)) return res.json({ message: "Please enter a valid email" });

            const containsLowercase = /[a-z]/;
            const containsUppercase = /[A-Z]/;
            const containsNumber = /[0-9]/;
            const allRegexChecks = [containsLowercase, containsUppercase, containsNumber];

            if (password.length < 10) return res.json({ message: "Your password needs:\n10 characters\n1 lowercase character\n1 uppercase character\n1 number\n" });
            
            for (let i = 0; i < allRegexChecks.length; i++) {
                if (!password.match(allRegexChecks[i])) 
                    return res.json({ message: "Your password needs:\n10 characters\n1 lowercase character\n1 uppercase character\n1 number\n" });
                
            }

            userModel.findOne({ username: username })
                .then((user) => {
                    if (user) return res.json({ message: "a user with the name " + username + " already exists" });

                    userModel.register(new userModel({ username: username, email: email}), password)
                        .then(() => { 
                            return res.json(); 
                        })
                        .catch(() => { return res.json({ message: "something wrong happened :(" }); });
                }) 
                .catch(() => { return res.json({ message: "something wrong happened :(" }); });

        });
    },
    login: function (app, passport) {
        app.post("/login", (req, res) => {

            const { username } = req.body;


            passport.authenticate("local", function (err, user) {
                if (err) return res.json({ message: "something wrong happened :(" });

                if (!user) {
                    userModel.findOne({ username: username })
                        .then((user) => {
                            if (!user) return res.json({ message: "that username or password is incorrect" });

                            const newAttempts = user.attempts - 1;
                            if (newAttempts < 0) {
                                userModel.updateOne({ _id: user._id }, { restricted: true })
                                    .then(() => { return res.json({ message: "too many failed attempts, your account has been restricted" }); })
                                    .catch(() => { return res.json({ message: "something wrong happened :(" }); });
                            } else {
                                userModel.updateOne({ _id: user._id }, { attempts: newAttempts })
                                    .then(() => { return res.json({ message: "that username or password is incorrect" }); })
                                    .catch(() => { return res.json({ message: "that username or password is incorrect" }); });
                            }
                        })
                        .catch(() => { return res.json({ message: "that username or password is incorrect" }); });

                } else {
                    req.login(user, function (err) {
                        if (user.restricted) return res.json({ message: "that user's account has a hold on it, contact me at kainanime2@gmail.com to take the hold off"});
                        if (err) return res.json({ message: "that username or password is incorrect" });
            
                        userModel.findOneAndUpdate({ _id: user._id }, { attempts: 10 })
                            .then(() => {
                                req.session.save();
                                return res.json();
                            })
                            .catch(() => { return res.json({ message: "something wrong happened :(" }) })
                    });
                }

            })(req, res);
        })
    },
    getUser : function(app) {
        app.get("/currentuser", (req, res) => {
            return res.json(req.user);
        })
    },
    logout : function(app) {
        app.post("/logout", (req, res) => {
            req.session.destroy(function (err) {
                return res.json(err)
            })
        })
    }
}