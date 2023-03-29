const { Router } = require('express');
const { Activity, Country } = require('../db.js');

const router = Router();

router.get('/', async (req, res) => {
  const activities = await Activity.findAll();
  res.json(activities);
});

router.post('/', async (req, res) => {
  const { name, difficulty, duration, season, idCountries } = req.body;
  const activity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
  });
  

  idCountries.forEach(async (id) => {
    const country = await Country.findByPk(id);
    await activity.addCountry(country);
  });

  res.send('Actividad creada');
});

module.exports = router;
