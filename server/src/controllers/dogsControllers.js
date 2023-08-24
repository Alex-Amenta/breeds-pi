const { Op } = require('sequelize');
const { Dog, Temperaments } = require('../db');
const { API_KEY } = process.env;
const axios = require('axios');

const URL = "https://api.thedogapi.com/v1/breeds";

const cleanApiData = (api) =>
    api.map((dog) => {
        return {
            id: dog.id,
            name: dog.name,
            image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
            weight: dog.weight.metric,
            height: dog.height.metric,
            life_span: dog.life_span,
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


const getDogsById = async (id, source) => {
    let response;

    if (source === 'API') {
        response = await axios.get(`${URL}/${id}`);
    } else {
        response = await Dog.findByPk(id, {
            include: {
                model: Temperaments,
                attributes: ['name'],
                through: { attributes: [] }
            }
        });
    }

    const dog = cleanApiData([response.data || response])[0]; // Clean the 

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

const createDogs = async (image, name, height, weight, life_span, temperaments) => {
    // const urlImg = './dogDefault.jpg';

    // if (!image) {
    //     image = urlImg;
    // }

    const newDog = await Dog.create({
        image,
        name,
        height,
        weight,
        life_span,
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