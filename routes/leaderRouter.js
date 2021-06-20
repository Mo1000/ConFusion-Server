const  express = require('express');
const bodyParser = require('body-parser');

const leaderRouter=express.Router();

leaderRouter.use(bodyParser.json());
leaderRouter.route('/')

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
        res.end('will send all the leaders to you');
    })

    .post((req,res,next) =>{
        res.end('Will add the leader :'+ req.body.name + ' with details: ' +
            req.body.description);
    })

    .put((req,res,next) =>{
        res.statusCode =403;
        res.end('Put operation no supported');
    })

    .delete((req,res,next) =>{
        res.end('Delete all the leaders ');
    });

leaderRouter.route('/:leaderId')
    /**Concernant un leader specifique*/
    .get((req,res,next) =>{
        res.end('will send details of the leader: ' + req.params.leaderId + ' to you');
    })

    .post((req,res,next) =>{
        res.statusCode =403;
        res.end('Post operation no supported on /leader/' +
            req.params.leaderId);
    })

    .put((req,res,next) =>{
        res.write('Updating the leader: ' +req.params.leaderId);
        res.end('\n  Will update the leader ' + req.body.name +' with details '
            +req.body.description);
    })

    .delete((req,res,next) =>{
        res.end('Deleting leader: '+req.params.leaderId);
    });


module.exports = leaderRouter;