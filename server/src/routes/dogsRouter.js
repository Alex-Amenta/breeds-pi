const { Router } = require('express');
const { getDogsHandler, getDogsByIdHandler, createDogsHandler, getDogsByNameHandler } = require('../handlers/dogsHandlers');

const dogsRouters = Router();

dogsRouters.get('/', getDogsHandler);
dogsRouters.get('/:id', getDogsByIdHandler);
// dogsRouters.get('/name', getDogsByNameHandler);
dogsRouters.post('/', createDogsHandler);

module.exports = dogsRouters;