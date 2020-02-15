const express = require('express');
const router = express.Router();
const { Reservation } = require('../../models');

router.get('/', async (req,res) => {
  res.json(await Reservation.all());
});

router.post('/', async (req,res) => {
  const rsvp = req.body.rsvp;
  const slot = new Date(rsvp.slot);

  if(slot.getUTCHours() < 3 || slot.getUTCHours() >= 18) {
    res.json(await Reservation.add(rsvp));
  } else {
    res.sendStatus(418);
  }
});

module.exports = router;
