// MAY NEED TO CREATE THIS, RENAME IT TO SOMETHING ELSE, THEN MODEL:CREATE, THEN DELETE THAT AND MOVE THIS BACK I N


//user model declaration
//define use case // somehow makes sure data types are the same across the entire app
'use strict'
//import any required libraries
const bcrypt = require('bcrypt');
//declare user model format
module.exports = function(sequelize, DataTypes) {
    // define user object
    const user = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: 'Invalid email address'
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            validate: { // validation of name length isn't particular important, but this illustrates length validation
                len: {
                    args: [1, 99],
                    msg: "Name must be between 1 and 99 characters"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [8, 99],
                    msg: "Password must be between 8 and 99 characters"  // can also use hooks below or html form to validation
                }
            }
        }

    }, {
    // hook - way of saying I want to grab data as it's coming in and do something to it before it moves on
        hooks: {
            //hash user-inputted pw before record creation
            beforeCreate: function(createdUser, options){  // cannot use arrow functions here since 'this' keyword is used behind the scenes
                if (createdUser && createdUser.password){
                    let hash = bcrypt.hashSync(createdUser.password, 12) // can pass it a salt(string) or 'rounds', a number of times to run the hash function
                    createdUser.password = hash;
                }
            }
            
        }
    })
    // user associations
    user.associate = function(models){
        //TO DO: any user associations you want
    }
    user.prototype.validPassword = function(passwordTyped) {
        return bcrypt.compareSync(passwordTyped, this.password);
    }
    // remove password before any serialization of User object
    user.prototype.toJSON = function() {
        let userData = this.get();
        delete userData.password;
        return userData;
    }
    return user;
}

//take inputed password and compare to hashed password in user table
//hash new password and add to user table 
//remove password setup before add
//return user model