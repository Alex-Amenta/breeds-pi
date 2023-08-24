const getAllTemperaments = require("../controllers/temperamentsControllers");

const getTemparementsHandler = async (req, res) => {
    //Esta ruta trae todos los temperamentos
    try {
        const temparements = await getAllTemperaments();
        res.status(200).json(temparements);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = getTemparementsHandler;