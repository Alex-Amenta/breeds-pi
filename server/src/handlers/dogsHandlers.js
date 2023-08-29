const { getAllDogs, getDogsById, searchDogsByName, createDogs } = require("../controllers/dogsControllers");

const getDogsHandler = async (req, res) => {
    //Esta ruta trae todos los perros y tambien maneja los nombres por query!
    const { name } = req.query;
    try {
        const results = name ? await searchDogsByName(name) : await getAllDogs();
        res.status(200).json(results);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const getDogsByIdHandler = async (req, res) => {
    //Esta ruta trae el detalle de un perro por id
    const { id } = req.params;
    const source = isNaN(id) ? 'DB' : 'API';
    try {
        const dog = await getDogsById(id, source);
        res.status(200).json(dog);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const createDogsHandler = async (req, res) => {
    //Esta ruta crea un perro por body
    const { image, name, min_height, max_height, min_weight, max_weight, life_spanMin, life_spanMax, temperaments } = req.body;
    try {
        const newDog = await createDogs(image, name, min_height, max_height, min_weight, max_weight, life_spanMin, life_spanMax, temperaments);
        res.status(201).json({ message: newDog });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    getDogsHandler,
    getDogsByIdHandler,
    createDogsHandler
}