const pathLogger = (req,res,next)=>{
        console.log(req.method+' '+req.path+' - '+req.ip);
        next();
    
}

module.exports = pathLogger;