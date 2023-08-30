const { Router } = require('express');
const { getDogsHandler, getDogsByIdHandler, createDogsHandler } = require('../handlers/dogsHandlers');

const dogsRouters = Router();

dogsRouters.get('/', getDogsHandler);
dogsRouters.get('/:id', getDogsByIdHandler);
dogsRouters.post('/', createDogsHandler);

module.exports = dogsRouters;