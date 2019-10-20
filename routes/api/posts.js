const express =  require('express');
const routes = express.Router();

routes.get('/test', (req, res)=> res.json({msg: 'posts working'}));

module.exports =routes;