

const jwt = require('jsonwebtoken')

function verifyToken(req,res,next){
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1];


    if(!token){
        return res.status(401).json({ message: 'Access denied. Token missing.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if(err){
                return res.status(403).json({ message: 'Token expired or invalid. Please login again.' });
            }

            req.user = decoded
            next();
        }
    )

}

module.exports = verifyToken