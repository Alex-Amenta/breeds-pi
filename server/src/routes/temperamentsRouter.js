const { Router } = require('express');
const getTemparementsHandler = require('../handlers/temperamentsHandlers');

const temperamentsRouter = Router();

temperamentsRouter.get('/', getTemparementsHandler);

module.exports = temperamentsRouter;