// this for like user login hai ya nahi? bss

// this middleware will verify token h? -> valid h -> req.user me payload dalo -> next()


import jwt from 'jsonwebtoken';
// import User from '../models/user.model.js';



const auth = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];


        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied, No token provided."
            })
        }

        // jwt.verify() is synchornous when no callback is passed
        const payload =  jwt.verify(token, process.env.JWT_SECRET)  // jwt ke aage await lagane ki need nahi coz,  jsonwebtoken.verify() callback ke bina synchronous return karta hai.

        req.user = payload;


        next()
        
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token",
            error: error.message
        })
        
        
    }
}


export { auth}