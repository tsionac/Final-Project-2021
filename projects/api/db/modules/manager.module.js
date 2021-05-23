// the login part of our site was havely based on this youtube tuturial :
// https://www.youtube.com/watch?v=NPyFYsZb2gE&list=PLIjdNHWULhPSZFDzQU6AnbVQNNo1NTRpd&index=9


const mongoose  = require('mongoose'    );
const _         = require('lodash'      );
const jwt       = require('jsonwebtoken');
const crypto    = require('crypto'      );
const bcrypt    = require('bcryptjs'    );



// -------------------------------------------------- const parametes --------------------------------------------------

// JWT secret
// DO NOT sure this with ANYONE
// make this a RANDOM string (smashing the keybard without lokink is non good enugh! use a random string generatior).
// length not importent, though don't make it too short.
const jwtSecret = "e2v6ViT5MWBcnV4eaznqtFhtos9hWrZADdnRtFpNssD5D2Ki9ZNZCyCwZ3V6m3j7bJvODSGxwIbJociU";

getSecret = function() {
  return jwtSecret;
}

// the amount of time it takes to a jwt token to expire befire you need to use the refresh token to make a new one.
// if too short, lots of reqest will have to be made all the time to refresh the token.
// if too long, it means that if a user decide to revoke an active session (for whatever resen, the user loggen in a public computer and forgit to signout, laptop that have an actiuve session was stolen, just in case, etc.)
//    that it wil take atmoast this amount if time before the revoke take place. if someone have an active session, ther only way tro revoke access to this session
//    is by deleting the refrresh token, so when the token expres, it can no longer be refreshed. but it is STILL ACTIVE untile it expires and need to be refreshed.
//    and by that the session will be revoked, since the authentication token could not be refreshed.
const exoiration = "15" + "m";


// The leangth of the refresh token's secret in bytes.
const refreshSecretLength = 64;

// The ammount of tine (in days) a refresh token is valid.
// too short, the user wil have to login mre frequently.
// too long, the database wil keep storing them, and it might be too much. also coud become a security problem, though user can revoke access if the user choode too (explained above).
// see method genereteExpiryTime() if a more percis time than days is requre.
const refreshTokenExpiryTimeInDays = 10;


// amunt of rounds that a passwors is hashe in.
// higher is more secure (up to a point, no need to exaggerate), but will take longer to hash each password
// lower is the oposite of what wrote in previus sentance
const roundsOfHash = 10;



// -------------------------------------------------- schema --------------------------------------------------

const managerSchema = new mongoose.Schema({
  companyID : {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
  },
  userID : {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
      unique: true,
  },
  password : {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
  },

  // hold a list of curently active serssions of this user, each session contains a refreshtoken, and it's expration time (unix tome stamp).
  sessions : [{
      token : {
        type: String,
        required: true,
      },
      expiresAt : {
        type: Number,
        required: true,
      },
  }],
});


// -------------------------------------------------- Instance methods --------------------------------------------------

// overiding the "toJSON" methind, we do not want to expose the passwords ans sessions.
/*managerSchema.methods.toJSON = function() {
  const manager = this;
  const manageObj = manager.toObject();

  // return eveything exept password & sessions
  return _.omit(manageObj, ['password', 'sessions'] );
}; */


//create Authentication Token to verify the user
managerSchema.methods.generateAccessAuthenticationToken = function() {
  const manager = this;

  return new Promise( (resolve, reject) => {
    // create the JWT (Json Web Token) used to authenticate users, and teturn the token.

    //                  paylowd              private-key     otions {expiresIn: how long each jwt last?}      calback
    jwt.sign({_id:manager._id.toHexString()}, getSecret(),     {expiresIn:exoiration},                          (err, token) => {
      // token is the encoded token, if user was succesfully authenticated.

      if(!err){
        // there was no error
        resolve(token);
      } else{
        // user could not be authenticated
        reject();
      }
    });
  });
};

// generate the token use to refresh the JWT once it expires.
managerSchema.methods.generateRefreshToken = function() {
  return new Promise( (resolve, reject) => {
    // we need to generate a 64byte RANDOM hex strin, which is a secret use to refresh tokens.
    // we will not save it to the DB here. saveSessionToDB() does that.

    crypto.randomBytes(refreshSecretLength, (err, buf) => {
        if(!err){
          // no error, retrive the refresh token
          let token = buf.toString('hex');

          return resolve(token);
        }
    });
  });
};


