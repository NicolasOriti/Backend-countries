const { Router } = require('express');
const { Country, Activity } = require('../db.js');

const router = Router();

router.get('/', async (req, res) => {
  const countries = await Country.findAll();

  if (req.query.name) {
    // console.log(req.query.name);
    const name = req.query.name;
    const countriesFilter = countries.filter((country) => {
      const filterCondition = country.name.toLowerCase().includes(name.toLowerCase());

      if (filterCondition) {
        return country;
      }
    });

    if (countriesFilter.length === 0) {
      return res.send('No se encontraron paises con ese nombre');
    }

    return res.json(countriesFilter);
  }

  res.json(countries);
});

router.get('/:idPais', async (req, res) => {
  const country = await Country.findByPk(req.params.idPais, {
    include: {
      model: Activity,
      through: {
        attributes: []
      }
    }
  });


  // console.log(country);
  res.json(country);
});

//localhost:3001/countries

module.exports = router;
