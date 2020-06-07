import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

module.exports = app => {
    const Users = app.db.models.Users;
    const config = app.libs.config;
    
    const params = {
        secretOrKey: config.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    };

    const strategy = new Strategy(params, (payload, done) => {
        Users.findByPk(payload.sub).then((user) => {
            if (!user) {
                return done(null, false);
            }

            return done(null, {
                id: user.id,
                name: user.name,
                email: user.email
            });
        }).catch((error) => {
            done(error, null);
        });
    });

    passport.use(strategy);

    return { 
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate("jwt", config.jwtSession)       
    };
};