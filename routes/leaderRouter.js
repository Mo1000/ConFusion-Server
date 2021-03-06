const  express = require('express');
const bodyParser = require('body-parser');

const leaderRouter=express.Router()
const Leaders = require('../models/leader');

leaderRouter.use(bodyParser.json());
leaderRouter.route('/')

    /**Pour etablir un point de terminaison all veut dire (post,put get ,delete,****)
     le chemin sera le meme que pour les autres et avec le next on transmet les memes
     parametre au autres aussi
     API REST(Representational State Transfert)*/
   /* .all((req,res,next) =>{
        res.statusCode =200;
        res.setHeader('Content-Type','text/plain');
        next();
    })*/

    .get((req,res,next) =>{
        Leaders.find({})
            .then((leaders) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leaders);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post((req,res,next) =>{
        Leaders.create(req.body)
            .then((leader) => {
                console.log('Leader Created ', leader);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .put((req,res,next) =>{
        res.statusCode =403;
        res.end('Put operation no supported on / leaders');
    })

    .delete((req,res,next) =>{
        Leaders.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

leaderRouter.route('/:leaderId')
    /**Concernant un leader specifique*/
    .get((req,res,next) =>{
        Leaders.findById(req.params.leaderId)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post((req,res,next) =>{
        res.statusCode =403;
        res.end('Post operation no supported on /leader/' +
            req.params.leaderId);
    })

    .put((req,res,next) =>{
        /**{ new: true } pour que la methode findByIdAndUpdate retourne le leader sous
         forme de reponse json*/
        Leaders.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, { new: true })
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .delete((req,res,next) =>{
        Leaders.findByIdAndRemove(req.params.leaderId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


module.exports = leaderRouter;