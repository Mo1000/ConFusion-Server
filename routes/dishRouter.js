const  express = require('express');
const bodyParser = require('body-parser');

const dishRouter=express.Router();

dishRouter.use(bodyParser.json());
dishRouter.route('/')

/**Pour etablir un point de terminaison all veut dire (post,put get ,delete,****)
 le chemin sera le meme que pour les autres et avec le next on transmet les memes
 parametre au autres aussi
 API REST(Representational State Transfert)*/
.all((req,res,next) =>{
    res.statusCode =200;
    res.setHeader('Content-Type','text/plain');
    next();
})

.get((req,res,next) =>{
    res.end('will send all the dishes to you');
})

.post((req,res,next) =>{
    res.end('Will add the dish :'+ req.body.name + ' with details: ' +
        req.body.description);
})

.put((req,res,next) =>{
    res.statusCode =403;
    res.end('Put operation no supported');
})

.delete((req,res,next) =>{
    res.end('Delete all the dishes ');
});

dishRouter.route('/:dishId')
/**Concernant un plat specifique*/
.get((req,res,next) =>{
    res.end('will send details of the dish: ' + req.params.dishId + ' to you');
})

.post((req,res,next) =>{
    res.statusCode =403;
    res.end('Post operation no supported on /dishes/' +
        req.params.dishId);
})

.put((req,res,next) =>{
    res.write('Updating the dish: ' +req.params.dishId);
    res.end('\n  Will update the dish ' + req.body.name +' with details '
        +req.body.description);
})

.delete((req,res,next) =>{
    res.end('Deleting dish: '+req.params.dishId);
});


module.exports = dishRouter;