const  express = require('express');
const bodyParser = require('body-parser');

const promotionRouter=express.Router();

promotionRouter.use(bodyParser.json());
promotionRouter.route('/')

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
        res.end('will send all the promotions to you');
    })

    .post((req,res,next) =>{
        res.end('Will add the promotion :'+ req.body.name + ' with details: ' +
            req.body.description);
    })

    .put((req,res,next) =>{
        res.statusCode =403;
        res.end('Put operation no supported');
    })

    .delete((req,res,next) =>{
        res.end('Delete all the promotions ');
    });

promotionRouter.route('/:promotionId')
    /**Concernant une promotion specifique*/
    .get((req,res,next) =>{
        res.end('will send details of the promotions: ' + req.params.promotionId + ' to you');
    })

    .post((req,res,next) =>{
        res.statusCode =403;
        res.end('Post operation no supported on /promotion/' +
            req.params.promotionId);
    })

    .put((req,res,next) =>{
        res.write('Updating the promotions: ' +req.params.promotionId);
        res.end(' \n  Will update the promotion' + req.body.name +' with details '
            +req.body.description);
    })

    .delete((req,res,next) =>{
        res.end('Deleting promotions: '+req.params.promotionId);
    });


module.exports = promotionRouter;