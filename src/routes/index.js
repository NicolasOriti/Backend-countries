const { Router } = require('express');
const axios = require('axios');
const { Country } = require('../db.js');
const countriesRouter = require('./countries.routes.js');
const activitiesRouter = require('./activities.routes.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get('/guardar-paises', async (req, res) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://restcountries.com/v3/all',
    headers: {},
  };

  axios
    .request(config)
    .then((response) => {
      response.data.forEach(async (country) => {
        if (country.capital) {
          await Country.create({
            id: country.cca3,
            name: country.name.common,
            flag: country.flags[1],
            continent: country.region,
            capital: country.capital[0],
            subregion: country.subregion,
            area: country.area,
            population: country.population,
          });
        }
      });

      res.send('Se cargo la base de datos');
    })
    .catch((error) => {
      console.log(error);
    });
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countriesRouter);
router.use('/activities', activitiesRouter);

module.exports = router;
