const { Router } = require('express');
const dogsRouter = require('./dogsRouter.js');
const temperamentsRouter = require('./temperamentsRouter.js');
const router = Router();

// Configurar los routers
router.use('/dogs', dogsRouter);
router.use('/temperaments', temperamentsRouter);

module.exports = router;