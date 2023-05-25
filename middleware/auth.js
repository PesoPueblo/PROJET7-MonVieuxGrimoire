const jwt = require ('jsonwebtoken');

module.exports = (req , res,next) => {
    try {
        const token = req.headers.authorization.split('')[1];
        const decodToken = jwt.verify(token, 'bcbizolkbhrygr554bhugz54fhrszazrere858z6');
        const userId = decodToken.userId
        req.auth= {
            userId: userId
        }
    } catch (error) {
        res.status(401).json({error})        
    }
}