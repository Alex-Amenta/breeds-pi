const { Temperaments } = require('../db');
const { getAllDogs } = require('./dogsControllers');

const getAllTemperaments = async () => {
    const apiDogs = await getAllDogs();

    // Utilizamos set para eliminar duplicados
    const temperamentSet = new Set();

    apiDogs.forEach((dog) => {
        if (dog.temperament) {
            const temperaments = dog.temperament.split(',').map((temp) => temp.trim());

            temperaments.forEach((temp) => {
                if (temp !== "") temperamentSet.add(temp)
            })
        }
    })

    // Lo convertimos en array y lo ordenamos alfabeticamente
    const uniqueTemperaments = [...temperamentSet].sort();

    const createDbTemperament = uniqueTemperaments.map(async (element) => {
        const existingTemperament = await Temperaments.findOne({ where: { name: element } })
        if (!existingTemperament) {
            return Temperaments.create({ name: element });
        }
    });

    // Esperar todas las operaciones de creación antes de continuar
    await Promise.all(createDbTemperament);

    // Consultar los temperamentos existentes en la base de datos
    const dbTemperaments = await Temperaments.findAll();

    return dbTemperaments
};

module.exports = getAllTemperaments;






// primer solucion que devolvia duplicados:
// const apiDogs = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data;
//     const temperamentsSet = new Set();

//     apiDogs.forEach((dog) => {
//         if (dog.temperament) {
//             // Dividir los temperamentos por coma y espacio
//             const temperaments = dog.temperament.split(', ');

//             // Iterar sobre los temperamentos individuales
//             temperaments.forEach((temp) => {
//                 temperamentsSet.add(temp)
//             })
//         }
//     });

//     // lo convertimos en array
//     const uniqueTemperaments = [...temperamentsSet];

//     const createDbTemperament = uniqueTemperaments.map((element) => {
//         return Temperaments.create({ name: element });
//     });

//     // Esperar todas las operaciones de creación antes de continuar
//     await Promise.all(createDbTemperament);

//     // Consultar los temperamentos existentes en la base de datos
//     const dbTemperaments = await Temperaments.findAll();

//     return dbTemperaments;