// create a new session to current manager
managerSchema.methods.createSession = function() {
  let manager = this;

  return manager.generateRefreshToken().then((refreshToken) => {
      return saveSessionToDB(manager, refreshToken);
  }).then((refreshToken) => {
    // was seves succesfully to DB
    return refreshToken;
  }).catch ((e) => {
      return Promise.reject('could not save session to DB. error :\n' + e);
  });
};



managerSchema.methods.changePassword = function(oldPass,newPass) {
  let manager = this;

  return new Promise( (resolve, reject) => {
    // compare the hashed password to the hashed password stored in the DB
    bcrypt.compare(oldPass, manager.password, (err, res) => {
      if (res) {
        // old password is correct, so we can update the password to the new one
        manager.password = newPass;

        manager.save().then(() => {
          return resolve(manager);
        }).catch ( (e) => {
          reject(e);
        });
      }
      else       {reject();}
    });
  })
};


// -------------------------------------------------- module (static) methods --------------------------------------------------

//get the secret
managerSchema.statics.getJWTsecret = () => {return getSecret(); }

// find manager by ID and token.
managerSchema.statics.findByIDAndToken = function(_id, token) {
  const Manager = this;

  return Manager.findOne({
    _id,
    'sessions.token': token
  });
};

// find manager by ID and token.
managerSchema.statics.findByCredentials = function(userID, password) {
  let Manager = this;

  return Manager.findOne({ userID }).then( (manager) => {
    if(!manager) return Promise.reject(); // No such manager was found.

    return new Promise( (resolve, reject) => {
      // compare the hashed password to the hashed password stored in the DB
      bcrypt.compare(password, manager.password, (err, res) => {
        if (res) { resolve(manager);}
        else       {reject();}
      });
    });
  });
};

// check if the refresh token is expired
managerSchema.statics.hasRefreshTokenExpire = (expiresAt) => {
  let nowUnix =  secondsSinceEpoch();

  if(expiresAt >nowUnix) {
    // the experation time has not arived yet.
    return false;
  } else{
    // curent time is after the experation time.
    return true;
  }
};

// delete expired session records
managerSchema.statics.deleteExpiredSessions = function(userID) {
  const Manager = this;

  return Manager.findOneAndUpdate({userID}, { $pull: { "sessions": { 'expiresAt': { $lt: secondsSinceEpoch() } } } }, { safe: true, upsert: true });
};



// revoke a refresh token
managerSchema.statics.revokeRefreshToken = function(userID, refreshToken) {
  const Manager = this;

  return Manager.findOneAndUpdate({userID}, { $pull: { "sessions": { 'token': refreshToken } } }, { safe: true, upsert: true });
};

// -------------------------------------------------- Midlewares --------------------------------------------------

// before a manager documents is saved, this code runs
// hashes passwords
managerSchema.pre('save', function(next) {
  let manager = this;

  if(manager.isModified('password')) {
    // if the password field has beed edited

    //Generate salt and hash password
    bcrypt.genSalt(roundsOfHash, (err, salt) => {
      //hash password
      bcrypt.hash(manager.password, salt, (err, hash) => {
        // replace password with hased password
        manager.password = hash;
        next();
      });
    });
  } else{
    next();
  }
});


// -------------------------------------------------- helper methods --------------------------------------------------

// save a session to db.
// session = refreshtoken + expiry time
let saveSessionToDB = (manager, refreshToken) => {
    // saving the session to DB
    return new Promise( (resolve, reject) => {
      let expiresAt = genereteExpiryTime();

      manager.sessions.push({'token' : refreshToken, 'expiresAt': expiresAt});

      // save to DB
      manager.save().then(() => {
          return resolve(refreshToken);
      }).catch ( (e) => {
        reject(e);
      });
    });
};

// generete a refresh token's expiry time
let genereteExpiryTime = () => {
  let secondsUntilExpire = refreshTokenExpiryTimeInDays * 24 * 60 * 60; //HERE
  let nowUnix = secondsSinceEpoch();

  // return now + the time until the seesion is valid.
  return nowUnix + secondsUntilExpire;
};

// recive the ammount of seconds since the start of the unix timestamps clock (Thu Jan 01 1970 00:00:00 GMT+0000)
let secondsSinceEpoch = () => {
  // deviding by 1000 since it return time in miliseconds
  return Date.now() / 1000;
}

// -------------------------------------------------- export module --------------------------------------------------

const Manager = mongoose.model('Manager', managerSchema);
module.exports = { Manager };
