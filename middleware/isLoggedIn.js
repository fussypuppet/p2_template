// write a function we are going to use as middleware
module.exports = function(req,res,next){
    if (!req.user){
        req.flash('error', "you must be logged in to view this page");
        res.redirect('/auth/login');
    } else {
        next();
    }
}

// check and see if we have a user variable set
// if so, allow app to carry on
// if not, will let user know they have to be logged in to access
// redirect user back to /auth/login
