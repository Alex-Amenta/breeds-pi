const { Op } = require('sequelize');
const { Dog, Temperaments } = require('../db');
const { API_KEY } = process.env;
const axios = require('axios');

const URL = "https://api.thedogapi.com/v1/breeds";

const cleanApiData = (api) =>
    api.map((dog) => {
        const heightParts = dog.height.metric.split(' - ');
        const weightParts = dog.weight.metric.split(' - ');
        const life_spanParts = dog.life_span.split(' - ');

        return {
            id: dog.id,
            name: dog.name,
            image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
            min_height: heightParts[0],
            max_height: heightParts[1],
            min_weight: weightParts[0],
            max_weight: weightParts[1],
            life_spanMin: life_spanParts[0],
            life_spanMax: life_spanParts[1],
            breed_group: dog.breed_group ? dog.breed_group : 'not breed group',
            bred_for: dog.bred_for ? dog.bred_for : 'not bred for',
            temperament: dog.temperament,
            created: false
        }
    })

const getAllDogs = async () => {
    const dbDogs = await Dog.findAll({
        include: {
            model: Temperaments,
            attributes: ['name'],
            through: { attributes: [] }
        }
    });

    const dogsApiRaw = (await axios.get(`${URL}?api_key=${API_KEY}`)).data
    const apiDogs = cleanApiData(dogsApiRaw);

    return [...dbDogs, ...apiDogs];
};


const processApiDogData = (apiDog) => {
    const weightRange = apiDog.weight.metric.split(' - ');
    const heightRange = apiDog.height.metric.split(' - ');
    const lifeSpanRange = apiDog.life_span.split(' - ');

    return {
        id: apiDog.id,
        name: apiDog.name,
        image: `https://cdn2.thedogapi.com/images/${apiDog.reference_image_id}.jpg`,
        min_height: heightRange[0],
        max_height: heightRange[1],
        min_weight: weightRange[0],
        max_weight: weightRange[1],
        life_spanMin: lifeSpanRange[0],
        life_spanMax: lifeSpanRange[1],
        breed_group: apiDog.breed_group ? apiDog.breed_group : 'not breed group',
        bred_for: apiDog.bred_for ? apiDog.bred_for : 'not bred for',
        temperaments: apiDog.temperament,
        created: false
    };
};

const getDogsById = async (id, source) => {
    const dog = source === 'API'
        ? await axios.get(`${URL}/${id}?api_key=${API_KEY}`).then(response => processApiDogData(response.data))
        : await Dog.findByPk(id, {
            include: {
                model: Temperaments,
                attributes: ['name'],
                through: { attributes: [] }
            }
        })

    return dog;
};

const searchDogsByName = async (name) => {
    const dbDogs = await Dog.findAll({
        where: {
            name: { [Op.iLike]: `%${name}%` }
        }
    });

    if (dbDogs.length > 0) return dbDogs;

    const dogsApiRaw = (await axios.get(`${URL}/search?q=${name}&&api_key=${API_KEY}`)).data
    const apiDogs = cleanApiData(dogsApiRaw);

    return apiDogs.length > 0 ? apiDogs : "No breeds found with this name.";
};

const createDogs = async (image, name, min_height, max_height, min_weight, max_weight, life_spanMin, life_spanMax, temperaments) => {
    const existingDog = await Dog.findOne({ where: { name } });

    if (existingDog) {
        return "A dog with the same properties already exists"
    }

    const newDog = await Dog.create({
        image,
        name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        life_spanMin,
        life_spanMax,
        temperaments,
        created: true
    });

    if (temperaments) {
        const existingTemperaments = await Temperaments.findAll({ where: { name: temperaments } });
        if (existingTemperaments.length > 0) {
            // Crear la relación entre el perro y los temperamentos
            await newDog.addTemperaments(existingTemperaments);
            return 'Dog created successfully';
        } else {
            return 'The specified temperaments were not found';
        }
    }
};

module.exports = {
    getAllDogs,
    getDogsById,
    searchDogsByName,
    createDogs
}