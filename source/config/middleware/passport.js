const FacebookTokenStrategy = require('passport-facebook-token');
const GoogleTokenStrategy = require('passport-google-token').Strategy;


const authFacebookToken = new FacebookTokenStrategy(
    {
        clientID: process.env.FACEBOOK_CLIENT_ID || '1409934455809237',
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '184ea1a6b3aa6a41a7a2fd51aa804986'
    },
    (access_token, refresh_token, profile, done) => {
        if (access_token) {
            done(null, {
                provider: {
                    provider_type: 'facebook',
                    provider_id: profile.id,
                    email: profile._json.email,
                    first_name: profile._json.first_name,
                    last_name: profile._json.last_name,
                    access_token,
                    avatar: profile.photos[0].value,
                }
            })
        } else {
            done(true);
        }
    }
)

const authGoogleToken = new GoogleTokenStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID || '1053349361858-icd71lpt5up0pcffmrt58r41equ3seml.apps.googleusercontent.com',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '3EvmEXZnpgpfmuYkyYaGtpI6'
    },
    (access_token, refresh_token, profile, done) => {
        if (access_token) {
            done(null, {
                provider: {
                    provider_type: 'google',
                    provider_id: profile.id,
                    email: profile._json.email,
                    first_name: profile._json.given_name,
                    last_name: profile._json.family_name,
                    access_token,
                    avatar: profile._json.picture,
                }
            })
        } else {
            done(true);
        }
    }
)

const authFailed = (error, req, res, next) => {
    if (error) {
        return res.status(400).json({ success: false, message: 'Auth failed', error })
    }
    next();
}

module.exports = {
    authFacebookToken,
    authGoogleToken,
    authFailed
}