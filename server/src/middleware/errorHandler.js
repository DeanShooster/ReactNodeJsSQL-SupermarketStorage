/**
 * Generic error handler.
 * @param {Error} error 
 * @param {Request} req 
 * @param {Result} res 
 * @param {Callback} next 
 */
 const ErrorHandler = (error,req,res,next) => {
    let ErrorMsg = { Message: error.message };
    if(error.message === 'invalid token'){
        error.status = 403;
        ErrorMsg.Message = 'No Authentication';
    }
    if(!error.status) {
        error.status = 500;
        ErrorMsg.Message = 'Server Error';
    }
    res.status(error.status).send(ErrorMsg);
};

module.exports = {ErrorHandler};