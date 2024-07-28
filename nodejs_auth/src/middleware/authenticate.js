const ErrorHandler = require("../utils/errorHandler");
const User = require('../domains/artist')
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');

exports.isAuthenticatedArtist = catchAsyncError( async (req, res, next) => {
   const { token  }  = req.cookies;
   
   if( !token ){
        return next(new ErrorHandler('Login first to handle this resource', 401))
   }

   const decoded = jwt.verify(token, process.env.JWT_SECRET)
   req.artist = await     Artist.findById(decoded.id)
   next();
})

exports.authorizeRoles = (...roles) => {
   return  (req, res, next) => {
        if(!roles.includes(req.artist.role)){
            return next(new ErrorHandler(`Role ${req.artist.role} is not allowed`, 401))
        }
        next()
    }
}   